"use client";
import React from "react";
import { motion } from "framer-motion";
import Image from "next/image";
import Link from "next/link";

const containerVariants = {
  hidden: { opacity: 0, y: 50 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.5,
      staggerChildren: 0.2,
    },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0 },
};
const FeaturesSection = () => {
  const featuresData = [
    {
      imageSrc: "/landing-search3.png",
      title: "Trustworthy and Verified Listings",
      description:
        "Discover the best rental properties with our curated listings, ensuring you only see verified and trustworthy options.",
      linkText: "Explore",
      linkHref: "/explore",
    },
    {
      imageSrc: "/landing-search2.png",
      title: "Browse Rental Listings with Ease",
      description:
        "Get access to user reviews and ratings for each property, helping you make informed decisions.",
      linkText: "Search",
      linkHref: "/search",
    },
    {
      imageSrc: "/landing-search1.png",
      title: "Search with Advanced Filters",
      description:
        "Browse through a wide range of rental listings, from apartments to houses, all in one place.",
      linkText: "Discover",
      linkHref: "/discover",
    },
  ];

  return (
    <motion.div
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true }}
      variants={containerVariants}
      className="py-12 sm:py-16 lg:py-20 px-4 sm:px-6 lg:px-8 bg-zinc-900 rounded-2xl shadow-md"
    >
      <div className="max-w-7xl mx-auto">
        <motion.h2
          variants={itemVariants}
          className="text-2xl sm:text-3xl lg:text-4xl font-bold text-center mb-8 sm:mb-12 lg:mb-16 text-white max-w-4xl mx-auto"
        >
          Quickly find your next home with Oikia's advanced search filters
        </motion.h2>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 sm:gap-8 lg:gap-12">
          {featuresData.map((feature, index) => (
            <motion.div key={index} variants={itemVariants}>
              <FeaturesCard {...feature} />
            </motion.div>
          ))}
        </div>
      </div>
    </motion.div>
  );
};

const FeaturesCard = ({
  imageSrc,
  title,
  description,
  linkText,
  linkHref,
}: {
  imageSrc: string;
  title: string;
  description: string;
  linkText: string;
  linkHref: string;
}) => {
  return (
    <div className="text-center">
      <div className="p-4 rounded-lg mb-4 flex items-center justify-center h-48">
        <Image
          src={imageSrc}
          alt={title}
          width={400}
          height={400}
          className="h-full w-full object-contain"
        />
      </div>
      <h3 className="text-xl font-semibold mb-2 text-white">{title}</h3>
      <p className="text-gray-400 mb-4">{description}</p>
      <Link
        href={linkHref}
        className="inline-block border border-gray-300 rounded px-4 py-2 hover:bg-gray-100 text-white hover:text-black transition-colors duration-200"
        scroll={false}
      >
        {linkText}
      </Link>
    </div>
  );
};

export default FeaturesSection;
