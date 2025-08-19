import { useEffect, useState } from "react";
import "./App.css";

interface PackageSet {
  name: string;
  packageId: string;
  tripId: string;
}

function App() {
  const [packages, setPackages] = useState<PackageSet[] | null>(null);
  const [active, setActive] = useState<number | null>(null);

  const handleActiveChange = (index: number) => {
    if (active === index) {
      setActive(null);
      return;
    }
    setActive(index);
  };

  useEffect(() => {
    (async () => {
      const [tab] = await chrome.tabs.query({
        active: true,
        currentWindow: true,
      });
      if (!tab?.id) return;
      const [injection] = await chrome.scripting.executeScript({
        target: { tabId: tab.id },
        func: () => {
          const pkgSets: PackageSet[] = [];
          const rows =
            document.querySelectorAll<HTMLElement>(".row.termin.sub");
          if (!rows) return null;
          for (const row of rows) {
            const { tripid, packageid } = row.dataset;
            const title = row.querySelector(".title");
            const exists = pkgSets.find(
              (pkgSet) => pkgSet.packageId === packageid,
            );

            if (tripid && packageid && title && !exists) {
              pkgSets.push({
                name: title.childNodes[0].textContent || "",
                tripId: tripid,
                packageId: packageid,
              });
            }
          }
          return pkgSets;
        },
      });

      setPackages(injection?.result ?? null);
    })();
  }, []);

  return (
    <div>
      <div className="reload-area">
        <span className="reload" onClick={() => window.location.reload()}>
          Reload
        </span>
      </div>
      <h1>ID Grabber</h1>
      <hr />
      <h2>Gefundene IDs:</h2>
      <br />
      {!packages ? (
        <p>Es wurden keine Packages gefunden.</p>
      ) : (
        packages.map((pk: PackageSet, index: number) => {
          const { name, packageId, tripId } = pk;
          return (
            <div
              className="accordion"
              key={index}
              data-active={(index === active).toString()}
            >
              <div
                className="accordion-title"
                onClick={() => handleActiveChange(index)}
              >
                {name}
              </div>
              <div className="accordion-content">
                <p>
                  <b>Package ID:</b> {packageId}
                </p>
                <p>
                  <b>Trip ID:</b> {tripId}
                </p>
              </div>
            </div>
          );
        })
      )}
    </div>
  );
}

export default App;
