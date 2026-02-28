const NAV_ITEMS = ['Articles', 'AI & The Future', 'Observations', 'Predictions', 'About'];

function Navbar({ compact }) {
  return (
    <nav className={`navbar ${compact ? 'navbar--compact' : ''}`}>
      <div className="navbar__logo">A|I</div>
      <div className="navbar__menu">
        {NAV_ITEMS.map((item) => (
          <button
            className="nav-btn"
            type="button"
            key={item}
            onClick={() => window.history.pushState({}, '', `/${item.toLowerCase().replace(/[^a-z0-9]+/g, '-')}`)}
          >
            {item}
          </button>
        ))}
      </div>
    </nav>
  );
}

export default Navbar;
export { NAV_ITEMS };
