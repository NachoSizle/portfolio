import { createSignal, Show } from "solid-js";
import { Motion } from "@motionone/solid";
import { SiGithub, SiLinkedin, SiMeta } from "solid-icons/si";

const iconMap = {
  github: SiGithub,
  linkedin: SiLinkedin,
  threads: SiMeta,
};

export default function SocialButton(props: { href: string; label: string; iconName: keyof typeof iconMap; iconClassName?: string }) {
  const [isHovered, setIsHovered] = createSignal(false);
  const IconComponent = iconMap[props.iconName];

  return (
    <div class="relative">
      <Motion.a
        href={props.href}
        target="_blank"
        rel="noopener noreferrer"
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
        animate={{
          scale: isHovered() ? 1.05 : 1,
          y: isHovered() ? -2 : 0,
        }}
        transition={{ duration: 0.2 }}
        class="inline-flex items-center justify-center rounded-full border text-emerald-600 
               sm:text-gray-900 dark:text-emerald-400 sm:dark:text-white
               p-3 text-sm font-medium shadow-sm transition-colors focus:outline-none
               focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-primary 
               hover:text-emerald-500"
        aria-label={props.label}
      >
        <span class="sr-only">{props.label}</span>
        <IconComponent class={props.iconClassName} aria-hidden="true" />
      </Motion.a>
      <Show when={isHovered()}>
        <div
          class="absolute top-full left-1/2 z-10 mt-2 -translate-x-1/2 whitespace-nowrap
                 rounded-md bg-gray-900 px-3 py-1.5 text-sm font-semibold text-white shadow-lg
                 dark:bg-gray-700"
          role="tooltip"
        >
          {props.label}
        </div>
      </Show>
    </div>
  );
}
