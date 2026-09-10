import { FEATURED_INSURANCES, INSURANCE_BRANDS } from "@/data/insurances";

interface Props {
  size?: "sm" | "md" | "lg";
  exclude?: string[];
  className?: string;
  plans?: string[];
}

const sizeMap = {
  sm: { card: "h-14 px-3 text-[11px] sm:text-xs", img: "max-h-10" },
  md: { card: "h-20 px-4 text-sm", img: "max-h-14" },
  lg: { card: "h-24 px-5 text-base", img: "max-h-16" },
};

const InsuranceLogoGrid = ({ size = "md", exclude = [], className = "", plans = FEATURED_INSURANCES }: Props) => {
  const items = plans.filter((n) => !exclude.includes(n));
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
              <span className="flex min-w-0 flex-col items-center justify-center gap-1">
                <img
                  src={b.logo}
                  alt=""
                  loading="lazy"
                  className={`${(typeof b.logoClass === "object" ? b.logoClass?.[size] : b.logoClass) || s.img} w-auto object-contain`}
                  onError={(event) => { event.currentTarget.style.display = "none"; }}
                />
                <span className="max-w-full whitespace-normal text-center text-xs leading-tight">{b.short}</span>
              </span>
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
