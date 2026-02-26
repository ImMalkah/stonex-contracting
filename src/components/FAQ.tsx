import { motion, AnimatePresence } from "motion/react";
import { useState } from "react";
import { ChevronDown } from "lucide-react";

const faqs = [
  {
    question: "What areas does Stonex serve?",
    answer:
      "We serve the entire Greater Toronto Area including Hamilton, Mississauga, Toronto, Oakville, Burlington, Brampton, and surrounding regions. Contact us to confirm availability in your specific area.",
  },
  {
    question: "What types of equipment do you rent?",
    answer:
      "We offer a full range of heavy equipment including excavators (mini to full-size), skidsteers, backhoes, bulldozers, compactors, and more. We also provide specialized attachments for demolition, grading, and landscaping work.",
  },
  {
    question: "Do you provide operators with the equipment?",
    answer:
      "Yes! All our operators are fully licensed and insured with years of experience in residential and commercial projects. You can rent equipment only, or equipment with a skilled operator — whatever your project requires.",
  },
  {
    question: "How quickly can I get equipment on-site?",
    answer:
      "For most equipment, we can arrange same-day or next-day delivery within the GTA. Larger or specialized equipment may require 48 hours notice. Rush availability is subject to our current schedule — call us and we'll do our best to accommodate.",
  },
  {
    question: "Is insurance included in the rental?",
    answer:
      "Yes, all rentals include basic insurance coverage. For larger projects, we recommend additional coverage which we can arrange for you. Our team will walk you through the options during booking.",
  },
  {
    question: "What if the equipment breaks down on-site?",
    answer:
      "All equipment is thoroughly inspected and maintained before delivery. In the rare event of a breakdown, we provide 24/7 support and will dispatch a replacement or repair crew immediately at no additional cost to you.",
  },
  {
    question: "Do you offer services beyond equipment rental?",
    answer:
      "Absolutely. Stonex provides full-service excavation, concrete work, demolition, grading, and landscaping. We can handle your entire project from start to finish, or simply provide the equipment and crew you need for specific phases.",
  },
];

export const FAQ = () => {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  return (
    <section id="faq" className="py-32 px-6 bg-gh-bg relative gh-grain">
      <div className="max-width-container mx-auto max-w-3xl relative z-10">
        <div className="text-center mb-16">
          <motion.span
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            className="inline-block text-gh-teal font-semibold tracking-wider uppercase text-xs mb-4"
          >
            Got Questions?
          </motion.span>
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-4xl md:text-5xl mb-4 text-gh-red"
          >
            Frequently Asked Questions
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="text-lg text-gh-muted"
          >
            Everything you need to know before getting started.
          </motion.p>
        </div>

        <div className="space-y-3">
          {faqs.map((faq, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.05 }}
              viewport={{ once: true }}
              className={`bg-gh-card rounded-2xl border border-gh-border overflow-hidden transition-shadow duration-300 ${openIndex === i ? "gh-shadow-red" : "gh-shadow-soft"
                }`}
            >
              <button
                onClick={() => setOpenIndex(openIndex === i ? null : i)}
                className="w-full px-8 py-6 flex items-center justify-between text-left group"
                id={`faq-toggle-${i}`}
              >
                <h3 className="text-lg font-medium text-gh-text group-hover:text-gh-red transition-colors pr-4">
                  {faq.question}
                </h3>
                <motion.div
                  animate={{ rotate: openIndex === i ? 180 : 0 }}
                  transition={{ duration: 0.3 }}
                  className="text-gh-red shrink-0"
                >
                  <ChevronDown className="w-5 h-5" />
                </motion.div>
              </button>
              <AnimatePresence>
                {openIndex === i && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: "auto", opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.3 }}
                    className="overflow-hidden"
                  >
                    <div className="px-8 pb-6 text-gh-text/70 leading-relaxed border-t border-gh-muted/10 pt-4">
                      {faq.answer}
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};
