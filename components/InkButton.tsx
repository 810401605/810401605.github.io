import React from 'react';
import { motion } from 'framer-motion';

interface InkButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'danger';
  icon?: React.ReactNode;
}

export const InkButton: React.FC<InkButtonProps> = ({ 
  children, 
  variant = 'primary', 
  icon,
  className = '', 
  ...props 
}) => {
  const baseStyles = "relative px-6 py-2 rounded-lg font-serif-en tracking-wider overflow-hidden transition-all duration-300 flex items-center justify-center gap-2 group";
  
  const variants = {
    primary: "bg-gray-900 text-white hover:bg-gray-800 border border-gray-900 shadow-lg hover:shadow-gray-500/30",
    secondary: "bg-transparent text-gray-800 border border-gray-800 hover:bg-gray-100",
    danger: "bg-red-50 text-red-800 border border-red-200 hover:bg-red-100"
  };

  return (
    <motion.button
      whileHover={{ scale: 1.02 }}
      whileTap={{ scale: 0.98 }}
      className={`${baseStyles} ${variants[variant]} ${className}`}
      {...props}
    >
      <span className="relative z-10 flex items-center gap-2">
        {icon}
        {children}
      </span>
      {/* Ink Splash Effect on Hover */}
      <div className="absolute inset-0 bg-white/10 translate-y-full group-hover:translate-y-0 transition-transform duration-300 ease-out" />
    </motion.button>
  );
};