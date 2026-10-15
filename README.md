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
- `assets/app.js`: gallery, menu, danh sách yêu thích lưu trên trình duyệt và ẩn ưu đãi sau 30/10/2026 (giờ Việt Nam).
- `asset-manifest.json`: đối chiếu đường dẫn ảnh/font gốc với file đóng gói.
- `source/`: các component TSX, CSS Module và dữ liệu gốc để tiếp tục tích hợp trong dự án Next.js. Đây là nguồn tham khảo; bản standalone chạy trực tiếp từ `index.html`.

Các CTA chiến dịch dẫn đến https://nanohome.vn/products?q=Series+7+ash. Liên kết header/footer dẫn về website nanoHome. Yêu thích trong bản standalone chỉ lưu tại trình duyệt, không đồng bộ tài khoản nanoHome. Gallery mở bằng dialog, hỗ trợ Escape.

## Phạm vi

Repo chỉ chứa landing page và tài nguyên cần thiết. Không có backend, khóa API, dữ liệu khách hàng hay các trang storefront khác. Không tự triển khai production hoặc cấu hình giảm giá. Tồn kho, giá và điều kiện ưu đãi thực tế do nanoHome xác nhận.

Ảnh sản phẩm/lifestyle và nhận diện thương hiệu giữ nguyên từ bản được duyệt, không phải tài nguyên cấp phép công khai. Repo public theo yêu cầu để phục vụ GitHub Pages. Pages tự cập nhật từ nhánh `main`, thư mục gốc.

Link xem: https://goldenduck1102.github.io/nanohome-series7-landing/

## Tối ưu hiệu năng — WebP chất lượng 90, 15/10/2026

Theo yêu cầu mới, cho phép nén mất dữ liệu ở mức vừa phải. Bản hiện tại dùng WebP chất lượng 90, alpha 100; giữ kích thước ảnh sản phẩm và lưu bản gốc để hoàn tác. Nếu bản WebP lớn hơn, giữ định dạng nhỏ hơn đã có.

Ảnh editorial có srcset 640/1280/1920 px, chỉ tải khi đến vùng nhìn. Gallery mở ảnh độ phân giải đầy đủ ở chất lượng 90; không dùng thumbnail cho lightbox. Khi tắt JavaScript vẫn có ảnh fallback. CSS được minify.

Đo tại 391×847, DPR 2, cuộn toàn trang (chưa mở lightbox): ảnh tải giảm từ 13.81 MB ở bản lossless xuống 2.20 MB ở bản WebP q90, giảm khoảng 84%. Bản ban đầu trước các lần tối ưu tải 69.58 MB ảnh trong cùng điều kiện.

- `webp-quality-report.json`: mức nén, đường dẫn và dung lượng từng ảnh trước/sau.
- `performance-results.json`: điều kiện và kết quả đo tải thực tế. Số đo lab cũ được đánh dấu riêng, không đại diện bản q90.
- `image-optimization.json`, `scripts/verify-images.py`: báo cáo/kiểm tra pixel của giai đoạn lossless trước đây; không phải cam kết trùng pixel cho bản q90 hiện tại.
- Các file gốc được giữ lại, chỉ tải khi được tham chiếu; chúng không tăng lượt tải trang hiện tại.

## Giá hiển thị và thời gian

Ưu đãi 17–30/10/2026, kết thúc lúc 00:00 ngày 31/10/2026 (Việt Nam).
Giá gạch ngang và giá giảm 35% chỉ là trình bày riêng trên landing này.
Không cập nhật giá gốc, Medusa, giỏ hàng hay quy tắc giảm giá thực tế.
Sau hạn trên, trang chỉ giữ giá gốc.

## Cập nhật video và responsive — 15/10/2026

Đồng bộ giao diện `/lpe-series7`: hero video native từ CDN Wistia, nguồn 540p (~3.38 MB) cho màn hình tối đa 700px và 1080p cho desktop. Không tải SDK Wistia. Video dùng `preload="none"`, không tự phát khi bật tiết kiệm dữ liệu, mạng 2G hoặc giảm chuyển động; dừng khi ra khỏi vùng nhìn hoặc chuyển tab.

Mobile dùng gallery hai cột, thanh không gian cuộn ngang với nút chỉ mục, CTA “Xem sản phẩm” dưới đủ sáu màu ghế. Desktop giữ gallery ba cột lệch tầng, nội dung hero căn trái và thẻ ưu đãi góc dưới. Ảnh tiếp tục dùng tài nguyên WebP và responsive đã đóng gói, không phụ thuộc bộ tối ưu ảnh của Next.js.
