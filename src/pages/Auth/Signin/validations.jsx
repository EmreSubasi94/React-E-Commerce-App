import * as yup from "yup";
const Validations = yup.object().shape({
  email: yup
    .string()
    .email("Geçerli bir email girin ")
    .required("Zorunlu alan"),
  password: yup
    .string()
    .min(8, "Parola en az 8 haneli olmalı")
    .required("Zorunlu alan"),
});
export default Validations;
