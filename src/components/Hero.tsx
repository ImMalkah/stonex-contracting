import { motion } from "motion/react";
import { Button } from "./Button";
import { HardHat, Shovel, Building2, TreePine } from "lucide-react";

const services = [
  { icon: Shovel, label: "Excavation" },
  { icon: Building2, label: "Concrete" },
  { icon: TreePine, label: "Landscaping" },
  { icon: HardHat, label: "Demolition" },
];

export const Hero = () => {
  return (
    <section
      id="services"
      className="relative min-h-screen flex flex-col items-center justify-center pt-24 overflow-hidden gh-grain"
    >
      {/* Animated gradient orbs */}
      <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-gh-red/8 rounded-full blur-3xl pointer-events-none animate-pulse" />
      <div className="absolute bottom-1/4 right-1/4 w-80 h-80 bg-gh-teal/6 rounded-full blur-3xl pointer-events-none animate-pulse" style={{ animationDelay: "1s" }} />

      <div className="relative z-10 text-center px-6 max-w-5xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="mb-6"
        >
          <span className="inline-block text-gh-red font-semibold tracking-wider uppercase text-sm bg-gh-red/10 px-4 py-2 rounded-full">
            Serving Hamilton, Mississauga, & Toronto
          </span>
        </motion.div>

        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="text-5xl md:text-7xl lg:text-8xl mb-8 leading-[1.1]"
        >
          Contracting & Rentals{" "}
          <span className="text-gh-red italic">Simplified</span>.
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="text-xl md:text-2xl text-gh-text/80 mb-12 max-w-3xl mx-auto font-light"
        >
          GTA&#39;s trusted partner for premium concrete work, precise excavation,
          and reliable heavy equipment rentals. We build it, or we rent you the power to.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="flex flex-col sm:flex-row gap-4 justify-center"
        >
          <Button href="#plans">Rent Equipment</Button>
          <Button variant="secondary" href="#contact">
            Get a Quote
          </Button>
        </motion.div>
      </div>

      {/* Core services badges */}
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, delay: 0.5 }}
        className="mt-20 px-6 w-full max-w-4xl mx-auto"
      >
        <p className="text-center text-gh-muted mb-8 text-sm uppercase tracking-widest font-bold">
          Our Core Services
        </p>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {services.map((service, i) => (
            <motion.div
              key={service.label}
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.4, delay: 0.6 + i * 0.1 }}
              className="flex flex-col items-center gap-3 p-6 rounded-2xl bg-white/60 backdrop-blur-sm border border-gh-muted/10 gh-shadow-soft hover:border-gh-red/30 hover:bg-white transition-all duration-300 cursor-default group"
            >
              <div className="w-12 h-12 bg-gh-red/10 rounded-xl flex items-center justify-center text-gh-red group-hover:bg-gh-red group-hover:text-white transition-all duration-300">
                <service.icon className="w-6 h-6" />
              </div>
              <span className="font-bold uppercase tracking-tighter text-gh-text/70 group-hover:text-gh-text transition-colors text-sm">
                {service.label}
              </span>
            </motion.div>
          ))}
        </div>
      </motion.div>
    </section>
  );
};
