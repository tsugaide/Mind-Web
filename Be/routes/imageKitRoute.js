import { Router } from "express";
import dotenv from "dotenv";
import ImageKit from "imagekit";

dotenv.config();
const router = Router();

const imagekit = new ImageKit({
  publicKey: process.env.IMAGEKIT_PUBLIC_KEY,
  privateKey: process.env.IMAGEKIT_PRIVATE_KEY,
  urlEndpoint: process.env.IMAGEKIT_URL_ENDPOINT,
});

router.get("/imageUp", (req, res) => {
  try {
    const authParams = imagekit.getAuthenticationParameters();
    res.json({
      ...authParams,
      publicKey: process.env.IMAGEKIT_PUBLIC_KEY,
    });
  } catch (error) {
    res.status(500).json({ message: "Error generating auth params", error });
  }
});

router.delete("/imageDel", async (req, res) => {
  try {
    const { fileId } = req.body;

    const result = await imagekit.bulkDeleteFiles(fileId);
    res.json({ succes: true, result });
  } catch (error) {
    console.error(err);
    res.status(500).json({ success: false, error: err.message });
  }
});

export default router;
