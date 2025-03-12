import {
  Flex,
  Heading,
  Box,
  Input,
  Button,
  Alert,
  Link,
} from "@chakra-ui/react";
import { useNavigate } from "react-router-dom";
import React from "react";
import { useFormik } from "formik";
import Validations from "./validations";
import { fetchRegister } from "../../../api";
import { useAuth } from "../../../context/AuthContext";

function SignUp() {
  const navigate = useNavigate();
  const { login } = useAuth();
  const formik = useFormik({
    initialValues: {
      email: "",
      password: "",
      passwordConfirm: "",
    },
    validationSchema: Validations,
    onSubmit: async (values, bag) => {
      try {
        const registerResponse = await fetchRegister({
          email: values.email,
          password: values.password,
        });

        login(registerResponse);
        navigate("/product");
      } catch (e) {
        bag.setErrors({ general: e.response.data.message });
      }
    },
  });
  return (
    <div>
      <Flex align="center" width="full" justifyContent="center">
        <Box pt={10}>
          <Box textAlign="center">
            <Heading style={{ fontSize: "30px", marginBottom: "50px" }}>
              Sign Up
            </Heading>
          </Box>
          <Box my={5}>
            {formik.errors.general && (
              <Alert status="error">{formik.errors.general}</Alert>
            )}
          </Box>
          <Box my={5} textAlign="left">
            <form onSubmit={formik.handleSubmit}>
              <label
                style={{
                  marginBottom: "5px",
                  textAlign: "center",
                  display: "flex",
                  justifyContent: "center",
                }}
              >
                E-mail
              </label>
              <Input
                name="email"
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                value={formik.values.email}
              ></Input>
              {formik.errors.email && formik.touched.email && (
                <div style={{ color: "red" }}>{formik.errors.email}</div>
              )}
              <label
                style={{
                  margin: "4px 0px",
                  textAlign: "center",
                  display: "flex",
                  justifyContent: "center",
                }}
              >
                Password
              </label>
              <Input
                name="password"
                type="password"
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                value={formik.values.password}
              ></Input>
              {formik.errors.password && formik.touched.password && (
                <div style={{ color: "red" }}>{formik.errors.password}</div>
              )}
              <label
                style={{
                  margin: "4px 0px",
                  textAlign: "center",
                  display: "flex",
                  justifyContent: "center",
                }}
              >
                Password Confirm
              </label>
              <Input
                name="passwordConfirm"
                type="password"
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                value={formik.values.passwordConfirm}
              ></Input>
              {formik.errors.passwordConfirm && formik.touched.password && (
                <div style={{ color: "red" }}>
                  {formik.errors.passwordConfirm}
                </div>
              )}
              <Link to="/products">
                <Button
                  type="submit"
                  colorScheme="gray"
                  style={{
                    width: "100%",
                    marginTop: "20px",
                    display: "flex",
                    justifyContent: "center",
                  }}
                >
                  Sign UP
                </Button>
              </Link>
            </form>
          </Box>
        </Box>
      </Flex>
    </div>
  );
}

export default SignUp;
