import { Motion } from "@motionone/solid";

declare global {
  interface Window {
    umami?: {
      track: (event: string, data: { location: string }) => void;
    };
  }
}

interface HeroCTAProps {
  label: string;
  ariaLabel?: string;
}

export default function HeroCTA({ label, ariaLabel }: HeroCTAProps) {
  const handleClick = () => {
    window.umami?.track('cta-click', { location: 'hero' });
  };

  return (
    <Motion.a
      aria-label={ariaLabel ?? label}
      href="#projects"
      hover={{ scale: 1.05 }}
      press={{ scale: 0.97 }}
      onClick={handleClick}
      class="inline-flex items-center gap-2 rounded-xl bg-emerald-700 px-6 py-3 text-sm font-semibold text-white shadow-lg transition-all duration-200 hover:bg-emerald-700 focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-emerald-500 dark:bg-emerald-500 dark:hover:bg-emerald-500 border-2 border-emerald-700 dark:border-emerald-500 focus-visible:ring-primary select-none"
    >
      {label}
    </Motion.a>
  );
}
