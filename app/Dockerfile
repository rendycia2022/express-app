# app/Dockerfile

# Gunakan image Node.js terbaru.
# 'latest' akan menarik versi LTS terbaru atau versi terbaru yang tersedia.
# Untuk produksi, disarankan menggunakan versi Node.js yang spesifik dan stabil (misalnya, node:20-alpine).
FROM node:23.11.0

# Atur direktori kerja di dalam kontainer
WORKDIR /usr/src/app

# Salin package.json dan package-lock.json (jika ada) ke direktori kerja.
# Ini dilakukan pertama kali untuk memanfaatkan caching Docker Layer.
# Jika file package.json tidak berubah, langkah npm install tidak akan dijalankan ulang.
COPY package*.json ./

# Install dependensi
RUN npm install

# Salin sisa kode aplikasi ke direktori kerja
COPY . .

# Memberitahu Docker bahwa kontainer mendengarkan pada port 3000
EXPOSE 3000

# Definisikan perintah untuk menjalankan aplikasi
CMD [ "npm", "start" ]