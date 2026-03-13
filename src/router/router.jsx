import { createHashRouter } from "react-router";
import FrontLayout from "../layout/FrontLayout";
import Home from "../view/front/home";
import Login from "../view/front/Login";
import AdminLayout from "../layout/AdminLayout";
import Management from "../view/admin/Management";
import Detail from "../view/front/Detail";
import NotFound from "../view/front/NotFound";
import Dashboard from "../view/front/dashboard";

export const router = createHashRouter([
  {
    path: "/",
    element: <FrontLayout />,
    children: [
      { index: true, element: <Home /> }, //首頁(含搜尋)
      { path: "detail/:id", element: <Detail /> }, //項目詳細內容(暫時用不到)
      { path: "login", element: <Login /> }, //登入畫面
      { path: "dashboard", element: <Dashboard /> }, //儀表板
    ],
  },
  {
    path: "/admin",
    element: <AdminLayout />,
    children: [{ path: "management", element: <Management /> }], //後台管理頁面
  },
  {
    path: "*",
    element: <NotFound />,
  },
]);
