import { useState } from "react";
import { Link } from "react-router-dom";
import Icon from "@/components/ui/icon";
import { cities } from "@/data/cities";

interface ContactsPageProps {
  currentCity: string;
}

export default function ContactsPage({ currentCity }: ContactsPageProps) {
  const city = cities.find(c => c.slug === currentCity) || cities[0];
  const [form, setForm] = useState({ name: "", company: "", phone: "", email: "", message: "", city: city.name });
  const [sent, setSent] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSent(true);
  };

  return (
    <section className="min-h-screen py-16 bg-brand-pattern">
      <div className="container mx-auto px-4">
        <div className="flex items-center gap-2 text-sm mb-8" style={{ color: "var(--brand-muted)" }}>
          <Link to="/" className="hover:text-white transition-colors flex items-center gap-1">
            <Icon name="Home" size={13} />Главная
          </Link>
          <span>/</span>
          <span className="text-white">Контакты</span>
        </div>

        <div className="text-xs font-oswald tracking-widest text-blue-400 mb-3 uppercase">Связаться с нами</div>
        <h1 className="font-oswald text-4xl text-white mb-10">КОНТАКТЫ</h1>

        <div className="grid lg:grid-cols-2 gap-10">
          {/* Form */}
          <div className="rounded border p-8" style={{ background: "var(--brand-steel)", borderColor: "rgba(255,255,255,0.08)" }}>
            {sent ? (
              <div className="text-center py-12">
                <div className="w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4" style={{ background: "rgba(26, 143, 181, 0.15)" }}>
                  <Icon name="CheckCircle" size={32} style={{ color: "hsl(var(--primary))" }} />
                </div>
                <h3 className="font-oswald text-white text-2xl mb-3">ЗАЯВКА ОТПРАВЛЕНА</h3>
                <p className="text-sm" style={{ color: "var(--brand-muted)" }}>
                  Менеджер {city.manager} свяжется с вами в течение 2 часов
                </p>
              </div>
            ) : (
              <>
                <h3 className="font-oswald text-white text-xl mb-6">ОСТАВИТЬ ЗАЯВКУ</h3>
                <form onSubmit={handleSubmit} className="space-y-4">
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs uppercase tracking-wider mb-1.5" style={{ color: "var(--brand-muted)" }}>Имя *</label>
                      <input
                        required
                        value={form.name}
                        onChange={e => setForm({ ...form, name: e.target.value })}
                        placeholder="Иван Иванов"
                        className="w-full px-3 py-2.5 rounded text-sm text-white focus:outline-none focus:ring-1 focus:ring-blue-500"
                        style={{ background: "var(--brand-navy)", border: "1px solid rgba(255,255,255,0.12)" }}
                      />
                    </div>
                    <div>
                      <label className="block text-xs uppercase tracking-wider mb-1.5" style={{ color: "var(--brand-muted)" }}>Компания</label>
                      <input
                        value={form.company}
                        onChange={e => setForm({ ...form, company: e.target.value })}
                        placeholder="ООО «Компания»"
                        className="w-full px-3 py-2.5 rounded text-sm text-white focus:outline-none focus:ring-1 focus:ring-blue-500"
                        style={{ background: "var(--brand-navy)", border: "1px solid rgba(255,255,255,0.12)" }}
                      />
                    </div>
                  </div>
                  <div>
                    <label className="block text-xs uppercase tracking-wider mb-1.5" style={{ color: "var(--brand-muted)" }}>Телефон *</label>
                    <input
                      required
                      type="tel"
                      value={form.phone}
                      onChange={e => setForm({ ...form, phone: e.target.value })}
                      placeholder="+7 (___) ___-__-__"
                      className="w-full px-3 py-2.5 rounded text-sm text-white focus:outline-none focus:ring-1 focus:ring-blue-500"
                      style={{ background: "var(--brand-navy)", border: "1px solid rgba(255,255,255,0.12)" }}
                    />
                  </div>
                  <div>
                    <label className="block text-xs uppercase tracking-wider mb-1.5" style={{ color: "var(--brand-muted)" }}>Email</label>
                    <input
                      type="email"
                      value={form.email}
                      onChange={e => setForm({ ...form, email: e.target.value })}
                      placeholder="mail@company.ru"
                      className="w-full px-3 py-2.5 rounded text-sm text-white focus:outline-none focus:ring-1 focus:ring-blue-500"
                      style={{ background: "var(--brand-navy)", border: "1px solid rgba(255,255,255,0.12)" }}
                    />
                  </div>
                  <div>
                    <label className="block text-xs uppercase tracking-wider mb-1.5" style={{ color: "var(--brand-muted)" }}>Город доставки</label>
                    <select
                      value={form.city}
                      onChange={e => setForm({ ...form, city: e.target.value })}
                      className="w-full px-3 py-2.5 rounded text-sm text-white focus:outline-none focus:ring-1 focus:ring-blue-500"
                      style={{ background: "var(--brand-navy)", border: "1px solid rgba(255,255,255,0.12)" }}
                    >
                      {cities.map(c => (
                        <option key={c.id} value={c.name} style={{ background: "#1a2535" }}>{c.name}</option>
                      ))}
                    </select>
                  </div>
                  <div>
                    <label className="block text-xs uppercase tracking-wider mb-1.5" style={{ color: "var(--brand-muted)" }}>Сообщение</label>
                    <textarea
                      rows={4}
                      value={form.message}
                      onChange={e => setForm({ ...form, message: e.target.value })}
                      placeholder="Укажите нужный материал, фракцию и объём"
                      className="w-full px-3 py-2.5 rounded text-sm text-white focus:outline-none focus:ring-1 focus:ring-blue-500 resize-none"
                      style={{ background: "var(--brand-navy)", border: "1px solid rgba(255,255,255,0.12)" }}
                    />
                  </div>
                  <button
                    type="submit"
                    className="w-full py-3.5 rounded font-oswald tracking-widest text-sm"
                    style={{ background: "hsl(var(--primary))", color: "white" }}
                  >
                    Отправить заявку
                  </button>
                  <p className="text-xs" style={{ color: "var(--brand-muted)" }}>
                    Нажимая кнопку, вы соглашаетесь с политикой конфиденциальности
                  </p>
                </form>
              </>
            )}
          </div>

          {/* Contacts info */}
          <div className="space-y-6">
            <div className="rounded border p-6" style={{ background: "var(--brand-steel)", borderColor: "rgba(255,255,255,0.08)" }}>
              <h3 className="font-oswald text-white text-lg mb-5">ОФИС В {city.name.toUpperCase()}</h3>
              <div className="space-y-4 text-sm">
                <div className="flex items-start gap-3">
                  <Icon name="MapPin" size={16} className="mt-0.5 shrink-0" style={{ color: "hsl(var(--primary))" }} />
                  <div>
                    <div className="text-xs mb-0.5 uppercase tracking-wider" style={{ color: "var(--brand-muted)" }}>Адрес склада</div>
                    <div className="text-white">{city.warehouse}</div>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <Icon name="User" size={16} className="mt-0.5 shrink-0" style={{ color: "hsl(var(--primary))" }} />
                  <div>
                    <div className="text-xs mb-0.5 uppercase tracking-wider" style={{ color: "var(--brand-muted)" }}>Менеджер</div>
                    <div className="text-white">{city.manager}</div>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <Icon name="Phone" size={16} className="mt-0.5 shrink-0" style={{ color: "hsl(var(--primary))" }} />
                  <div>
                    <div className="text-xs mb-0.5 uppercase tracking-wider" style={{ color: "var(--brand-muted)" }}>Телефон</div>
                    <a href={`tel:${city.phone}`} className="text-white hover:text-blue-400 transition-colors font-medium">{city.phone}</a>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <Icon name="Mail" size={16} className="mt-0.5 shrink-0" style={{ color: "hsl(var(--primary))" }} />
                  <div>
                    <div className="text-xs mb-0.5 uppercase tracking-wider" style={{ color: "var(--brand-muted)" }}>Email</div>
                    <a href="mailto:info@abraziv-opt.ru" className="text-white hover:text-blue-400 transition-colors">info@abraziv-opt.ru</a>
                  </div>
                </div>
              </div>
            </div>

            {/* All cities */}
            <div className="rounded border p-6" style={{ background: "var(--brand-steel)", borderColor: "rgba(255,255,255,0.08)" }}>
              <h3 className="font-oswald text-white text-lg mb-4">ВСЕ ОФИСЫ</h3>
              <div className="space-y-3">
                {cities.map(c => (
                  <Link key={c.id} to={`/city/${c.slug}`}
                    className="flex items-center justify-between py-2 border-b hover:text-white transition-colors group"
                    style={{ borderColor: "rgba(255,255,255,0.06)" }}>
                    <div>
                      <div className="text-sm font-medium text-white">{c.name}</div>
                      <div className="text-xs" style={{ color: "var(--brand-muted)" }}>{c.manager} · {c.phone}</div>
                    </div>
                    <Icon name="ArrowRight" size={14} className="text-gray-600 group-hover:text-blue-400 transition-colors" />
                  </Link>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
