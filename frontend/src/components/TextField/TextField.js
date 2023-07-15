import React from "react";
import "./TextField.css";
import propTypes from "prop-types";
import { ErrorMessage, useField } from "formik";

const TextField = ({ label, ...props }) => {
  const [field, meta] = useField(props);
  return (
    <>
      <div className="text-field">
        {label && <label htmlFor={field.name}>{label}</label>}
        <input
          id={field.name}
          className={`form-control shadow-none ${
            meta.touched && meta.error && "is-invalid"
          }`}
          {...field}
          {...props}
          autoComplete="off"
        />
      </div>
      <ErrorMessage
        component="div"
        name={field.name}
        className="small-text error"
      />
    </>
  );
};

TextField.propTypes = { label: propTypes.string };

export default TextField;
