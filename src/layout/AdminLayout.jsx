//後端頁面骨架
import { Link, Outlet } from "react-router";

function AdminLayout() {
  return (
    <>
      <header>後台</header>
      <main>
        <Outlet />
      </main>
      <footer>2026 蘇茂雄</footer>
    </>
  );
}

export default AdminLayout;
