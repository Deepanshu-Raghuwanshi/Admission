import type React from "react";
import { useEffect, useState } from "react";
import AdmissionsList from "../components/AdmissionsList";
import { motion } from "framer-motion";
import { ClipboardList, Calendar, Clock, Users } from "lucide-react";
import type { Admission } from "../types";

const AdminPage: React.FC = () => {
  const [admissionsStats, setAdmissionsStats] = useState({
    total: 0,
    today: 0,
    yesterday: 0,
    lastWeek: 0,
  });

  useEffect(() => {
    const calculateStats = (admissions: Admission[]) => {
      const now = new Date();
      const today = new Date(now.getFullYear(), now.getMonth(), now.getDate());
      const yesterday = new Date(today);
      yesterday.setDate(yesterday.getDate() - 1);
      const lastWeek = new Date(today);
      lastWeek.setDate(lastWeek.getDate() - 7);

      const todayAdmissions = admissions.filter((admission) => {
        const createdAt = new Date(admission.createdAt);
        return createdAt >= today;
      });

      const yesterdayAdmissions = admissions.filter((admission) => {
        const createdAt = new Date(admission.createdAt);
        return createdAt >= yesterday && createdAt < today;
      });

      const lastWeekAdmissions = admissions.filter((admission) => {
        const createdAt = new Date(admission.createdAt);
        return createdAt >= lastWeek;
      });

      setAdmissionsStats({
        total: admissions.length,
        today: todayAdmissions.length,
        yesterday: yesterdayAdmissions.length,
        lastWeek: lastWeekAdmissions.length,
      });
    };

    const handleAdmissionsLoaded = (event: CustomEvent<Admission[]>) => {
      calculateStats(event.detail);
    };

    const handleAdmissionsUpdated = (event: CustomEvent<Admission[]>) => {
      calculateStats(event.detail);
    };

    window.addEventListener(
      "admissionsLoaded",
      handleAdmissionsLoaded as EventListener
    );
    window.addEventListener(
      "admissionsUpdated",
      handleAdmissionsUpdated as EventListener
    );

    return () => {
      window.removeEventListener(
        "admissionsLoaded",
        handleAdmissionsLoaded as EventListener
      );
      window.removeEventListener(
        "admissionsUpdated",
        handleAdmissionsUpdated as EventListener
      );
    };
  }, []);

  const stats = [
    {
      icon: <ClipboardList className="h-8 w-8 text-purple-600" />,
      title: "Total Applications",
      value: admissionsStats.total.toString(),
      change: "All time",
    },
    {
      icon: <Calendar className="h-8 w-8 text-blue-600" />,
      title: "Today's Applications",
      value: admissionsStats.today.toString(),
      change: "Today",
    },
    {
      icon: <Clock className="h-8 w-8 text-indigo-600" />,
      title: "Yesterday's Applications",
      value: admissionsStats.yesterday.toString(),
      change: "Yesterday",
    },
    {
      icon: <Users className="h-8 w-8 text-green-600" />,
      title: "Last Week Applications",
      value: admissionsStats.lastWeek.toString(),
      change: "Last 7 days",
    },
  ];

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      <div className="container mx-auto px-4 py-8">
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="max-w-6xl mx-auto"
        >
          <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-8">
            <div>
              <h1 className="text-3xl font-bold text-gray-800 dark:text-white">
                Admin Dashboard
              </h1>
              <p className="text-gray-600 dark:text-gray-300 mt-1">
                Manage and review all admission applications
              </p>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
            {stats.map((stat, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3, delay: index * 0.1 }}
                className="bg-white dark:bg-gray-800 rounded-xl shadow-md p-6 border border-gray-100 dark:border-gray-700"
              >
                <div className="flex items-center justify-between mb-4">
                  <div className="bg-gray-100 dark:bg-gray-700 p-3 rounded-lg">
                    {stat.icon}
                  </div>
                  <span className="text-xs font-medium text-gray-500 dark:text-gray-400">
                    {stat.change}
                  </span>
                </div>
                <h3 className="text-gray-500 dark:text-gray-400 text-sm font-medium">
                  {stat.title}
                </h3>
                <p className="text-3xl font-bold text-gray-800 dark:text-white mt-1">
                  {stat.value}
                </p>
              </motion.div>
            ))}
          </div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.3 }}
          >
            <AdmissionsList />
          </motion.div>
        </motion.div>
      </div>
    </div>
  );
};

export default AdminPage;
