import { Header } from "./components/Header";
import { Hero } from "./components/Hero";
import { Process } from "./components/Process";
import { Gallery } from "./components/Gallery";
import { Packages } from "./components/Packages";
import { FAQ } from "./components/FAQ";
import { Footer } from "./components/Footer";
import { ChatBot } from "./components/ChatBot";

export default function App() {
  return (
    <div className="min-h-screen bg-gh-bg">
      <Header />
      <main>
        <Hero />
        <Gallery />
        <Packages />
        <Process />
        <FAQ />
      </main>
      <Footer />
      <ChatBot />
    </div>
  );
}

