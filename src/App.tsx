import { Header } from "./components/Header";
import { Hero } from "./components/Hero";
import { Gallery } from "./components/Gallery";
import { Packages } from "./components/Packages";
import { Footer } from "./components/Footer";
import { ChatBot } from "./components/ChatBot";
import { Testimonials } from "./components/Testimonials";

export default function App() {
  return (
    <div className="min-h-screen bg-gh-bg">
      <Header />
      <main>
        <Hero />
        <Gallery />
        <Packages />
        <Testimonials />
      </main>
      <Footer />
      <ChatBot />
    </div>
  );
}

