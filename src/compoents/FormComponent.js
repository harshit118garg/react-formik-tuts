import React from "react";
import { useFormik } from "formik";
import * as Yup from "yup";

const initialValues = {
  name: "Harshit",
  email: "",
  city: "",
};

const onSubmit = (values) => {
  // formik.values gives us access to form data
  console.log(values);
};

// const validate = (values) => {
//   let errors = {};

//   // name validation
//   if (!values.name) errors.name = `Required`;
//   // email validation
//   if (!values.email) errors.email = `Required`;
//   else if (
//     !/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(values.email)
//   ) {
//     errors.email = `Invalid Email Format`;
//   }
//   // city validation
//   if (!values.city) errors.city = `Required`;

//   return errors;
// };

const FieldSchema = Yup.object().shape({
  name: Yup.string().required("required name"),
  email: Yup.string()
    .email("Invalid email format")
    .required("email is required"),
  city: Yup.string().required("city is required"),
});

function FormComponent() {
  const formik = useFormik({
    initialValues,
    onSubmit,
    validationSchema: FieldSchema,
    // validate,
  });

  //   console.log("Form values", formik.values);
  //   console.log("Form errors", formik.errors);
  //   console.log("Visited Fields", formik.touched);

  return (
    <>
      <form autoComplete="off" onSubmit={formik.handleSubmit}>
        <div className="inputgrp">
          <label htmlFor="name">Name</label>
          <input
            type="text"
            name="name" 
            id="name"
            value={formik.values.name}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
          />
          {formik.touched.name && formik.errors.name ? (
            <p>{formik.errors.name}</p>
          ) : null}
        </div>

        <div className="inputgrp">
          <label htmlFor="email">Email</label>
          <input
            type="email"
            name="email"
            id="email"
            value={formik.values.email}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
          />
          {formik.touched.email && formik.errors.email ? (
            <p>{formik.errors.email}</p>
          ) : null}
        </div>

        <div className="inputgrp">
          <label htmlFor="city">City</label>
          <input
            type="text"
            name="city"
            id="city"
            value={formik.values.city}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
          />
          {formik.touched.city && formik.errors.city ? (
            <p>{formik.errors.city}</p>
          ) : null}
        </div>

        <button className="btnSubmit" type="submit">
          Submit
        </button>
      </form>
    </>
  );
}

export default FormComponent;

/*
    flow is as follows :
        1. first take the values from the initialValues object and set that to values object.

        2. on changing the input field the onChange event gets triggered that fires the handleChange method that updates the values object. 

        3. when the values object gets updated, it gets passed back into the form field.

    Thus the form state managed corectly. 
    */

/* 
        Form Submission flow :

        1. apply onSubmit eventHandler on the form that is triggering the formik.handleSubmit method

        2. at all times the onSubmit object will be recieving the latest values of the form data and later we can use them as per the requirement
    */
