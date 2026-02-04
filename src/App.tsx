import { useEffect, useState } from "react";
import "./App.css";
import { PackageSet } from "./ui/package-set";
import { Footer } from "./ui/footer";
import { Header } from "./ui/header";
import { initPackages, type Package } from "./helpers/packages";

const EHOI_URL = "e-hoi";

function App() {
  const [isEhoi, setIsEhoi] = useState<boolean>();
  const [packages, setPackages] = useState<Package[] | null>(null);
  const [active, setActive] = useState<number | null>(null);

  useEffect(() => {
    (async () => {
      const [tab] = await chrome.tabs.query({
        active: true,
        currentWindow: true,
      });
      setIsEhoi(tab.url?.includes(EHOI_URL) || isEhoi);
      if (!tab?.id) return;

      const [injection] = await chrome.scripting.executeScript({
        target: { tabId: tab.id },
        func: initPackages,
      });

      setPackages(injection?.result ?? null);
    })();
  }, []);

  const handleActiveChange = (index: number) => {
    if (active === index) {
      setActive(null);
      return;
    }
    setActive(index);
  };

  return (
    <div className="application">
      <Header />

      <div className="content">
        {!packages || packages?.length < 1 ? (
          <>
            {!isEhoi && (
              <p>
                <b>
                  Du bist auf keiner e-hoi Seite. Diese Erweiterung funktioniert
                  hier leider nicht
                </b>
              </p>
            )}
            <p>Es wurden keine Packages gefunden.</p>
          </>
        ) : (
          <>
            <h2>Gefundene IDs:</h2>
            {packages.map((pk: Package, index: number) => {
              return (
                <PackageSet
                  {...pk}
                  key={index}
                  index={index}
                  active={index === active}
                  handleActiveChange={handleActiveChange}
                />
              );
            })}
          </>
        )}
      </div>
      <Footer />
    </div>
  );
}

export default App;
