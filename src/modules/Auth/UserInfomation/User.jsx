import React, { useState, useRef, useEffect } from "react";
// material ui
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
//hook-form
import { useForm } from "react-hook-form";
// sweet alert
import swal from "sweetalert";
// axios
import authAPI from "../../../services/authAPI";
// redux
import { useDispatch } from "react-redux";
import { logIn } from "../../../slices/AuthSlice";

const User = () => {
  const errorSignup = useRef(null); // ref chứa thông tin lỗi truyền về từ back-end
  const loading = useRef(false); // ref kiểm tra trạng thái pending việc call api
  const [isChange, setisChange] = useState(true); // state kiểm soát nút submit
  const dispatch = useDispatch();
  const { register, handleSubmit, formState, reset ,getValues} = useForm({
    defaultValues: {
      taiKhoan: "",
      matKhau: "",
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

  useEffect(() => {
    (async () => {
      try {
        // bóc tách danh sách khóa học đã đăng ký và thông tin user
        const { chiTietKhoaHocGhiDanh, ...userInformation } =
          await authAPI.getUserInformation();

        // reset thông tin điền vào ô input
        reset({
          ...userInformation,
        });
      } catch (error) {
        console.log(error);
      }
    })();
  }, []);

  const submit = async (values) => {
    try {
      //pending set loading = true ngăn chặn ng dùng click nhiều lần
      loading.current = true;
      await authAPI.updateUser(values);

      // thành công set loading = false
      loading.current = false;
      // thông báo ng dùng
      swal({
        text: "Cập nhật thông tin thành công",
        icon: "success",
        button: false,
        timer: 15000,
        closeOnClickOutside: false,
        closeOnEsc: false,
      });
      //thực hiện re-login
      dispatch(logIn({ taiKhoan: values.taiKhoan, matKhau: values.matKhau }));
      // reload lại trang web
      setTimeout(() => {
        window.location.reload();
      }, 1500);
    } catch (error) {
      console.log(error);
    }
  };

  const handleChange = () => {
    setisChange(false);
  };
  return (
    <div className="container">
      <div className="inner-user">
        <Box
          component="form"
          sx={{
            "& .MuiTextField-root": { my: 1, width: "100%" },
          }}
          noValidate
          autoComplete="off"
          onSubmit={handleSubmit(submit)}
        >
          <div className="left-inputs">
            <div className="input-items">
              <TextField
                focused
                InputProps={{
                  readOnly: true,
                }}
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
                <span className="text-danger">{errors.taiKhoan.message}</span>
              )}
            </div>

            <div className="input-items">
              <TextField
                focused
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
                  onChange: (evt) => handleChange(evt),
                })}
              />
              {errors.matKhau && (
                <span className="text-danger">{errors.matKhau.message}</span>
              )}
            </div>

            <div className="input-items">
              <TextField
                focused
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
                  onChange: (evt) => handleChange(evt),
                })}
              />
              {errors.hoTen && (
                <span className="text-danger">{errors.hoTen.message}</span>
              )}
            </div>
          </div>

          <div className="right-inputs">
            <div className="input-items">
              <TextField
                focused
                autoComplete="soDT"
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
                  onChange: (evt) => handleChange(evt),
                })}
              />
              {errors.soDT && (
                <span className="text-danger">{errors.soDT.message}</span>
              )}
            </div>

            <div className="input-items">
              <TextField
                focused
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
                  onChange: (evt) => handleChange(evt),
                })}
              />
              {errors.email && (
                <span className="text-danger">{errors.email.message}</span>
              )}
            </div>

            <div className="text-center">
              <button
                className="myButton"
                disabled={isChange}
                style={
                  isChange
                    ? { cursor: "no-drop", opacity: "0.5" }
                    : { cursor: "pointer" }
                }
              >
                Cập nhật
              </button>
              {errorSignup.current && (
                <div className="text-center py-2">
                  <span className="text-danger">{errorSignup.current}</span>
                </div>
              )}
            </div>
          </div>
        </Box>
      </div>
    </div>
  );
};

export default User;
