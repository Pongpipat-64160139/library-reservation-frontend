# 1️⃣ ใช้ Node.js เป็น Base Image เพื่อ Build Vue.js
FROM node:22 AS builder

WORKDIR /app

# 2️⃣ ตั้งค่า environment variable เพื่อให้ Node.js ทำงานใน production mode
ENV NODE_ENV=development  

# 3️⃣ คัดลอก package.json และ lock file
COPY package*.json package-lock.json ./

# 4️⃣ ติดตั้ง Dependencies แบบเต็ม
RUN npm install --legacy-peer-deps

# 5️⃣ ตรวจสอบว่ามี `@vitejs/plugin-vue` หรือไม่
RUN ls -l /app/node_modules/@vitejs/plugin-vue || (echo "plugin-vue not found!" && exit 1)

# 6️⃣ คัดลอกโค้ดทั้งหมดเข้าไป
COPY . .

# 7️⃣ ตรวจสอบว่า vite.config.mts มีอยู่
COPY vite.config.mts ./
RUN ls -l /app/vite.config.mts || (echo "vite.config.mts not found!" && exit 1)

# 8️⃣ ป้องกันปัญหา `esbuild`
RUN npm rebuild esbuild

# 9️⃣ Build Vue.js
RUN npm run build

# 🔟 ตรวจสอบว่าไฟล์ `dist/` ถูกสร้างหรือไม่
RUN ls -l /app/dist/ || (echo "dist folder not found!" && exit 1)

# 1️⃣1️⃣ ใช้ Nginx เป็น Web Server
FROM nginx:latest

# 1️⃣2️⃣ คัดลอกไฟล์ที่ Build แล้วไปที่ Nginx
COPY --from=builder /app/dist /usr/share/nginx/html

# 1️⃣3️⃣ คัดลอกไฟล์ nginx.conf
COPY nginx.conf /etc/nginx/nginx.conf

# เปิดพอร์ต 80
EXPOSE 80

# รัน Nginx
CMD ["nginx", "-g", "daemon off;"]
