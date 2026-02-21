import type { PackageSetProps } from "../ui/package-set";

type Price = {
  PRICE: number;
  PRICEFORMATTED: string;
};
type FetchedOptionData = {
  BESTPRICES: Record<string, Price>;
  LEISTUNGEN_HTML: string;
  TERMINE_HTML: string;
};
export type Package = Pick<
  PackageSetProps,
  "tripOption" | "packageId" | "tripId"
>;
type E = HTMLElement;

export const initPackages = async (): Promise<Package[] | undefined> => {
  // Selectors
  const SUBROW = ".row.termin.sub";
  const PRICE_MATRIX = ".pricematrix-container";
  const TRIP_OPTIONS = ".pricematrix-reiseoptionen label";
  const ACTIVE_TRIP_OPTION = `${TRIP_OPTIONS} input[checked]`;

  // Elements
  const tripOptions = document.querySelectorAll<E>(TRIP_OPTIONS);
  const rows = document.querySelectorAll<E>(SUBROW);
  const priceMatrix = document.querySelector<E>(PRICE_MATRIX);
  const tripOption = document.querySelector<E>(ACTIVE_TRIP_OPTION);
  if (!rows || !priceMatrix || !tripOption) return undefined;
  const { routeplanid } = priceMatrix.dataset;
  if (!routeplanid) return undefined;

  // Get Options Data
  const parseData = (
    html: string,
  ): Pick<PackageSetProps, "packageId" | "tripId"> | undefined => {
    const doc = new DOMParser().parseFromString(html, "text/html");

    const row = doc.querySelector<E>(
      ".row.termin.sub.align-items-center[data-tripid][data-packageid]",
    );
    if (!row) return undefined;
    const { tripid, packageid } = row.dataset;
    if (!tripid || !packageid) return undefined;
    return { tripId: tripid, packageId: packageid };
  };

  // Fetch all trip type options
  async function fetchOptions(tripValue: number): Promise<FetchedOptionData> {
    const location = window.location;
    const url = new URL(`${location.protocol}//${location.host}/`);
    url.searchParams.set("fuseaction", "mod_pricematrix.showpricematrix");
    url.searchParams.set("age1", "35");
    url.searchParams.set("age2", "35");
    url.searchParams.set("age3", "0");
    url.searchParams.set("age4", "0");
    url.searchParams.set("initial", "1");
    url.searchParams.set("routeplanid", routeplanid!);
    url.searchParams.set("source", "search");
    url.searchParams.set("anreise", String(tripValue));
    url.searchParams.set("version", "2");
    url.searchParams.set("_", String(Date.now()));

    const res = await fetch(url.toString(), {
      credentials: "include",
      headers: {
        "x-requested-with": "XMLHttpRequest",
        accept: "application/json, text/plain, */*",
      },
    });

    return res.json();
  }

  // Get all results and map data
  const results = await Promise.all(
    Array.from(tripOptions).map(async (option, i) => {
      const options = await fetchOptions(i + 1);
      if (!options) return null;
      const data = parseData(options.TERMINE_HTML);
      if (!data) return null;

      return {
        tripOption: option.textContent ?? "Unbekannt",
        tripId: data.tripId,
        packageId: data.packageId,
      } satisfies Package;
    }),
  );

  if (!results[0]) {
    // If results are empty, try fallback collection
    const fallback = parseData(document.body.innerHTML);
    const date = document.querySelector(
      ".pricematrix-container .optionen label",
    )?.textContent;
    if (!fallback || !date) return;
    const pkgSet: Package = {
      tripOption: date,
      tripId: fallback.tripId,
      packageId: fallback.packageId,
    };
    return [pkgSet];
  } else {
    // Filter incorrect data
    const pkgSets: Package[] = results.filter((p): p is Package => p !== null);
    return pkgSets;
  }
};
