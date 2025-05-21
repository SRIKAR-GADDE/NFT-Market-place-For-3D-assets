"use client";

import { useRef, useState } from "react";
import Image from "next/image";
import { AnimatePresence, motion } from "framer-motion";
import { cn } from "@/lib/utils";
import { DirectionAwareHover } from "@/components/Directionhover";
import { IconBrush } from "@tabler/icons-react";

export function DireactionHover() {
  const DirectionAwareData = [
    {
      name: "Art",
      image: "/collection1.png",
    },
    {
      name: "Music",
      image: "/collection2.png",
    },
    {
      name: "Video",
      image: "/collection3.png",
    },
    {
      name: "Utility",
      image: "/collection4.png",
    },
    {
      name: "Photography",
      image: "/collection5.png",
    },
    {
      name: "Fashion",
      image: "/collection6.png",
    },
  ];
  return (
    <div className=" relative  flex items-center justify-center flex-wrap gap-4">
      <div class="absolute h-full top-[0rem] bottom-[0rem]  rounded-[50%] [background:radial-gradient(50%_50%_at_50%_50%,_rgba(114,_91,_218,_0.5),_rgba(6,_19,_45,_0))] w-full z-[-1]"></div>
      {DirectionAwareData.map((item, index) => (
        <DirectionAwareHover
          imageUrl={item.image}
          key={index}
          className="md:w-1/4"
        >
          <p className="font-bold text-xl">{item.name}</p>
        </DirectionAwareHover>
      ))}
    </div>
  );
}
