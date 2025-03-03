<template>
  <Header_page />
  <v-container fluid class="back-ground ms-kob">
    <Form_meeting />
    <Form_equipment class="mt-1" />
    <!-- to="/table_meeting" -->
    <v-btn
      type="submit"
      class="save-btn custom-btn"
      @click="saveReserved()"
      :disabled="
        srbStore.newSRB.people_Count === 0 ||
        srbStore.newSRB.contract_Number.length !== 10 ||
        !documentFileStore.currentDocument
      "
    >
      <v-icon left> mdi-content-save </v-icon>
      จองห้อง
    </v-btn>
  </v-container>
</template>
<script setup lang="ts">
import { useDocumentStore } from "@/stores/documentStore";
import { useEqBookStore } from "@/stores/eqBookStore";
import { useEquipmentStore } from "@/stores/equipmentStore";
import { useOrderDetialStore } from "@/stores/orderStore";
import { useSpecialRoomStore } from "@/stores/srbStore";
import type { GetSpecialRoomBooking } from "@/types/specialRoomBooking";
import { onMounted } from "vue";
import { useRouter } from "vue-router";

const eqStore = useEquipmentStore();
const orderStore = useOrderDetialStore();
const documentFileStore = useDocumentStore();
const eqbStore = useEqBookStore();
const srbStore = useSpecialRoomStore();
// eslint-disable-next-line @typescript-eslint/no-unused-vars
const router = useRouter();
onMounted(() => {
  try {
  } catch (error) {
    console.error("error load data ", error);
  }
});
function modifyReserved() {
  srbStore.newSRB.people_Count = Number(srbStore.newSRB.people_Count);
  if (srbStore.newSRB.equip_Descript.length < 0) {
    srbStore.newSRB.equip_Descript = "-";
  }
  if (srbStore.newSRB.order_Description.length < 0) {
    srbStore.newSRB.order_Description = "-";
  }
  if (srbStore.newSRB.stage_Name.length < 0) {
    srbStore.newSRB.stage_Name = "-";
  }
}
function getDatesBetween(startDate: string, endDate: string): string[] {
  const dates = []; // 📝 เตรียมตัวแปรสำหรับเก็บวันที่ทั้งหมด
  // eslint-disable-next-line prefer-const
  let current = new Date(startDate); // 🕒 แปลงวันที่เริ่มต้นให้เป็น Date object
  const end = new Date(endDate); // ⏰ แปลงวันที่สิ้นสุดให้เป็น Date object

  // 🔁 วนลูปไปเรื่อยๆ จนกว่าถึงวันที่สิ้นสุด
  while (current <= end) {
    const formattedDate = current.toISOString().split("T")[0]; // 📆 แปลงวันที่ให้อยู่ในรูปแบบ YYYY-MM-DD
    dates.push(formattedDate); // 🗂️ เพิ่มวันที่ลงใน array
    current.setDate(current.getDate() + 1); // ➡️ ขยับไปวันถัดไป
  }

  return dates; // 🛠️ ส่งคืน array ของวันที่ทั้งหมด
}
function resetDate() {
  srbStore.newSRB = {
    people_Count: 0, // ค่าเริ่มต้นเป็น 0 (ยังไม่มีคน)
    contract_Number: "", // ค่าเริ่มต้นเป็น String ว่าง
    start_Date: "", // ค่าเริ่มต้นให้เป็นค่าว่าง
    start_Time: "",
    end_Date: "",
    end_Time: "",
    stage_Name: "",
    reseve_status: "อนุมัติ",
    equip_Descript: "",
    order_Description: "",
    document: 0, // ID เอกสารเป็น 0
    userId: 0, // ค่าเริ่มต้นให้เป็น 0 (ยังไม่มีการระบุผู้ใช้)
    reason: "",
    cancelTime: "",
    roomId: 0, // ค่าเริ่มต้นให้เป็น 0
  };
  orderStore.orders = [];
  eqStore.selectedEQForm = [];
  documentFileStore.currentDocument = null;
}
async function saveReserved() {
  const dateBetween = getDatesBetween(
    srbStore.newSRB.start_Date,
    srbStore.newSRB.end_Date
  );
  const file = await documentFileStore.currentDocument;
  const newFile = await documentFileStore.newDocumentFile(file!);
  if (!newFile) {
    console.error("Can't create new document");
    return;
  }
  if (dateBetween.length > 1) {
    try {
      for (let i = 0; i < dateBetween.length; i++) {
        srbStore.newSRB.document = newFile.id;
        srbStore.newSRB.start_Date = dateBetween[i];
        modifyReserved();
        const createdNewSRB = await srbStore.createSpecialRoom(srbStore.newSRB);
        const newSRBChangeType = createdNewSRB as GetSpecialRoomBooking;
        console.log("New Reserved :", newSRBChangeType);
        if (orderStore.orders.length > 0) {
          // eslint-disable-next-line @typescript-eslint/no-unused-vars
          const createOrder = await orderStore.createdOrder(
            createdNewSRB.srb_Id
          );
        }
        if (eqStore.selectedEQForm.length > 0) {
          for (let i = 0; i < eqStore.selectedEQForm.length; i++) {
            eqbStore.createdEQB(
              newSRBChangeType.srb_Id!,
              eqStore.selectedEQForm[i].eq_Id
            );
          }
        }
      }
    } catch (error) {
      console.log(error);
    }
  } else if (dateBetween.length == 1) {
    srbStore.newSRB.document = newFile.id;
    srbStore.newSRB.start_Date = dateBetween[0];
    modifyReserved();
    console.log("New Reserved :", srbStore.newSRB);
    const createdNewSRB = await srbStore.createSpecialRoom(srbStore.newSRB);
    const newSRBChangeType = createdNewSRB as GetSpecialRoomBooking;
    console.log("New Reserved :", newSRBChangeType);
    if (orderStore.orders.length > 0) {
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      const createOrder = await orderStore.createdOrder(createdNewSRB.srb_Id);
    }
    if (eqStore.selectedEQForm.length > 0) {
      for (let i = 0; i < eqStore.selectedEQForm.length; i++) {
        eqbStore.createdEQB(
          newSRBChangeType.srb_Id!,
          eqStore.selectedEQForm[i].eq_Id
        );
      }
    }
  }
  resetDate();
  router.push("/table_meeting");
}
</script>
<style scoped>
@import url("https://fonts.googleapis.com/css2?family=Kanit:wght@300;400;600&display=swap");

* {
  font-family: "Kanit", sans-serif;
  color: #493628;
}

.head-title {
  font-weight: 600;
  font-size: 16px;
}

.save-btn {
  margin-left: 100px;
  margin-top: 20px;
  font-weight: 600;
  font-size: 16px;
}

.custom-btn {
  background-color: #f5eded !important;
  color: #493628 !important;
  margin-left: 1190px;
  width: 150px;
  height: 40px;
  border: 2px solid #493628;
}

.custom-btn .v-icon {
  color: #493628 !important;
  margin-right: 10px;
}

.back-ground {
  background-color: #f9f3ea;
  background-image: url("@/assets/subtle-dark-vertical.png");
  background-repeat: repeat;
  background-size: auto;
  background-position: top left;
}

.ms-kob {
  margin-top: -300px;
}
</style>
