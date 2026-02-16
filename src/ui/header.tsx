import { useEffect, useState } from "react";
import {
  getLatestVersion,
  getLocalVersion,
  isVersionLatest,
} from "../helpers/version";

export const Header = () => {
  const [isLatest, setIsLatest] = useState<boolean>(true);
  useEffect(() => {
    getLatestVersion().then((version) => {
      const localVersion = getLocalVersion();
      setIsLatest(isVersionLatest(localVersion, version));
    });
  }, []);

  return (
    <header>
      <h1>ID Grabber</h1>
      <span>{isLatest ? ":)" : ":("}</span>
      <span className="reload" onClick={() => window.location.reload()}>
        Reload
      </span>
    </header>
  );
};
