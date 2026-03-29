
import React, { useState, useEffect, useCallback, useRef } from "react";
import { Die } from "./components/Die";
import { StoryDisplay } from "./components/StoryDisplay";
import { DieData, DieColor } from "./types";
import {
  CLOUDS,
  INTEGRATIONS_AWS,
  INTEGRATIONS_AZURE,
  INTEGRATIONS_GCP,
  INTEGRATIONS_IBM,
  INTEGRATIONS_ORACLE,
  INTEGRATIONS_COMMON,
  OPERATING_SYSTEMS,
  PROTAGONIST_TRAITS,
  SETTINGS,
  CONFLICTS,
  GENRES,
  ITEMS
} from "./constants";

// Initial Configuration of the Dice Hand
const INITIAL_DICE_CONFIG: Omit<DieData, "value" | "isLocked">[] = [
  { id: "d0", category: "Cloud", color: DieColor.INDIGO, options: CLOUDS },
  { id: "d1", category: "Protagonist", color: DieColor.TEAL, options: PROTAGONIST_TRAITS },
  { id: "d2", category: "Setting", color: DieColor.MUSTARD, options: SETTINGS },
  { id: "d3", category: "Conflict", color: DieColor.SALMON, options: CONFLICTS },
  { id: "d4", category: "Tech A", color: DieColor.SLATE, options: [] },
  { id: "d5", category: "Tech B", color: DieColor.SLATE, options: [] },
  { id: "d6", category: "Genre", color: DieColor.EMERALD, options: GENRES },
  { id: "d7", category: "Item", color: DieColor.ORANGE, options: ITEMS },
  { id: "d8", category: "OS", color: DieColor.PINK, options: OPERATING_SYSTEMS },
];

const getRandomItem = (arr: string[]) => arr[Math.floor(Math.random() * arr.length)];

// Helper to get integrations based on selected cloud
const getIntegrationOptions = (cloud: string) => {
  let specific: string[] = [];
  if (cloud === "AWS") specific = INTEGRATIONS_AWS;
  else if (cloud === "Azure") specific = INTEGRATIONS_AZURE;
  else if (cloud === "Google Cloud") specific = INTEGRATIONS_GCP;
  else if (cloud === "IBM Cloud") specific = INTEGRATIONS_IBM;
  else if (cloud === "Oracle Cloud") specific = INTEGRATIONS_ORACLE;
  
  return [...specific, ...INTEGRATIONS_COMMON];
};

