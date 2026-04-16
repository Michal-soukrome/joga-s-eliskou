interface SectionTitleProps {
  title: string;
  subtitle?: string;
  accentColor?: string;
  isDark?: boolean;
}

export default function SectionTitle({
  title,
  subtitle,
}: SectionTitleProps) {
  return (
    <div className="text-center mb-16">
      <div className="flex items-center justify-center gap-4 mb-5">
        <div className="w-10 h-px bg-amber-400/60"></div>
        <span className="text-xs uppercase tracking-[0.35em] text-amber-400 font-semibold">
          {title}
        </span>
        <div className="w-10 h-px bg-amber-400/60"></div>
      </div>
      {subtitle && (
        <p className="text-stone-400 max-w-2xl mx-auto text-lg leading-relaxed">
          {subtitle}
        </p>
      )}
    </div>
  );
}
