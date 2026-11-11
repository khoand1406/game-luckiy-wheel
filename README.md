# Mật mã Tổ ấm - Chương 7

Trò chơi cá nhân dành cho lớp học, kết hợp bảng từ khóa và vòng quay phần thưởng. Luồng mỗi lượt: mời một sinh viên xung phong → quay phần quà → chọn một hàng từ khóa → trả lời câu trắc nghiệm 4 đáp án → mở ô chữ và nhận quà nếu đúng. Không cần danh sách lớp, không chia đội, không tính điểm.

Ứng dụng chỉ dùng frontend React + Tailwind CSS. Câu hỏi nằm trong `src/data/puzzleQuestions.json`; vòng quay đọc phần thưởng từ `src/data/rewards.json`. Không có cơ sở dữ liệu hay máy chủ riêng.

## Chạy trên máy

```bash
pnpm install
pnpm dev
```

Mở địa chỉ Vite hiển thị trong terminal (thường là `http://localhost:5173`).

## Tạo bản production

```bash
pnpm build
pnpm preview
```

## Đưa lên Vercel

1. Đưa thư mục này lên GitHub hoặc chạy `vercel` trong thư mục dự án.
2. Framework Preset: **Vite**.
3. Build Command: `pnpm build`.
4. Output Directory: `dist`.

Vercel sẽ tự nhận cấu hình `vercel.json`. Không cần khai báo biến môi trường.