const App: React.FC = () => {
  const [dice, setDice] = useState<DieData[]>([]);
  const [isRolling, setIsRolling] = useState(false);
  const [story, setStory] = useState<string>("");
  const [loadingStory, setLoadingStory] = useState(false);
  const [timelineImages, setTimelineImages] = useState<string[]>([]);
  const [generatingImages, setGeneratingImages] = useState(false);
  const [rollsCount, setRollsCount] = useState<number>(0);
  const [hasKey, setHasKey] = useState<boolean>(false);
  const hasLoaded = useRef(false);

  // Check for existing API key selection on mount
  useEffect(() => {
    const checkKey = async () => {
      if (window.aistudio?.hasSelectedApiKey) {
        const selected = await window.aistudio.hasSelectedApiKey();
        setHasKey(selected);
      }
    };
    checkKey();
    
    // Load roll count from local storage
    const storedCount = localStorage.getItem("rolls_count");
    if (storedCount) {
      setRollsCount(parseInt(storedCount, 10));
    }
  }, []);

  const handleSelectKey = async () => {
    if (window.aistudio?.openSelectKey) {
      await window.aistudio.openSelectKey();
      setHasKey(true); // Assume success per instructions
    }
  };

  // Initialize Dice Logic (without setting state directly to avoid double render issues on mount)
  const initializeDice = () => {
    const cloud = getRandomItem(CLOUDS);
    const integrationOptions = getIntegrationOptions(cloud);

    return INITIAL_DICE_CONFIG.map((config) => {
      if (config.id === "d4" || config.id === "d5") {
        return {
          ...config,
          options: integrationOptions,
          value: getRandomItem(integrationOptions),
          isLocked: false,
        };
      }
      if (config.id === "d0") {
        return {
          ...config,
          value: cloud,
          isLocked: false,
        };
      }
      return {
        ...config,
        value: getRandomItem(config.options),
        isLocked: false,
      };
    });
  };

  // Initial Mount Effect
  useEffect(() => {
    if (!hasLoaded.current) {
      hasLoaded.current = true;
      const initialDice = initializeDice();
      setDice(initialDice);
      // Trigger the roll animation immediately
      handleRollInternal(initialDice);
    }
  }, []);

  const toggleLock = (id: string) => {
    if (isRolling) return;
    setDice((prev) =>
      prev.map((die) =>
        die.id === id ? { ...die, isLocked: !die.isLocked } : die
      )
    );
  };

  // Internal roll handler that accepts current dice state
  const handleRollInternal = useCallback((currentDiceState: DieData[]) => {
    setIsRolling(true);
    setStory(""); // Clear previous story
    setTimelineImages([]); // Clear previous images

    let frames = 0;
    const maxFrames = 20; // Approx 2 seconds

    const intervalId = setInterval(() => {
      setDice((prev) => {
        // 1. Determine Cloud Die State
        const cloudDie = prev.find(d => d.id === "d0");
        // If undefined (during init), default to AWS.
        let currentCloud = cloudDie?.value || "AWS";
        
        // If Cloud die isn't locked, pick a new random cloud
        if (!cloudDie?.isLocked) {
          currentCloud = getRandomItem(CLOUDS);
        }

        // 2. Determine Integration Pool
        const integrationOptions = getIntegrationOptions(currentCloud);

        // 3. Update all dice
        return prev.map((die) => {
          if (die.isLocked) return die;

          if (die.id === "d0") {
             return { ...die, value: currentCloud };
          }
          
          if (die.id === "d4" || die.id === "d5") {
            return { 
              ...die, 
              options: integrationOptions,
              value: getRandomItem(integrationOptions) 
            };
          }

          return { ...die, value: getRandomItem(die.options) };
        });
      });

      frames++;
      if (frames >= maxFrames) {
        clearInterval(intervalId);
        setIsRolling(false);
      }
    }, 100);
  }, []);

  const handleRollClick = () => {
    if (isRolling) return;
    
    // Enforce "one session for free" limit
    // If they have 0 sessions left and no key, prompt for key
    if (rollsCount >= 1 && !hasKey) {
      handleSelectKey();
      return;
    }
    
    handleRollInternal(dice);
  };

  const resetFreeSession = () => {
    setRollsCount(0);
    localStorage.removeItem("rolls_count");
  };

  // Generate Story Effect - Runs when rolling finishes
  useEffect(() => {
    // Only generate if we just finished rolling and have valid dice
    if (!isRolling && hasLoaded.current && dice.length > 0) {
      generateStory(dice);
    }
  }, [isRolling, dice]); // dice dependency is safe here because isRolling blocks it during updates

  const generateStory = async (currentDice: DieData[]) => {
    setLoadingStory(true);
    setGeneratingImages(true);
    
    // Extract values for the prompt
    const cloud = currentDice.find(d => d.id === 'd0')?.value;
    const protagonist = currentDice.find(d => d.id === 'd1')?.value;
    const setting = currentDice.find(d => d.id === 'd2')?.value;
    const conflict = currentDice.find(d => d.id === 'd3')?.value;
    const techA = currentDice.find(d => d.id === 'd4')?.value;
    const techB = currentDice.find(d => d.id === 'd5')?.value;
    const genre = currentDice.find(d => d.id === 'd6')?.value;
    const item = currentDice.find(d => d.id === 'd7')?.value;
    const os = currentDice.find(d => d.id === 'd8')?.value;

    const prompt = `
      Write a short, engaging story synopsis (approx. 150-200 words) following the "Man in the Hole" story arc (Comfort -> Disaster -> Recovery).
      
      Elements to include:
      - Protagonist: ${protagonist} engineer
      - Cloud Provider: ${cloud}
      - Operating System: ${os}
      - Tech Stack: ${techA} and ${techB}
      - Setting: ${setting}
      - The Crisis: ${conflict} involving the item "${item}"
      - Genre/Tone: ${genre}
      
      CRITICAL REQUIREMENT:
      The story must show how **Datadog** (and its observability features) allows the protagonist to identify the root cause, understand the system behavior, and resolve the crisis to reach a better state.
      
      Do not include a title. Just the story text.
    `;

    let generatedStoryText = "";
    
    try {
      const response = await fetch("/api/generate-story", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ prompt, model: 'gemini-3-flash-preview' }),
      });
      
      const data = await response.json();
      
      if (data.text) {
        generatedStoryText = data.text;
        setStory(generatedStoryText);
        
        // ONLY increment roll count on SUCCESS
        const newCount = rollsCount + 1;
        setRollsCount(newCount);
        localStorage.setItem("rolls_count", newCount.toString());
      } else if (data.error) {
        throw new Error(data.error);
      }
    } catch (error) {
      console.error("Failed to generate story:", error);
      setStory(`The dice have been cast, but the muse is silent. (API Error: ${error instanceof Error ? error.message : String(error)})`);
      setLoadingStory(false);
      setGeneratingImages(false);
      return;
    }

    setLoadingStory(false);

    // --- TIMELINE GENERATION (Nano Banana) ---
    if (generatedStoryText) {
      try {
        // Step 1: Analyze story to get 3 scene descriptions
        const analysisPrompt = `
          Based on the following story, describe 3 distinct visual scenes (Start, Middle, End) that would work well as a visual timeline.
          Keep descriptions concise (under 20 words each) and visually descriptive.
          
          STORY:
          ${generatedStoryText}

          Return ONLY a JSON array of strings. Example: ["scene 1 description", "scene 2 description", "scene 3 description"]
        `;

        const analysisResponse = await fetch("/api/generate-story", {
           method: "POST",
           headers: { "Content-Type": "application/json" },
           body: JSON.stringify({ prompt: analysisPrompt, model: 'gemini-3.1-flash-lite-preview' }),
        });

        const analysisData = await analysisResponse.json();

        let sceneDescriptions: string[] = [];
        try {
           sceneDescriptions = JSON.parse(analysisData.text);
        } catch (e) {
           console.error("Failed to parse scene descriptions", e);
           // Fallback defaults if JSON fails
           sceneDescriptions = [
             `A ${protagonist} engineer working happily with ${cloud}`,
             `A digital crisis showing ${conflict} and ${item}`,
             `Data visualization graphs solving the problem`
           ];
        }

        // Step 2: Generate Images using gemini-2.5-flash-image
        const imagePromises = sceneDescriptions.map(async (desc) => {
          const imgResponse = await fetch("/api/generate-image", {
             method: "POST",
             headers: { "Content-Type": "application/json" },
             body: JSON.stringify({ prompt: `A retro low-poly PS1 style 3D render, chunky graphics, vibrant colors: ${desc}` }),
          });
          
          const imgData = await imgResponse.json();
          return imgData.imageUrl || null;
        });

        const images = await Promise.all(imagePromises);
        setTimelineImages(images.filter(img => img !== null) as string[]);

      } catch (error) {
        console.error("Failed to generate timeline images:", error);
      } finally {
        setGeneratingImages(false);
      }
    }
  };

  const unlockAll = () => {
    // Explicitly set isLocked to false for all dice to ensure UI updates
    setDice((prev) => prev.map((d) => ({ ...d, isLocked: false })));
  };

  return (
    <div className="min-h-screen flex flex-col items-center py-12 px-4 sm:px-6 lg:px-8 bg-[#e0e0e0] text-slate-900 pattern-grid-lg">
      
      <header className="text-center mb-10 max-w-3xl mx-auto">
        <h1 className="text-3xl md:text-5xl tracking-tight mb-4 text-slate-900 font-retro uppercase shadow-white drop-shadow-sm">
          DevOps Writing Dice
        </h1>
        <div className="flex flex-col items-center gap-4">
          <p className="text-sm md:text-lg text-slate-600 font-mono border-2 border-slate-900 inline-block px-4 py-2 bg-white shadow-[4px_4px_0px_rgba(0,0,0,1)]">
            Roll the cubes. Build the narrative.
          </p>
          
          <div className="flex items-center gap-2">
            <span className={`px-2 py-1 text-[10px] font-retro border-2 border-black shadow-[2px_2px_0px_black] ${hasKey ? 'bg-emerald-400' : 'bg-amber-400'}`}>
              {hasKey ? "PRO TIER" : "FREE TIER"}
            </span>
            {!hasKey && (
              <span className="text-[10px] font-mono text-slate-500">
                {rollsCount >= 1 ? "0 free sessions remaining" : "1 free session remaining"}
              </span>
            )}
            {!hasKey && rollsCount >= 1 && (
              <div className="flex items-center gap-2">
                <button 
                  onClick={handleSelectKey}
                  className="text-[10px] font-retro text-indigo-600 underline hover:text-indigo-800"
                >
                  Connect API Key for more
                </button>
                <button 
                  onClick={resetFreeSession}
                  className="text-[10px] font-mono text-slate-400 hover:text-slate-600"
                  title="Reset free session (for testing)"
                >
                  [Reset]
                </button>
              </div>
            )}
          </div>
        </div>
      </header>

      <main className="w-full max-w-6xl mb-12 flex flex-col lg:flex-row gap-12 items-start justify-center">
        
        {/* Left Column: Dice Grid */}
        <div className="flex-1 w-full">
          <div className="grid grid-cols-2 sm:grid-cols-3 gap-8 mb-12 p-6 bg-slate-300 border-4 border-slate-900 shadow-[8px_8px_0px_rgba(0,0,0,1)]">
            {dice.map((die) => (
              <Die
                key={die.id}
                data={die}
                rolling={isRolling}
                onToggleLock={toggleLock}
              />
            ))}
          </div>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-6 w-full">
            <button
              onClick={handleRollClick}
              disabled={isRolling}
              className={`
                w-full sm:w-auto py-4 px-12 
                bg-indigo-700 text-white 
                text-lg font-retro tracking-wide uppercase 
                border-4 border-black shadow-[4px_4px_0px_black]
                transition-all duration-100 
                hover:translate-y-1 hover:shadow-[2px_2px_0px_black] hover:bg-indigo-600
                active:translate-y-2 active:shadow-none
                disabled:opacity-50 disabled:cursor-not-allowed
                flex items-center justify-center gap-2
              `}
            >
              {isRolling ? "Rolling..." : "Roll Dice"}
            </button>

            <button
              onClick={unlockAll}
              disabled={isRolling}
              className="
                w-full sm:w-auto py-4 px-8
                bg-white border-4 border-black text-black
                text-sm font-retro tracking-wide uppercase 
                shadow-[4px_4px_0px_black]
                transition-all duration-100
                hover:translate-y-1 hover:shadow-[2px_2px_0px_black] hover:bg-slate-100
                active:translate-y-2 active:shadow-none
                disabled:opacity-50 disabled:cursor-not-allowed
              "
            >
              Unlock All
            </button>
          </div>
        </div>

        {/* Right Column: Story Output */}
        <div className="w-full lg:w-[480px] flex-shrink-0">
           <StoryDisplay 
             story={story} 
             loading={loadingStory} 
             timelineImages={timelineImages}
             generatingImages={generatingImages}
           />
        </div>

      </main>

      <footer className="text-center text-slate-500 text-xs font-mono mt-auto">
        Powered by Gemini 2.5 Flash & Datadog
      </footer>
    </div>
  );
};

export default App;
