import { useState } from "react";
import { Link } from "react-router-dom";
import Icon from "@/components/ui/icon";
import { products } from "@/data/cities";
import { cities } from "@/data/cities";

interface CatalogPageProps {
  currentCity: string;
}

export default function CatalogPage({ currentCity }: CatalogPageProps) {
  const [category, setCategory] = useState("all");
  const [sortBy, setSortBy] = useState("name");
  const city = cities.find(c => c.slug === currentCity) || cities[0];

  const categories = [
    { id: "all", label: "Все материалы" },
    { id: "abrasive", label: "Абразивы" },
    { id: "zeolite", label: "Цеолиты" },
  ];

  const filtered = products
    .filter(p => category === "all" || p.category === category)
    .sort((a, b) => sortBy === "price" ? a.basePrice - b.basePrice : a.name.localeCompare(b.name));

  const mult = { moskva: 1.0, spb: 1.05, ekaterinburg: 1.15, novosibirsk: 1.21, kazan: 1.10 }[currentCity] || 1.0;

  return (
    <section className="min-h-screen py-16 bg-brand-pattern">
      <div className="container mx-auto px-4">
        <div className="flex items-center gap-2 text-sm mb-8" style={{ color: "var(--brand-muted)" }}>
          <Link to="/" className="hover:text-white transition-colors flex items-center gap-1">
            <Icon name="Home" size={13} />Главная
          </Link>
          <span>/</span>
          <span className="text-white">Каталог</span>
        </div>

        <div className="text-xs font-oswald tracking-widest text-blue-400 mb-3 uppercase">Вся продукция</div>
        <h1 className="font-oswald text-4xl text-white mb-2">КАТАЛОГ МАТЕРИАЛОВ</h1>
        <p className="text-sm mb-10" style={{ color: "var(--brand-muted)" }}>
          Цены актуальны для доставки в {city.name}. Минимальная партия — 1 тонна.
        </p>

        {/* Filters */}
        <div className="flex flex-wrap items-center justify-between gap-4 mb-8">
          <div className="flex gap-2">
            {categories.map(cat => (
              <button
                key={cat.id}
                onClick={() => setCategory(cat.id)}
                className="px-4 py-2 text-sm rounded font-oswald tracking-wider transition-all"
                style={{
                  background: category === cat.id ? "hsl(var(--primary))" : "var(--brand-steel)",
                  color: "white",
                  border: "1px solid",
                  borderColor: category === cat.id ? "hsl(var(--primary))" : "rgba(255,255,255,0.08)"
                }}
              >
                {cat.label}
              </button>
            ))}
          </div>
          <div className="flex items-center gap-2 text-sm" style={{ color: "var(--brand-muted)" }}>
            <span>Сортировать:</span>
            <button onClick={() => setSortBy("name")} className={`transition-colors ${sortBy === "name" ? "text-white" : "hover:text-white"}`}>
              По названию
            </button>
            <span>·</span>
            <button onClick={() => setSortBy("price")} className={`transition-colors ${sortBy === "price" ? "text-white" : "hover:text-white"}`}>
              По цене
            </button>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
          {filtered.map(product => (
            <div key={product.id} className="card-hover rounded border overflow-hidden flex flex-col"
              style={{ background: "var(--brand-steel)", borderColor: "rgba(255,255,255,0.08)" }}>
              <div className="p-6 flex-1">
                <div className="flex items-start justify-between mb-3">
                  <h2 className="font-oswald text-white text-xl">{product.name}</h2>
                </div>
                <div className="flex items-center gap-2 mb-3">
                  <span className="text-xs px-2 py-0.5 rounded" style={{ background: "rgba(26, 143, 181, 0.12)", color: "hsl(var(--primary))" }}>
                    {product.gost}
                  </span>
                  <span className="text-xs px-2 py-0.5 rounded" style={{ background: "rgba(255,255,255,0.06)", color: "var(--brand-muted)" }}>
                    {product.category === "abrasive" ? "Абразив" : "Цеолит"}
                  </span>
                </div>
                <p className="text-sm leading-relaxed mb-4" style={{ color: "var(--brand-muted)" }}>{product.description}</p>

                <div className="mb-3">
                  <div className="text-xs uppercase tracking-wider mb-2 font-medium" style={{ color: "var(--brand-muted)" }}>Доступные фракции</div>
                  <div className="flex flex-wrap gap-1.5">
                    {product.fractions.map(f => (
                      <span key={f} className="text-xs px-2 py-1 rounded"
                        style={{ background: "rgba(255,255,255,0.06)", color: "hsl(var(--foreground))" }}>
                        {f}
                      </span>
                    ))}
                  </div>
                </div>

                <div className="mb-3">
                  <div className="text-xs uppercase tracking-wider mb-2 font-medium" style={{ color: "var(--brand-muted)" }}>Упаковка</div>
                  <div className="flex flex-wrap gap-1.5">
                    {product.packaging.map(pkg => (
                      <span key={pkg} className="text-xs px-2 py-1 rounded"
                        style={{ background: "rgba(255,255,255,0.04)", color: "var(--brand-muted)", border: "1px solid rgba(255,255,255,0.07)" }}>
                        {pkg}
                      </span>
                    ))}
                  </div>
                </div>
              </div>

              <div className="px-6 py-4 border-t flex items-center justify-between"
                style={{ borderColor: "rgba(255,255,255,0.07)", background: "rgba(0,0,0,0.15)" }}>
                <div>
                  <div className="text-xs mb-0.5" style={{ color: "var(--brand-muted)" }}>Цена в {city.name}</div>
                  <div className="font-oswald text-xl text-white">
                    от {Math.round(product.basePrice * mult).toLocaleString()}
                    <span className="text-sm ml-1" style={{ color: "var(--brand-muted)" }}>руб./т</span>
                  </div>
                </div>
                <Link to="/contacts"
                  className="px-5 py-2.5 rounded font-oswald text-sm tracking-wider"
                  style={{ background: "hsl(var(--primary))", color: "white" }}>
                  Запросить КП
                </Link>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
