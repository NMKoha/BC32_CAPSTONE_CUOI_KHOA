import React from "react";
import { HiLocationMarker } from "react-icons/hi";
import { FaFacebookF, FaYoutube } from "react-icons/fa";
import styled from "styled-components";

const Footer = () => {
  return (
    <StyleFooter>
      <div className="container">
        <div className="footerFB">
          <div className="row">
            <div className="col-md-6">
              <h4>NHẬN TIN SỰ KIỆN & KHUYẾN MÃI</h4>
              <p>
                CyberSoft sẽ gởi các khóa học trực tuyến & các chương trình
                CyberLive hoàn toàn MIỄN PHÍ và các chương trình KHUYẾN MÃI hấp
                dẫn đến các bạn.
              </p>
              <div className="footerInbut">
                <input type="text" placeholder="your.address@email.com" />
                <button className="myButton">ĐĂNG KÝ ƯU ĐÃI</button>
              </div>
            </div>
            <div className="col-md-6">
              <iframe
                src="https://www.facebook.com/plugins/page.php?href=https%3A%2F%2Fwww.facebook.com%2Flophocviet%2F&tabs=timeline&width=340&height=500&small_header=false&adapt_container_width=true&hide_cover=false&show_facepile=true&appId"
                width={340}
                height={400}
                style={{ border: "none", overflow: "hidden" }}
                allow="autoplay; clipboard-write; encrypted-media; picture-in-picture; web-share"
              />
            </div>
          </div>
        </div>
        <div className="address-1">
          <h3>TP. Hồ Chí Minh</h3>
          <div className="row">
            <div className="col-md-3 my-2">
              <h5>Trụ sở: 112 Cao Thắng, Quận 3</h5>
              <ul>
                <li>Hotline: 096.105.1014</li>
                <li>
                  Địa chỉ: Tầng 5, toà nhà Suri, 112 Cao Thắng, Quận 3, TPHCM
                </li>
              </ul>
            </div>
            <div className="col-md-3 my-2">
              <h5>459 Sư Vạn Hạnh, Quận 10</h5>
              <ul>
                <li>Hotline: 096.105.1014</li>
                <li>
                  Địa chỉ: Tầng 2, toà nhà WinHome, 459 Sư Vạn hạnh, Quận 10,
                  TPHCM
                </li>
              </ul>
            </div>
            <div className="col-md-3 my-2">
              <h5>117 Tân Cảng, Bình Thạnh</h5>
              <ul>
                <li>Hotline: 096.105.1014</li>
                <li>Địa chỉ: 117 Tân Cảng, Bình Thạnh, TPHCM</li>
              </ul>
            </div>
            <div className="col-md-3 my-2">
              <h5>
                110 Đường số 10, Park Hill City Land, Phan Văn Trị, Gò Vấp
              </h5>
              <ul>
                <li>Hotline: 096.105.1014</li>
                <li>
                  Địa chỉ: 110 Đường số 10, Park Hill City Land, Phan Văn Trị,
                  Gò Vấp, TPHCM
                </li>
              </ul>
            </div>
            <div className="col-md-3 my-2">
              <h5>6C Đường số 8, Linh Tây, Thủ Đức (gần ĐH Cảnh Sát)</h5>
              <ul>
                <li>Hotline: 096.105.1014</li>
                <li>Địa chỉ: 6C Đường số 8, Linh Tây, Thủ Đức, TPHCM</li>
              </ul>
            </div>
          </div>
        </div>
        <div className="address-2">
          <div className="row">
            <div className="col-md-6 my-2">
              <h3>Đà Nẵng</h3>
              <h5>103 Nguyễn Hữu Dật, Hải Châu</h5>
              <ul>
                <li>Hotline: 096.105.1014</li>
                <li>Địa chỉ: 103 Nguyễn Hữu Dật, Hải Châu, ĐN</li>
              </ul>
            </div>
            <div className="col-md-6 my-2">
              <h3>Bình Dương</h3>
              <h5>230 Đại Lộ Bình Dương, Thủ Dầu Một</h5>
              <ul>
                <li>Hotline: 096.105.1014</li>
                <li>
                  Địa chỉ: 230 Đại Lộ Bình Dương, toà nhà Becamex, phường Phú
                  Hoà, Thủ Dầu Một, Bình Dương
                </li>
              </ul>
            </div>
          </div>
        </div>

        <hr style={{ border: "4px solid #cecece", marginBottom: "0" }} />

        <div className="footerCopyRight">
          <div className="row">
            <div className="footerCopyRight__left col-md-6 ">
              <p style={{ color: "#999999" }}>
                © Bản quyền CyberSoft 2017 - 2021 - Empower by CyberSoft
              </p>
            </div>
            <div className="footerCopyRight__right col-md-6">
              <span>GET SOCIAL</span>
              <a href="https://www.facebook.com/lophocviet/" target="_blank">
                <FaFacebookF />
              </a>
              <a
                href="https://www.youtube.com/channel/UCWc3ASTJcb0FeO2oFfX8IDQ"
                target="_blank"
              >
                <FaYoutube />
              </a>
            </div>
          </div>
        </div>
      </div>
    </StyleFooter>
  );
};

export default Footer;

const StyleFooter = styled.div`
  background-color: rgb(33, 37, 41);
  overflow-x:hidden;

  .footerFB {
    padding: 20px 0;
    text-align: center;

    p,
    h4 {
      color: #fff;
      margin: 5px 0;
    }

    .footerInbut {
      margin-bottom: 20px;
      @media only screen and (max-width: 992px) {
        display: flex;
        flex-direction: column;
      }
      @media only screen and (max-width: 768px) {
        display: flex;
        flex-direction: column;
      }
      input {
        color: #4d4d4d;
        background-color: #efefef;
        border-radius: 5px;
        outline: none;
        padding: 10px;
        margin: 5px 0 5px;
      }
    }
  }

  h3 {
    margin-bottom: 20px;
    color: #999999;
  }
  ul {
    list-style: none;
    li {
      color: #999999;
    }
  }

  h5 {
    color: #fff;
    margin-bottom: 10px;
  }
  .address-1 {
    padding-top: 20px;
  }

  .address-2 {
    padding-top: 20px;
  }

  .footerCopyRight {
    padding: 20px 0;

    .footerCopyRight__right {
      display: flex;
      justify-content: end;
      align-items: center;

      @media only screen and (max-width: 768px) {
        margin-top: 10px;
        justify-content: start;
      }
      span {
        color: #999999;
        margin: 0 5px;
      }

      a:nth-of-type(1) {
        margin: 0 5px;
        text-align: center;
        background-color: #007aff;
        border-radius: 5px;
        padding: 5px 10px;
        color: #fff;
        transition: all 0.3s;
        &:hover:nth-of-type(1) {
          background-color: transparent;
        }
      }

      a:nth-of-type(2) {
        background-color: #dd3333;
        border-radius: 5px;
        text-align: center;
        color: #fff;
        padding: 5px 10px;
        transition: all 0.3s;
        &:hover:nth-of-type(2) {
          background-color: transparent;
        }
      }
    }
  }
`;
