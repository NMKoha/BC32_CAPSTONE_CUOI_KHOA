import React, { useState, useEffect } from "react";
//bootstrap
import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import NavDropdown from "react-bootstrap/NavDropdown";
import Dropdown from "react-bootstrap/Dropdown";
// local image
import logo from "../../img/cyberlogo-white.png";
// icons
import { FcSearch } from "react-icons/fc";
// fetcher
import courseAPI from "../../services/courseAPI";
//redux
import { useDispatch, useSelector } from "react-redux";
import { logOut } from "../../slices/AuthSlice";
//styled
import styled from "styled-components";
//sweetalert
import swal from "sweetalert";
import NavCanvas from "./NavCanvas";
//route
import { useNavigate } from "react-router-dom";
// material ui
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";

export const NavMenu = () => {
  const [scrolling, setScrolling] = useState(0); // state quản lý thông số cuộn chuột ng dùng
  const [show, setShow] = useState(false); // state quản lý toggle canvas
  const [courseList, setCourseList] = useState([]); // state quản lý list danh mục khóa học
  const { user } = useSelector((state) => state.AuthSlice); // giá trị lấy từ redux
  const dispatch = useDispatch();
  const handleCanvas = () => setShow((state) => !state); // hàm control canvas
  const navigate = useNavigate();

  // lifecycle lấy danh mục khóa học
  useEffect(() => {
    (async () => {
      try {
        const data = await courseAPI.getCourse();
        setCourseList(data);
      } catch (error) {
        console.log(error);
      }
    })();
  }, []);

  // hàm scroll navbar
  const handleScroll = () => {
    const croll = window.scrollY;
    setScrolling(croll);
  };

  useEffect(() => {
    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  // hàm tìm kiếm
  const handleSearch = (evt) => {
    evt.preventDefault();
    // nếu user nhập rỗng thì ko làm gì cả
    if (evt.target[0].value === "") {
      return;
    } else {
      // có giá trị =>  điều hướng sang trang tìm kiếm
      navigate(`/TimKiemKhoaHoc?tenKhoaHoc=${evt.target[0].value}`);
      // set fiel input lại  = rỗng
      evt.target[0].value = "";
    }
  };

  // hàm logOut
  const handleLogout = () => {
    swal({
      title: "Bạn Muốn Đăng Xuất ???",
      icon: "warning",
      buttons: true,
      dangerMode: true,
    }).then((value) => {
      if (value) {
        swal({
          text: "Cảm ơn và hẹn gặp lại",
          icon: "success",
          timer: 2000,
          button: false,
        });
        dispatch(logOut());
      }
    });
  };

  return (
    <StyleNavBar
      style={
        scrolling > 60
          ? {
              position: "fixed",
              top: "0",
              width: "100%",
              zIndex: "10",
            }
          : { position: "relative" }
      }
    >
      <Navbar
        expand="lg"
        bg="dark"
        variant="dark"
        expanded={false}
        onToggle={handleCanvas}
      >
        <Container>
          <Navbar.Brand href="/">
            <img height={50} src={logo} alt="" />
          </Navbar.Brand>
          <Navbar.Toggle />
          <Navbar.Collapse className="justify-content-between">
            <Nav>
              {/* danh sách khóa học */}
              <NavDropdown
                title="Danh Mục Khóa Học"
                style={{
                  border: "1px solid white",
                  fontWeight: "600",
                }}
              >
                {courseList.map((item) => (
                  <NavDropdown.Item
                    href={`/DanhMucKhoaHoc?MaDanhMuc=${item.maDanhMuc}`}
                    key={item.maDanhMuc}
                  >
                    {item.tenDanhMuc}
                  </NavDropdown.Item>
                ))}
              </NavDropdown>
            </Nav>
            <Nav className="searchInput">
              {/*  ô tìm kiếm */}
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
            </Nav>
            {/* hiển thị option login / logout */}
            {user ? (
              <Nav>
                <div className="d-flex align-items-center">
                  <p className="text-white">
                    <sup>Xin chào </sup>
                    <b>{user.hoTen}</b>
                  </p>
                  <Dropdown align={"end"}>
                    <Dropdown.Toggle
                      variant="success"
                      id="dropdown-basic"
                      className="userDropdown"
                    />

                    <Dropdown.Menu>
                      <Dropdown.Item
                        href="/thongTinNguoiDung"
                        className="text-center"
                      >
                        Thông tin
                      </Dropdown.Item>
                      <Dropdown.Item
                        onClick={handleLogout}
                        className="text-center"
                        as="button"
                      >
                        Đăng xuất
                      </Dropdown.Item>
                    </Dropdown.Menu>
                  </Dropdown>
                </div>
              </Nav>
            ) : (
              <Nav>
                <div className="authen ">
                  <a href="/dangKy" className="textA mx-2 ">
                    Đăng ký
                  </a>
                  <a href="/dangNhap" className="mx-2">
                    Đăng nhập
                  </a>
                </div>
              </Nav>
            )}
          </Navbar.Collapse>

          {/* Offcanvas */}
          <NavCanvas
            show={show}
            handleCanvas={handleCanvas}
            user={user}
            handleLogout={handleLogout}
            courseList={courseList}
            handleSearch={handleSearch}
          />
        </Container>
      </Navbar>
    </StyleNavBar>
  );
};

const StyleNavBar = styled.div`
  .searchInput {
    width: 60%;
    @media only screen and (max-width: 1200px) {
      width: 50%;
    }
  }
  .userDropdown {
    background-color: transparent !important;
    border: none;

    &::after {
      color: white;
      font-size: 20px;
      border-top: 0.5em solid !important;
      transition: all 0.3s;
    }
    &:hover::after {
      color: blue;
    }
  }

  .authen {
    a {
      color: #fff;
      text-decoration: none;
      transition: all 0.3s;

      &:hover {
        color: #bbb;
      }
    }
  }
`;
