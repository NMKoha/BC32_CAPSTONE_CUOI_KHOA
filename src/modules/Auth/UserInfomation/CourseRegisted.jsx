import React, { useState, useEffect } from "react";
// material ui
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
// icons
import { BsFillStarFill, BsStarHalf } from "react-icons/bs";
// axios
import authAPI from "../../../services/authAPI";
import courseAPI from "../../../services/courseAPI";
// my hooks
import Pagination from "../../../components/Pagination/Pagination";
// sweet alert
import swal from "sweetalert";
// redux
import { useSelector } from "react-redux";
const CourseRegisted = () => {
  const [courses, setCourses] = useState([]); // state array khóa học đã đăng ký làm cột mốc để tìm kiếm
  const [searchCourse, setsearchCourse] = useState([]); // state array khóa học đã đăng ký để render ra giao diện
  const { user } = useSelector((state) => state.AuthSlice); // redux user
  //   paginate variable
  const [currentPage, setCurrentPage] = useState(1); // stata giá trị trang hiện tại của thanh pagination
  const itemPerPage = 2; // số lượng item mỗi trang
  const indexOfLastItem = currentPage * itemPerPage; // index của phần tử cuối cùng trong mảng
  const indexOfFirstItem = indexOfLastItem - itemPerPage; // index của phần tử đâu tiên trong mảng
  const currentPageItems = searchCourse.slice(
    indexOfFirstItem,
    indexOfLastItem
  ); // số item hiện tại của trang
  const totalPageNumber = Math.ceil(searchCourse.length / itemPerPage);

  // hàm thay đổi số trang hiện tại
  const handleChangeCurrenPage = (number) => {
    setCurrentPage(number);
  };

  // hàm next trang tiếp theo
  const handleNextBtn = () => {
    if (currentPage === totalPageNumber) return;
    setCurrentPage((state) => state + 1);
  };
  // hàm prev  trang trước
  const handlePrevBtn = () => {
    if (currentPage === 1) return;
    setCurrentPage((state) => state - 1);
  };

  // hàm request API
  const fetcher = async () => {
    try {
      // bóc tách danh sách khóa học đã đăng ký và thông tin user
      const { chiTietKhoaHocGhiDanh, ...userInformation } =
        await authAPI.getUserInformation();
      // set state array
      setCourses(chiTietKhoaHocGhiDanh);
      setsearchCourse(chiTietKhoaHocGhiDanh);
    } catch (error) {
      console.log(error);
    }
  };

  // useEffect
  useEffect(() => {
    fetcher();
  }, []);

  const handleSubmit = (evt) => {
    evt.preventDefault();
    // chuyển từ khóa ng dùng nhập sang dạng thường
    const searchValue = evt.target[0].value.toLowerCase();
    // dùng hàm filter lọc trong array courses
    const newCourses = courses.filter((item) => {
      const newItem = item.tenKhoaHoc.toLowerCase();
      return newItem.includes(searchValue);
    });
    // set giá trị lọc được cho array searchCourse để re-render ra giao diện
    setsearchCourse(newCourses);
    // set paginate page hiện tại thành trang đầu tiên
    setCurrentPage(1);
  };

  // hàm hủy khóa học
  const handleDeleteCourse = (maKhoaHoc) => {
    swal({
      text: "Bạn muốn hủy đăng ký khóa học này",
      icon: "warning",
      buttons: ["Không muốn", "Đúng vậy"],
    }).then(async (response) => {
      if (response) {
        try {
          const data = await courseAPI.deleteCourse({
            maKhoaHoc: maKhoaHoc,
            taiKhoan: user.taiKhoan,
          });
          swal({
            text: "Hủy thành công",
            icon: "success",
            button: true,
          });
          // gọi lại hàm fetcher để cập nhật lại danh sách khóa học ng dùng
          fetcher();
        } catch (error) {
          console.log(error);
        }
      }
    });
  };

  return (
    <div className="container">
      <div className="inner-course">
        {/* phần tìm kiếm */}
        <div className="inner-course__header">
          <h3>Các khóa học đã tham gia</h3>
          <div className="inner-course__header__search">
            <Box
              component="form"
              sx={{
                "& > :not(style)": { width: "100%" },
              }}
              noValidate
              autoComplete="off"
              onSubmit={(evt) => handleSubmit(evt)}
            >
              <TextField
                id="outlined-basic"
                placeholder="Các khóa học cần tìm..."
                variant="outlined"
                size="small"
              />
            </Box>
          </div>
        </div>

        {/* danh sách khóa học đã đăng ký */}
        <div className="inner-course__body">
          <div className="container myContainer">
            {currentPageItems.map((item) => (
              <div key={item.maKhoaHoc} className="course-item">
                <div className="course-item__img">
                  <img
                    width="100%"
                    height="100%"
                    src={item.hinhAnh}
                    alt="Onerror"
                  />
                </div>
                <div className="course-item__body">
                  <div className="course-item__body__title">
                    <h5>{item.tenKhoaHoc}</h5>
                  </div>
                  <div className="course-item__body__text">
                    <div className="course-item__body__text__detail">
                      {item.moTa}
                    </div>
                    <div className="course-item__body__text__rate">
                      <span>
                        <BsFillStarFill />
                        <BsFillStarFill />
                        <BsFillStarFill />
                        <BsFillStarFill />
                        <BsStarHalf />
                      </span>
                      <span>({item.luotXem} lượt xem)</span>
                      <button
                        className="myButton"
                        onClick={() => handleDeleteCourse(item.maKhoaHoc)}
                      >
                        Hủy
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
          {searchCourse.length >= itemPerPage ? (
            <Pagination
              totalPageNumber={totalPageNumber}
              currentPage={currentPage}
              paginate={handleChangeCurrenPage}
              handleNextBtn={handleNextBtn}
              handlePrevBtn={handlePrevBtn}
            />
          ) : null}
        </div>
      </div>
    </div>
  );
};

export default CourseRegisted;
