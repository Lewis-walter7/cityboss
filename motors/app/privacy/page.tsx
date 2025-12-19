"use client";

import React from "react";
import { motion } from "framer-motion";
import Link from "next/link";
import { IoArrowBack, IoShieldCheckmarkOutline, IoLockClosedOutline, IoDocumentTextOutline, IoEyeOutline } from "react-icons/io5";

export default function PrivacyPolicy() {
  const fadeInUp = {
    initial: { opacity: 0, y: 20 },
    animate: { opacity: 1, y: 0 },
    transition: { duration: 0.5 }
  };

  const sections = [
    {
      title: "Information We Collect",
      icon: <IoDocumentTextOutline className="text-2xl text-[var(--color-accent)]" />,
      content: (
        <ul className="list-disc list-inside space-y-2 text-[var(--color-text-secondary)] ml-2">
          <li><strong>Personal Identification:</strong> Name, address, email, phone number, and driver's license details for test drives and purchases.</li>
          <li><strong>Financial Information:</strong> Bank account and credit card details necessary for processing transactions and financing applications.</li>
          <li><strong>Vehicle Preferences:</strong> Information about the vehicles you are interested in, including make, model, and features.</li>
          <li><strong>Digital Footprint:</strong> IP address, browser type, and browsing behavior on our website to enhance your user experience.</li>
        </ul>
      )
    },
    {
      title: "How We Use Your Data",
      icon: <IoEyeOutline className="text-2xl text-[var(--color-accent)]" />,
      content: (
        <p className="text-[var(--color-text-secondary)] leading-relaxed">
          We utilize your data to facilitate vehicle purchases, process financing applications, and schedule test drives. Additionally, we use this information to personalize our service offerings, improve our website functionality, and, with your consent, send you updates on exclusive inventory and promotions.
        </p>
      )
    },
    {
      title: "Data Security & Protection",
      icon: <IoLockClosedOutline className="text-2xl text-[var(--color-accent)]" />,
      content: (
        <p className="text-[var(--color-text-secondary)] leading-relaxed">
          City Boss Motors employs industry-leading encryption and security protocols to safeguard your personal and financial information. We restrict access to your personal data to employees, agents, and contractors who need to know that information in order to process it for us.
        </p>
      )
    },
    {
      title: "Your Rights",
      icon: <IoShieldCheckmarkOutline className="text-2xl text-[var(--color-accent)]" />,
      content: (
        <p className="text-[var(--color-text-secondary)] leading-relaxed">
          You have the right to request access to the personal information we hold about you, request corrections to any inaccuracies, and request the deletion of your data, subject to legal retention obligations. To exercise these rights, please contact our privacy team.
        </p>
      )
    }
  ];

  return (
    <div className="min-h-screen bg-[var(--color-background)] text-[var(--color-text-primary)] pb-20">
      {/* Background Ambience */}
      <div className="fixed inset-0 pointer-events-none overflow-hidden">
        <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] bg-[var(--color-accent)] rounded-full blur-[150px] opacity-10"></div>
        <div className="absolute bottom-[-10%] right-[-10%] w-[40%] h-[40%] bg-blue-900 rounded-full blur-[150px] opacity-10"></div>
      </div>

      <div className="relative z-10 max-w-4xl mx-auto px-6 py-12 md:py-20">
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5 }}
          className="mb-12"
        >
          <Link
            href="/"
            className="inline-flex items-center gap-2 text-[var(--color-text-secondary)] hover:text-[var(--color-accent)] transition-colors mb-8 group"
          >
            <IoArrowBack className="group-hover:-translate-x-1 transition-transform" />
            Back to Home
          </Link>

          <h1 className="heading-1 mb-6">
            Privacy <span className="text-gradient">Policy</span>
          </h1>
          <p className="text-xl text-[var(--color-text-secondary)] max-w-2xl leading-relaxed">
            At City Boss Motors, we value your trust as much as we value our vehicles. Transparency about how we handle your data is part of our premium service.
          </p>
          <div className="mt-6 flex items-center gap-4 text-sm text-[var(--color-silver)]">
            <span>Last Updated: December 19, 2025</span>
            <span className="w-1 h-1 rounded-full bg-[var(--color-silver)]"></span>
            <span>Effective immediately</span>
          </div>
        </motion.div>

        <div className="grid gap-8">
          {sections.map((section, index) => (
            <motion.div
              key={index}
              variants={fadeInUp}
              initial="initial"
              whileInView="animate"
              viewport={{ once: true, margin: "-50px" }}
              transition={{ delay: index * 0.1 }}
              className="glass p-8 rounded-[var(--radius-lg)] border border-white/5 bg-white/[0.02] hover:bg-white/[0.04] transition-colors"
            >
              <div className="flex items-start gap-5">
                <div className="p-3 rounded-xl bg-[var(--color-accent)]/10 border border-[var(--color-accent)]/20 shadow-[0_0_15px_rgba(255,85,0,0.15)]">
                  {section.icon}
                </div>
                <div className="flex-1">
                  <h3 className="heading-3 mb-4 text-white">{section.title}</h3>
                  {section.content}
                </div>
              </div>
            </motion.div>
          ))}

          <motion.div
            variants={fadeInUp}
            initial="initial"
            whileInView="animate"
            viewport={{ once: true }}
            className="mt-8 p-8 border-t border-white/10"
          >
            <h4 className="heading-4 mb-4">Contact Us</h4>
            <p className="text-[var(--color-text-secondary)] mb-4">
              If you have any questions about this Privacy Policy, please contact us:
            </p>
            <ul className="space-y-2 text-[var(--color-text-primary)]">
              <li>Email: <a href="mailto:legal@citybossmotors.com" className="hover:text-[var(--color-accent)] transition-colors">legal@citybossmotors.com</a></li>
              <li>Phone: +254 713 111106</li>
              <li>Address: Ridgeway Astro Petro Station, Kiambu Road, Kiambu, Kenya</li>
            </ul>
          </motion.div>
        </div>
      </div>
    </div>
  );
}
