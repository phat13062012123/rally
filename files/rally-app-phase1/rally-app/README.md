# Rally — Phase 1: Landing + Auth + Onboarding + Dashboard

## Cấu trúc

```
rally-app/
├── index.html         Landing page (nhận biết trạng thái đăng nhập)
├── auth.html           Đăng nhập / Đăng ký (Email+Password, Google)
├── onboarding.html     Tạo hồ sơ người chơi (Bước 3 trong luồng)
├── dashboard.html       Trang chủ sau đăng nhập, đọc dữ liệu thật từ Firestore
├── css/style.css       Design system dùng chung
└── js/
    ├── firebase-config.js   Khởi tạo Firebase App (1 chỗ duy nhất)
    └── profile-service.js   Đọc/ghi hồ sơ người chơi trong Firestore
```

## Chạy thử

Trang dùng ES module (`type="module"`) nên **không thể mở trực tiếp bằng file://**
— trình duyệt sẽ chặn vì lý do CORS. Cần chạy qua một local server, ví dụ:

```bash
cd rally-app
npx serve .
# hoặc
python3 -m http.server 5500
```

Rồi mở `http://localhost:5500`.

## Việc cần làm trên Firebase Console trước khi test thật

1. **Authentication → Sign-in method**
   - Bật **Email/Password** (bạn đã bật)
   - Bật **Google** (bạn đã bật)
   - Vào **Authentication → Settings → Authorized domains**, thêm domain bạn sẽ deploy lên
     (nếu chạy `localhost` thì mặc định đã được phép)

2. **Firestore Database**
   - Tạo database (nếu chưa có), chọn chế độ **Production**
   - Vào **Rules**, dùng tạm rule sau cho giai đoạn phát triển (sẽ siết lại khi có Match/Chat):

   ```
   rules_version = '2';
   service cloud.firestore {
     match /databases/{database}/documents {
       match /users/{uid} {
         allow read: if request.auth != null;
         allow create: if request.auth != null && request.auth.uid == uid;
         allow update: if request.auth != null && request.auth.uid == uid;
       }
     }
   }
   ```

## Luồng đã implement (khớp file luồng chi tiết)

- **Luồng 1 — Người dùng mới**: Landing → Đăng ký → Tạo hồ sơ → Dashboard ✅
- **Luồng 2 — Xác thực**: Đăng nhập, Đăng ký, Đăng nhập Google, Quên mật khẩu, Đăng xuất ✅
- **Quy tắc #1**: Chưa đăng nhập → không vào được `dashboard.html`/`onboarding.html` (route guard bằng `onAuthStateChanged`) ✅
- **Quy tắc #5**: Mỗi người 1 hồ sơ duy nhất → `users/{uid}` là document ID cố định theo UID ✅

## Dữ liệu Firestore đã thiết kế (collection `users`)

```
users/{uid}
├── uid
├── displayName
├── email
├── photoURL
├── skillLevel        "Beginner" | "Intermediate" | "Advanced"
├── playingStyle       ["Singles", "Doubles"]
├── favoriteCourt
├── rating             (mặc định 0)
├── matchesPlayed       (mặc định 0)
├── playersMet          (mặc định 0)
├── followers            (mặc định 0)
├── following            (mặc định 0)
└── createdAt
```

## Phase tiếp theo (chưa làm, chờ bạn duyệt phase này)

1. **Find Match** — danh sách trận + filter (Firestore collection `matches`)
2. **Create Match** — form thật, ghi vào `matches`, status DRAFT → PUBLISHED
3. **Join Match** — request → host confirm/reject, cập nhật `currentPlayers`
4. **Find Court**, **Player Profile đầy đủ** (tabs Thống kê/Lịch sử/Đánh giá), **Chat**, **Notifications**

Khi bạn duyệt xong phần Auth này, báo tôi để làm tiếp Find Match + Create Match —
đó là 2 chức năng 5 sao tiếp theo trong `func.md`.
