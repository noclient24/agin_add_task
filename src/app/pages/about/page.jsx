"use client";
import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUsers, faRocket, faShieldAlt, faChartLine } from "@fortawesome/free-solid-svg-icons";
import Link from "next/link";
import Image from "next/image";
import { motion } from "framer-motion";

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

const AboutPage = () => {
  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Section */}
      <section className="bg-white py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <motion.h1 
            initial="hidden"
            animate="visible"
            variants={fadeInUp}
            className="text-4xl font-bold text-gray-900 mb-6"
          >
            About TaskMaster
          </motion.h1>
          <motion.p 
            initial="hidden"
            animate="visible"
            variants={fadeInUp}
            transition={{ delay: 0.2 }}
            className="text-xl text-gray-600 max-w-3xl mx-auto"
          >
            Revolutionizing task management with intuitive tools designed to boost your productivity 
            and simplify your workflow.
          </motion.p>
        </div>
      </section>

      {/* Our Story */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="lg:flex lg:items-center lg:justify-between">
            <div className="lg:w-1/2">
              <motion.h2 
                initial="hidden"
                whileInView="visible"
                variants={fadeInUp}
                viewport={{ once: true }}
                className="text-3xl font-bold text-gray-900 mb-6"
              >
                Our Story
              </motion.h2>
              <motion.p 
                initial="hidden"
                whileInView="visible"
                variants={fadeInUp}
                viewport={{ once: true }}
                transition={{ delay: 0.1 }}
                className="text-gray-600 mb-4"
              >
                Founded in 2023, TaskMaster began as a simple solution to a common problem: 
                people struggling to manage their daily tasks efficiently.
              </motion.p>
              <motion.p 
                initial="hidden"
                whileInView="visible"
                variants={fadeInUp}
                viewport={{ once: true }}
                transition={{ delay: 0.2 }}
                className="text-gray-600 mb-4"
              >
                What started as a personal project quickly grew into a full-fledged platform 
                serving thousands of users worldwide who needed a better way to organize their work.
              </motion.p>
              <motion.p 
                initial="hidden"
                whileInView="visible"
                variants={fadeInUp}
                viewport={{ once: true }}
                transition={{ delay: 0.3 }}
                className="text-gray-600"
              >
                Today, we're committed to continuously improving TaskMaster to help individuals 
                and teams achieve more with less stress.
              </motion.p>
            </div>
            <motion.div 
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
              className="lg:w-1/2 mt-10 lg:mt-0"
            >
              <Image 
                src="https://images.unsplash.com/photo-1522071820081-009f0129c71c?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1170&q=80" 
                alt="Team working together" 
                width={600}
                height={400}
                className="rounded-lg shadow-xl w-full h-auto object-cover"
                priority
              />
            </motion.div>
          </div>
        </div>
      </section>

      {/* Core Values */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.h2 
            initial="hidden"
            whileInView="visible"
            variants={fadeInUp}
            viewport={{ once: true }}
            className="text-3xl font-bold text-center text-gray-900 mb-12"
          >
            Our Core Values
          </motion.h2>
          <motion.div 
            initial="hidden"
            whileInView="visible"
            variants={staggerContainer}
            viewport={{ once: true }}
            className="grid md:grid-cols-2 lg:grid-cols-4 gap-8"
          >
            {values.map((value) => (
              <motion.div 
                key={value.id}
                variants={fadeInUp}
                className="text-center p-6 bg-gray-50 rounded-lg hover:shadow-md transition-shadow"
              >
                <FontAwesomeIcon icon={value.icon} className="text-blue-600 text-4xl mb-4" />
                <h3 className="text-xl font-semibold mb-3">{value.title}</h3>
                <p className="text-gray-600">{value.description}</p>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Team Section */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.h2 
            initial="hidden"
            whileInView="visible"
            variants={fadeInUp}
            viewport={{ once: true }}
            className="text-3xl font-bold text-center text-gray-900 mb-12"
          >
            Meet Our Team
          </motion.h2>
          <motion.div 
            initial="hidden"
            whileInView="visible"
            variants={staggerContainer}
            viewport={{ once: true }}
            className="grid sm:grid-cols-2 lg:grid-cols-4 gap-8"
          >
            {teamMembers.map((member) => (
              <motion.div 
                key={member.id}
                variants={fadeInUp}
                whileHover={{ y: -5 }}
                className="text-center bg-white p-6 rounded-lg shadow-sm hover:shadow-md transition-all"
              >
                <motion.div 
                  whileHover={{ scale: 1.05 }}
                  className="w-32 h-32 rounded-full mx-auto mb-4 overflow-hidden"
                >
                  <Image 
                    src={member.image} 
                    alt={member.name} 
                    width={128}
                    height={128}
                    className="w-full h-full object-cover"
                  />
                </motion.div>
                <h3 className="text-xl font-semibold">{member.name}</h3>
                <p className="text-blue-600 mb-2">{member.role}</p>
                <p className="text-gray-600 text-sm">{member.bio}</p>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

    </div>
  );
};

// Sample data
const values = [
  {
    id: 1,
    icon: faUsers,
    title: "User-Centric",
    description: "We design every feature with our users' needs at the forefront."
  },
  {
    id: 2,
    icon: faRocket,
    title: "Innovation",
    description: "Constantly pushing boundaries to deliver cutting-edge solutions."
  },
  {
    id: 3,
    icon: faShieldAlt,
    title: "Integrity",
    description: "We value honesty and transparency in everything we do."
  },
  {
    id: 4,
    icon: faChartLine,
    title: "Growth",
    description: "Committed to helping our users and our company grow together."
  }
];

const teamMembers = [
  {
    id: 1,
    name: "Alex Johnson",
    role: "Founder & CEO",
    bio: "Passionate about productivity and creating tools that make life easier.",
    image: "https://www.shutterstock.com/image-photo/smiling-african-american-millennial-businessman-600nw-1437938108.jpg"
  },
  {
    id: 2,
    name: "Sarah Williams",
    role: "Lead Developer",
    bio: "Builds the technology that powers TaskMaster's innovative features.",
    image: "https://randomuser.me/api/portraits/women/44.jpg"
  },
  {
    id: 3,
    name: "Michael Chen",
    role: "Product Designer",
    bio: "Ensures TaskMaster is intuitive and beautiful to use every day.",
    image: "https://randomuser.me/api/portraits/men/22.jpg"
  },
  {
    id: 4,
    name: "Emily Rodriguez",
    role: "Customer Success",
    bio: "Dedicated to helping users get the most out of TaskMaster.",
    image: "https://randomuser.me/api/portraits/women/63.jpg"
  }
];

export default AboutPage;