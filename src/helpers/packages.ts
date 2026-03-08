import type { PackageSetProps } from "../ui/package-set";

export type Package = Pick<PackageSetProps, "tripOption" | "packageId">;

export const initPackages = (): Array<Package> => {
  // Selectors
  const PARENT = ".inklusivleistungen-module";
  const WRAPPING = ".package";
  const TITLE = "h5";
  const TITLE_STRING_REMOVE = /(Anreise:|Paket:)/gm;

  // Format title
  function formatTitle(title: string): string {
    return title.replace(TITLE_STRING_REMOVE, "");
  }
  // Format package id
  function formatPackageName(name: string): string {
    return name.split("-")[1];
  }

  // Get data
  function getPackageData(packageElement: HTMLElement): Package | undefined {
    const classes = packageElement.classList;
    const packageName = Object.values(classes).find((cls) =>
      cls.includes("package-"),
    );
    const title = packageElement.querySelector(TITLE)?.textContent;
    if (!title || !packageName) return;
    const fTitle = formatTitle(title);
    const packageId = formatPackageName(packageName);
    return { tripOption: fTitle, packageId };
  }

  // Elements
  const parentEl = document.querySelector(PARENT);
  const packageWrappers = parentEl?.querySelectorAll(WRAPPING);
  if (!parentEl || !packageWrappers) return [];
  const pkgSets: Array<Package> = [];
  packageWrappers.forEach((pkg) => {
    const data = getPackageData(pkg as HTMLElement);
    if (data) pkgSets.push(data);
  });

  return pkgSets;
};
