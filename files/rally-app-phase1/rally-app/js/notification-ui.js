// js/notification-ui.js
// Component UI thông báo (badge + dropdown) — dùng chung cho mọi page.
// Cách dùng: import { initNotificationUI } và gọi initNotificationUI(user.uid).
// Yêu cầu DOM: element có id="notifBtn" trong navbar.
// Yêu cầu CSS: đã include block CSS notification (xem notification.css).

import {
  listenToNotifications,
  markNotificationAsRead,
  markAllNotificationsAsRead,
  updateNotification,
} from "./notification-service.js";
import {
  acceptJoinRequest,
  rejectJoinRequest,
} from "./match-request-service.js";

function escapeHtml(str) {
  return String(str ?? "").replace(/[&<>"']/g, (c) => ({
    "&": "&amp;",
    "<": "&lt;",
    ">": "&gt;",
    '"': "&quot;",
    "'": "&#39;",
  }[c]));
}

function timeAgo(ts) {
  if (!ts) return "vừa xong";
  let d;
  try {
    d = ts.toDate ? ts.toDate() : new Date(ts);
  } catch {
    return "vừa xong";
  }
  const s = Math.floor((Date.now() - d.getTime()) / 1000);
  if (s < 5) return "vừa xong";
  if (s < 60) return `${s} giây trước`;
  if (s < 3600) return `${Math.floor(s / 60)} phút trước`;
  if (s < 86400) return `${Math.floor(s / 3600)} giờ trước`;
  return `${Math.floor(s / 86400)} ngày trước`;
}

let initialized = false;

export function initNotificationUI(userId) {
  if (!userId) return;
  if (initialized) return; // chỉ init 1 lần / page
  initialized = true;

  const btn = document.getElementById("notifBtn");
  if (!btn) {
    console.warn("[notif-ui] Không tìm thấy #notifBtn trong navbar.");
    return;
  }

  // Bọc btn trong .notif-wrap nếu chưa có
  let wrap = btn.closest(".notif-wrap");
  if (!wrap) {
    wrap = document.createElement("div");
    wrap.className = "notif-wrap";
    btn.parentNode.insertBefore(wrap, btn);
    wrap.appendChild(btn);
  }

  // Tạo dropdown nếu chưa có
  let dropdown = document.getElementById("notifDropdown");
  if (!dropdown) {
    dropdown = document.createElement("div");
    dropdown.id = "notifDropdown";
    dropdown.className = "notif-dropdown";
    dropdown.innerHTML = `
      <div class="notif-head">
        <span>🔔 Thông báo</span>
        <button type="button" id="notifMarkAll">Đánh dấu tất cả đã đọc</button>
      </div>
      <div class="notif-list" id="notifList">
        <div class="notif-empty">Đang tải...</div>
      </div>`;
    wrap.appendChild(dropdown);
  }

  let notifications = [];

  /* ---------- Badge ---------- */
  function renderBadge() {
    const unread = notifications.filter((n) => !n.read).length;
    let badge = btn.querySelector(".notif-badge");
    if (unread > 0) {
      if (!badge) {
        badge = document.createElement("span");
        badge.className = "notif-badge";
        btn.appendChild(badge);
      }
      badge.textContent = unread > 9 ? "9+" : String(unread);
    } else if (badge) {
      badge.remove();
    }
  }

  /* ---------- List ---------- */
  function renderList() {
    const list = dropdown.querySelector("#notifList");
    if (!list) return;

    if (!notifications.length) {
      list.innerHTML = `<div class="notif-empty">Chưa có thông báo nào.</div>`;
      return;
    }

    list.innerHTML = notifications
      .map((n) => {
        const isPendingReq =
          n.type === "match_join_request" && n.requestId && !n.handled;

        const actions = isPendingReq
          ? `<div class="notif-actions">
               <button type="button" class="accept"
                       data-action="accept"
                       data-req="${escapeHtml(n.requestId)}">Chấp nhận</button>
               <button type="button" class="reject"
                       data-action="reject"
                       data-req="${escapeHtml(n.requestId)}">Từ chối</button>
             </div>`
          : "";

        return `
          <div class="notif-item ${n.read ? "" : "unread"}"
               data-id="${escapeHtml(n.id)}">
            <div class="notif-title">
              ${n.read ? "" : '<span class="notif-dot"></span>'}
              ${escapeHtml(n.title || "Thông báo")}
            </div>
            <div class="notif-msg">${escapeHtml(n.message || "")}</div>
            <div class="notif-time">${timeAgo(n.createdAt)}</div>
            ${actions}
          </div>`;
      })
      .join("");
  }

  /* ---------- Toggle ---------- */
  btn.addEventListener("click", (e) => {
    e.stopPropagation();
    dropdown.classList.toggle("show");
  });

  document.addEventListener("click", (e) => {
    if (!wrap.contains(e.target)) dropdown.classList.remove("show");
  });

  /* ---------- Click trong dropdown ---------- */
  dropdown.addEventListener("click", async (e) => {
    // Nút accept / reject
    const actionBtn = e.target.closest("[data-action]");
    if (actionBtn) {
      e.stopPropagation();
      const reqId = actionBtn.dataset.req;
      const action = actionBtn.dataset.action;
      const item = actionBtn.closest(".notif-item");
      const notifId = item?.dataset.id;

      actionBtn.disabled = true;
      const original = actionBtn.textContent;
      actionBtn.textContent = "Đang xử lý...";

      try {
        if (action === "accept") {
          await acceptJoinRequest(reqId, userId);
        } else {
          await rejectJoinRequest(reqId, userId);
        }
        if (notifId) {
          await updateNotification(notifId, { read: true, handled: true });
        }
      } catch (err) {
        console.error("Xử lý yêu cầu thất bại:", err);
        alert("Không thể xử lý yêu cầu: " + (err?.message || err));
        actionBtn.disabled = false;
        actionBtn.textContent = original;
      }
      return;
    }

    // Click item → đánh dấu đã đọc
    const item = e.target.closest(".notif-item");
    if (item && item.classList.contains("unread")) {
      try {
        await markNotificationAsRead(item.dataset.id);
      } catch (err) {
        console.error(err);
      }
    }
  });

  // Mark all
  dropdown
    .querySelector("#notifMarkAll")
    ?.addEventListener("click", async (e) => {
      e.stopPropagation();
      try {
        await markAllNotificationsAsRead(userId);
      } catch (err) {
        console.error(err);
      }
    });

  /* ---------- Realtime subscribe ---------- */
  listenToNotifications(
    userId,
    (items) => {
      notifications = items;
      renderBadge();
      renderList();
    },
    (err) => {
      console.error("listenToNotifications error:", err);
      const list = dropdown.querySelector("#notifList");
      if (list) {
        list.innerHTML = `
          <div class="notif-empty">
            Không thể tải thông báo.<br>
            <span style="font-size:11px;">
              (Có thể cần tạo Firestore composite index — xem Console.)
            </span>
          </div>`;
      }
    }
  );
}