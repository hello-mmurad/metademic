import type { RoadmapPhase, WeeklyAchievement } from "@/types/content";

/**
 * Long-term research roadmap. TODO(owner): periods are planning targets —
 * adjust dates to the laboratory's actual records.
 */
export const roadmapPhases: RoadmapPhase[] = [
  {
    id: "concept", index: 1, name: "Concept", period: "2024", status: "Completed",
    objective: "Define the resource-aware coordination problem: which questions RACoN must answer and which constraints — hardware capability, network conditions, trust, workload requirements — it must treat as first-class.",
    validation: "Problem statement checked against the distributed-systems and scheduling literature; scope fixed to the laboratory's size and instrumentation.",
    milestone: "RACoN research concept and problem definition documented."
  },
  {
    id: "simulation", index: 2, name: "Simulation", period: "2024–2025", status: "Completed",
    objective: "Model heterogeneous nodes, workloads, and changing network conditions in a controlled simulator before any physical deployment.",
    validation: "Simulator reproduces the coordination failures that motivate resource-aware scheduling, with repeatable runs and logged seeds.",
    milestone: "MetaSim executes repeatable multi-node simulation experiments.",
    benchmark: "MetaSim scenario set (internal)"
  },
  {
    id: "prototype", index: 3, name: "Prototype", period: "2025", status: "Completed",
    objective: "Implement a minimal coordinator and node runtime able to discover nodes, report resources, and assign computational work.",
    validation: "Work completes end-to-end across simulated nodes on a single machine, including recovery from the failure of an individual node.",
    milestone: "First working RACoN prototype executes distributed tasks locally."
  },
  {
    id: "lan", index: 4, name: "LAN", period: "2025–2026", status: "In Progress",
    objective: "Coordinate real machines on the laboratory network with measured resource reporting and honest scheduling decisions.",
    validation: "Scheduler assignments demonstrably respect measured CPU, memory, and connectivity differences between physical nodes.",
    milestone: "Comparative scheduling experiments completed across heterogeneous simulated and physical nodes; evaluation protocol documented for the next research stage.",
    manuscripts: ["Manuscript 02 — RACoN scheduler validation (in preparation)"]
  },
  {
    id: "distributed-ai", index: 5, name: "Distributed AI", period: "2026–2027", status: "Planned",
    objective: "Introduce learning-based scheduling policies on top of the validated coordination layer.",
    validation: "Learned policies compared against classical baselines under identical, reproducible conditions.",
    milestone: "Resource-aware scheduling policy evaluated and documented."
  },
  {
    id: "security-recovery", index: 6, name: "Security & Recovery", period: "2027", status: "Planned",
    objective: "Add trust modelling, attestation, and recovery behaviour for nodes that fail, misreport, or misbehave.",
    validation: "Recovery and isolation behaviour verified under injected faults.",
    milestone: "Fault-injection suite and recovery protocol released."
  },
  {
    id: "wan", index: 7, name: "WAN", period: "2027–2028", status: "Planned",
    objective: "Extend coordination across networks with real latency, bandwidth variation, and intermittent connectivity.",
    validation: "Coordination remains correct and useful under wide-area conditions in both simulation and field tests.",
    milestone: "Wide-area deployment study completed."
  },
  {
    id: "scale", index: 8, name: "Scale", period: "2028", status: "Planned",
    objective: "Grow the coordinated pool in node count and workload diversity while studying coordinator bottlenecks.",
    validation: "Scaling limits measured and documented; coordination overhead characterised.",
    milestone: "Scaling study with published measurements."
  },
  {
    id: "public-preview", index: 9, name: "Public Preview", period: "2028–2029", status: "Planned",
    objective: "Open a stable public preview of RACoN for external nodes and workloads.",
    validation: "External users can run the documented quick start against a public release.",
    milestone: "First public release package and documentation.",
    release: "RACoN 0.1 (planned)"
  },
  {
    id: "sustainable-service", index: 10, name: "Sustainable Service", period: "2029 →", status: "Planned",
    objective: "Operate RACoN as a dependable, sustainable research service with community governance.",
    validation: "Service-level behaviour — availability, recovery, upgrade path — demonstrated over continuous operation.",
    milestone: "Long-running public service with a governance model."
  }
];

/**
 * Weekly achievement log — the laboratory appends one entry per week here.
 * No layout changes are ever required; the page renders from this data.
 */
export const weeklyAchievements: WeeklyAchievement[] = [
  {
    id: "w37-2026",
    week: 37, year: 2026, dateRange: "7–13 September",
    title: "RACoN Scheduler Validation",
    category: "Research + Engineering",
    status: "Completed",
    summary:
      "Completed baseline scheduler comparison across heterogeneous simulated compute nodes. Added experiment logging and prepared the evaluation configuration for reproducible benchmark runs.",
    detail:
      "Three scheduling strategies were executed against identical workload sets on simulated nodes with differing CPU, memory, and connectivity profiles. Every run now writes a structured experiment record — configuration snapshot, node profiles, assignment decisions, and completion timings — so future benchmark results can be reproduced exactly. The evaluation protocol for the next research stage has been documented and handed to the manuscript draft.",
    products: ["RACoN"],
    papers: ["Manuscript 02 — scheduler validation (in preparation)"],
    phase: "lan"
  },
  {
    id: "w36-2026",
    week: 36, year: 2026, dateRange: "31 August – 6 September",
    title: "Experiment Logging Infrastructure",
    category: "Engineering",
    status: "Completed",
    summary:
      "Added structured experiment logging to the RACoN prototype: configuration snapshots, node profiles, and per-assignment records are now written for every scheduler run.",
    detail:
      "Logging was previously ad hoc, which made comparing runs unreliable. Each execution now emits a single structured record, making scheduler comparisons and later publication of benchmark results straightforward and auditable.",
    products: ["RACoN"],
    phase: "lan"
  },
  {
    id: "w35-2026",
    week: 35, year: 2026, dateRange: "24–30 August",
    title: "Heterogeneous Node Profiles",
    category: "Research + Engineering",
    status: "Completed",
    summary:
      "Extended the MetaSim simulator with explicit node capability profiles so scheduling experiments run against realistic, repeatable hardware diversity.",
    detail:
      "Node profiles now specify CPU capacity, memory, and connectivity characteristics. Profile sets are versioned alongside experiment configurations, so any published result can name exactly the hardware diversity it was measured on.",
    products: ["RACoN"],
    phase: "lan"
  },
  {
    id: "w34-2026",
    week: 34, year: 2026, dateRange: "17–23 August",
    title: "Evaluation Protocol Draft",
    category: "Research",
    status: "Completed",
    summary:
      "Drafted the evaluation protocol for comparative scheduling experiments: workload sets, node profile distributions, metrics, and reporting format.",
    detail:
      "The protocol fixes how scheduler comparisons will be run and reported before results are collected, protecting the upcoming study from post-hoc selection of favourable conditions.",
    papers: ["Manuscript 02 — scheduler validation (in preparation)"],
    phase: "lan"
  }
];