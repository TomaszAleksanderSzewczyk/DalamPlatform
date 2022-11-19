import { S3Client, PutObjectCommand } from "@aws-sdk/client-s3";
import { createPresignedPost } from "@aws-sdk/s3-presigned-post";

export default async function handler(req, res) {
  const s3Client = new S3Client({
    region: process.env.REGION,
    credentials: {
      accessKeyId: process.env.ACCESS_KEY,
      secretAccessKey: process.env.SECRET_KEY,
    },
  });

  const post = await createPresignedPost(s3Client, {
    Bucket: process.env.S3_BUCKET_NAME,
    Key: req.query.file,
    Fields: {
      acl: "public-read",
      "Content-Type": req.query.fileType,
    },
    Expires: 300,
    Conditions: [
      ["content-length-range", 0, 1048576], // up to 1 MB
    ],
  });

  console.log(post);

  res.status(200).json(post);
}
