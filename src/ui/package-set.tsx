import { CopyButton } from "./copy-button";

export interface PackageSetProps {
  index: number;
  name: string;
  packageId: string;
  tripId: string;
  active: boolean;
  handleActiveChange: (index: number) => void;
}

export const PackageSet = ({
  index,
  name,
  packageId,
  tripId,
  active,
  handleActiveChange,
}: PackageSetProps) => {
  return (
    <div className="package" data-active={active}>
      <div className="package-title" onClick={() => handleActiveChange(index)}>
        {name}
      </div>
      <div className="package-content">
        <p className="package-content-pair">
          <span>
            <b>Package ID:</b> {packageId}
          </span>
          <CopyButton value={packageId} />
        </p>
        <p className="package-content-pair">
          <span>
            <b>Trip ID:</b> {tripId}
          </span>
          <CopyButton value={tripId} />
        </p>
      </div>
    </div>
  );
};
