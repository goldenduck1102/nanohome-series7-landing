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

Ảnh sản phẩm/lifestyle và nhận diện thương hiệu giữ nguyên từ bản được duyệt, không phải tài nguyên cấp phép công khai. Repo public theo yêu cầu để phục vụ GitHub Pages. Pages tự cập nhật từ nhánh `main`, thư mục gốc.

Link xem: https://goldenduck1102.github.io/nanohome-series7-landing/

## Tối ưu hiệu năng — 15/10/2026

- Ảnh sản phẩm và ảnh tách nền giữ nguyên độ phân giải, màu sắc và alpha. Chỉ dùng WebP lossless khi nhỏ hơn bản gốc; đã kiểm tra hash của toàn bộ pixel RGBA sau giải mã. Giữ các file gốc để đối chiếu.
- 7 ảnh editorial/lifestyle có bản 640/1280/1920 px theo `srcset`. Các bản này nén lossless sau khi resize; trình duyệt chọn kích thước theo khung và mật độ điểm ảnh. Khi mở gallery, tải ảnh gốc đầy đủ, không dùng thumbnail.
- CSS minify; ảnh editorial dưới màn hình chỉ bắt đầu tải khi đi vào vùng nhìn; có fallback khi tắt JavaScript. Ảnh nền hero dùng srcset; ảnh ghế hero giữ nguyên độ phân giải và tải ngay. Dialog không tải ảnh gốc trước khi mở.
- Kết quả đo và điều kiện đo: `performance-results.json`. Dung lượng ảnh khi cuộn toàn trang ở 391×847, DPR 2: 69.58 MB → 13.81 MB (giảm khoảng 80%). Số liệu không bao gồm mở ảnh lớn.
- Kiểm tra chất lượng: `python3 scripts/verify-images.py` (cần ImageMagick). File `image-optimization.json` ghi các ảnh và kích thước tương ứng.
