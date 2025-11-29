"use client";
import { useEffect } from "react";
import { motion } from "motion/react";
import { cn } from "../../lib/utils";

export const TextGenerateEffect = ({
  words,
  className,
  filter = true,
  duration = 0.5,
}) => {
  const wordsArray = words.split(" ");
  return (
    <div className={cn("font-bold", className)}>
      <motion.div
        className="pb-2"
        initial="hidden"
        animate="visible"
        transition={{ staggerChildren: 0.025 }}
      >
        {wordsArray.map((word, idx) => {
          return (
            <motion.span
              key={word + idx}
              className="dark:text-white text-black opacity-0"
              variants={{
                visible: { opacity: 1 },
                hidden: { opacity: 0 },
              }}
              transition={{
                duration: duration || 0.5,
                ease: "easeInOut",
              }}
            >
              {word}{" "}
            </motion.span>
          );
        })}
      </motion.div>
      {filter && (
        <div className="mt-4 flex gap-1">
          {wordsArray.map((word, idx) => {
            return (
              <motion.div
                key={"word" + idx}
                className="h-1 w-1 rounded-full bg-slate-600"
                variants={{
                  visible: { opacity: 1 },
                  hidden: { opacity: 0 },
                }}
                transition={{
                  duration: duration || 0.5,
                  ease: "easeInOut",
                }}
              ></motion.div>
            );
          })}
        </div>
      )}
    </div>
  );
};


