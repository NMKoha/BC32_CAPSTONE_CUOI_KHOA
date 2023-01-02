import React, { useState, useRef, useEffect } from "react";
// material ui
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";

//hook-form
import { useForm } from "react-hook-form";
// sweet alert
import swal from "sweetalert";
//styled compnent
import styled from "styled-components";
// router-dom
import { Link, useNavigate, useSearchParams } from "react-router-dom";
// icon
import { FaUserTie } from "react-icons/fa";
// axios
import authAPI from "../../../services/authAPI";

const Register = () => {
  const repMK = useRef(""); // ref kiểm tra việc nhập lại mật khẩu
  const errorSignup = useRef(null); // ref chứa thông tin lỗi truyền về từ back-end
  const signupSuccess = useRef(null); // ref chứa thông tin đăng nhập thành công để kiểm tra và redirect sang trang đăng nhập
  const loading = useRef(false); // ref kiểm tra trạng thái pending việc call api
  const navigate = useNavigate();

  const { register, handleSubmit, formState, reset } = useForm({
    defaultValues: {
      taiKhoan: "",
      matKhau: "",
      nhapLaiMatKhau: "",
      email: "",
      soDT: "",
      hoTen: "",
    },
    mode: "onBlur",
  });

  const { errors } = formState; // bóc tách biến errors từ object formState để quản lí lỗi hiện ra cho ng dùng

  // Regex field
  const regMK =
    /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{5,}$/;
  const regEmail = /^[\w-\.,';]+@([\w-]+\.)+[\w-]{2,4}$/;
  const regSoDt = /^[0-9]{9,}$/;
  const regTen = /\b([A-Z,a-z,À-ÿ ]+[ ]*)+/;

  const submit = async (values) => {
    const { nhapLaiMatKhau, ...newValue } = values;
    try {
      // pending thì set loading= true để disable nút đăng ký để ng dùng ko đc nhấp nhiều lần tránh việc call API nhìu lần
      loading.current = true;
      const data = await authAPI.register(newValue);
      // ====== Call api thành công
      // set ô input về rỗng
      reset({
        taiKhoan: "",
        matKhau: "",
        nhapLaiMatKhau: "",
        email: "",
        soDT: "",
        hoTen: "",
      });
      // set lại thông báo lỗi = null để ko hiển thị ngoài giao diện
      errorSignup.current = null;
      // set loading về lại false
      loading.current = false;
      // set giá trị để kiểm tra nếu đăng ký thành thông thì redirect qua trang đăng nhập
      signupSuccess.current = data;
      swal({
        text: "Đăng Ký Thành Công",
        icon: "success",
        button: false,
        timer: 1500,
      });
    } catch (error) {
      console.log(error);
      // set giá trị lỗi để hiễn thị ra giao diện
      errorSignup.current = error;
    }
  };

  if (signupSuccess.current) {
    setTimeout(() => {
      navigate("/dangNhap");
    }, 1500);
  }

  return (
    <StyleRegister>
      <div className="container d-flex justify-content-center">
        <div className="card">
          <div className="card-title">
            <FaUserTie className="title-icon" />
            <p className="title-text">
              <b>Đăng ký</b>
            </p>
          </div>
          <div className="card-body">
            <Box
              component="form"
              sx={{
                "& .MuiTextField-root": { my: 1, width: "100%" },
              }}
              noValidate
              autoComplete="off"
              onSubmit={handleSubmit(submit)}
            >
              <TextField
                autoComplete="taiKhoan"
                label="tài khoản*"
                variant="outlined"
                error={false}
                {...register("taiKhoan", {
                  required: {
                    value: true,
                    message: "Tài khoản không được bỏ trống",
                  },
                })}
              />
              {errors.taiKhoan && (
                <span className="text-danger" style={{ fontSize: "13px" }}>
                  {errors.taiKhoan.message}
                </span>
              )}

              <TextField
                autoComplete="matKhau"
                label="Mật khẩu*"
                type="password"
                variant="outlined"
                error={false}
                {...register("matKhau", {
                  required: {
                    value: true,
                    message: "Mật khẩu không được bỏ trống",
                  },
                  maxLength: {
                    value: 10,
                    message: "Mật khẩu tối đa 10 kí số",
                  },
                  minLength: {
                    value: 6,
                    message: "Mật khẩu ít nhất 6 kí số",
                  },
                  pattern: {
                    value: regMK,
                    message:
                      "Mật khẩu chứa ít nhất 1 ký tự số, 1 ký tự in hoa, 1 ký tự đặc biệt ",
                  },
                  onChange: (e) => (repMK.current = e.target.value),
                })}
              />
              {errors.matKhau && (
                <span className="text-danger" style={{ fontSize: "13px" }}>
                  {errors.matKhau.message}
                </span>
              )}

              <TextField
                autoComplete="nhapLaiMatKhau"
                label="Nhập lại mật khẩu*"
                type="password"
                variant="outlined"
                error={false}
                {...register("nhapLaiMatKhau", {
                  required: {
                    value: true,
                    message: "Vui lòng điền lại mật khẩu",
                  },
                  validate: (value) =>
                    value === repMK.current ||
                    "Mật khẩu không đúng , vui lòng nhập lại",
                })}
              />
              {errors.nhapLaiMatKhau && (
                <span className="text-danger" style={{ fontSize: "13px" }}>
                  {errors.nhapLaiMatKhau.message}
                </span>
              )}

              <TextField
                autoComplete="hoTen"
                label="Họ tên*"
                variant="outlined"
                error={false}
                {...register("hoTen", {
                  required: {
                    value: true,
                    message: "Họ tên không được bỏ trống",
                  },
                  pattern: {
                    value: regTen,
                    message:
                      "Tên chỉ chứa chữ cái - ko chứa số và kí tự đặc biệt ",
                  },
                })}
              />
              {errors.hoTen && (
                <span className="text-danger" style={{ fontSize: "13px" }}>
                  {errors.hoTen.message}
                </span>
              )}

              <TextField
                autoComplete="soDt"
                label="Số Điện Thoại*"
                variant="outlined"
                error={false}
                {...register("soDT", {
                  required: {
                    value: true,
                    message: "Số điện thoại không được bỏ trống",
                  },
                  pattern: {
                    value: regSoDt,
                    message: "Chỉ chứa số và không có kí tự , có ít nhất 9 số ",
                  },
                })}
              />
              {errors.soDT && (
                <span className="text-danger" style={{ fontSize: "13px" }}>
                  {errors.soDT.message}
                </span>
              )}

              <TextField
                autoComplete="email"
                label="Email*"
                variant="outlined"
                error={false}
                {...register("email", {
                  required: {
                    value: true,
                    message: "Email không được bỏ trống",
                  },
                  pattern: {
                    value: regEmail,
                    message:
                      "Vui lòng điền đúng định dạng ,  vd : dinhvana@gmail.com ",
                  },
                })}
              />
              {errors.email && (
                <span className="text-danger" style={{ fontSize: "13px" }}>
                  {errors.email.message}
                </span>
              )}

              <div className="text-center">
                <button className="myButton" disabled={loading.current}>
                  Đăng ký
                </button>
                {errorSignup.current && (
                  <div className="text-center py-2">
                    <span className="text-danger">{errorSignup.current}</span>
                  </div>
                )}
              </div>
            </Box>
            <div className="cardFooter d-flex justify-content-between my-3">
              <a href="/">Trở về trang chủ</a>
              <a href="/dangNhap">Bạn đã có tài khoản ? Đăng nhập</a>
            </div>
          </div>
        </div>
      </div>
    </StyleRegister>
  );
};

export default Register;

const StyleRegister = styled.div`
  .card {
    width: 550px;
    box-shadow: 0 0 10px 1px #bbb;
    margin: 60px 0;

    .card-title {
      text-align: center;
      margin: 20px 0 0 0;

      .title-icon {
        font-size: 60px;
      }

      .title-text {
        font-size: 20px;
        margin-top: 20px;
      }
    }
  }
`;
