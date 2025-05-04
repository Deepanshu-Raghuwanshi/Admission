import React, { useEffect, useState } from "react";
import { toast } from "react-toastify";
import type { Admission } from "../types";
import { admissionService } from "../services/api";
import { motion, AnimatePresence } from "framer-motion";
import {
  Trash2,
  RefreshCw,
  Search,
  ChevronDown,
  ChevronUp,
} from "lucide-react";

const AdmissionsList: React.FC = () => {
  const [admissions, setAdmissions] = useState<Admission[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [searchTerm, setSearchTerm] = useState<string>("");
  const [sortField, setSortField] = useState<string>("createdAt");
  const [sortDirection, setSortDirection] = useState<"asc" | "desc">("desc");
  const [expandedRow, setExpandedRow] = useState<string | null>(null);

  // Fetch all admissions
  const fetchAdmissions = async () => {
    setLoading(true);
    try {
      const response = await admissionService.getAllAdmissions();
      if (response.success && response.data) {
        setAdmissions(response.data);
        // Share the data with parent component
        shareAdmissionsData(response.data);
        setError(null);
      } else {
        setError(response.message || "Failed to fetch admissions");
      }
    } catch (error) {
      console.error("Error fetching admissions:", error);
      setError("An unexpected error occurred. Please try again later.");
    } finally {
      setLoading(false);
    }
  };

  // Add this after the fetchAdmissions function
  const shareAdmissionsData = (data: Admission[]) => {
    // If the component has a prop for sharing data with parent, use it
    if (typeof window !== "undefined" && window.dispatchEvent) {
      window.dispatchEvent(
        new CustomEvent("admissionsLoaded", { detail: data })
      );
    }
  };

  // Delete an admission
  const handleDelete = async (id: string) => {
    if (window.confirm("Are you sure you want to delete this admission?")) {
      try {
        const response = await admissionService.deleteAdmission(id);
        if (response.success) {
          toast.success("Admission deleted successfully");
          // Update the list after deletion with animation
          const updatedAdmissions = admissions.filter(
            (admission) => admission._id !== id
          );
          setAdmissions(updatedAdmissions);

          // Dispatch event with updated admissions to update stats
          window.dispatchEvent(
            new CustomEvent("admissionsUpdated", { detail: updatedAdmissions })
          );
        } else {
          toast.error(response.message || "Failed to delete admission");
        }
      } catch (error) {
        console.error("Error deleting admission:", error);
        toast.error("An unexpected error occurred. Please try again later.");
      }
    }
  };

  // Load admissions on component mount
  useEffect(() => {
    fetchAdmissions();
  }, []); // Empty dependency array ensures this only runs once

  // Format date for display
  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleString();
  };

  // Handle sorting
  const handleSort = (field: string) => {
    if (sortField === field) {
      setSortDirection(sortDirection === "asc" ? "desc" : "asc");
    } else {
      setSortField(field);
      setSortDirection("asc");
    }
  };

  // Filter and sort admissions
  const filteredAndSortedAdmissions = admissions
    .filter((admission) => {
      const searchLower = searchTerm.toLowerCase();
      return (
        admission.name.toLowerCase().includes(searchLower) ||
        admission.email.toLowerCase().includes(searchLower) ||
        admission.phone.includes(searchTerm) ||
        admission.preferredTime.toLowerCase().includes(searchLower) ||
        admission.message.toLowerCase().includes(searchLower)
      );
    })
    .sort((a, b) => {
      const fieldA = a[sortField as keyof Admission];
      const fieldB = b[sortField as keyof Admission];

      if (typeof fieldA === "string" && typeof fieldB === "string") {
        return sortDirection === "asc"
          ? fieldA.localeCompare(fieldB)
          : fieldB.localeCompare(fieldA);
      }

      // For dates or other types
      if (fieldA < fieldB) return sortDirection === "asc" ? -1 : 1;
      if (fieldA > fieldB) return sortDirection === "asc" ? 1 : -1;
      return 0;
    });

  // Toggle row expansion
  const toggleRowExpansion = (id: string) => {
    setExpandedRow(expandedRow === id ? null : id);
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center py-12">
        <div className="flex flex-col items-center">
          <RefreshCw className="h-10 w-10 text-purple-600 animate-spin mb-4" />
          <p className="text-gray-600 dark:text-gray-300">
            Loading admissions...
          </p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="text-center py-12 bg-white dark:bg-gray-800 rounded-xl shadow-md p-8">
        <div className="text-red-500 text-5xl mb-4">⚠️</div>
        <p className="text-red-600 dark:text-red-400 mb-6 text-lg">{error}</p>
        <button
          onClick={fetchAdmissions}
          className="bg-purple-600 hover:bg-purple-700 text-white py-2 px-6 rounded-lg shadow-md transition-colors duration-200 flex items-center gap-2 mx-auto"
        >
          <RefreshCw className="h-5 w-5" />
          Try Again
        </button>
      </div>
    );
  }

  if (admissions.length === 0) {
    return (
      <div className="text-center py-12 bg-white dark:bg-gray-800 rounded-xl shadow-md p-8">
        <div className="text-gray-400 text-5xl mb-4">📋</div>
        <p className="text-gray-600 dark:text-gray-300 mb-4 text-lg">
          No admissions found.
        </p>
        <p className="text-gray-500 dark:text-gray-400">
          New applications will appear here once submitted.
        </p>
      </div>
    );
  }

  return (
    <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-6 border border-gray-100 dark:border-gray-700">
      <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-6 gap-4">
        <h2 className="text-2xl font-bold text-gray-800 dark:text-white">
          Admissions List
        </h2>

        <div className="flex flex-col sm:flex-row gap-4">
          {/* Search */}
          <div className="relative">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <Search className="h-5 w-5 text-gray-400" />
            </div>
            <input
              type="text"
              placeholder="Search admissions..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10 pr-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent dark:bg-gray-700 dark:text-white w-full"
            />
          </div>

          {/* Refresh button */}
          <button
            onClick={fetchAdmissions}
            className="bg-gray-100 hover:bg-gray-200 dark:bg-gray-700 dark:hover:bg-gray-600 text-gray-700 dark:text-gray-200 py-2 px-4 rounded-lg transition-colors duration-200 flex items-center gap-2"
          >
            <RefreshCw className="h-5 w-5" />
            <span>Refresh</span>
          </button>
        </div>
      </div>

      <div className="overflow-x-auto">
        <table className="min-w-full bg-white dark:bg-gray-800 border-collapse">
          <thead>
            <tr className="bg-gray-50 dark:bg-gray-700 border-b border-gray-200 dark:border-gray-600">
              <th
                className="py-3 px-4 text-left cursor-pointer hover:bg-gray-100 dark:hover:bg-gray-600 transition-colors duration-150"
                onClick={() => handleSort("name")}
              >
                <div className="flex items-center gap-1">
                  <span>Name</span>
                  {sortField === "name" &&
                    (sortDirection === "asc" ? (
                      <ChevronUp className="h-4 w-4" />
                    ) : (
                      <ChevronDown className="h-4 w-4" />
                    ))}
                </div>
              </th>
              <th
                className="py-3 px-4 text-left cursor-pointer hover:bg-gray-100 dark:hover:bg-gray-600 transition-colors duration-150"
                onClick={() => handleSort("email")}
              >
                <div className="flex items-center gap-1">
                  <span>Email</span>
                  {sortField === "email" &&
                    (sortDirection === "asc" ? (
                      <ChevronUp className="h-4 w-4" />
                    ) : (
                      <ChevronDown className="h-4 w-4" />
                    ))}
                </div>
              </th>
              <th className="py-3 px-4 text-left">Phone</th>
              <th className="py-3 px-4 text-left">Preferred Time</th>
              <th
                className="py-3 px-4 text-left cursor-pointer hover:bg-gray-100 dark:hover:bg-gray-600 transition-colors duration-150"
                onClick={() => handleSort("createdAt")}
              >
                <div className="flex items-center gap-1">
                  <span>Submitted On</span>
                  {sortField === "createdAt" &&
                    (sortDirection === "asc" ? (
                      <ChevronUp className="h-4 w-4" />
                    ) : (
                      <ChevronDown className="h-4 w-4" />
                    ))}
                </div>
              </th>
              <th className="py-3 px-4 text-left">Actions</th>
            </tr>
          </thead>
          <tbody>
            <AnimatePresence>
              {filteredAndSortedAdmissions.map((admission) => (
                <React.Fragment key={admission._id}>
                  <motion.tr
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 0.3 }}
                    className={`border-b border-gray-200 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-700 cursor-pointer transition-colors duration-150 ${
                      expandedRow === admission._id
                        ? "bg-purple-50 dark:bg-purple-900/20"
                        : ""
                    }`}
                    onClick={() => toggleRowExpansion(admission._id)}
                  >
                    <td className="py-3 px-4 border-r border-gray-100 dark:border-gray-700">
                      {admission.name}
                    </td>
                    <td className="py-3 px-4 border-r border-gray-100 dark:border-gray-700">
                      {admission.email}
                    </td>
                    <td className="py-3 px-4 border-r border-gray-100 dark:border-gray-700">
                      {admission.phone}
                    </td>
                    <td className="py-3 px-4 border-r border-gray-100 dark:border-gray-700">
                      {admission.preferredTime}
                    </td>
                    <td className="py-3 px-4 border-r border-gray-100 dark:border-gray-700">
                      {formatDate(admission.createdAt)}
                    </td>
                    <td className="py-3 px-4">
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          handleDelete(admission._id);
                        }}
                        className="bg-red-100 text-red-600 hover:bg-red-200 p-2 rounded-lg transition-colors duration-200"
                      >
                        <Trash2 className="h-5 w-5" />
                      </button>
                    </td>
                  </motion.tr>

                  <AnimatePresence>
                    {expandedRow === admission._id && (
                      <motion.tr
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: "auto" }}
                        exit={{ opacity: 0, height: 0 }}
                        transition={{ duration: 0.3 }}
                      >
                        <td
                          colSpan={6}
                          className="py-4 px-6 bg-gray-50 dark:bg-gray-700/50"
                        >
                          <div className="p-4 bg-white dark:bg-gray-800 rounded-lg shadow-inner border border-gray-200 dark:border-gray-600">
                            <h4 className="font-medium text-gray-700 dark:text-gray-300 mb-2">
                              Message:
                            </h4>
                            <p className="text-gray-600 dark:text-gray-400 whitespace-pre-wrap">
                              {admission.message}
                            </p>
                          </div>
                        </td>
                      </motion.tr>
                    )}
                  </AnimatePresence>
                </React.Fragment>
              ))}
            </AnimatePresence>
          </tbody>
        </table>
      </div>

      <div className="mt-6 flex justify-between items-center">
        <p className="text-sm text-gray-500 dark:text-gray-400">
          Showing {filteredAndSortedAdmissions.length} of {admissions.length}{" "}
          admissions
        </p>
        <div className="flex gap-2">
          <button className="px-3 py-1 border border-gray-300 dark:border-gray-600 rounded-md bg-white dark:bg-gray-700 text-gray-700 dark:text-gray-300 disabled:opacity-50">
            Previous
          </button>
          <button className="px-3 py-1 border border-gray-300 dark:border-gray-600 rounded-md bg-white dark:bg-gray-700 text-gray-700 dark:text-gray-300 disabled:opacity-50">
            Next
          </button>
        </div>
      </div>
    </div>
  );
};

export default AdmissionsList;
