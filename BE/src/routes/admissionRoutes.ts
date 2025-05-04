import express from "express";
import {
  createAdmission,
  getAllAdmissions,
  getAdmissionById,
  updateAdmission,
  deleteAdmission,
} from "../controllers/admissionController";

const router = express.Router();

router.post("/", createAdmission);
router.get("/", getAllAdmissions);
router.get("/:id", getAdmissionById);
router.put("/:id", updateAdmission);
router.delete("/:id", deleteAdmission);

export default router;
