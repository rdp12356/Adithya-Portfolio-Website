import { AnimatePresence } from "framer-motion";
import Navbar from "./components/Navbar";
import Hero from "./components/Hero";
import About from "./components/About";
import Skills from "./components/Skills";
import Experience from "./components/Experience";
import GithubStats from "./components/GithubStats";
import Projects from "./components/Projects";
import Contact from "./components/Contact";
import Scene from "./components/Scene";
import SmoothScroll from "./components/SmoothScroll";
import NeuralBridge from "./components/NeuralBridge";
import CustomCursor from "./components/CustomCursor";
import HologramOverlay from "./components/HologramOverlay";

function App() {
  return (
    <SmoothScroll>
      <div className="relative bg-background min-h-screen selection:bg-primary/30 selection:text-white cursor-none">
        <CustomCursor />
        <Scene />
        <HologramOverlay />
        <Navbar />
        <main>
          <Hero />
          <About />
          <Skills />
          <Experience />
          <GithubStats />
          <Projects />
          <Contact />
        </main>
        <NeuralBridge />
      </div>
    </SmoothScroll>
  );
}

export default App;
