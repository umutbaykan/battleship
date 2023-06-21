import React, { useState } from "react";
import propTypes from "prop-types";
import { Formik, Form } from "formik";
import TextField from "../../components/TextField/TextField";
import * as Yup from "yup";

import { useCookies } from "react-cookie";
import { auth } from "../../services/auth";

const LoginForm = ({ navigate }) => {
  const [error, setError] = useState("");
  const [, setCookie, removeCookie] = useCookies([]);

  const validate = Yup.object({
    username: Yup.string().required("Required"),
    password: Yup.string().required("Password is required"),
  });

  const handleSubmit = async (values) => {
    const result = await auth(values.username, values.password, "login");
    if (result.success) {
      removeCookie("user_id");
      setCookie("user_id", result.user_id);
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
          <div>
            <h1>Log In</h1>
            <Form>
              <TextField label="username" name="username" type="text" />
              <TextField label="password" name="password" type="password" />
              <button type="submit">Login</button>
            </Form>
          </div>
        )}
      </Formik>
      <p>{error}</p>
    </>
  );
};

LoginForm.propTypes = { navigate: propTypes.func };

export default LoginForm;
