import { useState } from "react";

export const CopyButton = ({ value }: { value: string }) => {
  const [copied, setCopied] = useState<boolean>(false);
  const copyToClipboard = () => {
    setCopied(true);
    navigator.clipboard.writeText(value);
    setTimeout(() => setCopied(false), 1000);
  };

  return (
    <button
      onClick={copyToClipboard}
      data-copied={copied}
      className="copy-button"
    >
      Kopieren
    </button>
  );
};
