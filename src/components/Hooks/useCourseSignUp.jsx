import { useSelector } from "react-redux";
import swal from "sweetalert";
import courseAPI from "../../services/courseAPI";
import { useNavigate } from "react-router-dom";

export const useCourseSignUp = () => {
  const { user } = useSelector((state) => state.AuthSlice);
  const navigate = useNavigate();

  async function handleCourseRegister(currenUrl, maKhoaHoc, maDanhMuc) {
    const url = `/dangNhap?redirectURL=${currenUrl}?MaDanhMuc=${maDanhMuc}`;
    const payload = {
      maKhoaHoc,
      taiKhoan: user?.taiKhoan,
    };
    // kiểm tra đăng nhập
    if (!user) {
      swal({
        text: "Vui lòng đăng nhập",
        icon: "warning",
        buttons: ["Không muốn", "Okie"],
      }).then((response) => {
        if (response) {
          //chuyển trang danh mục khóa học
          if (currenUrl && maDanhMuc) {
            navigate(url);
          } else if (currenUrl && maKhoaHoc) {
            // chuyển trang chi tiết
            navigate(`/dangNhap?redirectURL=${currenUrl}`);
          } else {
            navigate("/dangNhap");
          }
        }
      });
    } else {
      //  nếu đã đăng nhập thì tiến hành call api đăng ký
      try {
        await courseAPI.courseRegister(payload);
        swal({
          text: "Đăng ký khóa học thành công",
          icon: "success",
          button: true,
        });
      } catch (error) {
        // call thất bại ==> show lỗi
        swal({
          text: error,
          icon: "warning",
          button: true,
          dangerMode: true,
        });
      }
    }
  }

  return handleCourseRegister;
};
