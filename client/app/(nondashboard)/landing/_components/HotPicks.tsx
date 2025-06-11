"use client";
import TiltedCard from "@/components/TiltedCard";
import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import React, { useEffect, useState } from "react";

const HotPicks = () => {
  const [windowWidth, setWindowWidth] = useState(0);
  const [containerHeight, setContainerHeight] = useState("650px");

  useEffect(() => {
    // Set initial window width
    setWindowWidth(window.innerWidth);

    // Handle window resize
    const handleResize = () => {
      setWindowWidth(window.innerWidth);
    };

    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  useEffect(() => {
    // Adjust container height based on window width
    if (windowWidth < 760) {
      setContainerHeight("400px"); // Mobile
    } else if (windowWidth < 1024) {
      setContainerHeight("650px"); // Tablet
    } else {
      setContainerHeight("650px"); // Desktop
    }
  }, [windowWidth]);

  return (
    <div className="flex flex-col items-center w-full py-16 md:py-30 px-6 md:px-12 lg:px-16">
      <div className="flex items-center justify-between w-full max-w-6xl">
        <h2 className="text-4xl font-semibold">Hot Picks</h2>

        <Link href="/properties">
          <Button variant="ghost">
            View Listings
            <ArrowRight className="h-4 w-4" />
          </Button>
        </Link>
      </div>

      <div className="grid md:grid-cols-3 md:grid-rows-3 mt-8 gap-4 w-full max-w-6xl">
        <div className="md:col-span-1 md:row-span-3 rounded-2xl min-h-[200px] md:min-h-[400px] relative overflow-hidden">
          <Link href={"/"}>
            <TiltedCard
              imageSrc="/landing-hero/landing2.jpg"
              altText="Property Image"
              captionText="Featured Property"
              containerHeight={containerHeight}
              containerWidth="full"
              imageHeight="100%"
              imageWidth="100%"
              rotateAmplitude={windowWidth < 760 ? 8 : 12} // Reduce rotation on mobile
              scaleOnHover={windowWidth < 760 ? 1.1 : 1.2} // Reduce scale on mobile
              showMobileWarning={false}
              showTooltip={true}
              displayOverlayContent={false}
            />
          </Link>
        </div>
        <div className="md:col-span-1 md:row-span-1 rounded-2xl min-h-[300px] md:min-h-[200px] relative overflow-hidden group hover:border-4 hover:border-secondary-600 transition-all duration-500">
          <Link href={"/"}>
            <Image
              src="/landing-hero/landing2.jpg"
              alt="landing2"
              fill
              priority
              className="object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-b from-transparent to-zinc-900 w-full">
              <div className="absolute bottom-4 left-4 text-white group-hover:text-secondary-600">
                <h3 className="text-xl font-semibold">{"Property Address"}</h3>
                <p className="text-sm">Explore this amazing property</p>
              </div>
            </div>
          </Link>
        </div>
        <div className="md:col-span-1 md:row-span-1 rounded-2xl min-h-[300px] md:min-h-[200px] relative overflow-hidden group hover:border-4 hover:border-secondary-600 transition-all duration-500">
          <Link href={"/"}>
            <Image
              src="/landing-hero/landing2.jpg"
              alt="landing2"
              fill
              priority
              className="object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-b from-transparent to-zinc-900 w-full">
              <div className="absolute bottom-4 left-4 text-white group-hover:text-secondary-600">
                <h3 className="text-xl font-semibold">{"Property Address"}</h3>
                <p className="text-sm">Explore this amazing property</p>
              </div>
            </div>
          </Link>
        </div>
        <div className="md:col-span-2 row-span-2 rounded-2xl min-h-[300px] md:min-h-[200px] relative overflow-hidden group hover:border-4 hover:border-secondary-600 transition-all duration-500">
          <Link href={"/"}>
            <Image
              src="/landing-hero/landing3.jpg"
              alt="landing2"
              fill
              priority
              className="object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-b from-transparent to-zinc-900 w-full">
              <div className="absolute bottom-4 left-4 text-white group-hover:text-secondary-600">
                <h3 className="text-2xl font-semibold">{"Property Address"}</h3>
                <p className="text-sm">Explore this amazing property</p>
              </div>
            </div>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default HotPicks;
