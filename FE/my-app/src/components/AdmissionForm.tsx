import type React from "react";
import { useState } from "react";
import { useForm, type SubmitHandler } from "react-hook-form";
import { toast } from "react-toastify";
import type { AdmissionFormData } from "../types";
import { admissionService } from "../services/api";
import { validationRules } from "../utils/validation";
import { motion } from "framer-motion";
import {
  User,
  Mail,
  Phone,
  Clock,
  MessageSquare,
  Send,
  Loader2,
} from "lucide-react";

const AdmissionForm: React.FC = () => {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<AdmissionFormData>();

  const onSubmit: SubmitHandler<AdmissionFormData> = async (data) => {
    setIsSubmitting(true);
    try {
      const response = await admissionService.createAdmission(data);
      if (response.success) {
        toast.success("Admission form submitted successfully!");
        reset();
      } else {
        toast.error(response.message || "Failed to submit form");
      }
    } catch (error) {
      console.error("Error submitting form:", error);
      toast.error("An unexpected error occurred. Please try again later.");
    } finally {
      setIsSubmitting(false);
    }
  };

  const formVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
      },
    },
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: { type: "spring", stiffness: 100 },
    },
  };

  return (
    <motion.div
      initial="hidden"
      animate="visible"
      variants={formVariants}
      className="max-w-md mx-auto bg-white dark:bg-gray-800 p-8 rounded-xl shadow-xl border border-gray-100 dark:border-gray-700"
    >
      <h2 className="text-2xl font-bold mb-6 text-center text-gray-800 dark:text-white">
        Admission Form
      </h2>

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
        <motion.div variants={itemVariants}>
          <label
            htmlFor="name"
            className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1"
          >
            Full Name
          </label>
          <div className="relative">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <User className="h-5 w-5 text-gray-400" />
            </div>
            <input
              id="name"
              type="text"
              className={`w-full pl-10 pr-3 py-2 border rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all duration-200 ${
                errors.name
                  ? "border-red-500 focus:ring-red-500"
                  : "border-gray-300 dark:border-gray-600 dark:bg-gray-700 dark:text-white"
              }`}
              placeholder="Enter your full name"
              {...register("name", validationRules.name)}
            />
          </div>
          {errors.name && (
            <p className="mt-1 text-sm text-red-600 dark:text-red-400">
              {errors.name.message}
            </p>
          )}
        </motion.div>

        <motion.div variants={itemVariants}>
          <label
            htmlFor="email"
            className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1"
          >
            Email Address
          </label>
          <div className="relative">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <Mail className="h-5 w-5 text-gray-400" />
            </div>
            <input
              id="email"
              type="email"
              className={`w-full pl-10 pr-3 py-2 border rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all duration-200 ${
                errors.email
                  ? "border-red-500 focus:ring-red-500"
                  : "border-gray-300 dark:border-gray-600 dark:bg-gray-700 dark:text-white"
              }`}
              placeholder="Enter your email address"
              {...register("email", validationRules.email)}
            />
          </div>
          {errors.email && (
            <p className="mt-1 text-sm text-red-600 dark:text-red-400">
              {errors.email.message}
            </p>
          )}
        </motion.div>

        <motion.div variants={itemVariants}>
          <label
            htmlFor="phone"
            className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1"
          >
            Phone Number
          </label>
          <div className="relative">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <Phone className="h-5 w-5 text-gray-400" />
            </div>
            <input
              id="phone"
              type="tel"
              className={`w-full pl-10 pr-3 py-2 border rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all duration-200 ${
                errors.phone
                  ? "border-red-500 focus:ring-red-500"
                  : "border-gray-300 dark:border-gray-600 dark:bg-gray-700 dark:text-white"
              }`}
              placeholder="Enter your 10-digit phone number"
              {...register("phone", validationRules.phone)}
            />
          </div>
          {errors.phone && (
            <p className="mt-1 text-sm text-red-600 dark:text-red-400">
              {errors.phone.message}
            </p>
          )}
        </motion.div>

        <motion.div variants={itemVariants}>
          <label
            htmlFor="preferredTime"
            className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1"
          >
            Preferred Time for Call
          </label>
          <div className="relative">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <Clock className="h-5 w-5 text-gray-400" />
            </div>
            <select
              id="preferredTime"
              className={`w-full pl-10 pr-3 py-2 border rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all duration-200 appearance-none bg-white dark:bg-gray-700 dark:text-white ${
                errors.preferredTime
                  ? "border-red-500 focus:ring-red-500"
                  : "border-gray-300 dark:border-gray-600"
              }`}
              {...register("preferredTime", validationRules.preferredTime)}
            >
              <option value="">Select preferred time</option>
              <option value="Morning (9AM - 12PM)">Morning (9AM - 12PM)</option>
              <option value="Afternoon (12PM - 4PM)">
                Afternoon (12PM - 4PM)
              </option>
              <option value="Evening (4PM - 7PM)">Evening (4PM - 7PM)</option>
            </select>
            <div className="absolute inset-y-0 right-0 flex items-center pr-3 pointer-events-none">
              <svg
                className="h-5 w-5 text-gray-400"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M19 9l-7 7-7-7"
                />
              </svg>
            </div>
          </div>
          {errors.preferredTime && (
            <p className="mt-1 text-sm text-red-600 dark:text-red-400">
              {errors.preferredTime.message}
            </p>
          )}
        </motion.div>

        <motion.div variants={itemVariants}>
          <label
            htmlFor="message"
            className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1"
          >
            Message
          </label>
          <div className="relative">
            <div className="absolute top-3 left-3 pointer-events-none">
              <MessageSquare className="h-5 w-5 text-gray-400" />
            </div>
            <textarea
              id="message"
              rows={4}
              className={`w-full pl-10 pr-3 py-2 border rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all duration-200 ${
                errors.message
                  ? "border-red-500 focus:ring-red-500"
                  : "border-gray-300 dark:border-gray-600 dark:bg-gray-700 dark:text-white"
              }`}
              placeholder="Enter your message or query"
              {...register("message", validationRules.message)}
            ></textarea>
          </div>
          {errors.message && (
            <p className="mt-1 text-sm text-red-600 dark:text-red-400">
              {errors.message.message}
            </p>
          )}
        </motion.div>

        <motion.div variants={itemVariants}>
          <button
            type="submit"
            disabled={isSubmitting}
            className="group relative w-full bg-gradient-to-r from-purple-600 to-indigo-600 text-white py-3 px-4 rounded-lg font-medium shadow-lg hover:shadow-xl transition-all duration-300 overflow-hidden"
          >
            <span className="absolute inset-0 w-full h-full bg-gradient-to-r from-purple-500 to-indigo-500 opacity-0 group-hover:opacity-100 transition-opacity duration-300 transform group-hover:scale-105"></span>
            <span className="absolute -inset-x-1 bottom-0 h-1 bg-white/20"></span>
            <span className="relative z-10 flex items-center justify-center gap-2">
              {isSubmitting ? (
                <>
                  <Loader2 className="h-5 w-5 animate-spin" />
                  Submitting...
                </>
              ) : (
                <>
                  <Send className="h-5 w-5" />
                  Submit Application
                </>
              )}
            </span>
          </button>
        </motion.div>
      </form>
    </motion.div>
  );
};

export default AdmissionForm;
