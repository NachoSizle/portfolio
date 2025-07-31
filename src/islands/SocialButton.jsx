import React, { useState } from "react";
import { motion } from "framer-motion";
import { SiGithub, SiLinkedin, SiThreads } from 'react-icons/si';

const iconMap = {
  github: SiGithub,
  linkedin: SiLinkedin,
  threads: SiThreads,
};

export default function SocialButton({ href, label, iconName, iconClassName }) {
  const [isHovered, setIsHovered] = useState(false);
  const IconComponent = iconMap[iconName];

  if (!IconComponent) {
    // No renderizar nada si el nombre del icono no es válido
    return null;
  }

  return (
    <>
      <motion.a
        href={href}
        target="_blank"
        rel="noopener noreferrer"
        onClick={() => setIsHovered(false)}
        onBlur={() => setIsHovered(false)}
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
        whileHover={{ scale: 1.05, y: -2 }}
        whileTap={{ scale: 0.95 }}
        className={`inline-flex items-center justify-center rounded-full border text-emerald-600 
                  sm:text-gray-900 dark:text-emerald-400 sm:dark:text-white
                   p-3 text-sm font-medium shadow-sm transition-colors focus:outline-none
                   focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-primary 
                   hover:text-emerald-500 ${iconClassName}`}
        aria-label={label}
      >
        <span className="sr-only">{label}</span>
        <IconComponent className={iconClassName} aria-hidden="true" aria-label={label} />
      </motion.a>
      {isHovered && (
        <div
          className="absolute top-full left-1/2 z-10 mt-2 -translate-x-1/2 whitespace-nowrap
                     rounded-md bg-gray-900 px-3 py-1.5 text-sm font-semibold text-white shadow-lg
                     dark:bg-gray-700"
          role="tooltip"
        >
          {label}
        </div>
      )}
    </>
  );
}

