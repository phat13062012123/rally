import { updateProfile } from "./firebase-config.js";
import { savePlayerProfile } from "./profile-service.js";
import { uploadImage, validateImageFile } from "./storage-service.js";
import { showToast } from "./ui-feedback.js";

const MAX_IMAGE_BYTES = 5 * 1024 * 1024;

export function initAvatarUpload(user) {
  if (!user) return;
  const actions = document.querySelector(".profile-modal-actions");
  if (!actions || document.getElementById("avatarFileInput")) return;

  const picker = document.createElement("input");
  picker.id = "avatarFileInput";
  picker.type = "file";
  picker.accept = "image/jpeg,image/png,image/webp";
  picker.hidden = true;
  document.body.append(picker);

  const button = document.createElement("button");
  button.type = "button";
  button.className = "profile-change-avatar";
  button.textContent = "📷 Thay đổi ảnh đại diện";
  actions.prepend(button);
  button.addEventListener("click", () => picker.click());

  picker.addEventListener("change", async () => {
    const file = picker.files?.[0];
    if (!file) return;
    try {
      validateImageFile(file);
      button.disabled = true;
      button.textContent = "Đang tải ảnh lên...";
      const photoURL = await uploadImage(file, `avatars/${user.uid}`);
      await savePlayerProfile(user.uid, { photoURL });
      await updateProfile(user, { photoURL });

      const name = document.getElementById("modalName")?.textContent || user.displayName || "Người chơi Rally";
      ["userAvatar", "modalAvatar"].forEach((id) => {
        const avatar = document.getElementById(id);
        if (!avatar) return;
        const image = document.createElement("img");
        image.src = photoURL;
        image.alt = name;
        avatar.replaceChildren(image);
      });
      showToast("Ảnh đại diện đã được cập nhật.");
    } catch (error) {
      const messages = {
        INVALID_IMAGE_TYPE: "Chỉ hỗ trợ ảnh JPG, PNG hoặc WebP.",
        IMAGE_TOO_LARGE: "Ảnh không được lớn hơn 5 MB.",
        "storage/unauthorized": "Không có quyền tải ảnh. Hãy kiểm tra Firebase Storage Rules.",
      };
      showToast(messages[error?.code || error?.message] || "Không thể cập nhật ảnh đại diện. Vui lòng thử lại.", "error");
      console.error("Avatar upload failed:", error);
    } finally {
      picker.value = "";
      button.disabled = false;
      button.textContent = "📷 Thay đổi ảnh đại diện";
    }
  });
}
