import { FEATURED_INSURANCES, INSURANCE_BRANDS } from "@/data/insurances";

interface Props {
  size?: "sm" | "md" | "lg";
  exclude?: string[];
  className?: string;
}

const sizeMap = {
  sm: { card: "h-12 px-3 text-[11px] sm:text-xs", img: "max-h-7" },
  md: { card: "h-16 px-4 text-sm", img: "max-h-9" },
  lg: { card: "h-20 px-5 text-base", img: "max-h-11" },
};

const InsuranceLogoGrid = ({ size = "md", exclude = [], className = "" }: Props) => {
  const items = FEATURED_INSURANCES.filter((n) => !exclude.includes(n));
  const s = sizeMap[size];

  return (
    <ul
      className={`grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-2 sm:gap-3 ${className}`}
      aria-label="Insurance plans accepted"
    >
      {items.map((name) => {
        const b = INSURANCE_BRANDS[name];
        if (!b) return null;
        return (
          <li
            key={name}
            className={`flex items-center justify-center rounded-xl shadow-sm border border-border/40 font-semibold tracking-tight whitespace-nowrap ${s.card}`}
            style={{ backgroundColor: b.bg, color: b.fg }}
            title={b.name}
            aria-label={b.name}
          >
            {b.logo ? (
              <img src={b.logo} alt={`${b.name} logo`} loading="lazy" className={`${s.img} w-auto object-contain`} />
            ) : (
              <span className="leading-none">{b.short}</span>
            )}
          </li>
        );
      })}
    </ul>
  );
};

export default InsuranceLogoGrid;
