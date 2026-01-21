type GlassButtonProps = {
  children: React.ReactNode;
  onClick?: () => void;
  className?: string;
};

export function GlassButton({ children, onClick, className = "" }: GlassButtonProps) {
  return (
    <button
      onClick={onClick}
      className={[
        "rounded-xl border border-white/10 bg-white/5 px-4 py-2",
        "text-sm font-medium text-white hover:bg-white/10",
        "transition",
        className,
      ].join(" ")}
    >
      {children}
    </button>
  );
}
