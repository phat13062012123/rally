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
