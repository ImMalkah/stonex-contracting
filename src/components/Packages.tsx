import { motion } from "motion/react";
import { Check } from "lucide-react";
import { Button } from "./Button";

const packages = [
  {
    title: "Day Rental",
    price: "From $350",
    period: "/day",
    description:
      "Perfect for quick jobs or when you need to try before committing.",
    features: [
      "Choice of skidsteer, mini excavator, or compact equipment",
      "Delivery & pickup within GTA included",
      "Operator available at additional rate",
      "Safety equipment & fuel included",
    ],
    note: "Get the job done fast.",
  },
  {
    title: "Weekly Package",
    price: "From $1,800",
    period: "/week",
    description:
      "Best value for residential and mid-size commercial projects.",
    features: [
      "Full-size excavators, skidsteers, and more",
      "Free delivery & pickup across the GTA",
      "Priority scheduling & dedicated operator option",
      "On-site support & maintenance included",
      "Flexible extension options",
    ],
    note: "Our most popular option.",
    featured: true,
  },
  {
    title: "Full Project",
    price: "Custom",
    period: "quote",
    description:
      "End-to-end equipment & crew for large-scale projects.",
    features: [
      "All equipment types available",
      "Dedicated project manager",
      "Multiple machines & operators",
      "Excavation, grading, concrete — we handle it all",
      "Ongoing support with direct communication",
    ],
    note: "Let us handle everything.",
  },
];

export const Packages = () => {
  return (
    <section id="plans" className="py-24 px-6 bg-white">
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
            Rental Packages
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
                  Get started
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
