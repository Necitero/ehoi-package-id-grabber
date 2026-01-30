import { useEffect, useState } from "react";
import "./App.css";
import { PackageSet, type PackageSetProps } from "./ui/package-set";
import { Footer } from "./ui/footer";
import { Header } from "./ui/header";

type E = HTMLElement;
type Package = Pick<PackageSetProps, "name" | "packageId" | "tripId">;

const funcCallback = () => {
  const pkgSets: Package[] = [];
  const SUBROW = ".row.termin.sub";
  const MAINROW = ".row.termin.main";
  const SUBSTITUTE_NAME = "Paketname konnte nicht gefunden werden.";

  const rows = document.querySelectorAll<E>(SUBROW);
  const mainRow = document.querySelector<E>(MAINROW);
  const mainTitle = mainRow?.children[0]?.textContent;
  if (!rows) return null;

  // High possibility the title is a date if it's only one
  if (rows.length === 1) {
    const regex = new RegExp(/([0-9]{2}\.){2}[0-9]{4}/);
    const title = rows[0].querySelector(".title");
    const { tripid, packageid } = rows[0].dataset;
    if (!title || !tripid || !packageid) {
      return;
    }
    const match = regex.exec(title.childNodes[0].textContent || "");
    let name = "";
    // If name is date, use main row title
    if (match) {
      name = mainTitle || SUBSTITUTE_NAME;
    } else {
      name = title.childNodes[0].textContent || "Could ";
    }
    pkgSets.push({
      name,
      tripId: tripid,
      packageId: packageid,
    });
  }

  for (const row of rows) {
    const { tripid, packageid } = row.dataset;
    const title = row.querySelector(".title");
    const exists = pkgSets.find((pkgSet) => pkgSet.packageId === packageid);

    if (tripid && packageid && title && !exists) {
      pkgSets.push({
        name: title.childNodes[0].textContent || SUBSTITUTE_NAME,
        tripId: tripid,
        packageId: packageid,
      });
    }
  }
  return pkgSets;
};

function App() {
  const [packages, setPackages] = useState<Package[] | null>(null);
  const [active, setActive] = useState<number | null>(null);

  useEffect(() => {
    (async () => {
      const [tab] = await chrome.tabs.query({
        active: true,
        currentWindow: true,
      });
      if (!tab?.id) return;

      const [injection] = await chrome.scripting.executeScript({
        target: { tabId: tab.id },
        func: funcCallback,
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
        {!packages ? (
          <p>Es wurden keine Packages gefunden.</p>
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
