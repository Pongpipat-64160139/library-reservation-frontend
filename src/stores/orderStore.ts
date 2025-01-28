import { defineStore } from "pinia";
import floorService from "../services/floorService";
import orderDetailService from "../services/orderDetailService";
import { OrderDetail } from "../types/orderDetail";
import { ref } from "vue";

export const useOrderDetialStore = defineStore("orderDetials", () => {
  const orderService = orderDetailService;
  const orders = ref<OrderDetail[]>([]);
  function resetOrders() {
    orders.value = [];
    return orders;
  }
  function createdOrder(specialID: number) {
    for (let i = 0; i < orders.value.length; i++) {
      let newOrder = orderService.createOrder({
        srb_Id: specialID,
        Serve_Time: orders.value[i].Serve_Time,
        Serve_Name: orders.value[i].Serve_Name,
        Serve_Categories: orders.value[i].Serve_Categories,
        Quantity: Number(orders.value[i].Quantity),
        CostPerson: Number(orders.value[i].CostPerson),
      });
      console.log("New Order : ", newOrder);
    }
  }
  return {
    orders,
    resetOrders,
    createdOrder,
  };
});
