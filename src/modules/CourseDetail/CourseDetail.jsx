import React, { useState, useEffect } from "react";
// route dom
import { useParams, useLocation } from "react-router-dom";
// icon
import { AiFillStar } from "react-icons/ai";
// fetcher
import courseAPI from "../../services/courseAPI";
// hooks
import { useCourseSignUp } from "../../components/Hooks/useCourseSignUp";
// my img
import detailBannerImg from "../../img/photo-1510915228340-29c85a43dcfe.jpg";
import styled from "styled-components";

const CourseDetail = () => {
  const { maKhoaHoc } = useParams();
  const [course, setCourse] = useState(null);
  const courseSignUp = useCourseSignUp();
  const location = useLocation();

  useEffect(() => {
    (async () => {
      try {
        const data = await courseAPI.getCourseDetail(maKhoaHoc);
        setCourse(data);
      } catch (error) {
        console.log(error);
      }
    })();
  }, []);

  return (
    <StyleCourseDetail>
      <div className="courseBanner">
        <div className="container">
          <div className="inner-banner">
            <div className="left-banner">
              <h1>{course?.tenKhoaHoc}</h1>
              <p>
                Đánh giá khóa học :
                <AiFillStar className="banner-icon" />
                <AiFillStar className="banner-icon" />
                <AiFillStar className="banner-icon" />
                <AiFillStar className="banner-icon" />
                <AiFillStar className="banner-icon" />{" "}
              </p>
              <div className="banner-button">
                <button
                  className="myButton"
                  onClick={() => courseSignUp(location.pathname, maKhoaHoc)}
                >
                  Đăng ký
                </button>
              </div>
            </div>

            <div className="right-banner">
              <img src={course?.hinhAnh} alt="Onerror" />
            </div>
          </div>
        </div>
      </div>
      <div className="courseDetail">
        <div className="container">
          <div className="inner-detail">
            <div className="detail-title">
              <h1>Giới thiệu khóa học</h1>
            </div>
            <div className="detail-body">
              <p>{course?.moTa}</p>
            </div>
          </div>
        </div>
      </div>
    </StyleCourseDetail>
  );
};

export default CourseDetail;

const StyleCourseDetail = styled.div`
  .courseBanner {
    display: flex;
    height: 400px;
    background-image: url(${detailBannerImg});
    background-repeat: no-repeat;
    background-position: center;
    background-size: cover;
    @media only screen and (max-width: 600px) {
      height: 300px;
    }

    .inner-banner {
      padding-top: 80px;
      display: flex;
      justify-content: space-between;
      @media only screen and (max-width: 768px) {
        padding-top: 120px;
      }
      @media only screen and (max-width: 768px) {
        padding-top: 80px;
      }

      .left-banner {
        display: flex;
        flex-direction: column;
        justify-content: center;
        h1 {
          color: #fff;
        }

        p {
          color: #bbb;
          margin: 20px 0;
          @media only screen and (max-width: 600px) {
            font-size: 10px;
          }
        }

        .banner-icon {
          color: #fff944;
          margin: 0 2px;
        }
      }
    }

    .right-banner {
      display: flex;
      img {
        border-radius: 10px;
        width: 360px;
        height: 200px;
        @media only screen and (max-width: 768px) {
          width: 240px;
          height: 150px;
        }
        @media only screen and (max-width: 600px) {
          width: 160px;
          height: 100px;
        }
      }
    }
  }

  .courseDetail {
    padding: 20px 0;
  }
`;
