import { CopyButton } from "./copy-button";

export interface PackageSetProps {
  index: number;
  tripOption: string;
  packageId: string;
  active: boolean;
  handleActiveChange: (index: number) => void;
}

export const PackageSet = ({
  index,
  tripOption,
  packageId,
  active,
  handleActiveChange,
}: PackageSetProps) => {
  return (
    <div className="package" data-active={active}>
      <div className="package-title" onClick={() => handleActiveChange(index)}>
        {tripOption}
      </div>
      <div className="package-content">
        <p className="package-content-pair">
          <span>
            <b>Package ID:</b> {packageId}
          </span>
          <CopyButton value={packageId} />
        </p>
      </div>
    </div>
  );
};
