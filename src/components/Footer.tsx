import { Link } from "react-router-dom";
import Icon from "@/components/ui/icon";
import { cities } from "@/data/cities";

export default function Footer() {
  return (
    <footer style={{ background: "var(--brand-navy)" }} className="border-t" >
      <div className="border-b" style={{ borderColor: "rgba(255,255,255,0.07)" }}>
        <div className="container mx-auto px-4 py-12">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10">
            {/* Brand */}
            <div>
              <div className="flex items-center gap-3 mb-4">
                <div className="w-9 h-9 rounded flex items-center justify-center" style={{ background: "hsl(var(--primary))" }}>
                  <Icon name="Layers" size={20} className="text-white" />
                </div>
                <div>
                  <div className="font-oswald font-bold text-white tracking-wider">НПФ ТАРЕКСА</div>
                  <div className="text-xs" style={{ color: "var(--brand-muted)" }}>Кварцевые материалы оптом</div>
                </div>
              </div>
              <p className="text-sm leading-relaxed mb-4" style={{ color: "var(--brand-muted)" }}>
                Поставка кварцевых песков, гидроантрацита Aqualat, цеолита, гравия, щебня и активированного угля оптом по всей России.
              </p>
              <div className="flex items-center gap-3">
                <a href="#" className="w-8 h-8 rounded flex items-center justify-center transition-colors hover:bg-white/10" style={{ background: "rgba(255,255,255,0.06)" }}>
                  <Icon name="MessageCircle" size={16} className="text-gray-400" />
                </a>
                <a href="#" className="w-8 h-8 rounded flex items-center justify-center transition-colors hover:bg-white/10" style={{ background: "rgba(255,255,255,0.06)" }}>
                  <Icon name="Send" size={16} className="text-gray-400" />
                </a>
              </div>
            </div>

            {/* Catalog */}
            <div>
              <h4 className="font-oswald text-white font-medium mb-4 text-sm tracking-wider uppercase">Каталог</h4>
              <ul className="space-y-2 text-sm" style={{ color: "var(--brand-muted)" }}>
                <li><Link to="/catalog" className="hover:text-white transition-colors">Кварцевый песок</Link></li>
                <li><Link to="/catalog" className="hover:text-white transition-colors">Гидроантрацит Aqualat</Link></li>
                <li><Link to="/catalog" className="hover:text-white transition-colors">Кварц дроблёный</Link></li>
                <li><Link to="/catalog" className="hover:text-white transition-colors">Гравий кварцевый</Link></li>
                <li><Link to="/catalog" className="hover:text-white transition-colors">Мраморная крошка</Link></li>
                <li><Link to="/catalog" className="hover:text-white transition-colors">Цеолит природный</Link></li>
                <li><Link to="/catalog" className="hover:text-white transition-colors">Активированный уголь</Link></li>
              </ul>
            </div>

            {/* Cities */}
            <div>
              <h4 className="font-oswald text-white font-medium mb-4 text-sm tracking-wider uppercase">Города</h4>
              <ul className="space-y-1.5 text-sm" style={{ color: "var(--brand-muted)" }}>
                {cities.slice(0, 10).map(c => (
                  <li key={c.id}><Link to={`/city/${c.slug}`} className="hover:text-white transition-colors">{c.name}</Link></li>
                ))}
                <li className="pt-1">
                  <Link to="/city/ekaterinburg" className="hover:text-white transition-colors" style={{ color: "hsl(var(--primary))" }}>
                    Все {cities.length} городов →
                  </Link>
                </li>
              </ul>
            </div>

            {/* Contacts */}
            <div>
              <h4 className="font-oswald text-white font-medium mb-4 text-sm tracking-wider uppercase">Контакты</h4>
              <ul className="space-y-3 text-sm" style={{ color: "var(--brand-muted)" }}>
                <li className="flex items-start gap-2">
                  <Icon name="Phone" size={15} className="mt-0.5 shrink-0" style={{ color: "hsl(var(--primary))" }} />
                  <div>
                    <a href="tel:+79267947070" className="hover:text-white transition-colors block">+7 (926) 794-70-70</a>
                  </div>
                </li>
                <li className="flex items-center gap-2">
                  <Icon name="Mail" size={15} className="shrink-0" style={{ color: "hsl(var(--primary))" }} />
                  <a href="mailto:sales@tareksa.ru" className="hover:text-white transition-colors">sales@tareksa.ru</a>
                </li>
                <li className="flex items-start gap-2">
                  <Icon name="MapPin" size={15} className="mt-0.5 shrink-0" style={{ color: "hsl(var(--primary))" }} />
                  <span>Москва, Россия</span>
                </li>
                <li className="flex items-center gap-2">
                  <Icon name="Clock" size={15} className="shrink-0" style={{ color: "hsl(var(--primary))" }} />
                  <span>Пн–Пт: 8:00–18:00, Сб: 9:00–14:00</span>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom bar */}
      <div className="container mx-auto px-4 py-4 flex flex-col md:flex-row items-center justify-between gap-2 text-xs" style={{ color: "var(--brand-muted)" }}>
        <span>© НПФ ТАРЕКСА. Все права защищены.</span>
        <div className="flex items-center gap-4">
          <Link to="/privacy" className="hover:text-white transition-colors">Политика конфиденциальности</Link>
          <Link to="/sitemap" className="hover:text-white transition-colors">Карта сайта</Link>
        </div>
      </div>
    </footer>
  );
}