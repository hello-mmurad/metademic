import { site } from "@/content/site";
import type { DocCard, InstallMethod, RaconRelease, Tutorial } from "@/types/content";

export const raconStatusBadges = ["Research Prototype", "Alpha", "Experimental"];

export const raconReleases: RaconRelease[] = [];
// TODO(owner): append real releases. Until then the Download section shows
// "Release package not yet published." — assets are never invented.

export const raconInstall: InstallMethod[] = [
  { id: "desktop", label: "Desktop", available: false, note: "Release package not yet published. Desktop builds arrive with the first public release." },
  { id: "one-line", label: "One-line Install", available: false, note: "Release package not yet published. The install script will appear here with the first public release." },
  { id: "package", label: "Package Manager", available: false, note: "Package publication is planned alongside the first public release." },
  {
    id: "source",
    label: "Build from Source",
    available: Boolean(site.racon.repo),
    note: site.racon.repo
      ? "Build instructions for your platform are provided in the repository README."
      : "The RACoN repository will be published as the prototype stabilises.",
    commands: site.racon.repo
      ? [{ label: "Clone the repository", code: `git clone ${site.racon.repo}.git\ncd racon` }]
      : undefined
  }
];

export const raconDocs: DocCard[] = [
  { slug: "getting-started", title: "Getting Started", description: "Install RACoN, start a coordinator, and join your first node.", href: null },
  { slug: "architecture", title: "Architecture", description: "The three responsibilities: discovery and reporting, scheduling, and verified execution.", href: null },
  { slug: "node-setup", title: "Node Setup", description: "Preparing a machine to join a coordination pool.", href: null },
  { slug: "coordinator", title: "Coordinator", description: "Running and configuring the coordination service.", href: null },
  { slug: "scheduling", title: "Scheduling", description: "How resource-aware assignment decisions are made and evaluated.", href: null },
  { slug: "network-model", title: "Network Model", description: "Latency, bandwidth, and connectivity in RACoN's decisions.", href: null },
  { slug: "security", title: "Security", description: "Trust modelling and recovery behaviour for unreliable nodes.", href: null },
  { slug: "cli-reference", title: "CLI Reference", description: "Every command the node runtime and coordinator accept.", href: null },
  { slug: "developer-guide", title: "Developer Guide", description: "Building, testing, and extending the prototype.", href: null },
  { slug: "api-reference", title: "API Reference", description: "Programmatic interfaces exposed by the coordinator.", href: null },
  { slug: "contributing", title: "Contributing", description: "How to propose changes and submit reproducible experiments.", href: null }
].map(d => ({ ...d, href: site.racon.docsUrl ? `${site.racon.docsUrl}/${d.slug}` : null }));
// TODO(owner): set NEXT_PUBLIC_RACON_DOCS_URL to link cards to the live docs site.

export const raconTutorials: Tutorial[] = [
  { title: "Understanding the RACoN Architecture", topic: "Architecture", duration: null, level: "Beginner", videoUrl: null, status: "Planned" },
  { title: "Installing a RACoN Development Node", topic: "Setup", duration: null, level: "Beginner", videoUrl: null, status: "Planned" },
  { title: "Running the Simulator", topic: "Simulation", duration: null, level: "Beginner", videoUrl: null, status: "Planned" },
  { title: "Testing a Local Multi-Node Network", topic: "Networking", duration: null, level: "Intermediate", videoUrl: null, status: "Planned" },
  { title: "Understanding Resource-Aware Scheduling", topic: "Scheduling", duration: null, level: "Intermediate", videoUrl: null, status: "Planned" }
];
// TODO(owner): add videoUrl values when tutorials are published; planned
// entries visibly state "Video in preparation" and never link anywhere fake.