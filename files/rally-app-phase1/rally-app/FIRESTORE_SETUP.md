# Firestore cho luồng xin tham gia trận

Trước khi kiểm thử, vào **Firebase Console → Firestore Database → Rules**, dán nội dung của `firestore.rules` rồi bấm **Publish**. Cần publish lại mỗi khi file rules thay đổi; sửa file trong project không tự cập nhật Firebase.

Luồng dùng ba collection:

- `matches`: trận đấu và danh sách `playerUids` đã được host duyệt.
- `matchRequests`: một yêu cầu cho mỗi cặp `matchId__playerId`; trạng thái là `pending`, `accepted` hoặc `rejected`.
- `notifications`: thông báo thời gian thực cho host và người xin tham gia.
- `chats/{chatId}/messages`: cuộc trò chuyện được tạo ngay khi người chơi gửi yêu cầu, cùng các tin nhắn của hai người tham gia.

Nếu Firebase Console báo cần composite index khi tải notification, tạo index cho collection `notifications` với:

| Field | Direction |
| --- | --- |
| `recipientId` | Ascending |
| `createdAt` | Descending |

Sau đó test bằng hai tài khoản: tài khoản A tạo trận, tài khoản B gửi yêu cầu, rồi A mở chuông thông báo để chấp nhận hoặc từ chối. B sẽ nhận trạng thái mới qua chuông thông báo và nhãn nút tham gia tự cập nhật.

## Firebase Storage cho avatar và ảnh chat

Ảnh đại diện và ảnh/mã QR trong chat được lưu ở Firebase Storage, giới hạn JPG/PNG/WebP tối đa 5 MB. Bật Storage và tạo bucket cho project trong Firebase Console trước khi upload. Quy tắc quyền nằm trong `storage.rules`; triển khai cùng project Firebase bằng Firebase CLI từ thư mục `rally-app`:

```sh
firebase deploy --only storage
```

Hoặc sao chép `storage.rules` vào **Firebase Console → Storage → Rules** rồi bấm **Publish**. Quy tắc chỉ cho phép chủ tài khoản thay avatar và thành viên của cuộc trò chuyện đọc/tải ảnh chat lên.
