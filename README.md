# 🧩 Modular Node.js Application

Sebuah aplikasi Node.js berbasis Express dengan arsitektur modular. Semua layanan (service) berada dalam satu aplikasi, dipisah berdasarkan fitur.

## 📁 Struktur Project
./package-lock.json
./package.json
./Dockerfile
./server.js # Server configurasi untuk aplikasi
./src
./src/config
./src/config/config.js
./src/routers.js # Routers utama aplikasi
./src/app.js # Entry point utama aplikasi

./src/apps # modular services
./src/apps/development # development module
./src/apps/auth # service untuk authentification