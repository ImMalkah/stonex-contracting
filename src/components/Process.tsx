import { motion } from "motion/react";
import { Phone, Sparkles, Rocket } from "lucide-react";

const steps = [
  {
    icon: Phone,
    title: "1: Get in touch",
    description: [
      "Tell us about your project.",
      "What equipment or services do you need?",
      "We'll assess your site requirements.",
      "Receive a clear, honest quote.",
    ],
    accent: "bg-gh-red",
  },
  {
    icon: Sparkles,
    title: "2: We get to work",
    description: [
      "Equipment & crew arrive on time.",
      "Professional execution with safety-first approach.",
      "Clear communication throughout the process.",
    ],
    accent: "bg-gh-teal",
  },
  {
    icon: Rocket,
    title: "3: Job done right",
    description: [
      "Site left clean and professional.",
      "Quality results you can count on.",
      "A trusted partner for your next project.",
    ],
    accent: "bg-gh-red",
  },
];

export const Process = () => {
  return (
    <section id="process" className="py-32 px-6 bg-gh-bg relative gh-grain">
      <div className="max-width-container mx-auto relative z-10">
        <div className="text-center mb-16">
          <motion.span
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            className="inline-block text-gh-teal font-semibold tracking-wider uppercase text-xs mb-4"
          >
            How It Works
          </motion.span>
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-4xl md:text-5xl mb-4 text-gh-red"
          >
            The exact process to expect
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="text-lg text-gh-muted"
          >
            Simple, transparent, and built for results.
          </motion.p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 lg:gap-12">
          {steps.map((step, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: i * 0.15 }}
              viewport={{ once: true }}
              className="bg-gh-card p-10 rounded-[40px] border-2 border-gh-border gh-shadow-soft hover:border-gh-red/30 hover:gh-shadow-red flex flex-col items-center text-center transition-all duration-300 group"
            >
              <div className={`w-16 h-16 ${step.accent}/10 rounded-2xl flex items-center justify-center text-gh-red mb-6 group-hover:scale-110 transition-transform duration-300`}>
                <step.icon className="w-8 h-8" />
              </div>
              <h3 className="text-2xl mb-6 text-gh-red">{step.title}</h3>
              <div className="space-y-2">
                {step.description.map((line, j) => (
                  <p key={j} className="text-gh-text/80 leading-relaxed">
                    {line}
                  </p>
                ))}
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};
