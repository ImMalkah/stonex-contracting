import { Header } from "./components/Header";
import { Hero } from "./components/Hero";
import { Testimonials } from "./components/Testimonials";
import { Process } from "./components/Process";
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
        <Testimonials />
        <Process />
        <Packages />
        <FAQ />
      </main>
      <Footer />
      <ChatBot />
    </div>
  );
}

