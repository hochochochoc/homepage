import React from "react";
import { motion } from "framer-motion";
import { Download } from "lucide-react";
import { Linkedin } from "lucide-react";
import { Github } from "lucide-react";

const HeroSection = () => {
  const itemVariants = {
    hidden: {
      opacity: 0,
      scale: 0.7,
    },
    visible: (delay) => ({
      opacity: 1,
      scale: 1,
      transition: {
        duration: 1,
        type: "tween",
        delay: delay || 0,
      },
    }),
  };

  return (
    <div className="container mx-auto py-10">
      <div className="mx-auto grid px-9 md:px-3 lg:grid-cols-12 lg:gap-8 lg:px-0 lg:py-10 xl:gap-0">
        <div className="col-span-12 place-self-center lg:col-span-7">
          <motion.h3
            initial="hidden"
            animate="visible"
            custom={0.1}
            variants={itemVariants}
            className="mb-6 max-w-2xl text-3xl font-bold tracking-tight text-white xl:text-4xl"
          >
            Jannik Riegel
          </motion.h3>

          <motion.h1
            initial="hidden"
            animate="visible"
            custom={0.8}
            variants={itemVariants}
            className="mb-6 max-w-2xl bg-gradient-to-r from-blue-600 to-cyan-500 bg-clip-text text-5xl font-bold leading-none tracking-tight text-transparent md:text-7xl xl:text-8xl"
          >
            Desarrollador Web y Apps
          </motion.h1>

          <motion.div
            initial="hidden"
            animate="visible"
            custom={0.2}
            variants={itemVariants}
            className="hero-image-box my-10 rotate-3 justify-center rounded-xl transition-transform duration-700 hover:rotate-0 lg:col-span-5 lg:mt-0 lg:hidden"
          >
            <motion.img
              src="/jannik_riegel.jpg"
              alt="jannik_riegel"
              initial={{ opacity: 0, scale: 0.7 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{
                duration: 1,
                type: "tween",
                delay: 0.2,
              }}
              className="max-h-[400px] w-auto rounded-xl border-2 border-blue-900 transition-colors duration-700 hover:border-blue-400"
            />
          </motion.div>

          <motion.p
            initial="hidden"
            animate="visible"
            custom={1.15}
            variants={itemVariants}
            className="mb-6 max-w-2xl font-light text-white md:text-lg lg:mb-10 lg:text-xl"
          >
            Apasionado desarrollador web y aplicaciones, comprometido en crear
            aplicaciones funcionales que transformen la experiencia digital con
            innovación y dedicación.
          </motion.p>

          <div className="flex items-center gap-3">
            <motion.div
              initial="hidden"
              animate="visible"
              custom={0.25}
              variants={itemVariants}
              className="flex items-center gap-3"
            >
              <motion.button
                initial="hidden"
                animate="visible"
                custom={1.2}
                variants={itemVariants}
                onClick={() =>
                  window.open(
                    "http://localhost:5173/CV_Jannik_Riegel.pdf",
                    "_blank",
                  )
                }
                className="btn mr-3 inline-flex items-center justify-center rounded-full border border-blue-600 px-5 py-3 text-center text-base font-light text-blue-600 transition-colors duration-500 hover:bg-blue-600 hover:text-white"
              >
                <span className="mr-3">Descargar CV</span>
                <Download className="h-5 w-5" />
              </motion.button>

              <motion.button
                initial="hidden"
                animate="visible"
                custom={1.9}
                variants={itemVariants}
                onClick={() =>
                  window.open(
                    "https://www.linkedin.com/in/jannik-riegel/",
                    "_blank",
                  )
                }
                target="_blank"
                className="mr-3 items-center justify-center rounded-full border border-blue-600 px-3 py-3 text-center text-base font-light text-blue-600 transition-colors duration-500 hover:bg-blue-600 hover:text-white"
              >
                <Linkedin className="h-5 w-5" />
              </motion.button>

              <motion.button
                initial="hidden"
                animate="visible"
                custom={0.1}
                variants={itemVariants}
                onClick={() =>
                  window.open("https://github.com/hochochochoc", "_blank")
                }
                target="_blank"
                className="mr-3 items-center justify-center rounded-full border border-blue-600 px-3 py-3 text-center text-base font-light text-blue-600 transition-colors duration-500 hover:bg-blue-600 hover:text-white"
              >
                <Github className="h-5 w-5" />
              </motion.button>
            </motion.div>
          </div>
        </div>

        <motion.div
          initial="hidden"
          animate="visible"
          custom={0.2}
          variants={itemVariants}
          className="hero-image-box hidden rotate-6 rounded-xl transition-transform duration-700 hover:rotate-0 lg:col-span-5 lg:mt-0 lg:flex"
        >
          <motion.img
            src="/jannik_riegel.jpg"
            alt="jannik_riegel"
            initial={{ opacity: 0, scale: 0.7 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{
              duration: 1,
              type: "tween",
              delay: 0.2,
            }}
            className="max-h-[460px] w-auto rounded-xl border-[3px] border-blue-900 transition-colors duration-700 hover:border-blue-400"
          />
        </motion.div>
      </div>
    </div>
  );
};

export default HeroSection;
