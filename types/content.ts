export interface NavLink { label: string; href: string; }

export interface SiteConfig {
  name: string; shortName: string; url: string;
  tagline: string; description: string; contactEmail: string;
  brand: { logoSrc: string | null };
  nav: NavLink[]; cta: NavLink;
  journal: { name: string; url: string | null; submitUrl: string | null; openForSubmissions: boolean };
  blog: { url: string | null };
  racon: { subdomain: string | null; repo: string | null; repoLabel: string; docsUrl: string | null; sponsorUrl: string | null; discordUrl: string | null };
  social: { github: string | null; linkedin: string | null; discord: string | null };
  donate: { url: string | null; note: string };
  newsletter: { endpoint: string | null };
  citationProvider: "none" | "openalex" | "crossref" | "semantic-scholar";
  analytics: { provider: "none" | "plausible" | "umami"; domain?: string };
}

export type UpdateType = "research" | "engineering" | "release" | "event" | "announcement" | "blog" | "workshop";
export interface LabUpdate {
  id: string; type: UpdateType; date: string; // ISO
  title: string; summary: string; href?: string; product?: string;
}

export type ProjectStatus = "Active" | "Research Preview" | "Prototype" | "Planned";
export interface ResearchArea {
  slug: string; title: string; short: string; description: string;
  questions: string[];
  projects: { name: string; status: ProjectStatus; description: string }[];
  diagram: "network" | "control" | "ml" | "automotive" | "trust";
}

export type PublicationStatus = "Preprint" | "Published" | "In Review" | "In Preparation" | "Draft";
export interface Publication {
  slug: string; title: string; authors: string[]; year: number;
  venue?: string; area: string; type: "Manuscript" | "Preprint" | "Report" | "Article";
  status: PublicationStatus; abstract: string;
  doi?: string; pdfUrl?: string; codeUrl?: string; datasetUrl?: string;
  citations?: number | null; // set ONLY by the citation adapter
  draft?: boolean;           // excluded from public build, counts, sitemap
}

export type ProductStatus = "Active" | "Research Preview" | "Prototype" | "Experimental" | "Planned" | "Archived";
export interface Product {
  slug: string; name: string; tagline: string; description: string;
  status: ProductStatus; featured?: boolean; href?: string; areas?: string[];
}

export type PhaseStatus = "Completed" | "In Progress" | "Planned";
export interface RoadmapPhase {
  id: string; index: number; name: string; period: string; status: PhaseStatus;
  objective: string; validation: string; milestone: string;
  manuscripts?: string[]; release?: string; benchmark?: string; repository?: string;
}

export interface WeeklyAchievement {
  id: string; week: number; year: number; dateRange: string;
  title: string; category: string; summary: string; detail: string;
  status: PhaseStatus;
  products?: string[]; papers?: string[]; phase?: string;
  links?: { label: string; href: string }[];
  metrics?: { label: string; value: string }[];
  image?: { src: string; alt: string };
}

export type CourseStatus = "Available" | "New" | "In Progress" | "Coming Soon" | "Archived";
export interface Course {
  slug: string; title: string; description: string; category: string;
  difficulty: "Introductory" | "Intermediate" | "Advanced";
  instructor?: string; duration?: string; lessons?: number; format: string;
  status: CourseStatus;
  objectives?: string[]; prerequisites?: string[];
  syllabus?: { module: string; lessons: { title: string; duration?: string }[] }[];
  playlistUrl?: string; resources?: { label: string; href: string }[];
  repo?: string; certificate: false | string;
}

export type MemberGroup = "Leadership" | "Research Members" | "Contributors" | "Advisors" | "Alumni";
export interface Member {
  name: string; role: string; affiliation?: string; group: MemberGroup;
  bio?: string; interests?: string[]; email?: string;
  links?: { orcid?: string; scholar?: string; github?: string; linkedin?: string; website?: string };
  portrait?: { src: string; alt: string };
}

export interface RaconRelease {
  version: string; date: string; channel: "alpha" | "beta" | "stable"; notes: string;
  assets: { os: "macOS" | "Windows x64" | "Windows ARM64" | "Linux"; href: string }[];
}
export interface InstallMethod {
  id: string; label: string; available: boolean; note?: string;
  commands?: { label: string; code: string }[];
}
export interface DocCard { slug: string; title: string; description: string; href: string | null; }
export interface Tutorial {
  title: string; topic: string; duration: string | null;
  level: "Beginner" | "Intermediate" | "Advanced";
  videoUrl: string | null; status: "Published" | "Planned";
}
export interface Testimonial { quote: string; name: string; role: string; source?: string; }