import { storage, ref, uploadBytes, getDownloadURL } from "./firebase-config.js";

const MAX_IMAGE_BYTES = 5 * 1024 * 1024;
const IMAGE_EXTENSIONS = {
  "image/jpeg": "jpg",
  "image/png": "png",
  "image/webp": "webp",
};

export function validateImageFile(file) {
  if (!file) throw new Error("IMAGE_REQUIRED");
  if (!IMAGE_EXTENSIONS[file.type]) throw new Error("INVALID_IMAGE_TYPE");
  if (file.size > MAX_IMAGE_BYTES) throw new Error("IMAGE_TOO_LARGE");
  return true;
}

export async function uploadImage(file, folder) {
  validateImageFile(file);
  if (!folder) throw new Error("INVALID_IMAGE_PATH");
  const extension = IMAGE_EXTENSIONS[file.type];
  const uniqueName = `image-${Date.now()}-${Math.random().toString(36).slice(2, 8)}.${extension}`;
  const imageRef = ref(storage, `${folder}/${uniqueName}`);
  const result = await uploadBytes(imageRef, file, { contentType: file.type });
  return getDownloadURL(result.ref);
}
