interface ShramikLogoProps {
  size?: "sm" | "md" | "lg" | "xl";
  showText?: boolean;
  className?: string;
}

const SIZE_MAP = {
  sm: { box: "w-9 h-9", svg: "w-5 h-5", text: "text-base", sub: "text-[10px]" },
  md: { box: "w-12 h-12", svg: "w-6 h-6", text: "text-lg", sub: "text-xs" },
  lg: { box: "w-16 h-16", svg: "w-8 h-8", text: "text-2xl", sub: "text-sm" },
  xl: { box: "w-24 h-24", svg: "w-12 h-12", text: "text-3xl", sub: "text-sm" },
};

export default function ShramikLogo({
  size = "md",
  showText = false,
  className = "",
}: ShramikLogoProps) {
  const s = SIZE_MAP[size];
  return (
    <div className={`flex items-center gap-2.5 ${className}`}>
      <div
        className={`${s.box} rounded-xl bg-gradient-to-br from-purple-600 to-indigo-700 flex items-center justify-center shadow-md flex-shrink-0`}
      >
        <svg
          viewBox="0 0 24 24"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          className={s.svg}
          aria-hidden="true"
        >
          {/* Hard hat dome */}
          <path
            d="M12 2.5C8.8 2.5 6.2 4.6 5.3 7.5L2.5 8.6V10.5H3.5V12H2.5V13.5H21.5V12H20.5V10.5H21.5V8.6L18.7 7.5C17.8 4.6 15.2 2.5 12 2.5Z"
            fill="white"
          />
          {/* Brim */}
          <rect
            x="3"
            y="13.5"
            width="18"
            height="2"
            rx="1"
            fill="white"
            opacity="0.9"
          />
          {/* Body */}
          <path
            d="M6.5 16h11l-1.2 5.5H7.7L6.5 16Z"
            fill="white"
            opacity="0.7"
          />
          {/* Ventilation stripe */}
          <rect
            x="11"
            y="5"
            width="2"
            height="5"
            rx="1"
            fill="white"
            opacity="0.35"
          />
        </svg>
      </div>
      {showText && (
        <div>
          <p
            className={`font-display font-bold leading-tight text-foreground ${s.text}`}
          >
            Shramik
          </p>
          <p className={`text-muted-foreground leading-none ${s.sub}`}>
            Worker Platform
          </p>
        </div>
      )}
    </div>
  );
}
