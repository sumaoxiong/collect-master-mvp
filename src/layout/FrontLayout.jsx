//前端頁面骨架
import { Link, Outlet } from "react-router";

function FrontLayout() {
  return (
    <>
      <header>
        <ul className="nav">
          <li className="nav-item">
            <Link className="nav-link" to="/">
              logo
            </Link>
          </li>
          <li className="nav-item">
            <Link className="nav-link" to="/">
              home
            </Link>
          </li>
          <li className="nav-item">
            <Link className="nav-link" to="">
              dashboard
            </Link>
          </li>
          <li className="nav-item">
            <Link className="nav-link" to="/admin/management">
              後台
            </Link>
          </li>
        </ul>
      </header>
      <main>
        <Outlet />
      </main>
      <footer>2026 蘇茂雄</footer>
    </>
  );
}

export default FrontLayout;
