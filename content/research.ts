import type { Publication, ResearchArea } from "@/types/content";

export const researchAreas: ResearchArea[] = [
  {
    slug: "artificial-intelligence-machine-learning",
    title: "Artificial Intelligence & Machine Learning",
    short: "Learning methods for decision-making under real resource and reliability constraints.",
    description:
      "The laboratory studies learning-based methods where decisions carry operational consequences: scheduling, resource allocation, and adaptation under changing conditions. Evaluation discipline — baselines, reproducibility, and honest reporting — is treated as part of the method, not an afterthought.",
    questions: [
      "How should learned scheduling policies be evaluated against classical baselines under identical, reproducible conditions?",
      "Which resource signals are sufficient for dependable online decisions, and which add noise?",
      "When does adaptation help coordination, and when does it introduce instability?"
    ],
    projects: [
      {
        name: "RACoN — learning-based scheduling track",
        status: "Research Preview",
        description: "Evaluation of learned scheduling policies on top of the validated RACoN coordination layer."
      }
    ],
    diagram: "ml"
  },
  {
    slug: "intelligent-control-systems",
    title: "Intelligent & Control Systems",
    short: "Control-theoretic foundations for systems that must remain stable while adapting.",
    description:
      "Coordination is a control problem: decisions feed back into the system being controlled. This area develops the feedback, stability, and verification thinking that keeps adaptive coordination predictable.",
    questions: [
      "What feedback structures keep a self-adjusting scheduler from oscillating?",
      "How can control objectives be expressed alongside workload objectives?",
      "Which guarantees survive when part of the system is learned rather than designed?"
    ],
    projects: [],
    diagram: "control"
  },
  {
    slug: "distributed-computing-resource-coordination",
    title: "Distributed Computing & Resource Coordination",
    short: "Methods and architectures for coordinating computation across heterogeneous devices, networks, and changing resource conditions.",
    description:
      "The laboratory's core area and the home of RACoN. We study how pools of heterogeneous machines — differing in capability, connectivity, and trust — can be coordinated as dependable computing resources.",
    questions: [
      "Can idle and distributed compute resources be coordinated as a dependable pool?",
      "How should scheduling weigh hardware capability, network conditions, and reliability together?",
      "What does correct, verifiable task assignment look like when nodes fail or misreport?"
    ],
    projects: [
      { name: "RACoN", status: "Research Preview", description: "Resource-Aware Coordination Network — the laboratory's flagship experimental system." },
      { name: "MetaSim", status: "Prototype", description: "Simulation environment for repeatable coordination experiments." }
    ],
    diagram: "network"
  },
  {
    slug: "autonomous-automotive-systems",
    title: "Autonomous & Automotive Systems",
    short: "Coordination and reliability questions raised by autonomous and vehicle-grade computing.",
    description:
      "Autonomous platforms concentrate every difficulty the laboratory studies — hard resource limits, unreliable connectivity, safety-critical failure modes — into one setting. Work here adapts the laboratory's coordination methods to these constraints.",
    questions: [
      "How do resource-aware coordination principles transfer to constrained automotive compute platforms?",
      "What degradation behaviour is acceptable when connectivity or compute is lost?"
    ],
    projects: [],
    diagram: "automotive"
  },
  {
    slug: "trustworthy-ai-reliability-security",
    title: "Trustworthy AI, Reliability & Security",
    short: "Trust, fault tolerance, and recovery for systems that coordinate shared resources.",
    description:
      "A coordination layer that accepts work from heterogeneous machines must reason about trust: nodes that fail, misreport their capability, or misbehave. This area develops the fault-injection, recovery, and trust-modelling work in the RACoN roadmap.",
    questions: [
      "How should a coordinator treat capability reports it cannot verify?",
      "What recovery behaviour preserves both progress and fairness after node failure?"
    ],
    projects: [],
    diagram: "trust"
  }
];

/**
 * Publications & manuscripts.
 * TODO(owner): replace the draft exemplar with verified records before launch.
 * `draft: true` entries are excluded from the public build, from area counts,
 * and from the sitemap. `citations` may only ever be set by lib/citations.ts.
 */
export const publications: Publication[] = [
  {
    slug: "example-manuscript-record",
    title: "Example manuscript record",
    authors: ["Owner to replace"],
    year: 2026,
    area: "distributed-computing-resource-coordination",
    type: "Manuscript",
    status: "In Preparation",
    abstract: "Schema exemplar only. Replace or remove before production release.",
    draft: true
  }
];