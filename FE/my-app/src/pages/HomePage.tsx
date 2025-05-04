import React, { useEffect, useRef } from "react";
import AdmissionForm from "../components/AdmissionForm";
import { motion } from "framer-motion";
import { ChevronRight, GraduationCap, Clock, Mail } from "lucide-react";

const HomePage: React.FC = () => {
  const testimonials = [
    {
      name: "Sarah Johnson",
      role: "Computer Science Student",
      text: "The admission process was smooth and the staff was very helpful throughout.",
    },
    {
      name: "Michael Chen",
      role: "Business Administration Student",
      text: "I'm grateful for the guidance I received during my application process.",
    },
    {
      name: "Priya Sharma",
      role: "Engineering Student",
      text: "The online portal made it easy to submit my documents and track my application.",
    },
  ];

  const [currentTestimonial, setCurrentTestimonial] = React.useState(0);
  const intervalRef = useRef<NodeJS.Timeout | null>(null);

  useEffect(() => {
    intervalRef.current = setInterval(() => {
      setCurrentTestimonial((prev) => (prev + 1) % testimonials.length);
    }, 5000);

    return () => {
      if (intervalRef.current) clearInterval(intervalRef.current);
    };
  }, [testimonials.length]);

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-gray-100 dark:from-gray-900 dark:to-gray-800">
      <div className="relative overflow-hidden bg-gradient-to-r from-purple-600 to-indigo-700 text-white">
        <div className="absolute inset-0 opacity-20">
          <div className="absolute inset-0 bg-[url('/placeholder.svg?height=600&width=1200')] bg-cover bg-center"></div>
        </div>
        <div className="container mx-auto px-4 py-16 relative z-10">
          <div className="max-w-4xl mx-auto text-center">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
            >
              <GraduationCap className="h-16 w-16 mx-auto mb-6 text-white" />
              <h1 className="text-4xl md:text-5xl font-bold mb-4 tracking-tight">
                Begin Your Academic Journey Today
              </h1>
              <p className="text-xl md:text-2xl text-purple-100 mb-8 max-w-3xl mx-auto">
                Take the first step toward your future by applying to our
                prestigious programs.
              </p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.3, duration: 0.5 }}
              className="flex flex-wrap justify-center gap-4 mt-8"
            >
              <a href="#admission-form">
                <button className="group relative px-8 py-3 bg-white text-purple-700 font-bold rounded-full text-lg shadow-lg hover:shadow-xl transition-all duration-300 overflow-hidden">
                  <span className="relative z-10 flex items-center gap-2">
                    Apply Now <ChevronRight className="h-5 w-5" />
                  </span>
                  <span className="absolute inset-0 bg-gradient-to-r from-purple-200 to-purple-300 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></span>
                  <span className="absolute -inset-x-1 bottom-0 h-1 bg-gradient-to-r from-purple-400 to-indigo-500 group-hover:h-1 transition-all duration-300"></span>
                  <span className="absolute inset-0 w-full h-full bg-white/30 group-hover:bg-transparent blur-xl group-hover:blur-0 transition-all duration-500 scale-150 group-hover:scale-100"></span>
                </button>
              </a>
            </motion.div>
          </div>
        </div>

        <div className="absolute bottom-0 left-0 right-0">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 1440 120"
            className="w-full h-auto"
          >
            <path
              fill="#ffffff"
              fillOpacity="1"
              d="M0,64L80,69.3C160,75,320,85,480,80C640,75,800,53,960,48C1120,43,1280,53,1360,58.7L1440,64L1440,120L1360,120C1280,120,1120,120,960,120C800,120,640,120,480,120C320,120,160,120,80,120L0,120Z"
            ></path>
          </svg>
        </div>
      </div>

      <div className="container mx-auto px-4 py-16">
        <div className="max-w-6xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-3xl font-bold mb-4 text-gray-800 dark:text-white">
              Why Choose Our Institution
            </h2>
            <p className="text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
              We provide a supportive environment for academic excellence and
              personal growth.
            </p>
          </motion.div>

          <div className="grid md:grid-cols-3 gap-8">
            {[
              {
                icon: <GraduationCap className="h-10 w-10 text-purple-600" />,
                title: "Expert Faculty",
                description:
                  "Learn from industry professionals and academic experts in your field of study.",
              },
              {
                icon: <Clock className="h-10 w-10 text-purple-600" />,
                title: "Flexible Schedules",
                description:
                  "Choose from various program timings that fit your personal and professional life.",
              },
              {
                icon: <Mail className="h-10 w-10 text-purple-600" />,
                title: "Dedicated Support",
                description:
                  "Get personalized guidance throughout your academic journey with us.",
              },
            ].map((feature, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                viewport={{ once: true }}
                className="bg-white dark:bg-gray-800 p-8 rounded-xl shadow-lg hover:shadow-xl transition-shadow duration-300"
              >
                <div className="bg-purple-100 dark:bg-purple-900/30 p-3 rounded-full w-fit mb-6">
                  {feature.icon}
                </div>
                <h3 className="text-xl font-bold mb-3 text-gray-800 dark:text-white">
                  {feature.title}
                </h3>
                <p className="text-gray-600 dark:text-gray-300">
                  {feature.description}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </div>

      <div className="bg-gradient-to-r from-indigo-50 to-purple-50 dark:from-indigo-900/20 dark:to-purple-900/20 py-16">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ duration: 0.5 }}
            viewport={{ once: true }}
            className="max-w-4xl mx-auto"
          >
            <h2 className="text-3xl font-bold mb-12 text-center text-gray-800 dark:text-white">
              What Our Students Say
            </h2>

            <div className="relative h-64 overflow-hidden">
              {testimonials.map((testimonial, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, x: 100 }}
                  animate={{
                    opacity: currentTestimonial === index ? 1 : 0,
                    x: currentTestimonial === index ? 0 : 100,
                    position:
                      currentTestimonial === index ? "relative" : "absolute",
                  }}
                  transition={{ duration: 0.5 }}
                  className="bg-white dark:bg-gray-800 p-8 rounded-xl shadow-lg"
                >
                  <div className="flex flex-col h-full">
                    <p className="text-gray-600 dark:text-gray-300 italic mb-6 text-lg">
                      "{testimonial.text}"
                    </p>
                    <div className="mt-auto">
                      <p className="font-bold text-gray-800 dark:text-white">
                        {testimonial.name}
                      </p>
                      <p className="text-purple-600 dark:text-purple-400">
                        {testimonial.role}
                      </p>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>

            <div className="flex justify-center mt-6 gap-2">
              {testimonials.map((_, index) => (
                <button
                  key={index}
                  onClick={() => setCurrentTestimonial(index)}
                  className={`w-3 h-3 rounded-full transition-colors duration-300 ${
                    currentTestimonial === index
                      ? "bg-purple-600"
                      : "bg-gray-300 dark:bg-gray-600"
                  }`}
                  aria-label={`Go to testimonial ${index + 1}`}
                />
              ))}
            </div>
          </motion.div>
        </div>
      </div>

      <div id="admission-form" className="container mx-auto px-4 py-16">
        <div className="max-w-4xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            viewport={{ once: true }}
            className="text-center mb-12"
          >
            <h2 className="text-3xl font-bold mb-4 text-gray-800 dark:text-white">
              Submit Your Application
            </h2>
            <p className="text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
              Fill out the form below to submit your admission application. Our
              team will get back to you shortly.
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            viewport={{ once: true }}
          >
            <AdmissionForm />
          </motion.div>
        </div>
      </div>
    </div>
  );
};

export default HomePage;
