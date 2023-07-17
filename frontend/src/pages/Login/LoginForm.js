import React, { useState, useContext } from "react";
import "./LoginForm.css";
import { Formik, Form } from "formik";
import TextField from "../../components/TextField/TextField";
import * as Yup from "yup";
import { useNavigate } from "react-router-dom";
import { useCookies } from "react-cookie";

import { auth } from "../../services/auth";
import { LoggedInContext } from "../../App";

const LoginForm = () => {
  const [error, setError] = useState("");
  const [, setCookie] = useCookies(["user_id", "username"]);
  const navigate = useNavigate();
  const [, setLoggedIn] = useContext(LoggedInContext);

  const validate = Yup.object({
    username: Yup.string().required("Required"),
    password: Yup.string().required("Password is required"),
  });

  const handleSubmit = async (values) => {
    const result = await auth(values.username, values.password, "login");
    if (result.success) {
      setLoggedIn(true);
      setCookie("user_id", result.user_id);
      setCookie("username", result.username);
      navigate("/");
    } else {
      setError(result.error);
      navigate("/login");
    }
  };

  return (
    <>
      <Formik
        initialValues={{
          username: "",
          password: "",
        }}
        validationSchema={validate}
        onSubmit={(values, { resetForm }) => {
          handleSubmit(values);
          resetForm();
        }}
      >
        {() => (
          <div className="container">
            <div className="container-block login">
              <h3>Log In</h3>
              <Form>
                <TextField data-cy="username" label="Username" name="username" type="text" />
                <TextField data-cy="password" label="Password" name="password" type="password" />
                <button data-cy="login-submit" className="button-join" type="submit">
                  Login
                </button>
                <p data-cy="error-message" className="error">{error}</p>
              </Form>
            </div>
          </div>
        )}
      </Formik>
    </>
  );
};

export default LoginForm;
