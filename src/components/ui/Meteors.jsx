"use client";
import { cn } from "../../lib/utils";
import { useEffect, useState } from "react";

export const Meteors = ({
  number = 20,
  className,
}) => {
  const [meteors, setMeteors] = useState([]);

  useEffect(() => {
    const meteorsArray = Array.from({ length: number }, (_, i) => ({
      left: Math.floor(Math.random() * (100 - -10) + -10) + "%",
      delay: Math.random() * (0.8 - 0.2) + 0.2,
      duration: Math.random() * (10 - 2) + 2,
      size: Math.random() * (3 - 1) + 1,
    }));
    setMeteors(meteorsArray);
  }, [number]);

  return (
    <>
      {meteors.map((meteor, idx) => (
        <span
          key={"meteor" + idx}
          className={cn(
            "animate-meteor-effect absolute top-1/2 left-1/2 h-px w-px rounded-[9999px] bg-slate-500 shadow-[0_0_0_1px_#ffffff10] rotate-[215deg]",
            "before:content-[''] before:absolute before:top-1/2 before:transform before:-translate-y-[50%] before:w-[50px] before:h-[1px] before:bg-gradient-to-r before:from-[#64748b] before:to-transparent",
            className
          )}
          style={{
            top: 0,
            left: meteor.left,
            animationDelay: meteor.delay + "s",
            animationDuration: meteor.duration + "s",
            opacity: Math.random() * 0.5 + 0.5,
          }}
        ></span>
      ))}
    </>
  );
};

