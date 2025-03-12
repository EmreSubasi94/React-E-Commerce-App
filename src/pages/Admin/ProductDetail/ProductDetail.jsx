import { useParams } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import { fetchProduct, UpdateProduct } from "../../../api";
import { Input, message } from "antd"; // message import edildi
import { Formik, Form, Field, FieldArray } from "formik";
import { Box, Button, FormControl, FormLabel, Text } from "@chakra-ui/react";
import TextArea from "antd/es/input/TextArea";
import validationSchema from "./Validations";

function AdminProductDetail() {
  const { product_id } = useParams();

  const { isLoading, isError, data, error } = useQuery({
    queryKey: ["admin:product", product_id],
    queryFn: () => fetchProduct(product_id),
  });

  const handleSubmit = async (values, bag) => {
    try {
      // Ürün güncelleniyor
      await UpdateProduct(values, product_id);

      // Başarı mesajı
      message.success("Ürün başarıyla güncellendi!", 3); // 3 saniye süreyle gösterilecektir
    } catch (e) {
      // Hata mesajı
      message.error("Ürün güncellenemedi, bir hata oluştu!");
    }
  };

  if (isLoading) return <p>Loading...</p>;
  if (isError) return <p>Error: {error.message}</p>;

  return (
    <div>
      <h2>Product Id: {product_id}</h2>
      <Formik
        enableReinitialize={true} // Sayfa tekrar render olduğunda Formik'in güncellenmesini sağlar
        initialValues={{
          title: data?.title || "",
          description: data?.description || "",
          price: data?.price || "",
          photos: data?.photos || "",
        }}
        validationSchema={validationSchema}
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
              <FormControl isInvalid={touched.title && errors.title}>
                <FormLabel>Title</FormLabel>
                <Field
                  as={Input}
                  name="title"
                  onChange={handleChange}
                  onBlur={handleBlur}
                  value={values.title}
                  disabled={isSubmitting}
                />
                {touched.title && errors.title && (
                  <Text color="red.500">{errors.title}</Text>
                )}
              </FormControl>

              {/* Price */}
              <FormControl isInvalid={touched.price && errors.price} mt={4}>
                <FormLabel>Price</FormLabel>
                <Field
                  as={Input}
                  type="number"
                  name="price"
                  onChange={handleChange}
                  onBlur={handleBlur}
                  value={values.price}
                  disabled={isSubmitting}
                />
                {touched.price && errors.price && (
                  <Text color="red.500">{errors.price}</Text>
                )}
              </FormControl>

              {/* Description */}
              <FormControl
                isInvalid={touched.description && errors.description}
                mt={4}
              >
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
                {touched.description && errors.description && (
                  <Text color="red.500">{errors.description}</Text>
                )}
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
                {touched.description && errors.description && (
                  <Text color="red.500">{errors.description}</Text>
                )}
              </FormControl>

              <Button
                type="submit"
                disabled={isSubmitting}
                colorScheme="blue"
                mt={3}
                position={"relative"}
                left={"45%"}
              >
                Submit
              </Button>
            </Box>
          </Form>
        )}
      </Formik>
    </div>
  );
}

export default AdminProductDetail;
