import React from "react";
import {
  Formik,
  Form,
  Field,
  ErrorMessage,
  FieldArray,
  FastField,
} from "formik";
import * as Yup from "yup";
import ErrorMessages from "./ErrorMessages";

const initialValues = {
  name: "",
  email: "",
  city: "",
  comments: "",
  address: "",
  social: {
    fb: "",
    insta: "",
  },
  phoneNums: ["", ""],
  phNums: [""],
};

const onSubmit = (values) => {
  console.log(values);
};

const FieldSchema = Yup.object().shape({
  name: Yup.string().required("required name"),
  email: Yup.string()
    .email("Invalid email format")
    .required("email is required"),
  city: Yup.string().required("city is required"),
  // comments: Yup.string().required("please provide comments for improvement"),
  address: Yup.string().required("address is required"),
});

const FieldOnlyCommentsValidation = (value) => {
  let error;
  if (!value) {
    error = `comments are required`;
  }
  return error;
};

const FieldCustomValidation = (value) => {
  let error;
  if (!value) {
    error = `fill the field properly`;
  }
  return error;
};

function NewFormComponent() {
  return (
    <>
      <Formik
        initialValues={initialValues}
        onSubmit={onSubmit}
        validationSchema={FieldSchema}
        // validateOnChange={false}
        // validateOnBlur={false}
        // validateOnMount
      >
        {(formik) => {
          console.log("Formik Props", formik);

          return (
            <Form autoComplete="off">
              <div className="inputgrp">
                <label htmlFor="name">Name</label>
                <Field
                  type="text"
                  name="name"
                  id="name"
                  placeholder="Enter your name"
                />
                <ErrorMessage name="name" component={ErrorMessages} />
              </div>

              <div className="inputgrp">
                <label htmlFor="email">Email</label>
                <Field
                  type="email"
                  name="email"
                  id="email"
                  placeholder="Enter your email"
                />
                <ErrorMessage name="email">
                  {/* render props pattern for error messages */}
                  {(errorMsg) => <div className="error">{errorMsg}</div>}
                </ErrorMessage>
              </div>

              <div className="inputgrp">
                <label htmlFor="city">City</label>
                <Field
                  type="text"
                  name="city"
                  id="city"
                  placeholder="Enter your city"
                />
                <ErrorMessage name="city" component={ErrorMessages} />
              </div>

              <div className="inputgrp">
                <label htmlFor="comments">Comments</label>
                <Field
                  as="textarea"
                  name="comments"
                  id="comments"
                  placeholder="Enter your comments"
                  validate={FieldOnlyCommentsValidation}
                />
                <ErrorMessage name="comments" component={ErrorMessages} />
              </div>

              <div className="inputgrp">
                <label htmlFor="address">Address</label>
                <FastField name="address">
                  {/* render props pattern */}
                  {(props) => {
                    {
                      /* console.log("field render"); */
                    }
                    const { field, form, meta } = props;
                    return (
                      <div>
                        <input
                          type="text"
                          id="address"
                          {...field}
                          placeholder="enter your address"
                        />
                        {meta.touched && meta.error ? (
                          <div>{meta.error}</div>
                        ) : null}
                      </div>
                    );
                  }}
                </FastField>
              </div>

              <div className="inputgrp">
                <label htmlFor="fb">FaceBook</label>
                <Field
                  type="text"
                  name="social.fb"
                  id="fb"
                  placeholder="Enter your FaceBook ID"
                  validate={FieldCustomValidation}
                />
                <ErrorMessage name="social.fb" component={ErrorMessages} />
              </div>

              <div className="inputgrp">
                <label htmlFor="insta">Instagram</label>
                <Field
                  type="text"
                  name="social.insta"
                  id="insta"
                  placeholder="Enter your InstaGram ID"
                  validate={FieldCustomValidation}
                />
                <ErrorMessage name="social.insta" component={ErrorMessages} />
              </div>

              <div className="inputgrp">
                <label htmlFor="phoneNums">Primary Phone Number</label>
                <Field
                  type="text"
                  name="phoneNums[0]"
                  id="phoneNums"
                  placeholder="Enter your primary phone number"
                  validate={FieldCustomValidation}
                />
                <ErrorMessage name="phoneNums[0]" component={ErrorMessages} />
              </div>

              <div className="inputgrp">
                <label htmlFor="phoneNums">Secondary Phone Number</label>
                <Field
                  type="text"
                  name="phoneNums[1]"
                  id="phoneNums"
                  placeholder="Enter your secondary phone number"
                  validate={FieldCustomValidation}
                />
                <ErrorMessage name="phoneNums[1]" component={ErrorMessages} />
              </div>

              {/* phone numbers using FieldArray  */}
              <div className="inputgrp">
                <label htmlFor="phoneNums">Phone Numbers</label>
                <FieldArray name="phNums">
                  {(FielsArrayprops) => {
                    const { push, remove, form } = FielsArrayprops;
                    const { errors, values } = form;
                    const { phNums } = values;

                    {
                      /* console.log(errors); */
                    }
                    return (
                      <div>
                        {phNums.map((phNumber, index) => {
                          return (
                            <div key={index}>
                              <Field
                                type="number"
                                name={`phNums[${index}]`}
                                placeholder="enter phone numbers"
                                validate={FieldCustomValidation}
                              />
                              {index > 0 && (
                                <button
                                  type="button"
                                  className="btns"
                                  onClick={() => remove(index)}
                                >
                                  <i className="fas fa-minus"></i>
                                </button>
                              )}
                              <ErrorMessage
                                name={`phNums[${index}]`}
                                component={ErrorMessages}
                              />
                            </div>
                          );
                        })}
                        <button
                          type="button"
                          className="btns"
                          onClick={() => push("")}
                        >
                          <i className="fas fa-plus"></i>
                        </button>
                      </div>
                    );
                  }}
                </FieldArray>
              </div>

              <button
                type="button"
                className="btnSubmit"
                onClick={() => formik.validateField("comments")}
              >
                Validate Comments
              </button>
              <br />
              <button
                type="button"
                className="btnSubmit"
                onClick={() => formik.validateForm()}
              >
                Validate All Fields
              </button>
              <br />
              <button
                type="button"
                className="btnSubmit"
                onClick={() => formik.setFieldTouched("comments")}
              >
                Visit Comments
              </button>
              <br />
              <button
                type="button"
                className="btnSubmit"
                onClick={() =>
                  formik.setTouched({
                    name: true,
                    email: true,
                    comments: true,
                    city: true,
                    address: true,
                  })
                }
              >
                Visit Fields
              </button>
              <br />
              <button
                className="btnSubmit"
                type="submit"
                disabled={!(formik.dirty && formik.isValid)}
              >
                Submit
              </button>
            </Form>
          );
        }}
      </Formik>
    </>
  );
}

export default NewFormComponent;
