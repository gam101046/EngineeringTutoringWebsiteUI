# ใช้ Official Image ของ Bun
FROM oven/bun:latest as builder

WORKDIR /app

# Copy ไฟล์ที่จำเป็นสำหรับติดตั้ง dependencies
COPY package.json bun.lockb ./
COPY prisma ./prisma/

# ติดตั้ง dependencies และ Generate Prisma Client
RUN bun install --frozen-lockfile
RUN bunx prisma generate

# Copy source code ทั้งหมด
COPY . .

# สร้าง Image ขั้นสุดท้ายเพื่อความเบา
FROM oven/bun:latest

WORKDIR /app

# Copy ไฟล์จาก Builder stage
COPY --from=builder /app/node_modules ./node_modules
COPY --from=builder /app/src ./src
COPY --from=builder /app/prisma ./prisma
COPY --from=builder /app/package.json ./package.json
COPY --from=builder /app/bun.lockb ./bun.lockb

# ตั้งค่า Environment เป็น Production
ENV NODE_ENV=production
ENV PORT=3001

# เปิด Port 3000
EXPOSE 3001

# สั่งรันแอปพลิเคชัน
CMD ["bun", "src/index.ts"]