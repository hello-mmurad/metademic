import type { Product } from "@/types/content";

export const products: Product[] = [
  {
    slug: "racon",
    name: "RACoN",
    tagline: "Resource-Aware Coordination Network",
    description:
      "An experimental coordination layer for discovering, evaluating, and assigning computational workloads across heterogeneous machines.",
    status: "Research Preview",
    featured: true,
    href: "/products/racon",
    areas: ["distributed-computing-resource-coordination", "artificial-intelligence-machine-learning"]
  },
  {
    slug: "metasim",
    name: "MetaSim",
    tagline: "Coordination research simulator",
    description:
      "The laboratory's simulation environment for repeatable experiments across heterogeneous nodes, workloads, and changing network conditions. MetaSim grounds RACoN scheduling research in reproducible evaluation.",
    status: "Prototype",
    areas: ["distributed-computing-resource-coordination"]
  },
  {
    slug: "benchmark-suite",
    name: "Metademic Benchmark Suite",
    tagline: "Reproducible coordination benchmarks",
    description:
      "A planned benchmark package covering scheduler quality, resource-awareness, and recovery behaviour, released together with documented evaluation protocols.",
    status: "Planned",
    areas: ["distributed-computing-resource-coordination"]
  }
];