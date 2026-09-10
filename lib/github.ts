import { site } from "@/content/site";

export interface RepoStats {
  url: string; stars: number; forks: number; openIssues: number; latestRelease: string | null;
}

/** Cached GitHub stats. Returns null when unconfigured/unavailable — UI hides numbers rather than faking them. */
export async function getRepoStats(): Promise<RepoStats | null> {
  const repoUrl = site.racon.repo;
  if (!repoUrl) return null;
  const m = repoUrl.match(/github\.com\/([^/]+)\/([^/#?]+)/);
  if (!m) return null;
  const base = `https://api.github.com/repos/${m[1]}/${m[2]}`;
  const headers: HeadersInit = {
    Accept: "application/vnd.github+json",
    ...(process.env.GITHUB_TOKEN ? { Authorization: `Bearer ${process.env.GITHUB_TOKEN}` } : {})
  };
  try {
    const [repoRes, relRes] = await Promise.all([
      fetch(base, { headers, next: { revalidate: 3600 } }),
      fetch(`${base}/releases/latest`, { headers, next: { revalidate: 3600 } })
    ]);
    if (!repoRes.ok) return null;
    const repo = await repoRes.json();
    const latestRelease = relRes.ok ? ((await relRes.json()).tag_name ?? null) : null;
    return {
      url: repoUrl,
      stars: repo.stargazers_count ?? 0,
      forks: repo.forks_count ?? 0,
      openIssues: repo.open_issues_count ?? 0,
      latestRelease
    };
  } catch {
    return null;
  }
}