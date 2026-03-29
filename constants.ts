

export const CLOUDS = [
  "AWS",
  "Azure",
  "Google Cloud",
  "IBM Cloud",
  "Oracle Cloud"
];

// Extracted from the provided list based on keywords
export const INTEGRATIONS_AWS = [
  "Amazon API Gateway", "AWS App Mesh", "AWS App Runner", "Amazon AppStream", "AWS AppSync", 
  "Amazon Athena", "AWS Auto Scaling", "AWS Backup", "AWS Batch", "Amazon Bedrock", "AWS Billing", 
  "CloudFront", "AWS CloudHSM", "CloudTrail", "AWS CodeBuild", "CodeDeploy", "CodeWhisperer", 
  "Amazon Cognito", "AWS Config", "Amazon Connect", "Direct Connect", "AWS DMS", "DocumentDB", 
  "DynamoDB", "Amazon EBS", "Amazon EC2", "Amazon ECR", "Amazon ECS", "Amazon EFS", "Amazon EKS", 
  "Elastic Beanstalk", "ElastiCache", "Elastic Load Balancing", "Amazon EMR", "OpenSearch", 
  "EventBridge", "Kinesis Firehose", "Amazon FSx", "GameLift", "Global Accelerator", "AWS Glue", 
  "AWS Health", "Inspector", "IoT Core", "Amazon MSK", "Keyspaces", "Kinesis", "AWS KMS", 
  "AWS Lambda", "Amazon Lex", "Machine Learning", "MediaConnect", "MediaConvert", "MediaLive", 
  "MemoryDB", "Amazon MQ", "Managed Workflows Airflow", "Nat Gateway", "Neptune", "Network Firewall", 
  "OpsWorks", "Amazon Polly", "PrivateLink", "Amazon RDS", "Redshift", "Rekognition", "Route53", 
  "Amazon S3", "SageMaker", "Security Hub", "Amazon SES", "AWS Shield", "Amazon SNS", "Amazon SQS", 
  "Step Functions", "Storage Gateway", "Textract", "Transit Gateway", "Translate", "Trusted Advisor", 
  "Verified Access", "AWS VPN", "AWS WAF", "WorkSpaces", "X-Ray", "Fargate"
];

export const INTEGRATIONS_AZURE = [
  "Azure", "Entra ID", "Azure AI", "Azure App Services", "Azure Arc", "Azure Automation", 
  "Azure Backup", "Azure Batch", "Blob Storage", "CosmosDB", "Azure Data Factory", "Data Lake", 
  "Azure SQL", "Azure DevOps", "Event Hubs", "Express Route", "Azure IoT", "Key Vault", 
  "Load Balancer", "Logic Apps", "Azure Monitor", "OpenAI", "Redis Cache", "Service Bus", 
  "Virtual Network", "VM Scale Set", "Microsoft 365", "Defender", "Teams", "Visual Studio", 
  "Windows", "HyperV", "IIS", "SQL Server", "Windows Event Log"
];

export const INTEGRATIONS_GCP = [
  "Google App Engine", "AlloyDB", "Anthos", "BigQuery", "Bigtable", "Composer", "Dataflow", 
  "Dataproc", "Firebase", "Firestore", "Cloud Functions", "Google Cloud", "Pub/Sub", "Cloud Run", 
  "Spanner", "Cloud Storage", "Vertex AI", "Kubernetes Engine", "Google Meet", "Google Workspace", 
  "Chrome", "Android"
];

export const INTEGRATIONS_IBM = [
  "IBM Cloud", "IBM Db2", "IBM MQ", "IBM WAS", "IBM i"
];

export const INTEGRATIONS_ORACLE = [
  "Oracle Cloud", "Oracle Database", "Oracle Cloud Infrastructure", "OCI", "Java", "MySQL" 
];

