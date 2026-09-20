import { v2 as cloudinary } from "cloudinary";


cloudinary.config({
  cloud_name: process.env.CLOUD_NAME,
  api_key: process.env.CLOUD_API_KEY,
  api_secret: process.env.CLOUD_API_SECRET,
});
console.log({
  cloudName: process.env.CLOUD_NAME,
  apiKey: process.env.CLOUD_API_KEY
    ? "API key exists"
    : "API key missing",
  apiSecret: process.env.CLOUD_API_SECRET
    ? "API secret exists"
    : "API secret missing",
});


export const uploadImageCloude = async (image) => {
  const buffer =
    image?.buffer ||
    Buffer.from(await image.arrayBuffer());

  const uploadImage = await new Promise((resolve, reject) => {
    cloudinary.uploader.upload_stream(
      {
        folder: "Abdur",
        resource_type: "auto",
      },
      (error, uploadResult) => {
        if (error) {
          return reject(error);
        }

        return resolve(uploadResult);
      }
    ).end(buffer);
  });

  return uploadImage;
};