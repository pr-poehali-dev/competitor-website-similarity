import { useState } from "react";
import { Link } from "react-router-dom";
import Icon from "@/components/ui/icon";
import { cities, products } from "@/data/cities";

const HERO_IMG = "https://cdn.poehali.dev/projects/1f3e41e3-a87c-47c0-9bea-b322a34c80aa/files/c07ed1d9-4505-40a1-8d94-d88897b4b6cc.jpg";

const stats = [
  { value: "16+", label: "лет на рынке", icon: "Award" },
  { value: "2 400+", label: "клиентов по России", icon: "Users" },
  { value: "5", label: "складов в городах", icon: "Warehouse" },
  { value: "от 24 ч", label: "срок доставки", icon: "Truck" },
];

const advantages = [
  { icon: "Factory", title: "Собственное производство", text: "Полный контроль качества — от добычи сырья до финальной фасовки. Производство сертифицировано по ISO 9001:2015." },
  { icon: "Shield", title: "Гарантия ГОСТ", text: "Все материалы сопровождаются паспортами качества, сертификатами соответствия и протоколами испытаний." },
  { icon: "Truck", title: "Доставка по России", text: "Собственный автопарк и партнёрские ТК. Доставляем от 1 тонны. Бесплатная доставка при заказе от 5 тонн." },
  { icon: "Calculator", title: "Индивидуальные цены", text: "Скидки от объёма, долгосрочные контракты с фиксированными ценами, отсрочка платежа для постоянных клиентов." },
];

interface HomePageProps {
  currentCity: string;
}

