import fetcher from "./fetcher";

const authAPI = {
  getUserLogin: (value) => {
    return fetcher.post("QuanLyNguoiDung/DangNhap", value);
  },

  register: (value) => {
    return fetcher.post("QuanLyNguoiDung/DangKy", {
      maNhom: "GP01",
      ...value,
    });
  },

  getUserInformation: () => {
    return fetcher.post("QuanLyNguoiDung/ThongTinNguoiDung");
  },

  updateUser:(values)=>{
    return fetcher.put('QuanLyNguoiDung/CapNhatThongTinNguoiDung',values)
  }
};

export default authAPI;
