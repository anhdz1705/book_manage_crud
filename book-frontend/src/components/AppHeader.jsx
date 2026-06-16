import { useState } from "react";
import { ChevronDownIcon, LogOutIcon, UserIcon } from "./Icons";

function AppHeader({ username, onLogout }) {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const displayName = username || "Profile";
  const avatarLabel = displayName.charAt(0).toUpperCase();

  const handleLogout = () => {
    setIsMenuOpen(false);
    onLogout();
  };

  return (
    <header className="page-header">
      <h1>Book Management</h1>

      <div className="profile-menu">
        <button
          className={`profile-button ${isMenuOpen ? "is-open" : ""}`}
          type="button"
          aria-expanded={isMenuOpen}
          onClick={() => setIsMenuOpen((current) => !current)}
        >
          <span className="profile-avatar">{avatarLabel}</span>
          <span className="profile-name">{displayName}</span>
          <span className="profile-chevron">
            <ChevronDownIcon />
          </span>
        </button>

        {isMenuOpen && (
          <div className="profile-dropdown" role="menu">
            <div className="profile-dropdown-header">
              <span className="profile-avatar profile-avatar-sm">
                {avatarLabel}
              </span>
              <div>
                <strong>{displayName}</strong>
                <span>Signed in</span>
              </div>
            </div>

            <button className="menu-item coming-soon" type="button" disabled>
              <span className="menu-item-main">
                <UserIcon />
                <span>Hồ sơ của tôi</span>
              </span>
              <span className="coming-soon-badge">Coming soon</span>
            </button>

            <button className="menu-item danger" type="button" onClick={handleLogout}>
              <span className="menu-item-main">
                <LogOutIcon />
                <span>Logout</span>
              </span>
            </button>
          </div>
        )}
      </div>
    </header>
  );
}

export default AppHeader;
