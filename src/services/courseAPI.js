import fetcher from "./fetcher";

const courseAPI = {
  // call api lấy danh mục khóa học
  getCourse: () => {
    return fetcher.get("QuanLyKhoaHoc/LayDanhMucKhoaHoc");
  },

  // lấy danh sách khóa học theo tìm kiếm
  getCourseList: (searchParam) => {
    return fetcher.get("QuanLyKhoaHoc/LayDanhSachKhoaHoc", {
      params: {
        tenKhoaHoc: searchParam,
      },
    });
  },

  // call api lấy danh sách khóa học theo trang
  getCourseListByPage: () => {
    return fetcher.get("QuanLyKhoaHoc/LayDanhSachKhoaHoc_PhanTrang", {
      params: {
        pageSize: "8",
      },
    });
  },

  // call api lấy danh sách khóa học theo danh mục
  getCourseCatalog: (maDanhMuc) => {
    return fetcher.get("QuanLyKhoaHoc/LayKhoaHocTheoDanhMuc", {
      params: {
        maDanhMuc,
        MaNhom: "GP01",
      },
    });
  },

  // call api chi tiết khóa học
  getCourseDetail: (maKhoaHoc) => {
    return fetcher.get("QuanLyKhoaHoc/LayThongTinKhoaHoc", {
      params: {
        maKhoaHoc,
      },
    });
  },

  // call api đăng ký khóa học
  courseRegister: (value) => {
    return fetcher.post("QuanLyKhoaHoc/DangKyKhoaHoc", value);
  },

  // call api hủy khóa học
  deleteCourse: (values) => {
    return fetcher.post("QuanLyKhoaHoc/HuyGhiDanh", values);
  },
};

export default courseAPI;
