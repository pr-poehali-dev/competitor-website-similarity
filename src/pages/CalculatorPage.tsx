import { useState } from "react";
import { Link } from "react-router-dom";
import Icon from "@/components/ui/icon";
import { cities, products } from "@/data/cities";

export default function CalculatorPage() {
  const [citySlug, setCitySlug] = useState("moskva");
  const [productId, setProductId] = useState(1);
  const [weight, setWeight] = useState(5);
  const [calculated, setCalculated] = useState(false);

  const city = cities.find(c => c.slug === citySlug) || cities[0];
  const product = products.find(p => p.id === productId) || products[0];

  const distanceMultiplier: Record<string, number> = {
    moskva: 1.0,
    spb: 1.05,
    ekaterinburg: 1.15,
    novosibirsk: 1.21,
    kazan: 1.10,
  };

  const mult = distanceMultiplier[citySlug] || 1.0;
  const productPrice = Math.round(product.basePrice * mult);
  const subtotal = productPrice * weight;
  const deliveryPrice = weight >= 5 ? 0 : Math.round(3500 * mult);
  const total = subtotal + deliveryPrice;

  return (
    <section className="min-h-screen py-16 bg-brand-pattern">
      <div className="container mx-auto px-4 max-w-3xl">
        {/* Breadcrumb */}
        <div className="flex items-center gap-2 text-sm mb-8" style={{ color: "var(--brand-muted)" }}>
          <Link to="/" className="hover:text-white transition-colors flex items-center gap-1">
            <Icon name="Home" size={13} />Главная
          </Link>
          <span>/</span>
          <span className="text-white">Калькулятор доставки</span>
        </div>

        <div className="text-xs font-oswald tracking-widest text-blue-400 mb-3 uppercase">Расчёт стоимости</div>
        <h1 className="font-oswald text-4xl text-white mb-2">КАЛЬКУЛЯТОР ДОСТАВКИ</h1>
        <p className="text-sm mb-10" style={{ color: "var(--brand-muted)" }}>
          Рассчитайте ориентировочную стоимость материала с доставкой в ваш город
        </p>

        <div className="rounded border p-8" style={{ background: "var(--brand-steel)", borderColor: "rgba(255,255,255,0.08)" }}>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
            {/* City */}
            <div>
              <label className="block text-xs uppercase tracking-wider font-medium mb-2" style={{ color: "var(--brand-muted)" }}>
                Город доставки
              </label>
              <select
                value={citySlug}
                onChange={e => { setCitySlug(e.target.value); setCalculated(false); }}
                className="w-full px-4 py-3 rounded text-white text-sm focus:outline-none focus:ring-1"
                style={{ background: "var(--brand-navy)", border: "1px solid rgba(255,255,255,0.12)", color: "white", accentColor: "hsl(var(--primary))" }}
              >
                {cities.map(c => (
                  <option key={c.id} value={c.slug} style={{ background: "#1a2535" }}>{c.name}</option>
                ))}
              </select>
            </div>

            {/* Product */}
            <div>
              <label className="block text-xs uppercase tracking-wider font-medium mb-2" style={{ color: "var(--brand-muted)" }}>
                Материал
              </label>
              <select
                value={productId}
                onChange={e => { setProductId(Number(e.target.value)); setCalculated(false); }}
                className="w-full px-4 py-3 rounded text-white text-sm focus:outline-none focus:ring-1"
                style={{ background: "var(--brand-navy)", border: "1px solid rgba(255,255,255,0.12)", color: "white" }}
              >
                {products.map(p => (
                  <option key={p.id} value={p.id} style={{ background: "#1a2535" }}>{p.name}</option>
                ))}
              </select>
            </div>

            {/* Weight */}
            <div className="md:col-span-2">
              <label className="block text-xs uppercase tracking-wider font-medium mb-2" style={{ color: "var(--brand-muted)" }}>
                Объём: <span className="text-white">{weight} тонн</span>
              </label>
              <input
                type="range"
                min={1}
                max={50}
                value={weight}
                onChange={e => { setWeight(Number(e.target.value)); setCalculated(false); }}
                className="w-full h-2 rounded appearance-none cursor-pointer"
                style={{ accentColor: "hsl(var(--primary))", background: "rgba(255,255,255,0.1)" }}
              />
              <div className="flex justify-between text-xs mt-1" style={{ color: "var(--brand-muted)" }}>
                <span>1 т</span>
                <span>25 т</span>
                <span>50 т</span>
              </div>
              {weight >= 5 && (
                <div className="mt-2 text-xs flex items-center gap-1.5" style={{ color: "hsl(var(--accent))" }}>
                  <Icon name="CheckCircle" size={12} />
                  Бесплатная доставка при заказе от 5 т
                </div>
              )}
            </div>
          </div>

          <button
            onClick={() => setCalculated(true)}
            className="w-full py-4 rounded font-oswald tracking-widest text-sm transition-all hover:opacity-90 flex items-center justify-center gap-2"
            style={{ background: "hsl(var(--primary))", color: "white" }}
          >
            <Icon name="Calculator" size={18} />
            Рассчитать стоимость
          </button>
        </div>

        {/* Result */}
        {calculated && (
          <div className="mt-6 rounded border p-8 animate-fade-in" style={{ background: "var(--brand-steel)", borderColor: "rgba(26, 143, 181, 0.3)" }}>
            <h3 className="font-oswald text-white text-xl mb-6">РЕЗУЛЬТАТ РАСЧЁТА</h3>
            <div className="space-y-3 mb-6">
              <div className="flex justify-between text-sm">
                <span style={{ color: "var(--brand-muted)" }}>Материал: {product.name}</span>
                <span className="text-white">{productPrice.toLocaleString()} руб./т</span>
              </div>
              <div className="flex justify-between text-sm">
                <span style={{ color: "var(--brand-muted)" }}>Объём: {weight} т</span>
                <span className="text-white">{subtotal.toLocaleString()} руб.</span>
              </div>
              <div className="flex justify-between text-sm">
                <span style={{ color: "var(--brand-muted)" }}>Доставка в {city.name}</span>
                <span className={weight >= 5 ? "text-green-400" : "text-white"}>
                  {weight >= 5 ? "Бесплатно" : `${deliveryPrice.toLocaleString()} руб.`}
                </span>
              </div>
              <div className="flex justify-between border-t pt-3 font-oswald text-lg" style={{ borderColor: "rgba(255,255,255,0.1)" }}>
                <span className="text-white">Итого (ориентировочно)</span>
                <span style={{ color: "hsl(var(--primary))" }}>{total.toLocaleString()} руб.</span>
              </div>
            </div>
            <p className="text-xs mb-6" style={{ color: "var(--brand-muted)" }}>
              * Расчёт ориентировочный. Точная стоимость зависит от адреса доставки, фракции и формы оплаты.
              Менеджер {city.manager} уточнит цену в течение 2 часов.
            </p>
            <div className="flex flex-col sm:flex-row gap-3">
              <Link to="/contacts"
                className="flex-1 py-3 rounded font-oswald text-sm tracking-widest text-center"
                style={{ background: "hsl(var(--primary))", color: "white" }}>
                Оформить заказ
              </Link>
              <a href={`tel:${city.phone}`}
                className="flex-1 py-3 rounded font-oswald text-sm tracking-widest text-center border hover:bg-white/10 transition-colors"
                style={{ borderColor: "rgba(255,255,255,0.2)", color: "white" }}>
                {city.phone}
              </a>
            </div>
          </div>
        )}
      </div>
    </section>
  );
}
