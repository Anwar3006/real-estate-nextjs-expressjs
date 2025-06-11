"use client";
import React, { JSX, ReactNode } from "react";
import { motion } from "framer-motion";
import { Calendar, KeyRound, MapPin, Wallet } from "lucide-react";

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.2,
    },
  },
};
const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0 },
};

const DiscoverSection = () => {
  const cardsData = [
    {
      icon: MapPin,
      title: "Discover Verified Listings",
      description:
        "Explore a wide range of verified rental listings to find your perfect home.",
    },
    {
      icon: Calendar,
      title: "Schedule Viewing",
      description:
        "Easily schedule property viewings at your convenience with our integrated calendar.",
    },
    {
      icon: Wallet,
      title: "Make Secure Payments",
      description:
        "Make secure payments through our platform, ensuring a hassle-free transaction.",
    },
    {
      icon: KeyRound,
      title: "Get Your Keys",
      description:
        "Receive your keys and move into your new home with confidence and ease.",
    },
  ];
  return (
    <motion.div
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.3 }}
      variants={containerVariants}
      className="py-12 sm:py-16 lg:py-20 mb-16 bg-white"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          variants={itemVariants}
          className="mb-12 sm:mb-16 text-center"
        >
          <h2 className="text-2xl sm:text-3xl lg:text-4xl font-semibold leading-tight text-gray-800 mb-4">
            How it Works
          </h2>
          <p className="text-gray-600 text-base sm:text-lg max-w-3xl mx-auto leading-relaxed">
            Find your dream rental property with ease. Our platform connects you
            with verified listings, user reviews, and advanced search features
            to simplify your rental search.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-8 lg:gap-8">
          {cardsData.map((card, index) => (
            <motion.div
              key={index}
              variants={itemVariants}
              className="bg-white rounded-lg shadow-md p-6 hover:shadow-lg hover:shadow-secondary-400 transition-shadow duration-300"
            >
              <DiscoverCard
                icon={card.icon}
                title={card.title}
                description={card.description}
              />
            </motion.div>
          ))}
        </div>
      </div>
    </motion.div>
  );
};

const DiscoverCard = ({
  icon: Icon,
  title,
  description,
}: {
  icon: React.ComponentType<any>;
  title: string;
  description: string;
}) => {
  return (
    <div className="text-center">
      <div className="p-4 mb-4 flex items-center justify-start">
        <Icon className="w-12 h-12 text-secondary-700" />
      </div>
      <h3 className="text-xl font-semibold mb-2 text-left">{title}</h3>
      <p className="text-zinc-800 mb-4 text-left">{description}</p>
    </div>
  );
};

export default DiscoverSection;
