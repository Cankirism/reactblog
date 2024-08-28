import React, { useState } from "react";
import "./login.css";
import back from "../../assets/images/my-account.jpg";
import { useFormik } from "formik";
import { login } from "../../api/api";
import { useHistory } from "react-router-dom";
import toast, { Toaster } from "react-hot-toast";
export const Login = () => {
  const [isLogin, setIsLogin] = useState(false);
  const history = useHistory();
  const handleLogin = async (values) => {
    
    try {
      if(values.username!="" &values.password!=""){
        const loginResult = await login(values);
      if (loginResult) {
        localStorage.setItem("token", loginResult.data.token);
        history.push("/");
      }
      }  
      else {
        toast.error("Alanları doldurunuz");
      } 
      
    } catch (err) {
      toast.error(err.response.data.message);
    }
  };
  const formik = useFormik({
    initialValues: {
      email: "",
      password: "",
    },
    onSubmit: async (values) => {

      await handleLogin(values);
    },
  });

  return (
    <>
      <Toaster />
      <section className="login">
        <div className="container">
          <div className="backImg">
            <img src={back} alt="" />
            <div className="text">
              <h3>Oturum Aç</h3>
             
            </div>
          </div>

          <form id="loginForm" onSubmit={formik.handleSubmit}>
            <span>Email *</span>
            <input
              type="text"
              required
              name="email"
              value={formik.values.email}
              onChange={formik.handleChange}
            />
            <span>Parola *</span>
            <input
              type="password"
              required
              name="password"
              value={formik.values.password}
              onChange={formik.handleChange}
            />
            <button
              className="button"
              type="submit"
              onClick={formik.handleSubmit}
            >
              Giriş
            </button>
          </form>
        </div>
      </section>
    </>
  );
};
