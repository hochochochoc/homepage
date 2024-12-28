import React, { useRef } from "react";
import HeroSection from "./components/HeroSection";
import ProjectsSection from "./components/Projects";
import ExperienceSection from "./components/Experience";
import SkillsSection from "./components/Skills";
import EducationSection from "./components/Education";
import ContactSection from "./components/ContactMe";
import Footer from "./components/Footer";
import ProgressBar from "./components/ProgressBar";
import Header from "./components/Header";

export default function LandingPage() {
  const scrollContainerRef = useRef(null);
  const heroRef = useRef(null);
  const projectsRef = useRef(null);
  const experienceRef = useRef(null);
  const skillsRef = useRef(null);
  const educationRef = useRef(null);
  const contactRef = useRef(null);

  const scrollToSection =  => {
    if (ref.current) {
      ref.current.scrollIntoView({ behavior: "smooth" });
    }
  };

  const sectionRefs = {
    inicio: heroRef,
    proyectos: projectsRef,
    experiencia: experienceRef,
    skills: skillsRef,
    formacion: educationRef,
    contacto: contactRef,
  };

  return (
    <div
      ref={scrollContainerRef}
      className="custom-scrollbar h-screen overflow-y-auto bg-gradient-to-br from-gray-950 to-sky-900"
    >
      <Header onSectionClick={scrollToSection} sectionRefs={sectionRefs} />
      <div className="relative flex flex-col items-center justify-center">
        <section ref={heroRef} className="w-full">
          <HeroSection />
        </section>

        <section ref={projectsRef} className="w-full">
          <ProjectsSection />
        </section>

        <section ref={experienceRef} className="w-full">
          <ExperienceSection />
        </section>

        <section ref={skillsRef} className="w-full">
          <SkillsSection />
        </section>

        <section ref={educationRef} className="w-full">
          <EducationSection />
        </section>

        <section ref={contactRef} className="w-full">
          <ContactSection />
        </section>

        <Footer onSectionClick={scrollToSection} sectionRefs={sectionRefs} />
        <div>
          <ProgressBar scrollContainerRef={scrollContainerRef} />
        </div>
      </div>
    </div>
  );
}
