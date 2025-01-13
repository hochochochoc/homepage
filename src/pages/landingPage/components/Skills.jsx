import React from "react";
import { GraduationCap } from "lucide-react";
import { motion } from "framer-motion";

const SkillsSection = () => {
  // Function to handle special case capitalizations
  const formatSkillName = (skill) => {
    const specialCases = {
      html: "HTML",
      css: "CSS",
      js: "JavaScript",
      ts: "TypeScript",
      sass: "SASS",
      "next.js": "Next.js",
      nodejs: "Node.js",
      csharp: "C#",
      ".net": ".NET",
      mysql: "MySQL",
      git: "Git",
      github: "GitHub",
      jest: "Jest",
      react: "React",
      bootstrap: "Bootstrap",
      tailwind: "Tailwind",
    };

    return specialCases[skill] || skill;
  };

  const sectionVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        delayChildren: 0,
        staggerChildren: 0.2,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, x: -50 },
    visible: {
      opacity: 1,
      x: 0,
      transition: { duration: 0.3 },
    },
  };

  return (
    <div className="container mx-auto py-10">
      <div className="mb-10">
        <h2 className="mb-6 text-center text-4xl font-bold tracking-tight md:text-5xl xl:text-6xl">
          <GraduationCap
            size={62}
            strokeWidth={2.5}
            className="mb-3 mr-2 inline-block text-blue-600"
          />

          <span className="bg-gradient-to-r from-blue-600 to-cyan-500 bg-clip-text text-transparent">
            Mis Skills
          </span>
        </h2>
      </div>

      <h3 className="mb-5 text-center text-xl font-semibold text-blue-500 xl:text-2xl">
        Front-End
      </h3>
      <motion.div
        variants={sectionVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
        className="container mx-auto"
      >
        <div className="flex flex-wrap items-center justify-center gap-4">
          {[
            "react",
            "next.js",
            "ts",
            "js",
            "html",
            "css",
            "bootstrap",
            "tailwind",
            "sass",
          ].map((skill) => (
            <motion.div
              key={skill}
              variants={itemVariants}
              className="group h-44 w-36 rounded-3xl border-2 border-transparent bg-blue-950 p-4 text-blue-500 shadow-md transition-colors duration-500 hover:border-blue-500 hover:bg-blue-500 hover:bg-opacity-20 hover:text-blue-50"
            >
              <div className="flex h-full flex-col justify-between">
                <div className="skill-inner flex flex-col justify-between p-2">
                  <div className="icon-skill flex h-24 items-center justify-center">
                    <img
                      src={`/logos/logo_${skill}.svg`}
                      alt={`logo_${skill}`}
                      className="max-h-full max-w-full object-contain"
                    />
                  </div>
                  <div className="mt-2 hidden justify-center text-center group-hover:flex">
                    {formatSkillName(skill)}
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </motion.div>

      <h3 className="mb-5 mt-10 text-center text-xl font-semibold text-blue-500 xl:text-2xl">
        Back-End
      </h3>
      <motion.div
        variants={sectionVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
        className="container mx-auto"
      >
        <div className="flex flex-wrap items-center justify-center gap-4">
          {["csharp", "nodejs", "sql", "mysql"].map((skill) => (
            <motion.div
              key={skill}
              variants={itemVariants}
              className="group h-44 w-36 rounded-3xl border-2 border-transparent bg-blue-950 p-4 text-blue-500 shadow-md transition-colors duration-500 hover:border-blue-500 hover:bg-blue-500 hover:bg-opacity-20 hover:text-blue-50"
            >
              <div className="flex h-full flex-col justify-between">
                <div className="skill-inner flex flex-col justify-between p-2">
                  <div className="icon-skill flex h-24 items-center justify-center">
                    <img
                      src={`/logos/logo_${skill}.svg`}
                      alt={`logo_${skill}`}
                      className="max-h-full max-w-full object-contain"
                    />
                  </div>
                  <div className="mt-2 hidden justify-center text-center group-hover:flex">
                    {formatSkillName(skill)}
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </motion.div>

      <h3 className="mb-5 mt-10 text-center text-xl font-semibold text-blue-500 xl:text-2xl">
        Otros
      </h3>
      <motion.div
        variants={sectionVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
        className="container mx-auto"
      >
        <div className="flex flex-wrap items-center justify-center gap-4">
          {["git", "github", "jest"].map((skill) => (
            <motion.div
              key={skill}
              variants={itemVariants}
              className="group h-44 w-36 rounded-3xl border-2 border-transparent bg-blue-950 p-4 text-blue-500 shadow-md transition-colors duration-500 hover:border-blue-500 hover:bg-blue-500 hover:bg-opacity-20 hover:text-blue-50"
            >
              <div className="flex h-full flex-col justify-between">
                <div className="skill-inner flex flex-col justify-between p-2">
                  <div className="icon-skill flex h-24 items-center justify-center">
                    <img
                      src={`/logos/logo_${skill}.svg`}
                      alt={`logo_${skill}`}
                      className="max-h-full max-w-full object-contain"
                    />
                  </div>
                  <div className="mt-2 hidden justify-center text-center group-hover:flex">
                    {formatSkillName(skill)}
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </motion.div>
    </div>
  );
};

export default SkillsSection;