export default function HomePage({ currentCity }: HomePageProps) {
  const [selectedCategory, setSelectedCategory] = useState<string>("all");
  const city = cities.find(c => c.slug === currentCity) || cities[0];

  const categories = [
    { id: "all", label: "Все товары" },
    { id: "quartz", label: "Кварц и песок" },
    { id: "filtration", label: "Фильтрация" },
    { id: "stone", label: "Камень" },
  ];

  const filtered = selectedCategory === "all"
    ? products
    : products.filter(p => p.category === selectedCategory);

  return (
    <>
      {/* Structured Data */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "Organization",
            "name": "НПФ ТАРЕКСА",
            "url": "https://tareksa.ru",
            "logo": "https://tareksa.ru/logo.png",
            "contactPoint": {
              "@type": "ContactPoint",
              "telephone": "+7-926-794-70-70",
              "email": "sales@tareksa.ru",
              "contactType": "sales",
              "availableLanguage": "Russian"
            },
            "address": {
              "@type": "PostalAddress",
              "addressLocality": "Москва",
              "addressCountry": "RU"
            }
          })
        }}
      />

      {/* Hero Section */}
      <section className="relative min-h-screen flex items-center overflow-hidden">
        <div
          className="absolute inset-0 bg-cover bg-center"
          style={{ backgroundImage: `url(${HERO_IMG})` }}
        />
        <div className="absolute inset-0 hero-overlay" />
        {/* Geometric accent */}
        <div className="absolute right-0 top-0 w-1/3 h-full opacity-10"
          style={{
            background: "linear-gradient(135deg, transparent 0%, hsl(var(--primary)) 100%)",
            clipPath: "polygon(30% 0%, 100% 0%, 100% 100%, 0% 100%)"
          }}
        />

        <div className="container mx-auto px-4 relative z-10 py-24">
          <div className="max-w-3xl">
            {/* Breadcrumb */}
            <div className="flex items-center gap-2 text-sm mb-8 animate-fade-in" style={{ color: "var(--brand-muted)" }}>
              <Icon name="Home" size={14} />
              <span>/</span>
              <span className="text-blue-400">{city.name}</span>
            </div>

            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded text-xs font-medium mb-6 animate-fade-in stagger-1"
              style={{ background: "rgba(26, 143, 181, 0.15)", color: "hsl(var(--primary))", border: "1px solid rgba(26, 143, 181, 0.3)" }}>
              <Icon name="MapPin" size={12} />
              Доставка в {city.name} — от {city.deliveryTime}
            </div>

            <h1 className="font-oswald text-5xl md:text-6xl lg:text-7xl text-white leading-tight mb-6 animate-fade-in stagger-2">
              КВАРЦЕВЫЙ<br />
              <span style={{ color: "hsl(var(--primary))" }}>ПЕСОК</span> И<br />
              СОРБЕНТЫ
            </h1>

            <p className="text-lg text-gray-300 leading-relaxed mb-8 max-w-xl animate-fade-in stagger-3">
              НПФ ТАРЕКСА — поставки кварцевых песков, гидроантрацита Aqualat, цеолита, мраморной крошки и активированного угля.
              Доставка в {city.name} от <strong className="text-white">{city.pricePerTon.toLocaleString()} руб./т</strong>
            </p>

            <div className="flex flex-wrap gap-4 animate-fade-in stagger-4">
              <Link
                to="/catalog"
                className="btn-primary px-8 py-3.5 rounded font-oswald text-sm tracking-widest"
                style={{ background: "hsl(var(--primary))", color: "white" }}
              >
                Смотреть каталог
              </Link>
              <Link
                to="/calculator"
                className="px-8 py-3.5 rounded font-oswald text-sm tracking-widest border transition-colors hover:bg-white/10"
                style={{ borderColor: "rgba(255,255,255,0.25)", color: "white" }}
              >
                Рассчитать доставку
              </Link>
            </div>

            {/* Quick stats */}
            <div className="flex flex-wrap gap-8 mt-14 pt-10 border-t animate-fade-in" style={{ borderColor: "rgba(255,255,255,0.1)" }}>
              {stats.map((s) => (
                <div key={s.label}>
                  <div className="stat-number text-3xl font-oswald">{s.value}</div>
                  <div className="text-xs mt-0.5" style={{ color: "var(--brand-muted)" }}>{s.label}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Advantages */}
      <section className="py-20 bg-brand-pattern">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <div className="text-xs font-oswald tracking-widest text-blue-400 mb-3 uppercase">Почему выбирают нас</div>
            <h2 className="font-oswald text-3xl md:text-4xl text-white">ПРЕИМУЩЕСТВА КОМПАНИИ</h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {advantages.map((adv) => (
              <div key={adv.title} className="card-hover rounded p-6 border" style={{ background: "var(--brand-steel)", borderColor: "rgba(255,255,255,0.08)" }}>
                <div className="w-12 h-12 rounded mb-4 flex items-center justify-center" style={{ background: "rgba(26, 143, 181, 0.12)" }}>
                  <Icon name={adv.icon} fallback="Star" size={24} style={{ color: "hsl(var(--primary))" }} />
                </div>
                <h3 className="font-oswald text-white text-lg mb-2">{adv.title}</h3>
                <p className="text-sm leading-relaxed" style={{ color: "var(--brand-muted)" }}>{adv.text}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Products Catalog */}
      <section className="py-20" style={{ background: "var(--brand-navy)" }}>
        <div className="container mx-auto px-4">
          <div className="flex flex-col md:flex-row md:items-end justify-between mb-10 gap-4">
            <div>
              <div className="text-xs font-oswald tracking-widest text-blue-400 mb-3 uppercase">Наша продукция</div>
              <h2 className="font-oswald text-3xl md:text-4xl text-white">КАТАЛОГ МАТЕРИАЛОВ</h2>
            </div>
            <div className="flex gap-2">
              {categories.map(cat => (
                <button
                  key={cat.id}
                  onClick={() => setSelectedCategory(cat.id)}
                  className={`px-4 py-2 text-sm rounded transition-all font-oswald tracking-wider ${
                    selectedCategory === cat.id
                      ? "text-white"
                      : "text-gray-400 hover:text-white"
                  }`}
                  style={{
                    background: selectedCategory === cat.id ? "hsl(var(--primary))" : "var(--brand-steel)",
                    border: "1px solid",
                    borderColor: selectedCategory === cat.id ? "hsl(var(--primary))" : "rgba(255,255,255,0.08)"
                  }}
                >
                  {cat.label}
                </button>
              ))}
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filtered.map(product => (
              <div key={product.id} className="card-hover rounded border overflow-hidden" style={{ background: "var(--brand-steel)", borderColor: "rgba(255,255,255,0.08)" }}>
                <div className="p-6">
                  <div className="flex items-start justify-between mb-3">
                    <h3 className="font-oswald text-white text-xl">{product.name}</h3>
                    <span className="text-xs px-2 py-1 rounded" style={{ background: "rgba(26, 143, 181, 0.12)", color: "hsl(var(--primary))" }}>
                      {product.gost}
                    </span>
                  </div>
                  <p className="text-sm leading-relaxed mb-4" style={{ color: "var(--brand-muted)" }}>
                    {product.description}
                  </p>

                  <div className="mb-4">
                    <div className="text-xs mb-2 uppercase tracking-wider font-medium" style={{ color: "var(--brand-muted)" }}>Фракции</div>
                    <div className="flex flex-wrap gap-1.5">
                      {product.fractions.map(f => (
                        <span key={f} className="text-xs px-2 py-1 rounded" style={{ background: "rgba(255,255,255,0.06)", color: "hsl(var(--foreground))" }}>
                          {f}
                        </span>
                      ))}
                    </div>
                  </div>

                  <div className="flex flex-wrap gap-1.5 mb-5">
                    {product.tags.map(tag => (
                      <span key={tag} className="text-xs px-2 py-0.5" style={{ color: "var(--brand-muted)" }}>
                        #{tag}
                      </span>
                    ))}
                  </div>

                  <div className="flex items-center justify-between pt-4 border-t" style={{ borderColor: "rgba(255,255,255,0.07)" }}>
                    <div>
                      <div className="text-xs mb-0.5" style={{ color: "var(--brand-muted)" }}>Цена от</div>
                      <div className="font-oswald text-xl text-white">
                        {(product.basePrice + (city.pricePerTon - 14500) * 0.3).toLocaleString()} <span className="text-sm" style={{ color: "var(--brand-muted)" }}>руб./т</span>
                      </div>
                    </div>
                    <Link
                      to="/contacts"
                      className="px-4 py-2 rounded text-sm font-oswald tracking-wider transition-colors"
                      style={{ background: "hsl(var(--primary))", color: "white" }}
                    >
                      Запросить
                    </Link>
                  </div>
                </div>
              </div>
            ))}
          </div>

          <div className="text-center mt-10">
            <Link
              to="/catalog"
              className="inline-flex items-center gap-2 px-8 py-3.5 rounded border font-oswald tracking-wider text-sm transition-colors hover:text-white hover:border-white"
              style={{ borderColor: "rgba(255,255,255,0.2)", color: "hsl(var(--foreground))" }}
            >
              Полный каталог
              <Icon name="ArrowRight" size={16} />
            </Link>
          </div>
        </div>
      </section>

      {/* Cities section */}
      <section className="py-20 bg-brand-pattern">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <div className="text-xs font-oswald tracking-widest text-blue-400 mb-3 uppercase">Региональная сеть</div>
            <h2 className="font-oswald text-3xl md:text-4xl text-white">СКЛАДЫ В ВАШЕМ ГОРОДЕ</h2>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-3">
            {cities.map(c => (
              <Link
                key={c.id}
                to={`/city/${c.slug}`}
                className="card-hover rounded border p-5 group"
                style={{ background: "var(--brand-steel)", borderColor: "rgba(255,255,255,0.08)" }}
              >
                <div className="flex items-center justify-between mb-3">
                  <Icon name="MapPin" size={16} style={{ color: "hsl(var(--primary))" }} />
                  <Icon name="ArrowRight" size={14} className="text-gray-600 group-hover:text-blue-400 transition-colors" />
                </div>
                <div className="font-oswald text-white text-lg mb-1">{c.name}</div>
                <div className="text-xs mb-3" style={{ color: "var(--brand-muted)" }}>{c.region}</div>
                <div className="space-y-1 text-xs" style={{ color: "var(--brand-muted)" }}>
                  <div className="flex items-center gap-1.5">
                    <Icon name="Clock" size={11} />
                    Доставка: {c.deliveryTime}
                  </div>
                  <div className="flex items-center gap-1.5">
                    <Icon name="Tag" size={11} />
                    от {c.pricePerTon.toLocaleString()} руб./т
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Banner */}
      <section className="py-16" style={{ background: "hsl(var(--primary))" }}>
        <div className="container mx-auto px-4 text-center">
          <h2 className="font-oswald text-3xl md:text-4xl text-white mb-4">
            ПОЛУЧИТЕ КОММЕРЧЕСКОЕ ПРЕДЛОЖЕНИЕ
          </h2>
          <p className="text-blue-100 mb-8 max-w-xl mx-auto">
            Рассчитаем стоимость доставки в {city.nameRod} с учётом объёма и адреса. Ответ — в течение 2 часов.
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <Link
              to="/contacts"
              className="px-8 py-3.5 rounded font-oswald tracking-widest text-sm transition-all hover:bg-white/90"
              style={{ background: "white", color: "hsl(var(--primary))" }}
            >
              Оставить заявку
            </Link>
            <Link
              to="/calculator"
              className="px-8 py-3.5 rounded font-oswald tracking-widest text-sm border border-white/30 text-white hover:bg-white/10 transition-all"
            >
              Калькулятор доставки
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}