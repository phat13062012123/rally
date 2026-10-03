const TOAST_ICONS = { success: "✓", error: "!", info: "i" };

function getToastRegion() {
  let region = document.getElementById("rallyToastRegion");
  if (!region) {
    region = document.createElement("div");
    region.id = "rallyToastRegion";
    region.className = "rally-toast-region";
    region.setAttribute("aria-live", "polite");
    region.setAttribute("aria-atomic", "true");
    document.body.append(region);
  }
  return region;
}

export function showToast(message, type = "success", duration = 3600) {
  const region = getToastRegion();
  const toast = document.createElement("div");
  toast.className = `rally-toast ${type}`;
  toast.setAttribute("role", type === "error" ? "alert" : "status");

  const icon = document.createElement("span");
  icon.className = "rally-toast-icon";
  icon.textContent = TOAST_ICONS[type] || TOAST_ICONS.info;
  icon.setAttribute("aria-hidden", "true");
  const text = document.createElement("span");
  text.className = "rally-toast-text";
  text.textContent = String(message ?? "");
  const close = document.createElement("button");
  close.className = "rally-toast-close";
  close.type = "button";
  close.setAttribute("aria-label", "Đóng thông báo");
  close.textContent = "×";
  close.addEventListener("click", () => toast.remove());

  toast.append(icon, text, close);
  region.append(toast);
  requestAnimationFrame(() => toast.classList.add("show"));
  setTimeout(() => {
    toast.classList.remove("show");
    setTimeout(() => toast.remove(), 220);
  }, duration);
  return toast;
}

export function confirmDialog({ title = "Xác nhận", message = "Bạn có chắc chắn?", confirmText = "Xác nhận", cancelText = "Hủy" } = {}) {
  return new Promise((resolve) => {
    const backdrop = document.createElement("div");
    backdrop.className = "feedback-backdrop";
    backdrop.innerHTML = `
      <section class="feedback-dialog" role="dialog" aria-modal="true" aria-labelledby="feedbackDialogTitle">
        <div class="feedback-dialog-mark" aria-hidden="true">?</div>
        <h2 id="feedbackDialogTitle"></h2>
        <p class="feedback-dialog-message"></p>
        <div class="feedback-dialog-actions">
          <button type="button" class="btn btn-outline feedback-cancel"></button>
          <button type="button" class="btn btn-primary feedback-confirm"></button>
        </div>
      </section>`;
    backdrop.querySelector("#feedbackDialogTitle").textContent = title;
    backdrop.querySelector(".feedback-dialog-message").textContent = message;
    const cancel = backdrop.querySelector(".feedback-cancel");
    const confirm = backdrop.querySelector(".feedback-confirm");
    cancel.textContent = cancelText;
    confirm.textContent = confirmText;

    const finish = (answer) => {
      document.removeEventListener("keydown", onKeyDown);
      backdrop.remove();
      resolve(answer);
    };
    const onKeyDown = (event) => {
      if (event.key === "Escape") finish(false);
    };
    cancel.addEventListener("click", () => finish(false));
    confirm.addEventListener("click", () => finish(true));
    backdrop.addEventListener("click", (event) => {
      if (event.target === backdrop) finish(false);
    });
    document.addEventListener("keydown", onKeyDown);
    document.body.append(backdrop);
    confirm.focus();
  });
}
