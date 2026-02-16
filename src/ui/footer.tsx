import { useEffect, useState } from "react";
import {
  getLatestVersion,
  getLocalVersion,
  isVersionLatest,
} from "../helpers/version";

export const Footer = ({ message }: { message?: string }) => {
  const openGithub = () => {
    chrome.tabs.create({
      url: "https://github.com/Necitero/ehoi-package-id-grabber",
    });
  };
  const [isLatest, setIsLatest] = useState<boolean>(true);
  useEffect(() => {
    getLatestVersion().then((version) => {
      const localVersion = getLocalVersion();
      setIsLatest(isVersionLatest(localVersion, version));
    });
  }, []);

  return (
    <footer className="footer">
      <button className="footer-cta" onClick={openGithub}>
        {message ?? "Made with ♡ by Necitero"}
        {!isLatest && (
          <>
            <br />
            <span>Neue Version verfügbar</span>
          </>
        )}
      </button>
    </footer>
  );
};
