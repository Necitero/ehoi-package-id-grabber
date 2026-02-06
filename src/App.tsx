import { useEffect, useState } from "react";
import "./App.css";
import { PackageSet } from "./ui/package-set";
import { Footer } from "./ui/footer";
import { Header } from "./ui/header";
import { initPackages, type Package } from "./helpers/packages";
import { getCurrentDate, getSpecialDate } from "./helpers/special";

const EHOI_URL = "e-hoi";

function App() {
  const [loading, setLoading] = useState<boolean>(true);
  const [isEhoi, setIsEhoi] = useState<boolean>();
  const [packages, setPackages] = useState<Package[] | null>(null);
  const [active, setActive] = useState<number | null>(null);

  const specialDay = getSpecialDate(getCurrentDate());

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
      setLoading(false);
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
    <div
      className="application"
      // @ts-ignore 2332
      style={specialDay ? { "--special-color": specialDay.color } : {}}
    >
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
            <p>
              {loading
                ? "Bitte warte einen Moment..."
                : "Es wurden keine Packages gefunden."}
            </p>
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
      <Footer message={specialDay?.message} />
    </div>
  );
}

export default App;
