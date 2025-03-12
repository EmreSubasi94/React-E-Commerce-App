import React from "react";
import * as yup from "yup";

const validationSchema = yup.object().shape({
  title: yup.string().required(),
  description: yup.string().required(),
  price: yup.string().required(),
});

export default validationSchema;
