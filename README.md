<div align="center">
  <h1>🎂 Lời Chúc Sinh Nhật Bố 💖</h1>
  <p>Một trang web tương tác ngọt ngào để hai mẹ con gửi những lời chúc sinh nhật bất ngờ đến bố.</p>
</div>

## ✨ Tính năng nổi bật

- **🎨 Giao diện lãng mạn:** Chuyển đổi màu nền mượt mà qua từng bước, thiết kế nhẹ nhàng với các chi tiết dễ thương.
- **✨ Hiệu ứng sinh động:** Tích hợp hiệu ứng hạt (trái tim bay, bóng bay bức xạ, pháo hoa giấy) sử dụng Framer Motion.
- **📸 Kỷ niệm qua ảnh (Ảnh trượt & Slide):** Cho phép trình chiếu những hình ảnh đáng nhớ qua các slide ảnh tự động hoặc cuộn vô cực.
- **🎁 Hộp quà bất ngờ:** Người dùng có thể vuốt và nhấn mở từng hộp quà chứa lời chúc ý nghĩa bên trong.
- **🎵 Trải nghiệm âm thanh:** Nhạc nền nhẹ nhàng lãng mạn phát xuyên suốt, đi kèm với khả năng phát một file ghi âm giọng nói (lời chúc đặc biệt).
- **⏳ Đếm ngược sinh nhật:** Tự động tính toán ngày tuổi và hiển thị đồng hồ đếm ngược chi tiết nếu chưa tới chính xác ngày sinh nhật.
- **📱 Hoạt động tốt trên mọi thiết bị:** Responsive hoàn toàn, mang lại trải nghiệm mượt mà trên cả PC và Mobile.

## 🛠 Công nghệ sử dụng

- **[React 18](https://react.dev/)** + **[Vite](https://vitejs.dev/)**
- **[Tailwind CSS v4](https://tailwindcss.com/)**: Tạo nội dung giao diện nhanh chóng.
- **[Motion (Framer Motion)](https://motion.dev/)**: Cho các animation mượt mà và tương tác kéo thả.
- **[Lucide React](https://lucide.dev/)**: Cung cấp bộ icon đẹp mắt và nhẹ.

## 🚀 Hướng dẫn cài đặt và chạy máy nhánh (Run Locally)

**Yêu cầu:** Node.js (phiên bản 18 trở lên).

1. **Clone repository và di chuyển vào thư mục:**
   ```bash
   git clone <repository_url>
   cd loi_chuc_sinh_nhat
   ```

2. **Cài đặt các thư viện cần thiết:**
   ```bash
   npm install
   ```

3. **Chạy ứng dụng trong môi trường phát triển:**
   ```bash
   npm run dev
   ```
   *Ứng dụng sẽ chạy tại `http://localhost:5173`.*

## 🎨 Hướng dẫn tùy chỉnh (Customization)

Bạn có thể dễ dàng biến trang web này thành món quà của riêng bạn bằng cách thay đổi mã nguồn một chút:

1. **Cập nhật hình ảnh & âm thanh:**
   - Thay thế các hình ảnh trong thư mục `public/gallery/` bằng ảnh kỷ niệm của bạn (giữ nguyên tên như `1.jpg`, `2.jpg`, v.v. hoặc đổi lại đường dẫn trong file mã).
   - Đặt file nhạc nền của bạn với tên `nhacnen.mp3` và audio lời chúc bằng giọng nói là `ghiam.m4a` bên trong thư mục `public/gallery/`.

2. **Thay đổi ngày sinh:**
   - Mở file `src/App.tsx`.
   - Tìm đến các hằng số ngày tháng ở đầu file và cập nhật theo sinh nhật của người đó:
     ```typescript
     const BIRTHDAY_YEAR  = 2004; // Năm sinh
     const BIRTHDAY_MONTH = 4;    // Tháng sinh
     const BIRTHDAY_DAY   = 7;    // Ngày sinh
     ```

3. **Thay đổi lời chúc:**
   - Tìm biến `GIFTS` và danh sách `MESSAGES` trong `src/App.tsx` để thay đổi tiêu đề, nội dung và các câu chúc trong từng bước (từng hộp quà).

## 🌍 Triển khai lên GitHub Pages

Repository đã được cấu hình tự động deploy lên Github Pages (thông qua Github Actions).

1. Trong thư mục dự án, đảm bảo `vite.config.ts` có cấu hình `base` đúng với tên Repository của bạn. Ví dụ:
   ```typescript
   export default defineConfig(({ mode }) => {
     return {
       base: '/loi_chuc_sinh_nhat/', // Đổi theo tên repo của bạn
       // ...
     };
   });
   ```
2. Đẩy code lên Github. Trình quản lý Github Actions (file `.github/workflows/deploy.yml`) sẽ tự động build và xuất bản trang web của bạn.
3. Vào cấu hình **Settings > Pages** trên GitHub Repo của bạn để lấy liên kết trang web chính thức.

---
*Được tạo bằng niềm vui và sự bất ngờ. Chúc bạn có một ngày kỷ niệm thật hạnh phúc!* ❤️
