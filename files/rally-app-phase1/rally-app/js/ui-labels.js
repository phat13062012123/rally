/** Nhãn hiển thị tiếng Việt — không đổi giá trị lưu trên Firestore. */
export function skillLabel(value) {
  const map = {
    All: "Mọi trình độ",
    Beginner: "Mới chơi",
    Intermediate: "Trung cấp",
    Advanced: "Nâng cao",
  };
  return map[value] || value || "Mọi trình độ";
}

export function styleLabel(value) {
  const map = { Singles: "Đơn", Doubles: "Đôi" };
  return map[value] || value;
}

export function stylesText(playingStyle) {
  if (!Array.isArray(playingStyle) || !playingStyle.length) return "";
  return playingStyle.map(styleLabel).join(" · ");
}
