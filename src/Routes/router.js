import { createBrowserRouter } from "react-router-dom";
import RootLayOut from "../components/RootLayout/RootLayOut";
import RouterProtected from "./RoutesProtected";
// import Login from "../modules/Auth/Login/Login";
// import Register from "../modules/Auth/Register/Register";
// import UserInformation from "../modules/Auth/UserInfomation/UserInformation";
// import CourseCatalog from "../modules/CourseCatalog/CourseCatalog";
// import CourseDetail from "../modules/CourseDetail/CourseDetail";
// import Home from "../modules/Home";
// import SearchCourse from "../modules/SearchCourse/SearchCourse";

import { lazy } from "react";

const Home = lazy(() => import("../modules/Home"));
const Login = lazy(() => import("../modules/Auth/Login/Login"));
const Register = lazy(() => import("../modules/Auth/Register/Register"));
const UserInformation = lazy(() =>
  import("../modules/Auth/UserInfomation/UserInformation")
);
const CourseCatalog = lazy(() =>
  import("../modules/CourseCatalog/CourseCatalog")
);
const CourseDetail = lazy(() => import("../modules/CourseDetail/CourseDetail"));
const SearchCourse = lazy(() => import("../modules/SearchCourse/SearchCourse"));

const router = createBrowserRouter([
  {
    path: "/",
    element: <RootLayOut />,
    children: [
      //home page
      { index: true, element: <Home /> },
      // authentication
      { path: "/dangNhap", element: <Login /> },
      { path: "/dangKy", element: <Register /> },
      {
        path: "/thongTinNguoiDung",
        element: (
          <RouterProtected>
            <UserInformation />
          </RouterProtected>
        ),
      },
      // Course Catalog
      { path: "/DanhMucKhoaHoc", element: <CourseCatalog /> },
      //Course detail
      { path: "/chiTiet/:maKhoaHoc", element: <CourseDetail /> },
      // Search course
      { path: "/TimKiemKhoaHoc", element: <SearchCourse /> },
    ],
  },
]);

export default router;
