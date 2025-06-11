"use client";
import Image from "next/image";
import React from "react";
import { motion } from "framer-motion";

import { Search } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

const HeroSection = () => {
  return (
    <div className="relative h-screen w-full">
      <Image
        src="/landing-hero/landing1.jpg"
        alt="Oikia Rental Platform Hero Image"
        fill
        className="object-cover object-center"
        priority
      />
      <div className="absolute inset-0 bg-black/60" />
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        className="absolute inset-0 flex items-center justify-center pb-15"
      >
        <div className="text-center text-white px-4 sm:px-6 lg:px-8 max-w-4xl mx-auto">
          <h1 className="text-4xl lg:text-5xl font-bold text-white mb-4">
            You have heard of real estate, now brace yourself for{" "}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-300 to-green-800 font-extrabold text-5xl lg:text-6xl drop-shadow-lg">
              Real
            </span>{" "}
            estate!
          </h1>

          <p className="text-base md:text-xl text-gray-300 mb-4">
            Don't believe me? Feast your eyes on our well selected properties
            befitting your taste and budget.
          </p>

          <div className="flex justify-center relative px-4">
            <div className="w-full max-w-lg relative">
              <Input
                type="text"
                value={"search Query"}
                onChange={() => {}}
                placeholder="Search by city, neighborhood or address"
                className="w-full rounded-3xl border-none bg-white h-12 sm:h-16 pl-3 pr-32"
              />
              <Button
                onClick={() => {}}
                className="absolute bg-secondary-500 text-white rounded-2xl right-2 top-1/2 -translate-y-1/2 border-none hover:bg-secondary-600 h-8 sm:h-10 px-3 sm:px-4"
              >
                <Search className="h-3 w-3 sm:h-4 sm:w-4 mr-1 sm:mr-2" />
                <span className="text-xs sm:text-sm">Search</span>
              </Button>
            </div>
          </div>
        </div>
      </motion.div>
    </div>
  );
};

export default HeroSection;