export const INTEGRATIONS_COMMON = [
  "Ably", "Abnormal Security", "Active Directory", "ActiveMQ", "Adaptive Shield", "Adobe Experience Manager", 
  "Adyen", "Aerospike", "Agora Analytics", "Airbrake", "Airbyte", "Airflow", "Akamai", "Akamas", "Akeyless", 
  "Alcide", "AlertNow", "Algorithmia", "Alibaba Cloud", "Altostra", "Ambari", "Ambassador", "Amixr", 
  "Anecdote", "Ansible", "Anthropic", "Apache", "APISIX", "APIContext", "Apollo", "Appgate SDP", "AppKeeper", 
  "AppOmni", "Aqua", "ArangoDB", "Argo CD", "Artie", "Asana", "ASP.NET", "Atlassian", "Auth0", "AuthZed", 
  "Avi Vantage", "Workday", "Backstage", "BentoML", "BigPanda", "Bind 9", "Bitbucket", "Bitdefender", 
  "Bitwarden", "BlazeMeter", "Blink", "Blue Matador", "Bonsai", "Botprise", "Boundary", "Box", "Brevo", 
  "Btrfs", "Buddy", "Bugsnag", "Buoyant", "Cacti", "Calico", "Capistrano", "Carbon Black", "Cassandra", 
  "Catchpoint", "Causely", "CelerData", "Celery", "Census", "Ceph", "Cert-manager", "Chainguard", 
  "ChatWork", "Check Point", "Chef", "Cilium", "CircleCI", "Cisco ACI", "Cisco Duo", "Cisco SD-WAN", 
  "Cisco Umbrella", "Citrix", "ClickHouse", "Cloud Foundry", "CloudAEye", "CloudCheckr", "Cloudera", 
  "Cloudflare", "CloudHealth", "CloudNatix", "CloudQuery", "Cloudsmith", "CloudZero", "CockroachDB", 
  "Concourse-CI", "ConfigCat", "Confluence", "Confluent", "Consul", "Containerd", "Contentful", 
  "Contrast Security", "Conviva", "Convox", "CoreDNS", "CoreWeave", "Cortex", "CouchBase", "CouchDB", 
  "CrewAI", "CRI-O", "Cribl", "CrowdStrike", "Cursor", "Cybersixgill", "Cyral", "Dagster+", "Databricks", 
  "Datadog Agent", "Datazoom", "dbt Cloud", "Delinea", "Desk", "DevCycle", "DingTalk", "Disk", "DNSFilter", 
  "Docker", "DoControl", "Doctor Droid", "Doppler", ".NET", "Downdetector", "Drata", "Druid", "DuckDB", 
  "Dyn", "Elasticsearch", "Embrace", "EMnify", "EMQX", "Envoy", "Eppo", "ESET", "ESXi", "etcd", 
  "Eventstore", "EverSQL", "Exchange Server", "Exim", "Express", "External DNS", "ExtraHop", "F5", 
  "Fabric", "Fairwinds", "Falco", "Fastly", "Fauna", "Federator.ai", "Fiddler", "Filebeat", "FileMage", 
  "Firefly", "Flagsmith", "Flink", "FlowDock", "Fluentd", "Flume", "Flux", "Fly.io", "Forcepoint", 
  "Fortinet", "FoundationDB", "Gatekeeper", "Gatling", "Gearman", "Genesys", "Gigamon", "Git", "Gitea", 
  "GitHub", "GitLab", "Gluster", "Go", "GoDaddy", "Gravitee", "Greenhouse", "Gremlin", "gRPC", "Gunicorn", 
  "HAProxy", "Harbor", "Harness", "Hasura", "Hazelcast", "HBase", "Terraform", "Vault", "HDFS", "Helm", 
  "HikariCP", "HipChat", "Hive", "HiveMQ", "Honeybadger", "HubSpot", "Hudi", "Hugging Face", "iboss", 
  "Ignite", "iLert", "Impala", "Imperva", "incident.io", "InfiniBand", "Inngest", "InsightFinder", 
  "Instabug", "Intercom", "Invary", "IsDown", "Istio", "Ivanti", "Jamf", "JBoss", "Jenkins", "JetBrains", 
  "JFrog", "Jira", "JMeter", "Journald", "JumpCloud", "Juniper", "k6", "Kafka", "Kameleoon", "Karpenter", 
  "KEDA", "Keep", "Keeper", "Kepler", "Kernelcare", "Keycloak", "Klaviyo", "Knative", "Komodor", "Kong", 
  "KrakenD", "Kubernetes", "Kubeflow", "KubeVirt", "Kuma", "Kyoto Tycoon", "Kyverno", "Lacework", 
  "LambdaTest", "LangChain", "LastPass", "LaunchDarkly", "Lightbend", "Lighthouse", "Lighttpd", "Linear", 
  "Linkerd", "Linux", "LiteLLM", "LoadRunner", "Logstash", "Logz.io", "Lustre", "Mac OS", "Mailchimp", 
  "Mailgun", "MapR", "Marathon", "MarkLogic", "Magento", "Memcached", "Mendix", "Meraki", "Mergify", 
  "Mesos", "Metabase", "Milvus", "Mimecast", "Modal", "MongoDB", "Moogsoft", "Moovingon.ai", "Moxtra", 
  "mParticle", "Mux", "N2WS", "Nagios", "Neo4j", "NeoLoad", "NerdVision", "Netskope", "NeuBird", "Neutrona", 
  "New Relic", "Nextcloud", "NFS", "Nginx", "Ngrok", "Nobl9", "Node.js", "Nomad", "Notion", "Shopify", 
  "NS1", "NTP", "Nvidia", "NXLog", "OceanBase", "OctoPrint", "Octopus Deploy", "Okta", "Omlet", "OneLogin", 
  "Onepane", "1Password", "OpenLDAP", "OpenMetrics", "OpenShift", "OpenStack", "OpenVPN", "Opsgenie", 
  "Orbit CI", "Orca Security", "OSSEC", "OpenTelemetry", "PacketFabric", "PagerDuty", "Palo Alto", 
  "Papertrail", "PerfectScale", "PgBouncer", "PHP", "Pi-hole", "Pinecone", "Ping Identity", "Pingdom", 
  "Pivotal", "PlanetScale", "Pliant", "Plivo", "Podman", "Portworx", "Postfix", "PostgreSQL", "Postman", 
  "Postmark", "PowerDNS", "Presto", "Prometheus", "Proxmox", "ProxySQL", "Pulsar", "Pulse", "Pulumi", 
  "Puma", "Puppet", "Pure Storage", "Pusher", "Python", "Qdrant", "Quarkus", "RabbitMQ", "RapDev", 
  "Rapid7", "Ray", "RBLTracker", "Redis", "Redmine", "Redpanda", "Reflectiz", "Resin", "RethinkDB", 
  "Retool", "Riak", "Rigor", "Robust Intelligence", "Rollbar", "Rsyslog", "Ruby", "Angular", "Cypress", 
  "Flutter", "iOS", "JavaScript", "React", "React Native", "Roku", "Rundeck", "Salesforce", "Sanity", 
  "SAP HANA", "Scalr", "Scaphandre", "Scylla", "Seagence", "Sedai", "Segment", "SendGrid", "Sendmail", 
  "SentinelOne", "Sentry", "ServiceNow", "Sidekiq", "SIGNL4", "Signal Sciences", "Silk", "Silverstripe", 
  "Sinatra", "SingleStore", "Slack", "Sleuth", "Slurm", "SNMP", "Snowflake", "Sofy", "SolarWinds", "Solr", 
  "SonarQube", "Sonatype", "SonicWall", "Sophos", "Sortdb", "Sosivio", "Spark", "Speedscale", "Split", 
  "Splunk", "Squadcast", "Squid", "SSH", "StackPulse", "Stardog", "StatsD", "Statsig", "StatusPage", 
  "Steadybit", "Storm", "StreamNative", "Strimzi", "Stripe", "Stunnel", "Stytch", "Sumo Logic", 
  "Supabase", "Supervisord", "Superwise", "Suricata", "Sym", "Symantec", "Syncthing", "Syslog-ng", 
  "Systemd", "Tailscale", "TaskCall", "TCP", "TeamCity", "Tekton", "Teleport", "Temporal", "Tenable", 
  "Teradata", "Tibco", "TiDB", "TLS", "TokuMX", "Tomcat", "TorchServe", "Torq", "Traefik", 
  "Traffic Server", "Travis CI", "Trend Micro", "Trino", "Twemproxy", "Twilio", "Twingate", "Tyk", 
  "TypingDNA", "Unbound", "Unifi", "unitQ", "Upstash", "Uptime.com", "Uptycs", "uWSGI", "Vantage", 
  "Varnish", "Velero", "VeloCloud", "Vercel", "Versa", "Vertica", "Vespa", "VictorOps", "vLLM", "VMware", 
  "VNS3", "VoltDB", "VPC", "WarpStream", "WatchGuard", "Wayfinder", "Wazuh", "Weaviate", "WebAssembly", 
  "Webb.ai", "Webhooks", "WebLogic", "Wiz", "WMI", "xMatters", "Yarn", "YugabyteDB", "Zabbix", "Zebrium", 
  "Zeek", "Zendesk", "Zenduty", "Zenoh", "Zero Networks", "Zilliz", "ZooKeeper", "Zoom"
];

