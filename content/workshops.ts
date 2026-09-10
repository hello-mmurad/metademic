import type { Course } from "@/types/content";

export const workshops: Course[] = [
  {
    slug: "ai-bootcamp",
    title: "MetaDemic AI Bootcamp",
    description:
      "A free, practical introduction to building and evaluating AI systems: from problem framing and data handling to training, evaluation, and honest reporting of results.",
    category: "AI Bootcamps",
    difficulty: "Introductory",
    format: "Video lessons with guided exercises",
    status: "In Progress",
    objectives: [
      "Frame a research or engineering problem as a tractable learning task",
      "Build, train, and evaluate baseline models with reproducible setups",
      "Report results with appropriate baselines, ablations, and limitations"
    ],
    prerequisites: ["Comfort with Python basics", "No prior machine-learning experience required"],
    certificate: false
  },
  {
    slug: "research-foundations",
    title: "Research Foundations",
    description:
      "How research questions are formed, refined, and tested — reading literature, identifying gaps, and designing work that produces trustworthy answers.",
    category: "Research Foundations",
    difficulty: "Introductory",
    format: "Video lessons with reading guides",
    status: "Coming Soon",
    certificate: false
  },
  {
    slug: "academic-writing",
    title: "Academic Writing for Technical Audiences",
    description:
      "Structure, clarity, and precision for technical manuscripts: organising arguments, presenting evidence, and writing methods sections that others can reproduce.",
    category: "Academic Writing",
    difficulty: "Intermediate",
    format: "Video lessons with annotated examples",
    status: "Coming Soon",
    certificate: false
  }
];

export const workshopCategories = [
  "Research Foundations", "Academic Writing", "Research Methods",
  "Artificial Intelligence", "Machine Learning", "Intelligent Systems",
  "Control Systems", "Distributed Computing", "Engineering Tools", "AI Bootcamps"
];