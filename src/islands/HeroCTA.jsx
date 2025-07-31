import { motion } from 'framer-motion';

export default function HeroCTA() {
  const handleClick = () =>
    window.umami?.track('cta-click', { location: 'hero' });

  return (
    <motion.a
      aria-label="Ver proyectos"
      href="#projects"
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.97 }}
      onClick={handleClick}
      className="inline-flex items-center gap-2 rounded-xl bg-emerald-600 px-6 py-3 text-sm font-semibold text-white shadow-lg transition-all duration-200 hover:bg-emerald-700 focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-emerald-600 dark:bg-emerald-500 dark:hover:bg-emerald-600"
      >
      Ver proyectos
    </motion.a>
  );
}
