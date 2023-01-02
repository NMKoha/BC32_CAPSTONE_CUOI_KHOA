import React from "react";
// material ui
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
// bootstrap
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
//hook-form
import { useForm } from "react-hook-form";
// sweet alert
import swal from "sweetalert";
// router-dom
import { Link, useNavigate, useSearchParams } from "react-router-dom";
//styled compnent
import styled from "styled-components";
// redux
import { useDispatch, useSelector } from "react-redux";
//redux action
import { logIn } from "../../../slices/AuthSlice";
import { handleRemember } from "../../../slices/AuthSlice";
// icon
import { FaUserTie } from "react-icons/fa";

const Login = () => {
  const dispatch = useDispatch();
  const { user, loading, error } = useSelector((state) => state.AuthSlice); // giá trị lấy từ redux
  const [searchParams, setSearchParams] = useSearchParams();
  const navigate = useNavigate();

  const { register, handleSubmit, formState } = useForm({
    defaultValues: { taiKhoan: "", matKhau: "" },
    mode: "onBlur",
  });

  const { errors } = formState; // hàm chứa lỗi từ formState

  const onSubmit = (values) => {
    dispatch(logIn(values));
  };

  if (user) {
    const url = searchParams.get("redirectURL");
    swal({
      text: "Đăng nhập thành công",
      button: false,
      icon: "success",
      closeOnClickOutside: false,
      closeOnEsc: false,
      timer: 1500,
    });
    setTimeout(() => {
      navigate(url || "/", { replace: true });
    }, 1500);
  }

  return (
    <LoginStyle>
      <div className="container d-flex justify-content-center">
        <div className="card">
          <div className="card-title">
            <FaUserTie className="title-icon" />
            <p className="title-text">
              <b>Đăng Nhập</b>
            </p>
          </div>
          <div className="card-body">
            <Box
              component="form"
              sx={{
                "& > :not(style)": { my: 1, width: "100%" },
              }}
              noValidate
              autoComplete="off"
              onSubmit={handleSubmit(onSubmit)}
            >
              <TextField
                autoComplete="taiKhoan"
                label="Tài Khoản"
                variant="outlined"
                error={false}
                {...register("taiKhoan", {
                  required: {
                    value: true,
                    message: "Tài khoản ko đc để trống",
                  },
                })}
              />
              {errors.taiKhoan && (
                <span className="text-danger">{errors.taiKhoan.message}</span>
              )}
              <TextField
                autoComplete="matKhau"
                label="Mật Khẩu"
                type="password"
                variant="outlined"
                error={false}
                {...register("matKhau", {
                  required: {
                    value: true,
                    message: "Mật khẩu ko đc để trống",
                  },
                })}
              />
              {errors.matKhau && (
                <span className="text-danger">{errors.matKhau.message}</span>
              )}

              <Form.Check
                onChange={() => dispatch(handleRemember())}
                type="checkbox"
                label="Hãy ghi nhớ tôi "
              />

              <div className="text-center mt-2">
                <button className="myButton" disabled={loading}>
                  Đăng nhập
                </button>
              </div>
              {error && (
                <div className="text-center">
                  <span className="text-danger">{error.message}</span>
                </div>
              )}
            </Box>
            <div className="cardFooter d-flex justify-content-between my-3">
              <a href="/">Trở về trang chủ</a>
              <a href="/dangKy">Bạn chưa có tài khoản ? Đăng ký</a>
            </div>
          </div>
        </div>
      </div>
    </LoginStyle>
  );
};

export default Login;

const LoginStyle = styled.div`
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
