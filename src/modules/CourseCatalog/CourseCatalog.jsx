import React, { useState, useEffect } from "react";
// rouder dom
import { useSearchParams } from "react-router-dom";
import Pagination from "../../components/Pagination/Pagination";
// services
import courseAPI from "../../services/courseAPI";
// my hooks
import { useCourseSignUp } from "../../components/Hooks/useCourseSignUp";
// route dom
import { useLocation, useNavigate } from "react-router-dom";

const CourseCatalog = () => {
  const [maDanhMuc, setMaDanhMuc] = useSearchParams(); // lấy queryParams từ url
  const [courseCatalog, setCourseCatalog] = useState([]);
  const courseSignUp = useCourseSignUp(); // hooks đăng ký khóa học
  const location = useLocation();
  const navigate = useNavigate();

  const [currentPage, setCurrentPage] = useState(1); // stata giá trị trang hiện tại của thanh pagination
  const itemPerPage = 8; // số lượng item mỗi trang
  const indexOfLastItem = currentPage * itemPerPage; // index của phần tử cuối cùng trong mảng
  const indexOfFirstItem = indexOfLastItem - itemPerPage; // index của phần tử đâu tiên trong mảng
  const currentPageItems = courseCatalog.slice(
    indexOfFirstItem,
    indexOfLastItem
  ); // số item hiện tại của trang
  const totalPageNumber = Math.ceil(courseCatalog.length / itemPerPage);

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

  useEffect(() => {
    (async () => {
      const urlParam = maDanhMuc.get("MaDanhMuc");
      try {
        const data = await courseAPI.getCourseCatalog(urlParam);
        setCourseCatalog(data);
      } catch (error) {
        console.log(error);
      }
    })();
  }, []);

  const handleCourseRegister = (maKhoaHoc) => {
    courseSignUp(location.pathname, maKhoaHoc, maDanhMuc.get("MaDanhMuc"));
  };

  return (
    <div style={{ margin: "60px 0" }}>
      <div className="container">
        <div className="row my-2">
          {currentPageItems.map((item) => (
            <div
              className="col-lg-3 col-md-4 col-sm-6 my-2"
              key={item.maKhoaHoc}
            >
              <div className="card myCard">
                <img
                  style={{ aspectRatio: "2/1", objectFit: "contain" }}
                  className="card-img-top"
                  src={item.hinhAnh}
                  alt="Onerror"
                  onClick={() => navigate(`/chiTiet/${item.maKhoaHoc}`)}
                />
                <div className="card-body text-center">
                  <h5>{item.tenKhoaHoc}</h5>
                  <p>({item.luotXem} lượt xem)</p>
                  <button
                    className="myButton my-2"
                    onClick={() => handleCourseRegister(item.maKhoaHoc)}
                  >
                    Đăng Ký
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
        <Pagination
          totalPageNumber={totalPageNumber}
          currentPage={currentPage}
          paginate={handleChangeCurrenPage}
          handleNextBtn={handleNextBtn}
          handlePrevBtn={handlePrevBtn}
        />
      </div>
    </div>
  );
};

export default CourseCatalog;
