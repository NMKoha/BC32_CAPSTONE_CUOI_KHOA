import React from "react";
import styled from "styled-components";
//react played
import ReactPlayer from "react-player/youtube";
// image
import ringCode from "../../../img/radial_ringcode.png";
import ringFram from "../../../img/radial_frame2.png";
import ring1 from "../../../img/radial_ring1.png";
import ring2 from "../../../img/radial_ring2.png";
import ring3 from "../../../img/radial_ring3.png";
const Banner = () => {
  return (
    <StyleBanner>
      <ReactPlayer
        className="bannerVid"
        width="100%"
        height="100%"
        url="https://www.youtube.com/watch?v=kcSEsljlges"
        playing={true}
        loop={true}
        muted={true}
      />

      <div className="bannerOverlay"></div>

      <div className="leftBanner">
        <div className="animateBanner">
          <div className="radial_ring_code">
            <img className="img-fluid" src={ringCode} alt="" />
          </div>
          <div className="ring__fram">
            <img className="img-fluid" src={ringFram} alt="" />
          </div>
          <div className="ring__1">
            <img className="img-fluid" src={ring1} alt="" />
          </div>
          <div className="ring__2">
            <img className="img-fluid" src={ring2} alt="" />
          </div>
          <div className="ring__3">
            <img className="img-fluid" src={ring3} alt="" />
          </div>
        </div>
      </div>
      <div className="rightBanner">
        <div className="rightBanner__title">
          <h1>KHỞI ĐẦU </h1>
          <h1>SỰ NGHIỆP </h1>
          <h1>CỦA BẠN </h1>
        </div>
        <div className="rightBanner__text">
          <h1>
            <b>
              TRỞ THÀNH LẬP TRÌNH VIÊN <br /> CHUYÊN NGHIỆP TẠI CYBER SOFT
            </b>
          </h1>
        </div>
      </div>
    </StyleBanner>
  );
};

export default Banner;

const StyleBanner = styled.div`
  padding-top: 40%;
  display: flex;
  justify-content: end;
  position: relative;
  background-color: #bbb;
  overflow: hidden;

  .bannerVid {
    top: 0;
    right: 0;
    position: absolute;
    width: 100%;
    height: 100%;
  }
  .bannerOverlay {
    top: 0;
    right: 0;
    position: absolute;
    width: 100%;
    height: 100%;
    background-color: rgba(0, 0, 0, 0.4);
  }

  .leftBanner {
    position: absolute;
    top: -25%;
    left: -12%;
    width: 1125px;
    height: 1125px;
    @media only screen and (max-width: 1200px) {
      width: 960px;
      height: 960px;
      top: -32%;
      left: -15%;
    }
    @media only screen and (max-width: 992px) {
      width: 720px;
      height: 720px;
      top: -35%;
      left: -15%;
    }
    @media only screen and (max-width: 768px) {
      width: 550px;
      height: 550px;
      top: -18%;
      left: -10%;
    }
    @media only screen and (max-width: 600px) {
      width: 450px;
      height: 450px;
      top: -27%;
      left: -11%;
    }
    @media only screen and (max-width: 400px) {
      width: 300px;
      height: 300px;
      top: -27%;
      left: -11%;
    }

    .animateBanner {
      position: relative;
      .radial_ring_code {
        position: absolute;
        animation: xoayvong 30s linear infinite;
        transform: rotate(40deg);
      }

      .ring__fram {
        position: absolute;
        animation: xoayvong 30s linear infinite;
        animation-direction: reverse;
        transform: rotate(40deg);
      }
      .ring__1 {
        position: absolute;
        animation: xoayvong 30s linear infinite;
        transform: rotate(40deg);
      }
      .ring__2 {
        position: absolute;
        animation: xoayvong 30s linear infinite;
        transform: rotate(40deg);
      }
      .ring__3 {
        position: absolute;
        animation: xoayvong 30s linear infinite;
        animation-direction: reverse;
        transform: rotate(40deg);
      }
    }
  }

  .rightBanner {
    position: absolute;
    top: 15%;
    right: 10%;
    @media only screen and (max-width: 1200px) {
      top: 10%;
      right: 5%;
    }
    .rightBanner__title {
      & h1:nth-of-type(1) {
        background: linear-gradient(to bottom, #227df9, #7462f9);
        -webkit-background-clip: text;
        -webkit-text-fill-color: transparent;
        font-size: 60px;
        @media only screen and (max-width: 992px) {
          font-size: 40px;
        }
        @media only screen and (max-width: 768px) {
          font-size: 30px;
        }
        @media only screen and (max-width: 600px) {
          font-size: 20px;
        }
        @media only screen and (max-width: 400px) {
          font-size: 15px;
        }
      }
      & h1:nth-of-type(2) {
        background: linear-gradient(to bottom, #7462f9, #df3ef8);
        -webkit-background-clip: text;
        -webkit-text-fill-color: transparent;
        font-size: 60px;
        @media only screen and (max-width: 992px) {
          font-size: 40px;
        }
        @media only screen and (max-width: 768px) {
          font-size: 30px;
        }
        @media only screen and (max-width: 600px) {
          font-size: 20px;
        }
        @media only screen and (max-width: 400px) {
          font-size: 15px;
        }
      }
      & h1:nth-of-type(3) {
        background: linear-gradient(to bottom, #df3ef8, #227df9);
        -webkit-background-clip: text;
        -webkit-text-fill-color: transparent;
        font-size: 60px;
        @media only screen and (max-width: 992px) {
          font-size: 40px;
        }
        @media only screen and (max-width: 768px) {
          font-size: 30px;
        }
        @media only screen and (max-width: 600px) {
          font-size: 20px;
        }
        @media only screen and (max-width: 400px) {
          font-size: 15px;
        }
      }
    }

    .rightBanner__text {
      h1 {
        line-height: 55px;
        margin-top: 10px;
        font-size: 30px;
        color: #fff;
        @media only screen and (max-width: 992px) {
          font-size: 25px;
        }
        @media only screen and (max-width: 768px) {
          font-size: 20px;
          line-height: 40px;
        }
        @media only screen and (max-width: 600px) {
          font-size: 15px;
          line-height: 25px;
          margin-top: 5px;
        }
        @media only screen and (max-width: 400px) {
          font-size: 9px;
          line-height: 15px;
        }
      }
    }
  }
`;
