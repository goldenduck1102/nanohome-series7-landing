# nanoHome — Series 7 Colour Ash

Bản standalone tiếng Việt của landing page `/lpe-series7`, tách từ giao diện đã duyệt ngày 15/10/2026. Bao gồm header/footer, 12 ảnh sản phẩm, 6 ảnh lifestyle và ảnh màu đã tách nền.

## Chạy local

Cần Python 3 (không cần cài thư viện):

```sh
python3 -m http.server 3107
```

Mở http://localhost:3107. Có thể dùng `npm start` với Node.js và Python 3.

## Chỉnh sửa

- `index.html`: nội dung và cấu trúc trang.
- `assets/styles.css`: CSS responsive của bản đã duyệt.
- `assets/standalone.css`: CSS bổ sung cho bản standalone.
- `assets/app.js`: gallery, menu, danh sách yêu thích lưu trên trình duyệt và ẩn ưu đãi sau 20/10/2026 (giờ Việt Nam).
- `asset-manifest.json`: đối chiếu đường dẫn ảnh/font gốc với file đóng gói.
- `source/`: các component TSX, CSS Module và dữ liệu gốc để tiếp tục tích hợp trong dự án Next.js. Đây là nguồn tham khảo; bản standalone chạy trực tiếp từ `index.html`.

Các CTA chiến dịch dẫn đến https://nanohome.vn/products?q=Series+7+ash. Liên kết header/footer dẫn về website nanoHome. Yêu thích trong bản standalone chỉ lưu tại trình duyệt, không đồng bộ tài khoản nanoHome. Gallery mở bằng dialog, hỗ trợ Escape.

## Phạm vi

Repo chỉ chứa landing page và tài nguyên cần thiết. Không có backend, khóa API, dữ liệu khách hàng hay các trang storefront khác. Không tự triển khai production hoặc cấu hình giảm giá. Tồn kho, giá và điều kiện ưu đãi thực tế do nanoHome xác nhận.

Ảnh sản phẩm/lifestyle và nhận diện thương hiệu giữ nguyên từ bản được duyệt, không phải tài nguyên cấp phép công khai. Repo tạm để private. Không có workflow tự deploy.
