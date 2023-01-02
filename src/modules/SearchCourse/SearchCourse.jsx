import React, { useState, useEffect } from "react";
//route
import { useSearchParams } from "react-router-dom";
// style component
import styled from "styled-components";
// icons
import { BsFillStarFill, BsStarHalf } from "react-icons/bs";
// sevices
import courseAPI from "../../services/courseAPI";
// my hooks
import Pagination from "../../components/Pagination/Pagination";
// route
import { useNavigate } from "react-router-dom";

const SearchCourse = () => {
  const [urlParam, seturlParam] = useSearchParams();
  const [courseSearchList, setcourseSearchList] = useState([]); // stata quản lý danh sách khóa học
  const navigate = useNavigate();

  // === Paginate variable
  const [currentPage, setCurrentPage] = useState(1); // stata giá trị trang hiện tại của thanh pagination
  const itemPerPage = 5; // số lượng item mỗi trang
  const indexOfLastItem = currentPage * itemPerPage; // index của phần tử cuối cùng trong mảng
  const indexOfFirstItem = indexOfLastItem - itemPerPage; // index của phần tử đâu tiên trong mảng
  const currentPageItems = courseSearchList.slice(
    indexOfFirstItem,
    indexOfLastItem
  ); // số item hiện tại của trang
  const totalPageNumber = Math.ceil(courseSearchList.length / itemPerPage);

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
      try {
        const data = await courseAPI.getCourseList(urlParam.get("tenKhoaHoc"));
        // set dữ liệu vào state
        setcourseSearchList(data);
      } catch (error) {
        //set dữ liệu lấy được lúc trước về rỗng
        setcourseSearchList([]);
        console.log(error);
      }
    })();
  }, [urlParam.get("tenKhoaHoc")]);

  return (
    <StyleSearchCourse>
      <div className="container">
        <div className="inner-search">
          <div className="search-title">
            <h3>
              Đã tìm thấy <strong>{courseSearchList.length}</strong> khóa học
              theo tìm kiếm <em>" {urlParam.get("tenKhoaHoc")} "</em>
            </h3>
          </div>
          <div className="search-body">
            {currentPageItems.map((item) => (
              <div
                key={item.maKhoaHoc}
                className="course-item"
                onClick={() => navigate(`/chiTiet/${item.maKhoaHoc}`)}
              >
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
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
          {courseSearchList.length >= itemPerPage ? (
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
    </StyleSearchCourse>
  );
};

export default SearchCourse;

const StyleSearchCourse = styled.div`
  margin: 60px 0;

  .search-body {
    .course-item {
      cursor: pointer;
      height: 250px;
      display: flex;
      background-color: rgba(0, 0, 0, 0.05);
      margin: 10px 0;
      border-top: 2px solid #000;
      transition: all 0.3s;
      @media only screen and (max-width: 768px) {
        height: 200px;
      }
      @media only screen and (max-width: 600px) {
        height: 150px;
      }

      &:hover {
        transform: scale(1.01);
        box-shadow: 0 0 10px 5px rgba(0, 0, 0, 0.3);
      }

      .course-item__img {
        padding: 20px;
        width: 30%;
        @media only screen and (max-width: 768px) {
          padding: 10px;
        }

        img {
          object-fit: contain;
        }
      }

      .course-item__body {
        padding: 20px 10px;
        width: 70%;

        h5 {
          font-weight: 700;
          @media only screen and (max-width: 768px) {
            font-size: 15px;
          }
        }

        .course-item__body__text {
          margin-top: 10px;
          display: flex;
          justify-content: space-between;
          align-items: center;

          .course-item__body__text__detail {
            width: 80%;
            display: -webkit-box;
            -webkit-box-orient: vertical;
            -webkit-line-clamp: 3;
            overflow: hidden;
            @media only screen and (max-width: 768px) {
              font-size: 13px;
            }
            @media only screen and (max-width: 600px) {
              font-size: 10px;
            }
          }

          .course-item__body__text__rate {
            width: 20%;
            display: flex;
            flex-direction: column;
            align-items: center;

            & span:nth-of-type(1) {
              color: #ffaa009c;
              @media only screen and (max-width: 768px) {
                font-size: 13px;
              }
              @media only screen and (max-width: 600px) {
                font-size: 8px;
              }
            }
            & span:nth-of-type(2) {
              @media only screen and (max-width: 992px) {
                font-size: 13px;
              }
              @media only screen and (max-width: 768px) {
                font-size: 10px;
              }
              @media only screen and (max-width: 600px) {
                font-size: 7px;
              }
            }
          }
        }
      }
    }
  }
`;
