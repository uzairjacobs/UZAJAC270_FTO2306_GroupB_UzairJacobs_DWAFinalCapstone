export default function Navbar() {
  return (
    <nav className="nav-bar">
      <div className="podcast-nav">
        <img className="podcast-logo" src="/podcast.png" />
        <h3 className='podcast-title'>EchoPods</h3>
      </div>

      <div className="nav-items">
        <ul>
          <li>Favourites</li>
        </ul>
      </div>
    </nav>
  );
}
