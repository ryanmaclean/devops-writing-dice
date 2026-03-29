import express from "express";
import { createServer as createViteServer } from "vite";
import path from "path";
import { fileURLToPath } from "url";
import { GoogleGenAI } from "@google/genai";
import tracer from "dd-trace";

// Initialize Datadog Tracer with LLM Observability enabled
(tracer as any).init({
  llm_observability: true,
  service: "devops-writing-dice",
  env: "production",
});

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

async function startServer() {
  const app = express();
  const PORT = 3000;

  app.use(express.json());

  // Helper to get the best available API key
  const getApiKey = () => {
    const sources = [
      { name: 'API_KEY', value: process.env.API_KEY },
      { name: 'GEMINI_API_KEY', value: process.env.GEMINI_API_KEY },
      { name: 'VITE_API_KEY', value: process.env.VITE_API_KEY },
      { name: 'VITE_GEMINI_API_KEY', value: process.env.VITE_GEMINI_API_KEY }
    ];

    for (const source of sources) {
      const key = source.value;
      if (key && key.trim() !== "" && key !== "undefined" && key !== "null") {
        const trimmed = key.trim();
        console.log(`Using API key from ${source.name} (starts with: ${trimmed.substring(0, 4)}...)`);
        return trimmed;
      }
    }
    
    console.warn("No API key found in any expected environment variable.");
    return null;
  };

  // API Route for Story Generation with Datadog LLM Observability Tracing
  app.post("/api/generate-story", async (req, res) => {
    const { prompt, model = "gemini-3-flash-preview" } = req.body;

    if (!prompt) {
      return res.status(400).json({ error: "Prompt is required" });
    }

    const apiKey = getApiKey();
    if (!apiKey) {
      return res.status(401).json({ 
        error: "No valid API key found. Please ensure GEMINI_API_KEY is set in your environment or select one via the UI." 
      });
    }

    try {
      const ai = new GoogleGenAI({ apiKey });
      
      const response = await ai.models.generateContent({
        model: model,
        contents: prompt,
        config: {
          temperature: 0.8,
        }
      });

      res.json({ text: response.text });
    } catch (error) {
      console.error("Server-side generation error:", error);
      res.status(500).json({ error: error instanceof Error ? error.message : String(error) });
    }
  });

  // API Route for Image Generation
  app.post("/api/generate-image", async (req, res) => {
    const { prompt } = req.body;

    if (!prompt) {
      return res.status(400).json({ error: "Prompt is required" });
    }

    const apiKey = getApiKey();
    if (!apiKey) {
      return res.status(401).json({ 
        error: "No valid API key found. Please ensure GEMINI_API_KEY is set in your environment or select one via the UI." 
      });
    }

    try {
      const ai = new GoogleGenAI({ apiKey });
      
      const response = await ai.models.generateContent({
        model: 'gemini-2.5-flash-image',
        contents: {
          parts: [{ text: prompt }]
        }
      });

      // Extract base64 image
      let imageData = null;
      for (const part of response.candidates[0].content.parts) {
        if (part.inlineData) {
          imageData = `data:${part.inlineData.mimeType};base64,${part.inlineData.data}`;
          break;
        }
      }

      if (imageData) {
        res.json({ imageUrl: imageData });
      } else {
        res.status(500).json({ error: "No image data returned" });
      }
    } catch (error) {
      console.error("Server-side image generation error:", error);
      res.status(500).json({ error: error instanceof Error ? error.message : String(error) });
    }
  });

  // Vite middleware for development
  if (process.env.NODE_ENV !== "production") {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: "spa",
    });
    app.use(vite.middlewares);
  } else {
    const distPath = path.join(process.cwd(), 'dist');
    app.use(express.static(distPath));
    app.get('*', (req, res) => {
      res.sendFile(path.join(distPath, 'index.html'));
    });
  }

  app.listen(PORT, "0.0.0.0", () => {
    console.log(`Server running on http://localhost:${PORT}`);
  });
}

startServer();
