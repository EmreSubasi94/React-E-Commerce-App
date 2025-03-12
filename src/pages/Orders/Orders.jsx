import React from "react";
import moment from "moment";
import { Link } from "react-router-dom";
import {
  Table,
  Thead,
  Tbody,
  Tr,
  Th,
  Td,
  TableCaption,
  Text,
  Tooltip,
  Box,
  Button,
  Popover,
  PopoverTrigger,
  PopoverContent,
  PopoverArrow,
  PopoverBody,
} from "@chakra-ui/react";
import { useQuery } from "@tanstack/react-query";
import { fetchOrders } from "../../api";
function Orders() {
  const handleClick = (e) => {
    e.target.parentElement.parentElement.remove();
  };
  const { isLoading, isError, data, error } = useQuery({
    queryKey: ["admin:orders"],
    queryFn: fetchOrders,
  });
  if (isLoading) {
    return <div>Loading...</div>;
  }
  if (isError) {
    return <div>Error {error.message}</div>;
  }
  return (
    <div>
      <Text fontSize="2xl">Orders</Text>
      <Table variant="simple">
        <TableCaption></TableCaption>
        <Thead>
          <Tr>
            <Th>User</Th>
            <Th>Address</Th>
            <Th>Items</Th>
            <Th>Order Date</Th>
            <Th></Th>
          </Tr>
        </Thead>
        <Tbody>
          {data.map((item) => {
            console.log(item);
            return (
              <Tr key={item._id}>
                <Td>{item.user.email}</Td>
                <Td>{item.adress}</Td>
                <Td>
                  <span>{item.items.length} </span>

                  <Popover>
                    <PopoverTrigger>
                      <Button width={"60px"} ml={3} fontSize={"10px"}>
                        Ürünleri gör
                      </Button>
                    </PopoverTrigger>
                    <PopoverContent>
                      <PopoverArrow />
                      <PopoverBody
                        aria-label="Item details"
                        hasArrow
                        placement="top"
                        bg="gray.700"
                        color="white"
                        borderRadius="md"
                      >
                        <Box>
                          {item.items.map((i) => (
                            <Link to={`/product/${i._id}`} target="_blank">
                              <Text key={i._id} mt={3} mb={3}>
                                {i.title} (ID: {i._id})
                              </Text>
                            </Link>
                          ))}
                        </Box>
                      </PopoverBody>
                    </PopoverContent>
                  </Popover>
                </Td>
                <Td>{moment(item.createdAt).format("DD/MM/YYYY")}</Td>
                <Td>
                  <Button onClick={handleClick}>Sil</Button>
                </Td>
              </Tr>
            );
          })}
        </Tbody>
      </Table>
    </div>
  );
}

export default Orders;
