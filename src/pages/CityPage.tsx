import { useParams, Link, Navigate } from "react-router-dom";
import Icon from "@/components/ui/icon";
import { getCityBySlug, products } from "@/data/cities";

export default function CityPage() {
  const { slug } = useParams<{ slug: string }>();
  const city = getCityBySlug(slug || "");

  if (!city) return <Navigate to="/" replace />;

  return (
    <>
      {/* LocalBusiness Structured Data */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "LocalBusiness",
            "name": `Абразив Опт — ${city.name}`,
            "description": city.description,
            "telephone": city.phone,
            "address": {
              "@type": "PostalAddress",
              "streetAddress": city.warehouse,
              "addressLocality": city.name,
              "addressRegion": city.region,
              "addressCountry": "RU"
            },
            "geo": {
              "@type": "GeoCoordinates",
              "latitude": city.lat,
              "longitude": city.lng
            },
            "openingHours": "Mo-Fr 08:00-18:00, Sa 09:00-14:00",
            "priceRange": `от ${city.pricePerTon.toLocaleString()} руб./т`
          })
        }}
      />

      {/* Breadcrumb */}
      <div style={{ background: "var(--brand-steel)" }} className="border-b" style2={{ borderColor: "rgba(255,255,255,0.07)" }}>
        <div className="container mx-auto px-4 py-3">
          <div className="flex items-center gap-2 text-sm" style={{ color: "var(--brand-muted)" }}>
            <Link to="/" className="hover:text-white transition-colors flex items-center gap-1">
              <Icon name="Home" size={13} />
              Главная
            </Link>
            <span>/</span>
            <span className="text-white">{city.name}</span>
          </div>
        </div>
      </div>

      {/* Hero */}
      <section className="py-16 bg-brand-pattern">
        <div className="container mx-auto px-4">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div>
              <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded text-xs font-medium mb-5"
                style={{ background: "rgba(26, 143, 181, 0.15)", color: "hsl(var(--primary))", border: "1px solid rgba(26, 143, 181, 0.3)" }}>
                <Icon name="MapPin" size={12} />
                {city.region}
              </div>
              <h1 className="font-oswald text-4xl md:text-5xl text-white leading-tight mb-4">
                АБРАЗИВНЫЕ ПОРОШКИ<br />
                С ДОСТАВКОЙ В {city.name.toUpperCase()}
              </h1>
              <p className="text-lg text-gray-300 mb-6 leading-relaxed">
                {city.description}
              </p>
              <div className="flex items-center gap-3 mb-8">
                <div className="text-3xl font-oswald text-white">
                  от {city.pricePerTon.toLocaleString()} <span className="text-base" style={{ color: "var(--brand-muted)" }}>руб./т</span>
                </div>
                <div className="px-3 py-1 rounded text-xs" style={{ background: "rgba(232, 148, 10, 0.15)", color: "hsl(var(--accent))", border: "1px solid rgba(232, 148, 10, 0.3)" }}>
                  {city.deliveryNote}
                </div>
              </div>
              <div className="flex gap-4">
                <Link to="/contacts" className="btn-primary px-6 py-3 rounded font-oswald text-sm tracking-widest"
                  style={{ background: "hsl(var(--primary))", color: "white" }}>
                  Оставить заявку
                </Link>
                <a href={`tel:${city.phone}`} className="flex items-center gap-2 px-6 py-3 rounded border font-oswald text-sm text-white hover:bg-white/10 transition-colors"
                  style={{ borderColor: "rgba(255,255,255,0.2)" }}>
                  <Icon name="Phone" size={15} />
                  Позвонить
                </a>
              </div>
            </div>

            {/* Info card */}
            <div className="rounded border p-6" style={{ background: "var(--brand-steel)", borderColor: "rgba(255,255,255,0.08)" }}>
              <h3 className="font-oswald text-white text-xl mb-5">О ПОСТАВКАХ В {city.name.toUpperCase()}</h3>
              <div className="space-y-4">
                <div className="flex items-start gap-3">
                  <div className="w-8 h-8 rounded flex items-center justify-center shrink-0 mt-0.5" style={{ background: "rgba(26, 143, 181, 0.12)" }}>
                    <Icon name="Warehouse" size={16} style={{ color: "hsl(var(--primary))" }} />
                  </div>
                  <div>
                    <div className="text-xs uppercase tracking-wider mb-0.5 font-medium" style={{ color: "var(--brand-muted)" }}>Адрес склада</div>
                    <div className="text-sm text-white">{city.warehouse}</div>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <div className="w-8 h-8 rounded flex items-center justify-center shrink-0 mt-0.5" style={{ background: "rgba(26, 143, 181, 0.12)" }}>
                    <Icon name="Clock" size={16} style={{ color: "hsl(var(--primary))" }} />
                  </div>
                  <div>
                    <div className="text-xs uppercase tracking-wider mb-0.5 font-medium" style={{ color: "var(--brand-muted)" }}>Срок доставки</div>
                    <div className="text-sm text-white">{city.deliveryTime} с момента подтверждения заказа</div>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <div className="w-8 h-8 rounded flex items-center justify-center shrink-0 mt-0.5" style={{ background: "rgba(26, 143, 181, 0.12)" }}>
                    <Icon name="User" size={16} style={{ color: "hsl(var(--primary))" }} />
                  </div>
                  <div>
                    <div className="text-xs uppercase tracking-wider mb-0.5 font-medium" style={{ color: "var(--brand-muted)" }}>Региональный менеджер</div>
                    <div className="text-sm text-white">{city.manager}</div>
                    <a href={`tel:${city.phone}`} className="text-sm hover:text-white transition-colors" style={{ color: "hsl(var(--primary))" }}>
                      {city.phone}
                    </a>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <div className="w-8 h-8 rounded flex items-center justify-center shrink-0 mt-0.5" style={{ background: "rgba(26, 143, 181, 0.12)" }}>
                    <Icon name="Truck" size={16} style={{ color: "hsl(var(--primary))" }} />
                  </div>
                  <div>
                    <div className="text-xs uppercase tracking-wider mb-0.5 font-medium" style={{ color: "var(--brand-muted)" }}>Условия доставки</div>
                    <div className="text-sm text-white">{city.deliveryNote}</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Delivery by districts */}
      <section className="py-16" style={{ background: "var(--brand-navy)" }}>
        <div className="container mx-auto px-4">
          <h2 className="font-oswald text-2xl md:text-3xl text-white mb-8">
            СРОКИ ДОСТАВКИ ПО РАЙОНАМ {city.name.toUpperCase()}А
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {city.districts.map((d, i) => (
              <div key={i} className="flex items-center justify-between p-4 rounded border"
                style={{ background: "var(--brand-steel)", borderColor: "rgba(255,255,255,0.08)" }}>
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 rounded flex items-center justify-center shrink-0" style={{ background: "rgba(26, 143, 181, 0.12)" }}>
                    <Icon name="MapPin" size={14} style={{ color: "hsl(var(--primary))" }} />
                  </div>
                  <div className="font-medium text-sm text-white">{d.name}</div>
                </div>
                <div className="text-right">
                  <div className="text-sm font-medium text-white">{d.time}</div>
                  <div className="text-xs" style={{ color: "var(--brand-muted)" }}>{d.cost}</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Products with local prices */}
      <section className="py-16 bg-brand-pattern">
        <div className="container mx-auto px-4">
          <h2 className="font-oswald text-2xl md:text-3xl text-white mb-2">
            ЦЕНЫ НА МАТЕРИАЛЫ В {city.name.toUpperCase()}
          </h2>
          <p className="text-sm mb-8" style={{ color: "var(--brand-muted)" }}>
            Актуальные цены с учётом логистики в {city.nameRod}. Цены могут меняться — уточняйте у менеджера.
          </p>
          <div className="overflow-x-auto rounded border" style={{ borderColor: "rgba(255,255,255,0.08)" }}>
            <table className="w-full text-sm">
              <thead>
                <tr style={{ background: "var(--brand-steel)" }}>
                  <th className="text-left px-4 py-3 font-oswald font-medium text-white tracking-wider">Материал</th>
                  <th className="text-left px-4 py-3 font-oswald font-medium text-white tracking-wider hidden md:table-cell">Фракции</th>
                  <th className="text-left px-4 py-3 font-oswald font-medium text-white tracking-wider">Цена (руб./т)</th>
                  <th className="px-4 py-3"></th>
                </tr>
              </thead>
              <tbody>
                {products.map((p, i) => (
                  <tr key={p.id} className="border-t transition-colors hover:bg-white/3"
                    style={{ borderColor: "rgba(255,255,255,0.06)", background: i % 2 === 0 ? "transparent" : "rgba(255,255,255,0.02)" }}>
                    <td className="px-4 py-3 text-white font-medium">{p.name}</td>
                    <td className="px-4 py-3 hidden md:table-cell" style={{ color: "var(--brand-muted)" }}>
                      {p.fractions.slice(0, 3).join(", ")}{p.fractions.length > 3 ? "..." : ""}
                    </td>
                    <td className="px-4 py-3">
                      <span className="font-oswald text-white">
                        от {Math.round(p.basePrice + (city.pricePerTon - 14500) * 0.3).toLocaleString()}
                      </span>
                    </td>
                    <td className="px-4 py-3">
                      <Link to="/contacts" className="text-xs px-3 py-1.5 rounded font-oswald tracking-wider"
                        style={{ background: "hsl(var(--primary))", color: "white" }}>
                        Запрос
                      </Link>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </section>

      {/* Reviews */}
      {city.reviews.length > 0 && (
        <section className="py-16" style={{ background: "var(--brand-navy)" }}>
          <div className="container mx-auto px-4">
            <h2 className="font-oswald text-2xl md:text-3xl text-white mb-8">
              ОТЗЫВЫ КЛИЕНТОВ ИЗ {city.name.toUpperCase()}А
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {city.reviews.map((review, i) => (
                <div key={i} className="rounded border p-6" style={{ background: "var(--brand-steel)", borderColor: "rgba(255,255,255,0.08)" }}>
                  <div className="flex items-center gap-1 mb-3">
                    {Array.from({ length: review.rating }).map((_, j) => (
                      <Icon key={j} name="Star" size={14} className="text-yellow-400" />
                    ))}
                  </div>
                  <p className="text-sm leading-relaxed mb-4 italic" style={{ color: "hsl(var(--foreground))" }}>
                    «{review.text}»
                  </p>
                  <div className="flex items-center justify-between">
                    <div>
                      <div className="text-sm font-medium text-white">{review.author}</div>
                      <div className="text-xs" style={{ color: "var(--brand-muted)" }}>{review.company}</div>
                    </div>
                    <div className="text-xs" style={{ color: "var(--brand-muted)" }}>
                      {new Date(review.date).toLocaleDateString("ru-RU", { month: "long", year: "numeric" })}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Map placeholder */}
      <section className="py-16 bg-brand-pattern">
        <div className="container mx-auto px-4">
          <h2 className="font-oswald text-2xl md:text-3xl text-white mb-6">
            СКЛАД И САМОВЫВОЗ В {city.name.toUpperCase()}
          </h2>
          <div className="grid lg:grid-cols-3 gap-6">
            <div className="lg:col-span-2 rounded border overflow-hidden" style={{ borderColor: "rgba(255,255,255,0.08)", minHeight: 300 }}>
              <iframe
                title={`Склад в ${city.name}`}
                src={`https://maps.google.com/maps?q=${city.lat},${city.lng}&z=14&output=embed`}
                width="100%"
                height="300"
                style={{ border: 0, filter: "invert(90%) hue-rotate(180deg)" }}
                loading="lazy"
              />
            </div>
            <div className="rounded border p-6" style={{ background: "var(--brand-steel)", borderColor: "rgba(255,255,255,0.08)" }}>
              <h3 className="font-oswald text-white text-lg mb-4">КОНТАКТЫ В {city.name.toUpperCase()}</h3>
              <div className="space-y-4 text-sm">
                <div className="flex items-start gap-3">
                  <Icon name="MapPin" size={15} className="mt-0.5 shrink-0" style={{ color: "hsl(var(--primary))" }} />
                  <div>
                    <div className="text-xs uppercase tracking-wider mb-1" style={{ color: "var(--brand-muted)" }}>Адрес</div>
                    <div className="text-white">{city.warehouse}</div>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <Icon name="User" size={15} className="mt-0.5 shrink-0" style={{ color: "hsl(var(--primary))" }} />
                  <div>
                    <div className="text-xs uppercase tracking-wider mb-1" style={{ color: "var(--brand-muted)" }}>Менеджер</div>
                    <div className="text-white">{city.manager}</div>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <Icon name="Phone" size={15} className="mt-0.5 shrink-0" style={{ color: "hsl(var(--primary))" }} />
                  <div>
                    <div className="text-xs uppercase tracking-wider mb-1" style={{ color: "var(--brand-muted)" }}>Телефон</div>
                    <a href={`tel:${city.phone}`} className="text-white hover:text-blue-400 transition-colors">{city.phone}</a>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <Icon name="Clock" size={15} className="mt-0.5 shrink-0" style={{ color: "hsl(var(--primary))" }} />
                  <div>
                    <div className="text-xs uppercase tracking-wider mb-1" style={{ color: "var(--brand-muted)" }}>Режим работы</div>
                    <div className="text-white">Пн–Пт: 8:00–18:00</div>
                    <div className="text-white">Сб: 9:00–14:00</div>
                  </div>
                </div>
              </div>
              <Link to="/contacts"
                className="mt-6 w-full flex items-center justify-center gap-2 py-3 rounded font-oswald text-sm tracking-widest"
                style={{ background: "hsl(var(--primary))", color: "white" }}>
                <Icon name="MessageSquare" size={15} />
                Написать менеджеру
              </Link>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
