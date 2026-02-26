import { motion } from "motion/react";
import { ChevronRight } from "lucide-react";
import { ReactNode } from "react";

interface ButtonProps {
  children: ReactNode;
  variant?: "primary" | "secondary";
  onClick?: () => void;
  className?: string;
  href?: string;
  showIcon?: boolean;
}

export const Button = ({
  children,
  variant = "primary",
  onClick,
  className = "",
  href,
  showIcon = true,
}: ButtonProps) => {
  const baseStyles = "inline-flex items-center justify-center px-8 py-4 rounded-full text-lg font-medium transition-all duration-200 cursor-pointer border-2";
  const variants = {
    primary: "gh-gradient-red border-gh-red text-white gh-shadow-red hover:opacity-90",
    secondary: "bg-transparent border-gh-red text-gh-red gh-shadow-red hover:bg-gh-red hover:text-white",
  };

  const content = (
    <span className="flex items-center gap-2">
      {children}
      {showIcon && <ChevronRight className="w-5 h-5" />}
    </span>
  );

  if (href) {
    return (
      <motion.a
        href={href}
        whileHover={{ scale: 1.02 }}
        whileTap={{ scale: 0.98 }}
        className={`${baseStyles} ${variants[variant]} ${className}`}
      >
        {content}
      </motion.a>
    );
  }

  return (
    <motion.button
      onClick={onClick}
      whileHover={{ scale: 1.02 }}
      whileTap={{ scale: 0.98 }}
      className={`${baseStyles} ${variants[variant]} ${className}`}
    >
      {content}
    </motion.button>
  );
};
