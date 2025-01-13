import React, { useRef, useEffect, useState } from "react";
import { Laptop } from "lucide-react";
import { motion, useInView, useAnimation } from "framer-motion";

const ExperienceCard = ({ company, role, period, description, delay = 0 }) => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true });
  const mainControls = useAnimation();

  useEffect(() => {
    if (isInView) {
      mainControls.start("visible");
    }
  }, [isInView, mainControls]);

  return (
    <motion.div
      ref={ref}
      initial="hidden"
      animate={mainControls}
      variants={{
        hidden: { opacity: 0, y: 75 },
        visible: {
          opacity: 1,
          y: 0,
          transition: {
            duration: 0.5,
            delay: delay,
          },
        },
      }}
      className="rounded-3xl bg-blue-950 p-4 text-blue-500 shadow-md transition-colors duration-500 hover:bg-gradient-to-r hover:from-blue-900 hover:to-cyan-900 hover:text-blue-50"
    >
      <div className="grid grid-cols-12 gap-1">
        <h4 className="col-span-12 mb-3 text-xl font-semibold md:hidden md:text-2xl xl:text-3xl">
          {role}
        </h4>
        <div className="col-span-12 flex md:col-span-3 md:me-3 md:flex-col md:justify-center md:rounded-lg md:bg-gray-700 md:bg-opacity-30 md:px-1">
          <h5 className="md-text-xl mb-3 me-3 text-sm font-semibold text-white md:mb-5 md:me-0 md:text-center xl:text-2xl">
            {company}
          </h5>
          <p className="text-sm text-white md:text-center md:text-base">
            {period}
          </p>
        </div>
        <div className="col-span-12 px-3 md:col-span-9">
          <h4 className="mb-3 hidden text-xl font-semibold md:inline-block md:text-2xl xl:text-3xl">
            {role}
          </h4>
          <p className="text-[17px] text-white">{description}</p>
        </div>
      </div>
    </motion.div>
  );
};

const ExperienceSection = () => {
  const experiences = [
    {
      company: "TSP Explorer",
      role: "Desarrollador Front-End",
      period: "Sept 2024 - Actualmente",
      description: `🎓 Desarrollo de una plataforma educativa de visualización de
      problemas de búsqueda de rutas: Diseño e implementación de una
      herramienta interactiva que permite a los estudiantes explorar
      y comprender algoritmos de optimización de rutas de manera
      visual e intuitiva 🗺️💡.
      \n🔍 Diseño de mapas interactivos: Creación de interfaces
      dinámicas que permiten a los usuarios manipular y experimentar
      con diferentes escenarios de rutas, facilitando el aprendizaje
      práctico de conceptos complejos 🌐✨.
      \n📚 Desarrollo de tutoriales paso a paso: Implementación de
      guías educativas interactivas que ayudan a los estudiantes a
      comprender los fundamentos de los algoritmos de búsqueda de
      rutas, utilizando visualizaciones en tiempo real y ejemplos
      prácticos 📊🎯.
      \n🛠️ Tecnologías: React para la interfaz de usuario, Tailwind
      CSS para el diseño responsivo, Firebase para el almacenamiento
      de datos, y D3.js para visualizaciones avanzadas 💻✨.`,
    },
    {
      company: "Grupo Neoelectra",
      role: "Ingeniero Hidráulico",
      period: "Feb 2022 - Jul 2022",
      description: `💧 Evaluación de parámetros hidráulicos y calidad del agua:
      Análisis y monitoreo de sistemas hídricos mediante modelado
      experimental y estudios comparativos 🔍📊.
      \n⚡ Implementación de modelos económicos y regulatorios:
      Aplicación de normativas vigentes y evaluación de costos en
      proyectos hidráulicos 📋💰.`,
    },
    {
      company: "VNU HCMC",
      role: "Ingeniero Hidráulico",
      period: "Sep 2019 - Feb 2020",
      description: `🌧️ Desarrollo de sistemas de monitoreo de sequía y patrones de
      lluvia en el Altiplano Central de Vietnam, implementando
      metodologías de análisis hidrológico.
      \n🌾 Modelado predictivo de rendimientos agrícolas basado en
      datos climatológicos y gestión de recursos hídricos.
      \n📊 Establecimiento de protocolos de observación y análisis
      para la evaluación del impacto de sequías en la producción
      agrícola regional.`,
    },
  ];

  return (
    <div className="container mx-auto py-10">
      <motion.h2
        initial={{ opacity: 0, y: -50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="mb-6 text-center text-4xl font-bold tracking-tight md:text-5xl xl:text-6xl"
      >
        <Laptop
          size={56}
          strokeWidth={2.5}
          className="mb-2 mr-2 inline-block text-blue-600"
        />
        <span className="bg-gradient-to-r from-blue-600 to-cyan-500 bg-clip-text text-transparent">
          Mi Experiencia
        </span>
      </motion.h2>

      <div className="container mx-auto">
        <div className="grid grid-cols-1 gap-4 px-9 md:px-3 lg:px-0">
          {experiences.map((exp, index) => (
            <ExperienceCard key={exp.company} {...exp} delay={index * 0.2} />
          ))}
        </div>
      </div>
    </div>
  );
};

export default ExperienceSection;
