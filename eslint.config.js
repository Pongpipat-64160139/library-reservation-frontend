/**
 * 📌 .eslint.js
 *
 * 🚀 ESLint configuration file สำหรับโปรเจคนี้
 * ใช้เพื่อตรวจสอบและบังคับใช้ coding standard
 * ใน Vue.js + TypeScript project
 */

import pluginVue from "eslint-plugin-vue";
import vueTsEslintConfig from "@vue/eslint-config-typescript";

export default [
  {
    /**
     * 🎯 กำหนดไฟล์ที่จะให้ ESLint ตรวจสอบ
     * - ใช้สำหรับ TypeScript (`.ts, .mts, .tsx`) และ Vue (`.vue`)
     */
    name: "app/files-to-lint",
    files: ["**/*.{ts,mts,tsx,vue}"],
  },

  {
    /**
     * 🚫 กำหนดไฟล์/โฟลเดอร์ที่ต้องการให้ ESLint *ไม่ต้องตรวจสอบ*
     * - `dist/` = ไฟล์ที่ถูก build แล้ว
     * - `coverage/` = โฟลเดอร์รายงาน Coverage ของการทดสอบ
     */
    name: "app/files-to-ignore",
    ignores: ["**/dist/**", "**/dist-ssr/**", "**/coverage/**"],
  },

  // ✅ ใช้ config ที่แนะนำสำหรับ Vue.js และ TypeScript
  ...pluginVue.configs["flat/recommended"],
  ...vueTsEslintConfig(),

  {
    /**
     * 📌 กำหนดกฎการตรวจสอบ (ESLint Rules)
     * ใช้เพื่อตั้งค่ากฎเฉพาะสำหรับโปรเจคนี้
     */
    rules: {
      "@typescript-eslint/no-unused-expressions": [
        "error",
        {
          allowShortCircuit: true, // ✅ อนุญาตให้ใช้ `&&` และ `||` ใน Expression ได้
          allowTernary: true, // ✅ อนุญาตให้ใช้ `condition ? a : b` ได้
        },
      ],

      // 🔹 **กฎที่ปิดไปเพื่อให้เหมาะสมกับโปรเจค**
      "vue/multi-word-component-names": "off", // ✅ ปิดแจ้งเตือนที่บังคับให้ชื่อ component มีหลายคำ (เช่น "HeaderPage" แทน "Header")
      "vue/html-indent": "off", // ✅ ปิดการแจ้งเตือนเรื่องระยะห่าง (Indentation) ใน HTML
      "vue/singleline-html-element-content-newline": "off", // ✅ ปิดแจ้งเตือนเรื่องขึ้นบรรทัดใหม่ใน element เดียว
      "vue/html-self-closing": "off", // ✅ ปิดแจ้งเตือน self-closing tag (`<img>`, `<br>` ฯลฯ)
      "vue/max-attributes-per-line": "off", // ✅ ปิดแจ้งเตือนเกี่ยวกับการจำกัด attributes ต่อบรรทัด
      "vue/return-in-computed-property": "off", // ✅ ปิดแจ้งเตือนที่ต้องการให้ `computed` *ต้อง* return ค่าเสมอ
    },
  },
];
