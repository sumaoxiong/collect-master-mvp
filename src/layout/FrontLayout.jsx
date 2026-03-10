//前端頁面骨架
import { Link, Outlet } from "react-router";

function FrontLayout() {
  return (
    <>
      <header>
        <ul className="nav">
          <li className="nav-item">
            <Link className="nav-link">logo</Link>
          </li>
          <li className="nav-item">
            <Link className="nav-link">home</Link>
          </li>
          <li className="nav-item">
            <Link className="nav-link">dashboard</Link>
          </li>
          <li className="nav-item">
            <Link className="nav-link">login</Link>
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
