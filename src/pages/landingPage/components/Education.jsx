import React from "react";
import { GraduationCap } from "lucide-react";

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

  return (
    <div className="container mx-auto py-10">
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

      <div className="container mx-auto">
        <div className="flex flex-col items-center justify-center gap-4">
          {education.map((item) => (
            <div
              key={item.title}
              className="w-2/3 rounded-3xl bg-blue-950 p-4 text-blue-500 shadow-md transition-colors duration-500 hover:bg-gradient-to-r hover:from-blue-900 hover:to-cyan-900 hover:text-blue-50"
            >
              <div className="flex flex-col justify-center">
                <h4 className="mb-3 text-center text-xl font-semibold md:text-2xl xl:text-3xl">
                  {item.title}
                </h4>
                <p className="mb-3 text-center text-white">{item.date}</p>
                <p className="text-center text-white">{item.institution}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default EducationSection;