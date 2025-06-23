"use client";
import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { 
  faTasks, 
  faCheckCircle, 
  faCalendarAlt, 
  faChartLine 
} from "@fortawesome/free-solid-svg-icons";
import { motion } from "framer-motion";
import Link from "next/link";

// Animation variants
const fadeInUp = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0 }
};

const staggerContainer = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1
    }
  }
};

const HomePage = () => {
  const features = [
    {
      icon: faCheckCircle,
      title: "Simple Task Management",
      description: "Create and organize tasks with our intuitive interface"
    },
    {
      icon: faCalendarAlt,
      title: "Smart Scheduling",
      description: "Plan your work with our intelligent calendar"
    },
    {
      icon: faChartLine,
      title: "Progress Tracking",
      description: "Visualize your productivity with analytics"
    }
  ];

  return (
    <div className="min-h-screen pt-16"> {/* pt-16 to account for fixed navbar */}
      {/* Hero Section */}
      <section className="bg-blue-600 text-white py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="lg:flex lg:items-center lg:justify-between">
            <div className="lg:w-1/2">
              <motion.h1 
                initial="hidden"
                animate="visible"
                variants={fadeInUp}
                className="text-4xl font-bold mb-6"
              >
                Organize Your Work, Simplify Your Life
              </motion.h1>
              <motion.p 
                initial="hidden"
                animate="visible"
                variants={fadeInUp}
                transition={{ delay: 0.2 }}
                className="text-xl mb-8"
              >
                TaskMaster helps you stay productive and organized with powerful task management tools.
              </motion.p>
              <motion.div
                initial="hidden"
                animate="visible"
                variants={fadeInUp}
                transition={{ delay: 0.4 }}
                className="flex space-x-4"
              >
                
                <Link 
                  href="/pages/Features" 
                  className="border border-white px-6 py-3 rounded-md font-medium hover:bg-blue-700 transition-colors"
                >
                  Learn More
                </Link>
              </motion.div>
            </div>
            <motion.div 
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5 }}
              className="lg:w-1/2 mt-10 lg:mt-0"
            >
              <div className="bg-white/10 p-6 rounded-xl">
                <FontAwesomeIcon 
                  icon={faTasks} 
                  className="h-64 w-64 mx-auto text-white/90" 
                />
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Features Preview */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.h2 
            initial="hidden"
            whileInView="visible"
            variants={fadeInUp}
            viewport={{ once: true }}
            className="text-3xl font-bold text-center text-gray-900 mb-12"
          >
            Why Choose TaskMaster?
          </motion.h2>
          <motion.div 
            initial="hidden"
            whileInView="visible"
            variants={staggerContainer}
            viewport={{ once: true }}
            className="grid md:grid-cols-3 gap-8"
          >
            {features.map((feature, index) => (
              <motion.div 
                key={index}
                variants={fadeInUp}
                className="text-center p-6 bg-gray-50 rounded-lg hover:shadow-md transition-shadow"
              >
                <div className="bg-blue-100 text-blue-600 p-3 rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4">
                  <FontAwesomeIcon icon={feature.icon} className="h-6 w-6" />
                </div>
                <h3 className="text-xl font-semibold mb-2">{feature.title}</h3>
                <p className="text-gray-600">{feature.description}</p>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* How It Works */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.h2 
            initial="hidden"
            whileInView="visible"
            variants={fadeInUp}
            viewport={{ once: true }}
            className="text-3xl font-bold text-center text-gray-900 mb-12"
          >
            How It Works
          </motion.h2>
          <div className="max-w-3xl mx-auto">
            <motion.div 
              initial="hidden"
              whileInView="visible"
              variants={staggerContainer}
              viewport={{ once: true }}
              className="space-y-8"
            >
              {[
                "1. Create your free account",
                "2. Add your tasks and projects",
                "3. Organize with labels and priorities",
                "4. Track your progress and stay productive"
              ].map((step, index) => (
                <motion.div 
                  key={index}
                  variants={fadeInUp}
                  className="flex items-start"
                >
                  <div className="bg-blue-600 text-white rounded-full w-8 h-8 flex items-center justify-center mr-4 mt-1">
                    {index + 1}
                  </div>
                  <p className="text-lg text-gray-800">{step}</p>
                </motion.div>
              ))}
            </motion.div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default HomePage;