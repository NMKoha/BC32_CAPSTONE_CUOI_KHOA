import React, { useState, useEffect } from "react";
import styled from "styled-components";
import courseAPI from "../../../services/courseAPI";
import { useNavigate } from "react-router-dom";
//my hooks
import { useCourseSignUp } from "../../../components/Hooks/useCourseSignUp";

const CourseList = () => {
  const [courseList, setCourseList] = useState([]); // state danh sách khóa học
  const navigate = useNavigate();
  const courseRegier = useCourseSignUp();

  useEffect(() => {
    (async () => {
      try {
        const data = await courseAPI.getCourseListByPage();
        setCourseList(data.items);
      } catch (error) {
        console.log(error);
      }
    })();
  }, []);

  return (
    <StyleCourseList>
      <div className="container ">
        <h3>Các khóa học mới nhất</h3>
        <div className="row my-4">
          {courseList.map((item) => (
            <div key={item.maKhoaHoc} className="col-md-4 col-lg-3 my-2">
              <div className="card myCard">
                <img
                  alt="Onerror"
                  className="card-img-top "
                  src={item.hinhAnh}
                  style={{ aspectRatio: "2/1", objectFit: "contain" }}
                  onClick={() => navigate(`/chiTiet/${item.maKhoaHoc}`)}
                />
                <div className="card-body text-center">
                  <h5>{item.tenKhoaHoc}</h5>
                  <p>({item.luotXem} lượt xem)</p>
                  <button
                    className="myButton my-2"
                    onClick={() => courseRegier(null, item.maKhoaHoc)}
                  >
                    Đăng Ký
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </StyleCourseList>
  );
};

export default CourseList;

const StyleCourseList = styled.div`
  margin-top: 30px;
`;
