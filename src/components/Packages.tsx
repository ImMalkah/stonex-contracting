import { motion } from "motion/react";
import { Check } from "lucide-react";
import { Button } from "./Button";

const packages = [
  {
    title: "Equipment Rentals",
    price: "From $250",
    period: "/day",
    description:
      "Well-maintained heavy equipment ready for your site.",
    features: [
      "Wheeled skid steers: $250/day • $1,500/week",
      "Track skid steers: $350/day • $1,800/week",
      "Mini excavator: $250/day • $1,500/week",
      "Trim dozer: $400/day • $5,000/month",
    ],
    note: "All equipment is thoroughly inspected.",
    featured: true,
  },
  {
    title: "Concrete Services",
    price: "Custom",
    period: "quote",
    description:
      "From foundations to decorative finishes, we handle all your concrete needs.",
    features: [
      "Walkways, driveways, and patios",
      "Foundation pouring and finishing",
      "All types of concrete poured",
      "Finishes: white/broom finish, exposed aggregate, stamp",
    ],
    note: "Professional finishing every time.",
  },
  {
    title: "Full Project",
    price: "Custom",
    period: "quote",
    description:
      "End-to-end management for large-scale operations.",
    features: [
      "Excavation, grading & demolition",
      "Dedicated project manager",
      "Multiple machines & operators",
      "Ongoing support with direct communication",
    ],
    note: "Let us handle everything.",
  },
];

export const Packages = () => {
  return (
    <section id="plans" className="py-32 px-6 bg-gh-bg">
      <div className="max-width-container mx-auto">
        <div className="text-center mb-16">
          <motion.span
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            className="inline-block text-gh-teal font-semibold tracking-wider uppercase text-xs mb-4"
          >
            Pricing
          </motion.span>
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-4xl md:text-5xl mb-4 text-gh-red"
          >
            Services & Pricing
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="text-lg text-gh-muted"
          >
            Flexible options for every project size.
          </motion.p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-16">
          {packages.map((pkg, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: i * 0.12 }}
              viewport={{ once: true }}
              className={`relative p-10 rounded-[40px] border-2 flex flex-col transition-all duration-300 group hover:scale-[1.02] ${pkg.featured
                ? "bg-gh-bg border-gh-red gh-shadow-red"
                : "bg-white border-gh-muted/20 gh-shadow-teal hover:border-gh-red/30"
                }`}
            >
              {pkg.featured && (
                <div className="absolute -top-4 left-1/2 -translate-x-1/2 bg-gh-red text-white text-xs font-bold uppercase tracking-widest px-4 py-1.5 rounded-full">
                  Most Popular
                </div>
              )}

              <h3 className="text-2xl font-bold mb-4 text-gh-red">
                {pkg.title}
              </h3>
              <p className="text-gh-text/70 mb-8 min-h-[3rem]">
                {pkg.description}
              </p>

              <div className="mb-8">
                <span className="text-4xl font-black text-gh-text">
                  {pkg.price}
                </span>
                <span className="text-gh-muted text-sm ml-1">
                  {pkg.period}
                </span>
              </div>

              <div className="flex-grow mb-8 space-y-4">
                <p className="font-bold text-gh-red text-sm uppercase tracking-widest">
                  Includes:
                </p>
                {pkg.features.map((feature, j) => (
                  <div key={j} className="flex gap-3">
                    <Check className="w-5 h-5 text-gh-teal shrink-0 mt-0.5" />
                    <p className="text-gh-text/80 text-sm leading-relaxed">
                      {feature}
                    </p>
                  </div>
                ))}
              </div>

              <div className="mt-auto pt-8 border-t border-gh-muted/10">
                <Button className="w-full mb-4" href="#contact">
                  Get Free Quote
                </Button>
                <p className="text-center text-xs italic text-gh-muted">
                  {pkg.note}
                </p>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Add-on */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="bg-gh-bg p-8 rounded-3xl border-2 border-dashed border-gh-red/30 flex flex-col md:flex-row items-center justify-between gap-6"
        >
          <div>
            <h4 className="text-xl font-bold text-gh-red mb-2">
              Need a full site assessment first?
            </h4>
            <p className="text-gh-text/70">
              We'll send an expert to evaluate your project, provide
              recommendations, and quote the job — no obligation.
            </p>
          </div>
          <div className="text-right shrink-0">
            <span className="text-2xl font-bold text-gh-teal">Free</span>
          </div>
        </motion.div>

        {/* Global Features */}
        <div className="mt-16 pt-12 border-t border-gh-muted/10">
          <p className="text-center text-gh-teal font-bold mb-8 uppercase tracking-widest text-sm">
            All rentals include:
          </p>
          <div className="flex flex-wrap justify-center gap-x-8 gap-y-4 text-gh-text/80 font-medium text-sm">
            <span className="flex items-center gap-2">
              <Check className="w-4 h-4 text-gh-teal" /> Insurance coverage
            </span>
            <span className="flex items-center gap-2">
              <Check className="w-4 h-4 text-gh-teal" /> Safety equipment
            </span>
            <span className="flex items-center gap-2">
              <Check className="w-4 h-4 text-gh-teal" /> No hidden fees
            </span>
            <span className="flex items-center gap-2">
              <Check className="w-4 h-4 text-gh-teal" /> GTA-wide delivery
            </span>
            <span className="flex items-center gap-2">
              <Check className="w-4 h-4 text-gh-teal" /> 24/7 support line
            </span>
          </div>
        </div>
      </div>
    </section>
  );
};
