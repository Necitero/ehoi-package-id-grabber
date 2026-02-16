export const Header = () => {
  return (
    <header>
      <h1>ID Grabber</h1>
      <span className="reload" onClick={() => window.location.reload()}>
        Reload
      </span>
    </header>
  );
};
