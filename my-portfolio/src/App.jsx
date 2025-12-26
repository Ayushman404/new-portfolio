import { useEffect } from 'react';
import Lenis from 'lenis';
import Navbar from './components/layout/Navbar';
import Hero from './components/hero/Hero'; // Import the new Hero
import About from './components/about/About';
import Projects from './components/projects/Projects';
import SolarSystemSkills from './components/skills/Skills';
import SkillsCommandCenter from './components/skills/Skills';
import Contact from './components/contact/Contact';
import Footer from './components/layout/Footer';


// Placeholder Section Component (keep for other sections for now)
const Section = ({ id, title, className }) => (
  <section id={id} className={`min-h-screen flex items-center justify-center text-4xl font-bold ${className}`}>
    <h1>{title}</h1>
  </section>
);

function App() {
  
  useEffect(() => {
    const lenis = new Lenis();
    function raf(time) {
      lenis.raf(time);
      requestAnimationFrame(raf);
    }
    requestAnimationFrame(raf);
  }, []);

  return (
    <div className="antialiased bg-light-bg dark:bg-dark-bg text-light-text dark:text-dark-text transition-colors duration-300 selection:bg-primary selection:text-white">
        
        <Navbar />
        
        <main>
          {/* USE THE NEW HERO COMPONENT HERE */}
          <Hero /> 
          <About />
          
          
          
          {/* <Section id="skills" title="Skills" className="bg-transparent" /> */}
          <SkillsCommandCenter />
          <Projects />
          <Contact />
          {/* <Section id="contact" title="Contact" className="bg-transparent" /> */}
        </main>
        <Footer />
    </div>
  );
}

export default App;