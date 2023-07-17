import React, { useState, useContext } from "react";
import { Formik, Form } from "formik";
import TextField from "../../components/TextField/TextField";
import * as Yup from "yup";
import { useNavigate } from "react-router-dom";
import { useCookies } from "react-cookie";

import { auth } from "../../services/auth";
import { LoggedInContext } from "../../App";

const SignUpForm = () => {
  const [error, setError] = useState("");
  const [, setCookie] = useCookies(["user_id"]);
  const navigate = useNavigate();
  const [, setLoggedIn] = useContext(LoggedInContext);

  const validate = Yup.object({
    username: Yup.string()
      .min(3, "Must be at least 3 characters.")
      .max(15, "Must be 15 characters or less")
      .required("Required"),
    password: Yup.string()
      .min(8, "Password must be at least 8 charaters.")
      .required("Password is required."),
    confirmPassword: Yup.string()
      .oneOf([Yup.ref("password"), null], "Password must match.")
      .required("Confirm password is required."),
  });

  const handleSubmit = async (values) => {
    const result = await auth(values.username, values.password, "register");
    if (result.success) {
      setLoggedIn(true);
      setCookie("user_id", result.user_id);
      setCookie("username", result.username);
      navigate("/");
    } else {
      setError(result.error);
      navigate("/signup");
    }
  };

  return (
    <>
      <Formik
        initialValues={{
          username: "",
          password: "",
          confirmPassword: "",
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
              <h3>Sign Up</h3>
              <Form>
                <TextField data-cy="username" label="Username" name="username" type="text" />
                <TextField data-cy="password" label="Password" name="password" type="password" />
                <TextField
                  data-cy="confirm-password"
                  label="Confirm Password"
                  name="confirmPassword"
                  type="password"
                />
                <button data-cy="signup-submit" className="button-join" type="submit">
                  Register
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

export default SignUpForm;
