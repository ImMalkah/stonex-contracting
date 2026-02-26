import { motion } from "motion/react";
import { Button } from "./Button";
import { Mail, Phone, MapPin } from "lucide-react";
import { useState } from "react";

export const Footer = () => {
  const [selectedServices, setSelectedServices] = useState<string[]>([]);

  const services = [
    { id: "rental", label: "Equipment Rental" },
    { id: "excavation", label: "Excavation" },
    { id: "concrete", label: "Concrete Work" },
    { id: "demolition", label: "Demolition" },
    { id: "landscaping", label: "Landscaping" },
    { id: "full-project", label: "Full Project" },
    { id: "other", label: "Other" },
  ];

  const toggleService = (id: string) => {
    setSelectedServices((prev) =>
      prev.includes(id) ? prev.filter((s) => s !== id) : [...prev, id]
    );
  };

  return (
    <footer
      id="contact"
      className="bg-gh-footer py-24 px-6 text-gh-footer-text overflow-hidden relative"
    >
      {/* Background accent */}
      <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-gh-red/5 rounded-full blur-3xl pointer-events-none -translate-y-1/2 translate-x-1/4" />
      <div className="absolute bottom-0 left-0 w-96 h-96 bg-gh-teal/5 rounded-full blur-3xl pointer-events-none translate-y-1/2 -translate-x-1/4" />

      <div className="max-width-container mx-auto relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <h2 className="text-5xl md:text-7xl mb-8 leading-tight">
              Ready to get your project{" "}
              <span className="text-gh-red italic">moving</span>?
            </h2>
            <p className="text-white/60 text-lg mb-10 max-w-lg">
              Whether you need a single machine or a full crew, Stonex
              Contracting is here to deliver. Get in touch for a free
              consultation.
            </p>
            <div className="flex flex-col gap-5">
              <a
                href="tel:+12899252669"
                className="flex items-center gap-3 text-lg hover:text-gh-red transition-colors group"
              >
                <div className="w-10 h-10 bg-white/10 rounded-xl flex items-center justify-center group-hover:bg-gh-red/20 transition-colors">
                  <Phone className="w-5 h-5" />
                </div>
                (289) 925-2669
              </a>
              <a
                href="mailto:info@stonexcontracting.ca"
                className="flex items-center gap-3 text-lg hover:text-gh-red transition-colors group"
              >
                <div className="w-10 h-10 bg-white/10 rounded-xl flex items-center justify-center group-hover:bg-gh-red/20 transition-colors">
                  <Mail className="w-5 h-5" />
                </div>
                info@stonexcontracting.ca
              </a>
              <div className="flex items-center gap-3 text-lg text-white/60">
                <div className="w-10 h-10 bg-white/10 rounded-xl flex items-center justify-center">
                  <MapPin className="w-5 h-5" />
                </div>
                Serving the entire GTA
              </div>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="bg-white/5 backdrop-blur-sm p-8 rounded-[40px] border border-white/10"
          >
            <h3 className="text-2xl mb-2">Request a Free Quote</h3>
            <p className="mb-8 opacity-60 text-sm">
              Tell us about your project and we'll get back to you within 24
              hours.
            </p>

            <form
              className="space-y-6"
              onSubmit={(e) => {
                e.preventDefault();
                alert(
                  `Thank you! We've received your request for: ${selectedServices.length > 0
                    ? selectedServices.join(", ")
                    : "General Services"
                  }. We'll be in touch within 24 hours.`
                );
              }}
            >
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <input
                  type="text"
                  placeholder="Your name"
                  required
                  id="contact-name"
                  className="bg-white/10 border border-white/10 rounded-xl px-5 py-3.5 text-white placeholder:text-white/40 focus:outline-none focus:border-gh-red/50 transition-colors"
                />
                <input
                  type="tel"
                  placeholder="Phone number"
                  required
                  id="contact-phone"
                  className="bg-white/10 border border-white/10 rounded-xl px-5 py-3.5 text-white placeholder:text-white/40 focus:outline-none focus:border-gh-red/50 transition-colors"
                />
              </div>
              <input
                type="email"
                placeholder="Email address"
                required
                id="contact-email"
                className="w-full bg-white/10 border border-white/10 rounded-xl px-5 py-3.5 text-white placeholder:text-white/40 focus:outline-none focus:border-gh-red/50 transition-colors"
              />

              <div className="space-y-3">
                <p className="text-xs font-bold uppercase tracking-widest text-white/40">Select Services (Multiple OK)</p>
                <div className="flex flex-wrap gap-2">
                  {services.map((service) => (
                    <button
                      key={service.id}
                      type="button"
                      onClick={() => toggleService(service.id)}
                      className={`px-4 py-2 rounded-full border text-xs font-medium transition-all duration-300 ${selectedServices.includes(service.id)
                        ? "bg-gh-red border-gh-red text-white"
                        : "bg-white/5 border-white/10 text-white/60 hover:border-white/30"
                        }`}
                    >
                      {service.label}
                    </button>
                  ))}
                </div>
              </div>

              <textarea
                placeholder="Tell us about your project..."
                rows={4}
                id="contact-message"
                className="w-full bg-white/10 border border-white/10 rounded-xl px-5 py-3.5 text-white placeholder:text-white/40 focus:outline-none focus:border-gh-red/50 transition-colors resize-none"
              />
              <Button className="w-full" showIcon={false}>
                Send Request
              </Button>
            </form>
          </motion.div>
        </div>

        <div className="mt-24 pt-8 border-t border-white/10 flex flex-col md:flex-row justify-between items-center gap-6 text-sm opacity-50">
          <p>
            © {new Date().getFullYear()} Stonex Contracting. All rights
            reserved.
          </p>
          <div className="flex gap-8">
            <a
              href="#"
              className="hover:text-gh-red hover:opacity-100 transition-all"
            >
              Privacy Policy
            </a>
            <a
              href="#"
              className="hover:text-gh-red hover:opacity-100 transition-all"
            >
              Terms of Service
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
};
