import { motion } from "framer-motion";
import { useState } from "react";
import { Link } from "react-router-dom";
import connectorSticker from "../assets/Connector.png";
import creatorSticker from "../assets/Creator.png";
import explorerSticker from "../assets/Explorer.png";
import problemSolverSticker from "../assets/ProblemSolver.png";

const stickers = [
  { src: connectorSticker, alt: "Connector sticker" },
  { src: explorerSticker, alt: "Explorer sticker" },
  { src: creatorSticker, alt: "Creator sticker" },
  { src: problemSolverSticker, alt: "Problem Solver sticker" },
] as const;

const stickerTransition = {
  duration: 1.15,
  ease: [0.22, 1, 0.36, 1] as const,
};

export default function LandingPage() {
  const [isSettled, setIsSettled] = useState(false);

  return (
    <main className="relative h-svh overflow-hidden bg-white text-brand-purple">
      <div className="absolute inset-0 grid grid-cols-4">
        {stickers.map((sticker, index) => (
          <div
            key={sticker.alt}
            className={`relative flex items-center justify-center overflow-hidden ${
              index < 3 ? "border-r border-brand-purple-light/25" : ""
            }`}
          >
            <motion.img
              src={sticker.src}
              alt={sticker.alt}
              className="max-h-[min(58vh,26rem)] w-auto max-w-[88%] object-contain drop-shadow-[0_20px_40px_rgba(71,47,146,0.12)]"
              initial={{ y: "100vh", filter: "blur(0px)" }}
              animate={{
                y: 0,
                filter: isSettled ? "blur(10px)" : "blur(0px)",
                opacity: isSettled ? 0.78 : 1,
              }}
              transition={{
                ...stickerTransition,
                delay: index * 0.18,
                filter: {
                  duration: 0.45,
                  ease: "easeOut",
                  delay: isSettled ? 0.15 : 0,
                },
                opacity: {
                  duration: 0.45,
                  ease: "easeOut",
                  delay: isSettled ? 0.15 : 0,
                },
              }}
              onAnimationComplete={() => {
                if (index === stickers.length - 1) {
                  setIsSettled(true);
                }
              }}
            />
          </div>
        ))}
      </div>

      <motion.div
        className="pointer-events-none absolute inset-0 z-[5]"
        initial={false}
        animate={{
          opacity: isSettled ? 1 : 0,
        }}
        transition={{ duration: 0.5, ease: "easeOut", delay: isSettled ? 0.05 : 0 }}
      >
        <div className="absolute inset-0 bg-white/60 backdrop-blur-md" />
      </motion.div>

      <motion.div
        className="pointer-events-none absolute inset-0 z-10 flex items-end justify-center px-4 text-center sm:px-6"
        initial={false}
        animate={
          isSettled
            ? { alignItems: "center" }
            : { alignItems: "flex-end" }
        }
        transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
      >
        <motion.div
          className="pointer-events-auto w-full max-w-2xl"
          initial={false}
          animate={{
            y: isSettled ? 0 : "100vh",
            opacity: isSettled ? 1 : 1,
            scale: isSettled ? 1.02 : 1,
          }}
          transition={{
            y: { duration: 0.7, ease: [0.22, 1, 0.36, 1], delay: isSettled ? 0.05 : 0 },
            opacity: { duration: 0.2, ease: "easeOut", delay: isSettled ? 0.05 : 0 },
            scale: { duration: 0.6, ease: [0.22, 1, 0.36, 1], delay: isSettled ? 0.05 : 0 },
          }}
        >
          <div
            className={
              isSettled
                ? "rounded-3xl border border-brand-purple-light/25 bg-white/90 px-6 py-10 shadow-[0_24px_80px_rgba(71,47,146,0.12)] backdrop-blur-md sm:px-10 sm:py-12"
                : "pb-10 pt-28 sm:pb-12"
            }
          >
            <motion.div
              className="space-y-3 sm:space-y-4"
              initial={false}
              animate={isSettled ? { y: -6 } : { y: 0 }}
              transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
            >
              <h1 className="font-intro text-3xl tracking-tight sm:text-5xl md:text-6xl">
                Discover Your Digital Superpower
              </h1>
              <p className="mx-auto max-w-xl text-base text-brand-purple-light sm:text-xl">
                Take the quiz. Discover your profile. Receive a souvenir.
              </p>
            </motion.div>

            <motion.div
              className="mt-7 sm:mt-9"
              initial={false}
              animate={isSettled ? { scale: 1.08 } : { scale: 1 }}
              transition={{
                duration: 0.55,
                ease: [0.22, 1, 0.36, 1],
                delay: isSettled ? 0.1 : 0,
              }}
            >
              <Link
                to="/register"
                className={isSettled ? "btn-primary-lg" : "btn-primary"}
              >
                Start Quiz
              </Link>
            </motion.div>
          </div>
        </motion.div>
      </motion.div>
    </main>
  );
}
