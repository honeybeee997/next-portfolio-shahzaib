"use client";
import { Socialicons } from "../../constants";
import Link from "next/link";
import { motion } from "framer-motion";
import { containerVariants } from "@/app/(services)/animation/animation";
const Social_icons = () => {
  return (
    <div className="flex items-center gap-x-10">
      {Socialicons &&
        Socialicons.map((icon, index) => (
          <motion.div
            initial="offscreen"
            whileInView={"onscreen"}
            key={index}
            variants={containerVariants((index + 1) * 0.1)}
          >
            <Link
              href={icon.path}
              key={index}
              className="text-2xl text-black hover:text-orange transition-all"
            >
              {icon.icon}
            </Link>
          </motion.div>
        ))}
    </div>
  );
};

export default Social_icons;
