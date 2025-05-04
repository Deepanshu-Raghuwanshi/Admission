import { Request, Response } from "express";
import Admission from "../models/Admission";
import { asyncHandler, AppError } from "../utils/errorHandler";
import logger from "../utils/logger";

export const createAdmission = asyncHandler(
  async (req: Request, res: Response) => {
    logger.info("Creating new admission", { body: req.body });

    const { name, email, phone, message, preferredTime } = req.body;

    if (!name || !email || !phone || !message || !preferredTime) {
      throw new AppError("All fields are required", 400);
    }

    const admission = await Admission.create({
      name,
      email,
      phone,
      message,
      preferredTime,
    });

    logger.info("Admission created successfully", { id: admission._id });

    res.status(201).json({
      success: true,
      data: admission,
      message: "Admission form submitted successfully",
    });
  }
);

export const getAllAdmissions = asyncHandler(
  async (req: Request, res: Response) => {
    logger.info("Fetching all admissions");

    const admissions = await Admission.find().sort({ createdAt: -1 });

    res.status(200).json({
      success: true,
      count: admissions.length,
      data: admissions,
    });
  }
);

export const getAdmissionById = asyncHandler(
  async (req: Request, res: Response) => {
    const { id } = req.params;
    logger.info(`Fetching admission with id: ${id}`);

    const admission = await Admission.findById(id);

    if (!admission) {
      throw new AppError("Admission not found", 404);
    }

    res.status(200).json({
      success: true,
      data: admission,
    });
  }
);

export const updateAdmission = asyncHandler(
  async (req: Request, res: Response) => {
    const { id } = req.params;
    logger.info(`Updating admission with id: ${id}`, { body: req.body });

    const admission = await Admission.findByIdAndUpdate(id, req.body, {
      new: true,
      runValidators: true,
    });

    if (!admission) {
      throw new AppError("Admission not found", 404);
    }

    logger.info("Admission updated successfully", { id });

    res.status(200).json({
      success: true,
      data: admission,
      message: "Admission updated successfully",
    });
  }
);

export const deleteAdmission = asyncHandler(
  async (req: Request, res: Response) => {
    const { id } = req.params;
    logger.info(`Deleting admission with id: ${id}`);

    const admission = await Admission.findByIdAndDelete(id);

    if (!admission) {
      throw new AppError("Admission not found", 404);
    }

    logger.info("Admission deleted successfully", { id });

    res.status(200).json({
      success: true,
      message: "Admission deleted successfully",
    });
  }
);
