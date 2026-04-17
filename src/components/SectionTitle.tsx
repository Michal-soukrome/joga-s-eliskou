import Container from "@/components/Container";

interface SectionTitleProps {
  title: string;
  subtitle?: string;
  accentColor?: string;
  isDark?: boolean;
}

export default function SectionTitle({ title, subtitle }: SectionTitleProps) {
  return (
    <div className="text-center mb-16">
      <div className="flex items-center justify-center gap-4 mb-5">
        <div className="w-12 h-px bg-gradient-to-r from-transparent via-sky-400 to-transparent"></div>
        <span className="text-xs uppercase tracking-[0.35em] text-sky-600 font-bold">
          {title}
        </span>
        <div className="w-12 h-px bg-gradient-to-l from-transparent via-sky-400 to-transparent"></div>
      </div>
      {subtitle && (
        <Container
          size="2xl"
          className="text-sky-700 text-lg leading-relaxed font-medium"
        >
          {subtitle}
        </Container>
      )}
    </div>
  );
}
