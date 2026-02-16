export async function getLatestVersion() {
  const url =
    "https://api.github.com/repos/Necitero/ehoi-package-id-grabber/releases/latest";

  try {
    const response = await fetch(url);
    if (!response.ok) throw new Error("Repo not found or no releases exist");

    const data = await response.json();
    return data.tag_name;
  } catch (error) {
    console.error("Error fetching version:", error);
  }
}

export const getLocalVersion = () => {
  return chrome.runtime.getManifest().version;
};

export const isVersionLatest = (local: string, latest: string): boolean => {
  console.log(`v${local}`, latest);
  return `v${local}` === latest;
};
