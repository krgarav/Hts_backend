import express from "express";
import { uploadImage, uploadJson } from "../multer_uploader/upload_file.js";
import {
  genrateQuestionSetsController,
  getImgByIdController,
  Jsoncontroller,
  getJsonByIdController,
} from "../controller/questionPaperController.js";

const router = express.Router();

router.post(
  "/uploadImg",
  uploadImage.single("imageFile"),
  genrateQuestionSetsController
);
router.get("/getUploadedImgById", getImgByIdController);
router.post("/uploadJson", uploadJson.single("jsonFile"), Jsoncontroller);
router.get("/getUploadedJsonById", getJsonByIdController);
export default router;
