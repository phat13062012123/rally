import {
  db,
  collection,
  doc,
  addDoc,
  updateDoc,
  onSnapshot,
  query,
  where,
  serverTimestamp,
} from "./firebase-config.js";

const CHATS = "chats";

function timestampValue(value) {
  return value?.toMillis ? value.toMillis() : 0;
}

export function listenToChats(userId, onData, onError) {
  if (!userId) return () => {};
  const chatQuery = query(
    collection(db, CHATS),
    where("participantIds", "array-contains", userId)
  );
  return onSnapshot(
    chatQuery,
    (snapshot) => {
      const chats = snapshot.docs
        .map((item) => ({ id: item.id, ...item.data() }))
        .sort((a, b) => timestampValue(b.updatedAt) - timestampValue(a.updatedAt));
      onData(chats);
    },
    onError
  );
}

export function listenToMessages(chatId, onData, onError) {
  if (!chatId) return () => {};
  return onSnapshot(
    collection(db, CHATS, chatId, "messages"),
    (snapshot) => {
      const messages = snapshot.docs
        .map((item) => ({ id: item.id, ...item.data() }))
        .sort((a, b) => timestampValue(a.createdAt) - timestampValue(b.createdAt));
      onData(messages);
    },
    onError
  );
}

export async function sendMessage({ chatId, senderId, senderName, text, imageUrl = "" }) {
  const cleanText = String(text || "").trim();
  if (!chatId || !senderId || (!cleanText && !imageUrl)) throw new Error("INVALID_MESSAGE");

  await addDoc(collection(db, CHATS, chatId, "messages"), {
    senderId,
    senderName: senderName || "Người chơi Rally",
    text: cleanText,
    imageUrl,
    createdAt: serverTimestamp(),
  });

  await updateDoc(doc(db, CHATS, chatId), {
    lastMessage: cleanText || "📷 Đã gửi hình ảnh",
    lastMessageAt: serverTimestamp(),
    updatedAt: serverTimestamp(),
  });
}
