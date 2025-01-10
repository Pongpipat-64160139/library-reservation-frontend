<template>
    <div class="month-picker">
      <button @click="toggleDropdown">{{ months[selectedMonth - 1] }}</button>
      <div v-if="isDropdownVisible" class="month-grid">
        <div
          v-for="(month, index) in months"
          :key="index"
          class="month-item"
          @click="selectMonth(index + 1)"
        >
          {{ month }}
        </div>
      </div>
    </div>
  </template>
  
  <script>
  export default {
    props: {
      selectedMonth: {
        type: Number,
        required: true,
      },
    },
    data() {
      return {
        months: [
          "มกราคม",
          "กุมภาพันธ์",
          "มีนาคม",
          "เมษายน",
          "พฤษภาคม",
          "มิถุนายน",
          "กรกฎาคม",
          "สิงหาคม",
          "กันยายน",
          "ตุลาคม",
          "พฤศจิกายน",
          "ธันวาคม",
        ],
        isDropdownVisible: false,
      };
    },
    methods: {
      toggleDropdown() {
        this.isDropdownVisible = !this.isDropdownVisible;
      },
      selectMonth(month) {
        this.isDropdownVisible = false;
        this.$emit("update:selectedMonth", month);
      },
    },
  };
  </script>
  
  <style>
  .month-picker {
    position: relative;
    display: inline-block;
  }
  
  .month-picker button {
    padding: 10px 15px;
    border: 2px solid #493628;
    background-color: #f5eded;
    border-radius: 5px;
    cursor: pointer;
  }
  
  .month-grid {
    display: grid;
    grid-template-columns: repeat(3, 1fr);
    gap: 10px;
    background-color: #f5eded;
    border: 2px solid #493628;
    border-radius: 5px;
    position: absolute;
    z-index: 100;
    padding: 10px;
  }
  
  .month-item {
    text-align: center;
    padding: 5px;
    cursor: pointer;
    border: 1px solid transparent;
    border-radius: 3px;
    transition: background-color 0.3s, border-color 0.3s;
  }
  
  .month-item:hover {
    background-color: #b5cfb7;
    border-color: #493628;
  }
  </style>
  