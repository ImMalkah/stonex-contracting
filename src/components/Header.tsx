import { motion, AnimatePresence } from "motion/react";
import { Menu, X, Phone } from "lucide-react";
import { useState } from "react";
import { Button } from "./Button";

const navLinks = [
  { label: "Services", href: "#services" },
  { label: "Rentals", href: "#plans" },
  { label: "Process", href: "#process" },
  { label: "FAQ", href: "#faq" },
  { label: "Contact", href: "#contact" },
];

export const Header = () => {
  const [mobileOpen, setMobileOpen] = useState(false);

  return (
    <header className="fixed top-0 left-0 w-full z-50 flex flex-col shadow-sm">
      <div className="w-full bg-gh-text text-white py-2 border-b border-white/10">
        <div className="max-width-container mx-auto px-6 flex justify-center md:justify-end items-center">
          <a href="tel:+12899252669" className="flex items-center gap-2 text-[10px] md:text-xs font-bold tracking-widest uppercase hover:text-gh-red transition-colors">
            <Phone className="w-3.5 h-3.5" />
            <span className="opacity-70 hidden sm:inline">Call Us:</span> (289) 925-2669
          </a>
        </div>
      </div>
      <div className="w-full bg-gh-bg/80 backdrop-blur-md border-b border-gh-muted/10">
        <div className="max-width-container mx-auto px-6 py-4 md:py-6 flex justify-between items-center">
          <motion.a
            href="#"
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5 }}
            className="text-2xl font-black tracking-tighter text-gh-text"
          >
            STONEX<span className="text-gh-red">.</span>
          </motion.a>

          {/* Desktop nav */}
          <nav className="hidden md:flex items-center gap-8 text-sm font-medium uppercase tracking-widest text-gh-muted">
            {navLinks.map((link) => (
              <a
                key={link.href}
                href={link.href}
                className="hover:text-gh-red transition-colors duration-200"
              >
                {link.label}
              </a>
            ))}
            <Button href="#contact" className="!px-6 !py-2.5 !text-xs ml-2" showIcon={false}>Free Quote</Button>
          </nav>

          {/* Mobile Actions */}
          <div className="flex items-center gap-2 md:hidden">
            <Button href="#contact" className="!px-4 !py-2 !text-[10px] tracking-widest uppercase" showIcon={false}>Free Quote</Button>
            <button
              className="text-gh-text p-2 -mr-2"
              onClick={() => setMobileOpen(!mobileOpen)}
              aria-label="Toggle menu"
              id="mobile-menu-toggle"
            >
              {mobileOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>

        {/* Mobile menu */}
        <AnimatePresence>
          {mobileOpen && (
            <motion.nav
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              exit={{ opacity: 0, height: 0 }}
              transition={{ duration: 0.3 }}
              className="md:hidden overflow-hidden bg-gh-bg/95 backdrop-blur-lg border-t border-gh-muted/10"
            >
              <div className="flex flex-col items-center gap-6 py-8">
                {navLinks.map((link) => (
                  <a
                    key={link.href}
                    href={link.href}
                    onClick={() => setMobileOpen(false)}
                    className="text-lg font-medium uppercase tracking-widest text-gh-muted hover:text-gh-red transition-colors"
                  >
                    {link.label}
                  </a>
                ))}
              </div>
            </motion.nav>
          )}
        </AnimatePresence>
      </div>
    </header>
  );
};
