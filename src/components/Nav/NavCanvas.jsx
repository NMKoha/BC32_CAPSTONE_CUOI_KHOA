import React from "react";
// react bootstrap
import Offcanvas from "react-bootstrap/Offcanvas";
import Accordion from "react-bootstrap/Accordion";
// my img
import logo from "../../img/cyberlogo-white.png";
// material ui
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
// icons
import { FcSearch } from "react-icons/fc";

const NavCanvas = ({
  show,
  handleCanvas,
  user,
  handleLogout,
  courseList,
  handleSearch,
}) => {
  return (
    <Offcanvas show={show} onHide={() => handleCanvas} scroll={true}>
      <Offcanvas.Header
        style={{ display: "block", borderBottom: "1px solid #bbb" }}
      >
        <Offcanvas.Title>
          <a href="/">
            <img src={logo} height={50} alt="" />
          </a>
        </Offcanvas.Title>
      </Offcanvas.Header>

      <Offcanvas.Body>
        {/* user */}
        <Accordion className="my-2">
          <Accordion.Item eventKey="0">
            <Accordion.Header>
              {user ? (
                <p className="text-black">
                  <sup>Xin chào </sup>
                  <b>{user.hoTen}</b>
                </p>
              ) : (
                "User"
              )}
            </Accordion.Header>
            <Accordion.Body>
              {user ? (
                <div className=" flex-column d-flex ">
                  <p>
                    <a href="/thongTinNguoiDung">Thông tin người dùng</a>
                  </p>
                  <button className="myButton my-2" onClick={handleLogout}>
                    Đăng xuất
                  </button>
                </div>
              ) : (
                <div className="authen ">
                  <p>
                    <a href="/dangKy">Đăng ký</a>
                  </p>
                  <p>
                    <a href="/dangNhap">Đăng nhập</a>
                  </p>
                </div>
              )}
            </Accordion.Body>
          </Accordion.Item>
        </Accordion>

        {/* course list */}
        <Accordion className="my-2">
          <Accordion.Item eventKey="1">
            <Accordion.Header>Danh Mục Khóa Học</Accordion.Header>
            <Accordion.Body>
              {courseList.map((item) => (
                <p key={item.maDanhMuc}>
                  <a href={`/DanhMucKhoaHoc?MaDanhMuc=${item.maDanhMuc}`}>
                    {item.tenDanhMuc}
                  </a>
                </p>
              ))}
            </Accordion.Body>
          </Accordion.Item>
        </Accordion>

        {/* search input */}
        <Box
          className="d-flex "
          style={{ position: "relative", width: "100%" }}
          component="form"
          noValidate
          autoComplete="off"
          onSubmit={(evt) => handleSearch(evt)}
        >
          <TextField
            style={{ backgroundColor: "#fff", borderRadius: "5px" }}
            fullWidth
            id="outlined-basic"
            variant="outlined"
            placeholder="Tìm kiếm"
            size="small"
          />
          <FcSearch
            style={{
              position: "absolute",
              top: "5",
              right: "10",
              fontSize: "30px",
            }}
          />
        </Box>
      </Offcanvas.Body>
    </Offcanvas>
  );
};

export default NavCanvas;
