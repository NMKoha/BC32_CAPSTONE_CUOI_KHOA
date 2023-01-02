import React, { useState, useRef, useEffect } from "react";
// styled component
import styled from "styled-components";
// bootstrap
import Tab from "react-bootstrap/Tab";
import Tabs from "react-bootstrap/Tabs";
// redux
import { useSelector } from "react-redux";
// routes
import { useNavigate } from "react-router-dom";

// import components
import User from "./User";
import CourseRegisted from "./CourseRegisted";

const UserInformation = () => {
  const { user } = useSelector((state) => state.AuthSlice);
  const navigate = useNavigate();

  // hàm kiểm tra nếu ko có user thì back về trang đăng nhập
  if (!user) {
    navigate("/dangNhap",{replace:true});
  }

  return (
    <StyleUserInfomation>
      <div className="container">
        <div className="inner-infomation">
          <Tabs
            id="controlled-tab-example"
            defaultActiveKey="user"
            className="mb-3"
          >
            {/* thông tin người dùng */}
            <Tab eventKey="user" title="Thông Tin Người Dùng">
              <User />
            </Tab>

            {/* course registed */}
            <Tab eventKey="courseRegisted" title="Khóa học của tôi">
              <CourseRegisted />
            </Tab>
          </Tabs>
        </div>
      </div>
    </StyleUserInfomation>
  );
};

export default UserInformation;

const StyleUserInfomation = styled.div`
  margin: 60px 0;

  .inner-infomation {
    box-shadow: 0 0 10px 2px rgba(0, 0, 0, 0.2);
    padding-bottom: 20px;

    .nav-tabs .nav-link {
      color: #000;
      @media only screen and (max-width: 600px) {
        font-size: 10px;
      }
    }

    .nav-tabs .nav-link.active {
      color: #fff;
      background: var(--color-button-2) !important;
    }
  }

  .inner-user {
    .css-13kk82s {
      display: flex;
      justify-content: space-around;

      @media only screen and (max-width: 600px) {
        flex-direction: column;
      }

      .left-inputs {
        width: 45%;
        @media only screen and (max-width: 600px) {
          width: 100%;
        }

        .input-items {
          span {
            font-size: 13px;

            @media only screen and (max-width: 992px) {
              font-size: 10px;
            }
          }
        }
      }

      .right-inputs {
        width: 45%;
        @media only screen and (max-width: 600px) {
          width: 100%;
        }

        .input-items {
          span {
            font-size: 13px;

            @media only screen and (max-width: 992px) {
              font-size: 10px;
            }
          }
        }
      }
    }
  }

  .inner-course {

    .inner-course__header {
      display: flex;
      justify-content: space-between;
      align-items: center;
      padding:10px 0 ;

      h3 {
        width: 45%;
        @media only screen and (max-width: 600px) {
            font-size:12px;
          }
  
      }

      .inner-course__header__search {
        width: 45%;

        .MuiInputBase-input{
            @media only screen and (max-width: 600px) {
                font-size:10px;
              }
        }
      }
    }

    .inner-course__body{
        .myContainer{
         .course-item {
            cursor: pointer;
            height: 200px;
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
            .course-item__body{
                padding: 20px 0;
                width: 70%;
        
                h5 {
                  font-weight: 700;
                  @media only screen and (max-width: 768px) {
                    font-size: 15px;
                  }
                }

                .course-item__body__text{
                    margin-top: 10px;
                    display: flex;
                    justify-content: space-between;
                    align-items: center;

                    .course-item__body__text__detail {
                        width: 75%;
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
                        width: 25%;
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

                        .myButton{
                            @media only screen and (max-width: 768px) {
                                font-size: 13px;
                                padding:5px 15px;
                            }
                            @media only screen and (max-width: 600px) {
                                font-size: 8px;
                                padding:5px 13px;
                            }
                        }
                    }
                }
            }
        }
    }
  }
`;
