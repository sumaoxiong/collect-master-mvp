//登入頁面

import axios from "axios";
import { useForm } from "react-hook-form";

const API_BASE = import.meta.env.VITE_API_BASE;
const API_PATH = import.meta.env.VITE_API_PATH;

function Login() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    mode: "onChange",
    defaultValues: {
      username: "",
      password: "",
    },
  });

  //登入處理
  const onSubmit = async (formData) => {
    try {
      const response = await axios.post(`${API_BASE}/admin/signin`, formData);
      console.log(response.data);
      const { token, expired } = response.data;
      document.cookie = `loginToken=${token};expires=${new Date(expired)};`;
    } catch (error) {
      console.log(error.response.data);
    }
  };

  return (
    <div className="container login">
      <h1>請先登入</h1>
      <form className="form-floating" onSubmit={handleSubmit(onSubmit)}>
        <div className="dorm-floating mb-3">
          <label htmlFor="username">Email address</label>
          <input
            type="email"
            className="form-control"
            name="username"
            placeholder="12345@example.com"
            {...register("username", {
              required: "請輸入Email",
              pattern: {
                value: /^\S+@\S+$/i,
                message: "Email 格式不正確",
              },
            })}
          />

          {errors.username && (
            <p className="text-danger">{errors.username.message}</p>
          )}
        </div>
        <div className="dorm-floating">
          <label htmlFor="password">Password</label>
          <input
            type="password"
            className="form-control"
            name="password"
            placeholder="12345@example.com"
            {...register("password", {
              required: "請輸入密碼",
              pattern: {
                value: 6,
                message: "密碼最少6位數",
              },
            })}
          />

          {errors.password && (
            <p className="text-danger">{errors.password.message}</p>
          )}
        </div>
        <button type="submit" className="btn btn-primary w-100 mt2">
          登入
        </button>
      </form>
    </div>
  );
}

export default Login;
