import { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import Icon from "@/components/ui/icon";
import { cities } from "@/data/cities";

const navLinks = [
  { label: "Главная", href: "/" },
  { label: "Каталог", href: "/catalog" },
  { label: "О компании", href: "/about" },
  { label: "Доставка", href: "/delivery" },
  { label: "Калькулятор", href: "/calculator" },
  { label: "Блог", href: "/blog" },
  { label: "Отзывы", href: "/reviews" },
  { label: "Контакты", href: "/contacts" },
];

interface HeaderProps {
  currentCity: string;
  onCityChange: (slug: string) => void;
}

export default function Header({ currentCity, onCityChange }: HeaderProps) {
  const [menuOpen, setMenuOpen] = useState(false);
  const [cityOpen, setCityOpen] = useState(false);
  const location = useLocation();

  const city = cities.find(c => c.slug === currentCity) || cities[0];

  return (
    <header className="sticky top-0 z-50 w-full" style={{ background: "var(--brand-navy)" }}>
      {/* Top bar */}
      <div className="border-b" style={{ borderColor: "rgba(255,255,255,0.07)" }}>
        <div className="container mx-auto px-4 flex items-center justify-between h-10 text-xs" style={{ color: "var(--brand-muted)" }}>
          <div className="flex items-center gap-6">
            <span className="flex items-center gap-1.5">
              <Icon name="Clock" size={13} />
              Пн–Пт: 8:00–18:00, Сб: 9:00–14:00
            </span>
            <span className="hidden md:flex items-center gap-1.5">
              <Icon name="Mail" size={13} />
              sales@tareksa.ru
            </span>
          </div>
          <div className="flex items-center gap-4">
            <span className="flex items-center gap-1.5">
              <Icon name="MapPin" size={13} />
              <button
                onClick={() => setCityOpen(!cityOpen)}
                className="hover:text-white transition-colors flex items-center gap-1"
              >
                {city.name}
                <Icon name="ChevronDown" size={12} />
              </button>
            </span>
            {cityOpen && (
              <div className="absolute top-10 right-4 mt-1 z-50 rounded border py-1 min-w-48" style={{ background: "var(--brand-steel)", borderColor: "rgba(255,255,255,0.1)" }}>
                {cities.map(c => (
                  <button
                    key={c.id}
                    onClick={() => { onCityChange(c.slug); setCityOpen(false); }}
                    className={`w-full text-left px-4 py-2 text-sm transition-colors hover:bg-white/5 ${c.slug === currentCity ? "text-white" : "text-gray-400"}`}
                  >
                    {c.name}
                    {c.slug === currentCity && <Icon name="Check" size={12} className="inline ml-2 text-blue-400" />}
                  </button>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Main header */}
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link to="/" className="flex items-center gap-3 group">
            <div className="w-9 h-9 rounded flex items-center justify-center" style={{ background: "hsl(var(--primary))" }}>
              <Icon name="Layers" size={20} className="text-white" />
            </div>
            <div>
              <div className="font-oswald font-700 text-white text-lg tracking-wider leading-none">НПФ ТАРЕКСА</div>
              <div className="text-xs leading-none mt-0.5" style={{ color: "var(--brand-muted)" }}>Кварцевые материалы оптом</div>
            </div>
          </Link>

          {/* Desktop nav */}
          <nav className="hidden lg:flex items-center gap-0.5">
            {navLinks.map(link => (
              <Link
                key={link.href}
                to={link.href}
                className={`px-3 py-2 text-sm font-medium transition-colors rounded ${
                  location.pathname === link.href
                    ? "text-white bg-white/8"
                    : "text-gray-400 hover:text-white hover:bg-white/5"
                }`}
              >
                {link.label}
              </Link>
            ))}
          </nav>

          {/* Phone + CTA */}
          <div className="hidden md:flex items-center gap-3">
            <div className="text-right">
              <a href={`tel:${city.phone}`} className="font-oswald text-white font-medium tracking-wide hover:text-blue-400 transition-colors">
                {city.phone}
              </a>
              <div className="text-xs" style={{ color: "var(--brand-muted)" }}>Бесплатный звонок</div>
            </div>
            <Link
              to="/contacts"
              className="btn-accent px-4 py-2 text-sm rounded"
              style={{ background: "hsl(var(--accent))", color: "var(--brand-navy)", fontFamily: "Oswald", fontWeight: 600, textTransform: "uppercase", letterSpacing: "0.05em" }}
            >
              Заказать
            </Link>
          </div>

          {/* Mobile menu */}
          <button
            className="lg:hidden text-gray-400 hover:text-white p-2"
            onClick={() => setMenuOpen(!menuOpen)}
          >
            <Icon name={menuOpen ? "X" : "Menu"} size={22} />
          </button>
        </div>
      </div>

      {/* Mobile nav */}
      {menuOpen && (
        <div className="lg:hidden border-t" style={{ background: "var(--brand-steel)", borderColor: "rgba(255,255,255,0.07)" }}>
          <div className="container mx-auto px-4 py-3 flex flex-col gap-1">
            {navLinks.map(link => (
              <Link
                key={link.href}
                to={link.href}
                onClick={() => setMenuOpen(false)}
                className="px-3 py-2.5 text-sm text-gray-300 hover:text-white hover:bg-white/5 rounded transition-colors"
              >
                {link.label}
              </Link>
            ))}
            <div className="pt-2 pb-1 border-t mt-1" style={{ borderColor: "rgba(255,255,255,0.07)" }}>
              <a href={`tel:${city.phone}`} className="flex items-center gap-2 px-3 py-2 text-white font-medium">
                <Icon name="Phone" size={16} />
                {city.phone}
              </a>
            </div>
          </div>
        </div>
      )}
    </header>
  );
}