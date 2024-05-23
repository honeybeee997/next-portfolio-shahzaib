"use client";

import { useEffect, useRef, useState } from "react";
import { IoIosSend } from "react-icons/io";
import { IoDownloadOutline } from "react-icons/io5";
import { motion } from "framer-motion";
import { IoIosArrowDown } from "react-icons/io";
import Typewriter from "typewriter-effect";
import Button from "@/app/components/button/Button";
import Social_icons from "@/app/components/socialIcons/Social_icons";
import Image from "next/image";
import {
  desVariants,
  imageVariant,
  tagVariants,
  tittleVariants,
} from "@/app/(services)/animation/animation";

let html2pdf;
if (typeof window !== "undefined") {
  html2pdf = require("html2pdf.js");
}

const Hero = ({ heroData }) => {
  const { name, animatedText, description, subHeading, image, cv } =
    heroData[0];
  const animate = animatedText.split(",");
  const hiddenContainerRef = useRef(null);
  const [isImageLoaded, setIsImageLoaded] = useState(false);

  const downloadCV = () => {
    if (!html2pdf) {
      console.error("html2pdf is not available");
      return;
    }

    const container = hiddenContainerRef.current;

    if (container) {
      html2pdf()
        .from(container)
        .set({
          margin: 1,
          filename: "cv.pdf",
          image: { type: "jpeg", quality: 0.98 },
          html2canvas: { scale: 2 },
          jsPDF: { unit: "in", format: "letter", orientation: "portrait" },
        })
        .save();
    }
  };

  return (
    <section
      id="home"
      className="w-full relative padding-y max-sm:py-2 padding-x 
       sm:h-[90vh] bg-offwhite "
    >
      <div
        className="flex lg:gap-x-52 2xl:justify-between  max-md:flex-col-reverse max-md:gap-6 max-container
           mt-7"
      >
        <div className="flex flex-col max-w-[600px] 2xl:w-full   xl:mx-0 justify-center ">
          <motion.div
            initial="offscreen"
            whileInView={"onscreen"}
            variants={tagVariants}
            className=" text-sm mb-0  text-capitalize tracking-[4px] font-semibold text-orange"
          >
            {subHeading}
          </motion.div>
          <motion.h1
            initial="offscreen"
            whileInView={"onscreen"}
            variants={tittleVariants}
            className="max-sm:text-[65px] mb-0  mt-1 font-bold flex-wrap text-black max-sm:leading-[72px] text-[54px]  "
          >
            Hi, I'm <span className="text-orange capitalize">{name} </span>
          </motion.h1>
          <motion.h3
            initial="offscreen"
            whileInView={"onscreen"}
            variants={tittleVariants}
            className=" text-xl max-sm:text-black max-sm:text-[18px]  tracking-[2px] text-orange font-semibold mb-2  max-sm:py-1 "
          >
            <Typewriter
              options={{
                strings: animate,
                autoStart: true,
                loop: true,
              }}
            />
          </motion.h3>

          <motion.p
            initial="offscreen"
            whileInView={"onscreen"}
            variants={desVariants}
            className="text-softtext text-[20px] flex-wrap sm:text-md leading-7 md:text-leading-normal sm:max-w-md  "
          >
            {description}
          </motion.p>
          <motion.div
            initial="offscreen"
            whileInView={"onscreen"}
            variants={tittleVariants}
            className="flex items-center gap-6 mt-4 sm:mt-6"
          >
            <Button
              label="Contact Me"
              bg="orange"
              icon={<IoIosSend />}
              link="#contact"
            />
            {cv && (
              <Button
                label="Download Cv"
                onClick={downloadCV}
                icon={<IoDownloadOutline />}
              />
            )}
          </motion.div>
          <div className=" mt-5 sm:mt-8">
            <Social_icons></Social_icons>
          </div>
        </div>
        <div className="  2xl:w-full flex justify-center items-center">
          <motion.div
            initial="offscreen"
            whileInView={"onscreen"}
            variants={imageVariant}
            className=" flex justify-center w-[230px] h-[230px] lg:w-[300px] lg:h-[300px] 2xl:w-[380px] 2xl:h-[380px] items-center  flex-wrap"
          >
            <Image
              src={image}
              width={300}
              height={300}
              className="border max-md:h-[200px] max-md:w-[200px] animate_image"
              alt="banner"
              layout="responsive"
            />
          </motion.div>
        </div>
      </div>
      <div className="hidden md:flex absolute left-2/4 bottom-[-30px] animate-bounce">
        <IoIosArrowDown className="text-2xl text-orange"></IoIosArrowDown>
      </div>

      {/* Hidden container for PDF generation */}
      <div ref={hiddenContainerRef} style={{ display: "none" }}>
        <img src={cv} alt="CV" onLoad={() => setIsImageLoaded(true)} />
      </div>
    </section>
  );
};

export default Hero;
