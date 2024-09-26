const express = require("express");
const { S3Client, PutObjectCommand } = require("@aws-sdk/client-s3");
const { getSignedUrl } = require("@aws-sdk/s3-request-presigner");
const router = express.Router();

const s3Client = new S3Client({
    region: "eu-north-1",
    accessKeyId: process.env.AWS_ACCESS_KEY_ID,
    secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
});

// API route to get pre-signed URL
router.post("/generate-presigned-url", async (req, res) => {
    const { fileName, fileType } = req.body;

    const params = {
        Bucket: process.env.AWS_S3_BUCKET_NAME,
        Key: `uploads/profileImages/${Date.now()}_${fileName}`,
        ContentType: fileType,
        Expires: 60,
    };

    try {
        const command = new PutObjectCommand({
            Bucket: params.Bucket,
            Key: params.Key,
            ContentType: params.ContentType,
        })
        const url = await getSignedUrl(s3Client, command);
        res.json({ url, filePath: params.Key });
    } catch (error) {
        console.error("Error generating pre-signed URL", error);
        res.status(500).json({ error: "Error generating pre-signed URL" });
    }
});

module.exports = router;