export const OPERATING_SYSTEMS = [
  "Linux", "Windows Server", "Ubuntu", "CentOS", "Red Hat", "Debian", "macOS", "Android", "iOS", "Fedora", "Arch Linux", "Alpine"
];

export const PROTAGONIST_TRAITS = [
  "Insecure", "Heroic", "Greedy", "Optimistic", "Cynical", "Naive", "Veteran", "Burned-out", "Visionary", "Imposter", "Junior", "Executive", "Hacker", "Support", "Sleep-deprived"
];

export const SETTINGS = [
  "Sci-Fi", "Medieval", "Cyberpunk", "Office", "Remote", "Mars Colony", "Data Center", "Coffee Shop", "Startup", "Enterprise", "Legacy Codebase", "The Cloud", "Underwater", "Underground Bunker"
];

export const CONFLICTS = [
  "Betrayal", "Discovery", "Deadline", "Outage", "Migration", "Compliance", "Security Breach", "Cost Spike", "Data Loss", "Merge Conflict", "Layoffs", "Acquisition", "Spaghetti Code"
];

export const GENRES = [
  "Horror", "Comedy", "Thriller", "Romance", "Mystery", "Noir", "Fantasy", "Documentary", "Action", "Drama", "Satire"
];

export const ITEMS = [
  "A rusty key", "A lost password", "A cryptic log", "A broken laptop", "Unlimited Budget", "A sentient AI", "A cup of coffee", "A fidget spinner", "Legacy Manual", "The Root Password"
];

export const TIMES = [
  "Midnight", "Early Morning", "Friday 5PM", "New Year's Eve", "The Distant Future", "1999", "The Launch Window", "On-Call Shift", "Lunch Break"
];
