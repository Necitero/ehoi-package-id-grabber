export const Footer = ({ message }: { message?: string }) => {
  const openGithub = () => {
    chrome.tabs.create({
      url: "https://github.com/Necitero/ehoi-package-id-grabber",
    });
  };
  return (
    <footer className="footer">
      <button className="footer-cta" onClick={openGithub}>
        {message ?? "Made with ♡ by Necitero"}
      </button>
    </footer>
  );
};
