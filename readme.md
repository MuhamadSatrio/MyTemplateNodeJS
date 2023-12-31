# template
Nama : Muhamad Satrio

Tech yang digunakan adalah NodeJS Express, MysSQL, dan Sequelize, Berikut adalah cara menjalankannya:

Link github: https://github.com/MuhamadSatrio/kotakode
Dokumentasi API: https://documenter.getpostman.com/view/26114982/2s9YJXYjvt

Cara penggunaan API:
1. Clone repository github
2. Pindah folder ke API dengan menjalankan di terminal “cd api”
3. Jalankan di terminal “npm install” untuk instal dependencies yang ada
4. silahkan ubah nama.env.example menjadi .env dan kemudian isi sesuai data connection database MySQL yang anda miliki.
5. Jalankan "npx sequelize-cli db:create" untuk membuat database
6. Jalankan "npx sequelize-cli db:migrate" untuk migration database yang ada di projek
7. Jalankan "npx sequelize-cli db:seed:all" untuk memasukkan seeders data ke database.
8. Jalankan di terminal “npm run start”
9. Buka Postman (Pada link diatas) dan coba jalankan sesuai tes yang ada.

Hal yang perlu diperhatikan:
1. Perlu register atau login terlebih dahulu untuk bisa mengakses setiap API yang ada.
2. Authorization type Bearer Token kemudian Token diisi token JWT yang dapat diambil saat login/register.
3. Bagian API yang terdapat params silahkan ikuti sesuai yang ada pada postman
