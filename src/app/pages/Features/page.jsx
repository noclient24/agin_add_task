"use client";
import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { 
  faTasks, 
  faCalendarAlt, 
  faBell, 
  faUsers, 
  faChartLine, 
  faSyncAlt,
  faMobileAlt,
  faLock
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

const FeaturesPage = () => {
  const features = [
    {
      id: 1,
      icon: faTasks,
      title: "Task Management",
      description: "Easily create, organize, and prioritize your tasks with our intuitive interface.",
      color: "bg-blue-100 text-blue-600"
    },
    {
      id: 2,
      icon: faCalendarAlt,
      title: "Smart Scheduling",
      description: "Automatically schedule tasks based on your availability and priorities.",
      color: "bg-purple-100 text-purple-600"
    },
    {
      id: 3,
      icon: faBell,
      title: "Reminders",
      description: "Never miss a deadline with customizable reminders and notifications.",
      color: "bg-green-100 text-green-600"
    },
    {
      id: 4,
      icon: faUsers,
      title: "Team Collaboration",
      description: "Work seamlessly with your team by assigning and tracking shared tasks.",
      color: "bg-yellow-100 text-yellow-600"
    },
    {
      id: 5,
      icon: faChartLine,
      title: "Progress Tracking",
      description: "Visualize your productivity with detailed analytics and reports.",
      color: "bg-red-100 text-red-600"
    },
    {
      id: 6,
      icon: faSyncAlt,
      title: "Cross-Device Sync",
      description: "Access your tasks from any device with real-time synchronization.",
      color: "bg-indigo-100 text-indigo-600"
    }
  ];

  const additionalFeatures = [
    {
      title: "Mobile Friendly",
      icon: faMobileAlt,
      description: "Fully responsive design works perfectly on all devices."
    },
    {
      title: "Secure Data",
      icon: faLock,
      description: "Your data is encrypted and protected with enterprise-grade security."
    }
  ];

  return (
    <div className="min-h-screen pt-16"> {/* pt-16 to account for fixed navbar */}
      {/* Hero Section */}
      <section className="bg-blue-900 text-white py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <motion.h1 
            initial="hidden"
            animate="visible"
            variants={fadeInUp}
            className="text-4xl font-bold mb-6"
          >
            Powerful Features
          </motion.h1>
          <motion.p 
            initial="hidden"
            animate="visible"
            variants={fadeInUp}
            transition={{ delay: 0.2 }}
            className="text-xl max-w-3xl mx-auto"
          >
            Discover how TaskMaster can transform your productivity with these amazing features
          </motion.p>
        </div>
      </section>

      {/* Main Features */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div 
            initial="hidden"
            whileInView="visible"
            variants={staggerContainer}
            viewport={{ once: true }}
            className="grid md:grid-cols-2 lg:grid-cols-3 gap-8"
          >
            {features.map((feature) => (
              <motion.div 
                key={feature.id}
                variants={fadeInUp}
                whileHover={{ y: -5 }}
                className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow"
              >
                <div className={`p-6 ${feature.color} flex justify-center`}>
                  <FontAwesomeIcon icon={feature.icon} className="h-12 w-12" />
                </div>
                <div className="p-6">
                  <h3 className="text-xl font-bold text-gray-900 mb-2">{feature.title}</h3>
                  <p className="text-gray-600">{feature.description}</p>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Additional Features */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.h2 
            initial="hidden"
            whileInView="visible"
            variants={fadeInUp}
            viewport={{ once: true }}
            className="text-3xl font-bold text-center text-gray-900 mb-12"
          >
            More Reasons to Love TaskMaster
          </motion.h2>
          <div className="max-w-3xl mx-auto">
            {additionalFeatures.map((feature, index) => (
              <motion.div 
                key={index}
                initial="hidden"
                whileInView="visible"
                variants={fadeInUp}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className="flex items-start mb-8"
              >
                <div className="bg-blue-100 text-blue-600 p-3 rounded-full mr-4">
                  <FontAwesomeIcon icon={feature.icon} className="h-5 w-5" />
                </div>
                <div>
                  <h3 className="text-xl font-semibold text-gray-900 mb-1">{feature.title}</h3>
                  <p className="text-gray-600">{feature.description}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

   
    </div>
  );
};

export default FeaturesPage;