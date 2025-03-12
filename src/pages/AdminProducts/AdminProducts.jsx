import { useMemo, useState } from "react";
import { Popconfirm, Table } from "antd";
import "./styles.module.css";
import { fetchProductList, fetchDel } from "../../api";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { Link } from "react-router-dom";
import { Button } from "@chakra-ui/react";

function AdminProducts() {
  const queryClient = useQueryClient();
  const deleteMutation = useMutation({
    mutationFn: fetchDel,
    onSuccess: () => queryClient.invalidateQueries("Admin:Product"),
    onError: (error) => {
      console.error("Hata oluştu:", error.message);
    },
  });

  const { isLoading, isError, error, data } = useQuery({
    queryKey: ["Admin:Product"],
    queryFn: fetchProductList,
  });
  const columns = useMemo(() => {
    return [
      {
        title: "Title",
        dataIndex: "title",
        key: "title",
      },
      {
        title: "Price",
        dataIndex: "price",
        key: "price",
      },
      {
        title: " Date Added",
        dataIndex: "createdAt",
        key: "createdAt",
      },
      {
        title: " ",
        key: "action",
        render: (text, record) => (
          <>
            <Link to={`/admin/products/${record._id}`}>Edit</Link>
            <Popconfirm
              title="Silmek istediğinizden emin misiniz?"
              onConfirm={() => {
                deleteMutation.mutate(record._id, {
                  onSuccess: () => {
                    console.log("Success");
                  },
                });
              }}
              okText="Evet"
              cancelText="Hayır"
              placement="left"
            >
              <a href="#" style={{ marginLeft: "10px" }}>
                Delete
              </a>
            </Popconfirm>
          </>
        ),
      },
    ];
  });
  return (
    <div>
      <Table columns={columns} dataSource={data} rowKey="_id" />
      <Link to={"/admin/products/new"}>
        <Button colorScheme="blue" mt={5}>
          Ürün Ekle
        </Button>
      </Link>
    </div>
  );
}

export default AdminProducts;
