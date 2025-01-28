import http from "../axios";
import { OrderDetail } from "../types/orderDetail";

export function getAllOrder() {
  return http.get("order-details");
}

export function createOrder(order: OrderDetail) {
  return http.post("order-details", order);
}

export default {
  getAllOrder,
  createOrder,
};
