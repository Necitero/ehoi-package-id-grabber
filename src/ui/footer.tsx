export const Footer = () => {
  const openGithub = () => {
    chrome.tabs.create({
      url: "https://github.com/Necitero/ehoi-package-id-grabber",
    });
  };
  return (
    <footer className="footer">
      <button className="footer-cta" onClick={openGithub}>
        Made with &#9825; by Necitero
      </button>
    </footer>
  );
};
