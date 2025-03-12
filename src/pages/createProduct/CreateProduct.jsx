import { useParams } from "react-router-dom";
import { useQuery, useQueryClient, useMutation } from "@tanstack/react-query";
import { fetchProduct, postProduct, UpdateProduct } from "../../api";
import { Input, message } from "antd"; // message import edildi
import { Formik, Form, Field, FieldArray } from "formik";
import { Box, Button, FormControl, FormLabel, Text } from "@chakra-ui/react";
import TextArea from "antd/es/input/TextArea";

function CreateProduct() {
  const queryClient = useQueryClient();
  const newProductMutation = useMutation({
    mutationFn: postProduct,
    onSuccess: () => queryClient.invalidateQueries("Admin:Product"),
    onError: (error) => {
      console.error("Hata oluştu:", error.message);
    },
  });
  const handleSubmit = async (values, bag) => {
    try {
      const newValues = {
        ...values,
        photos: JSON.stringify(values.photos),
      };
      newProductMutation.mutate(newValues, {
        onSuccess: () => {
          console.log("Success");
        },
      });
    } catch (e) {}
  };

  return (
    <div>
      <Formik
        enableReinitialize={true} // Sayfa tekrar render olduğunda Formik'in güncellenmesini sağlar
        initialValues={{
          title: "",
          description: "",
          price: "",
          photos: "",
        }}
        //validationSchema={validationSchema}
        onSubmit={handleSubmit}
      >
        {({
          errors,
          touched,
          handleChange,
          handleBlur,
          values,
          isSubmitting,
        }) => (
          <Form>
            <Box my={5} textAlign="left">
              {/* Title */}
              <FormControl>
                <FormLabel>Title</FormLabel>
                <Field
                  as={Input}
                  name="title"
                  onChange={handleChange}
                  onBlur={handleBlur}
                  value={values.title}
                  disabled={isSubmitting}
                />
              </FormControl>

              {/* Price */}
              <FormControl>
                <FormLabel>Price</FormLabel>
                <Field
                  as={Input}
                  type="text"
                  name="price"
                  onChange={handleChange}
                  onBlur={handleBlur}
                  value={values.price}
                  disabled={isSubmitting}
                />
              </FormControl>

              {/* Description */}
              <FormControl mt={4}>
                <FormLabel>Description</FormLabel>
                <Field
                  as={TextArea}
                  name="description"
                  onChange={handleChange}
                  onBlur={handleBlur}
                  value={values.description}
                  disabled={isSubmitting}
                  style={{ height: "150px" }}
                />
              </FormControl>
              <FormControl mt={4}>
                <FormLabel>Photos</FormLabel>
                <FieldArray
                  name="photos"
                  render={(arrayHelpers) => (
                    <div>
                      {values.photos &&
                        values.photos.map((photo, index) => (
                          <div key={index} style={{ height: "60px" }}>
                            <Input
                              style={{
                                marginTop: "10px",
                                display: "inline-block",
                                width: "90%",
                                marginRight: "20px",
                              }}
                              name={`photos.${index}`}
                              value={photo}
                              onChange={handleChange}
                            ></Input>
                            <Button
                              colorScheme="red"
                              onClick={() => arrayHelpers.remove(index)}
                            >
                              Sil
                            </Button>
                          </div>
                        ))}
                      <Button onClick={() => arrayHelpers.push("")}>
                        Fotoğraf Ekle
                      </Button>
                    </div>
                  )}
                />
              </FormControl>

              <Button
                type="submit"
                disabled={isSubmitting}
                colorScheme="blue"
                mt={3}
                position={"relative"}
                left={"45%"}
              >
                Save
              </Button>
            </Box>
          </Form>
        )}
      </Formik>
    </div>
  );
}

export default CreateProduct;
