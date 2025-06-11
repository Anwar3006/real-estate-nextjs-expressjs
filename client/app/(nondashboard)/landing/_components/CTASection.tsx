"use client";

import { House, Search, User } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import React from "react";
import { motion } from "framer-motion";
import { useAuth } from "@clerk/nextjs";
import { Button } from "@/components/ui/button";

const CTASection = () => {
  const { isSignedIn } = useAuth();

  // Animation variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        duration: 0.6,
        staggerChildren: 0.2,
      },
    },
  };

  const slideInLeft = {
    hidden: {
      opacity: 0,
      x: -50,
    },
    visible: {
      opacity: 1,
      x: 0,
      transition: {
        duration: 0.6,
        ease: "easeOut",
      },
    },
  };

  const slideInUp = {
    hidden: {
      opacity: 0,
      y: 30,
    },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.5,
        ease: "easeOut",
      },
    },
  };

  const slideInRight = {
    hidden: {
      opacity: 0,
      x: 20,
      scale: 0.95,
    },
    visible: {
      opacity: 1,
      x: 0,
      scale: 1,
      transition: {
        duration: 0.7,
        ease: "easeOut",
      },
    },
  };

  return (
    <div className="w-full px-4 sm:px-6 lg:px-8">
      <motion.div
        variants={containerVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.3 }}
        className="relative flex items-center justify-between w-full h-64 sm:h-80 lg:h-96 bg-secondary-300 rounded-lg mx-auto max-w-7xl "
      >
        {/* Title, Text and Buttons */}
        <motion.div
          variants={slideInLeft}
          className="flex flex-col items-start justify-center pl-4 sm:pl-6 md:pl-8 lg:pl-12 pr-2 sm:pr-4 md:pr-3 space-y-2 sm:space-y-3 lg:space-y-4 z-10 flex-1"
        >
          <motion.h2
            variants={slideInUp}
            className="text-lg sm:text-xl md:text-2xl lg:text-3xl xl:text-4xl font-bold text-gray-800 leading-tight max-w-xs sm:max-w-sm md:max-w-md lg:max-w-lg"
          >
            Find your dream home with us
          </motion.h2>
          <motion.p
            variants={slideInUp}
            className="text-gray-600 text-xs sm:text-sm md:text-base lg:text-lg max-w-xs sm:max-w-sm md:max-w-md lg:max-w-lg hidden sm:block"
          >
            Start browsing our property listings today and take the first step
            towards making your homeownership dreams a reality.
          </motion.p>
          <motion.p
            variants={slideInUp}
            className="text-gray-600 text-xs max-w-xs sm:hidden"
          >
            Start browsing our property listings today.
          </motion.p>

          <motion.div
            variants={slideInUp}
            className="flex items-center flex-col md:flex-row gap-2 sm:gap-4 pt-1 sm:pt-2"
          >
            <Button
              onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
              className="bg-zinc-900 hover:bg-zinc-700 text-white px-3 py-2 sm:px-4 sm:py-2 md:px-6 md:py-3 rounded-full font-medium text-xs sm:text-sm md:text-base"
            >
              <Search className="h-4 w-4 sm:h-5 sm:w-5 mr-1" />
              Search
            </Button>

            {!isSignedIn ? (
              <Link href={"/sign-in"}>
                <Button className="bg-white hover:bg-gray-100 px-3 py-2 sm:px-4 sm:py-2 md:px-6 md:py-3 rounded-full font-medium text-xs sm:text-sm md:text-base border border-gray-900">
                  <User className="h-4 w-4 sm:h-5 sm:w-5 mr-1" />
                  Sign In
                </Button>
              </Link>
            ) : null}
          </motion.div>
        </motion.div>

        {/* Image - positioned to overflow at the top */}
        <motion.div
          className="relative h-full w-[12rem] md:w-80 lg:w-96 flex-shrink-0"
          variants={slideInRight}
        >
          <motion.div
            className="absolute -top-4 sm:-top-6 lg:-top-8 right-4 md:right-4 h-[calc(100%+1rem)] sm:h-[calc(100%+1.5rem)] lg:h-[calc(100%+2rem)] w-full"
            whileHover={{
              scale: 1.02,
              transition: { duration: 0.3 },
            }}
          >
            <Image
              src={"/cta_image.png"}
              alt="CTA Image"
              fill
              className="object-cover object-top"
            />
          </motion.div>
        </motion.div>
      </motion.div>
    </div>
  );
};

export default CTASection;
