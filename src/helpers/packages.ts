import type { PackageSetProps } from "../ui/package-set";

export type Package = Pick<PackageSetProps, "name" | "packageId" | "tripId">;
type E = HTMLElement;

export const initPackages = () => {
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
