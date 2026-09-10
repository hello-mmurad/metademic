import type { LabUpdate } from "@/types/content";

export const updates: LabUpdate[] = [
  {
    id: "u-w37-scheduler",
    type: "research",
    date: "2026-09-10",
    title: "RACoN scheduler validation completed",
    summary:
      "Baseline comparison of scheduling strategies across heterogeneous simulated compute nodes is complete, with structured experiment logging and a reproducible evaluation configuration.",
    href: "/roadmap",
    product: "RACoN"
  },
  {
    id: "u-w35-metasim",
    type: "engineering",
    date: "2026-09-03",
    title: "MetaSim adds heterogeneous node profiles",
    summary:
      "The laboratory simulator now models explicit CPU, memory, and connectivity profiles, so scheduling experiments run against realistic and repeatable hardware diversity.",
    href: "/roadmap",
    product: "RACoN"
  },
  {
    id: "u-journal-cfp",
    type: "announcement",
    date: "2026-08-28",
    title: "Metademic Journal opens call for manuscripts",
    summary:
      "The journal invites rigorous work across intelligent systems, computing, engineering, and emerging interdisciplinary research.",
    href: "/research#journal"
  },
  {
    id: "u-eval-protocol",
    type: "research",
    date: "2026-08-24",
    title: "Evaluation protocol drafted for scheduling experiments",
    summary:
      "Workload sets, node profile distributions, metrics, and the reporting format for comparative scheduling experiments are now documented.",
    href: "/roadmap"
  },
  {
    id: "u-workshop-bootcamp",
    type: "workshop",
    date: "2026-08-20",
    title: "MetaDemic Workshop prepares first free AI bootcamp",
    summary:
      "A practical, free introduction to building and evaluating AI systems is in development, with modules in final review.",
    href: "/learn"
  },
  {
    id: "u-lan-testing",
    type: "engineering",
    date: "2026-08-12",
    title: "RACoN begins local multi-node testing on the laboratory network",
    summary:
      "The prototype moves from simulation to physical machines on the lab LAN, with measured resource reporting on every node.",
    href: "/roadmap",
    product: "RACoN"
  }
];