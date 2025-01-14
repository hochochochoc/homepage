import React from "react";
import { GraduationCap } from "lucide-react";
import { motion } from "framer-motion";

const EducationSection = () => {
  const education = [
    {
      title: "Frontend - React",
      date: "Ene 2024 - Nov 2024 (10 meses)",
      institution: "IT-Academy",
    },
    {
      title: "Fundamentals of Computer Science",
      date: "Ago 2023 - Nov 2023 (4 meses)",
      institution: "Harvard University (en línea)",
    },
    {
      title: "Master de Water Management",
      date: "Oct 2020 - Sep 2024",
      institution: "Universidad de A Coruña / Universidad Magdeburg-Stendal",
    },
    {
      title: "Bachelor de Ingeniería Hidraulica",
      date: "Sep 2018 - Sep 2021",
      institution: "Universidad Magdeburg-Stendal",
    },
  ];

  const sectionVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        delayChildren: 0,
        staggerChildren: 0.4,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, x: -50 },
    visible: {
      opacity: 1,
      x: 0,
      transition: { duration: 0.5 },
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
            Mi Formación
          </span>
        </h2>
      </div>

      <motion.div
        className="container mx-auto"
        variants={sectionVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
      >
        <div className="flex flex-col items-center justify-center gap-4">
          {education.map((item) => (
            <motion.div
              key={item.title}
              variants={itemVariants}
              className="w-2/3 rounded-3xl border border-transparent bg-blue-950 p-4 text-blue-500 shadow-lg transition-colors duration-500 hover:border-blue-500 hover:bg-gradient-to-r hover:from-blue-900 hover:to-cyan-900 hover:text-blue-50 hover:opacity-20"
            >
              <div className="flex flex-col justify-center">
                <h4 className="mb-3 text-center text-xl font-semibold md:text-2xl xl:text-3xl">
                  {item.title}
                </h4>
                <p className="mb-3 text-center text-white">{item.date}</p>
                <p className="text-center text-white">{item.institution}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </motion.div>
    </div>
  );
};

export default EducationSection;
