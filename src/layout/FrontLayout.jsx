import { Link, NavLink, Outlet } from "react-router";
import "../assets/style.css";

function FrontLayout() {
  return (
    <div className="front-layout">
      <header className="site-header py-3">
        <div className="container">
          <nav className="glass-navbar d-flex flex-wrap align-items-center justify-content-between gap-3 px-3 px-lg-4 py-3">
            {/* 左側 logo */}
            <Link to="/" className="brand-logo text-decoration-none">
              <span className="brand-logo-circle">logo</span>
            </Link>

            {/* 中間 nav */}
            <div className="nav-center d-flex flex-wrap align-items-center justify-content-center gap-2 gap-lg-3">
              <NavLink
                to="/"
                end
                className={({ isActive }) =>
                  `nav-glass-link ${isActive ? "active" : ""}`
                }
              >
                首頁
              </NavLink>

              <NavLink
                to="/dashboard"
                className={({ isActive }) =>
                  `nav-glass-link ${isActive ? "active" : ""}`
                }
              >
                儀表板
              </NavLink>
            </div>

            {/* 右側後台 */}
            <div className="nav-right d-flex align-items-center">
              <NavLink
                to="/admin/management"
                className={({ isActive }) =>
                  `nav-glass-link nav-admin-link ${isActive ? "active" : ""}`
                }
              >
                後台
              </NavLink>
            </div>
          </nav>
        </div>
      </header>

      <main className="site-main">
        <Outlet />
      </main>

      <footer className="site-footer py-4">
        <div className="container">
          <div className="glass-footer text-center py-3 px-3">2026 蘇茂雄</div>
        </div>
      </footer>
    </div>
  );
}

export default FrontLayout;
