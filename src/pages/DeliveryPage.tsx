import { Link } from "react-router-dom";
import Icon from "@/components/ui/icon";
import { cities } from "@/data/cities";

export default function DeliveryPage() {
  const steps = [
    { icon: "Phone", title: "Заявка", text: "Оставьте заявку на сайте или позвоните. Менеджер уточнит материал, фракцию, объём и адрес." },
    { icon: "FileText", title: "КП и договор", text: "В течение 2 часов получите коммерческое предложение. Подписываем договор поставки." },
    { icon: "Package", title: "Подготовка груза", text: "Фасуем по биг-бэгам или мешкам, оформляем документацию: паспорт качества, сертификат, ТН." },
    { icon: "Truck", title: "Доставка", text: "Отгрузка собственным автопарком или партнёрской ТК. Трекинг груза онлайн." },
  ];

  return (
    <section className="min-h-screen py-16 bg-brand-pattern">
      <div className="container mx-auto px-4">
        <div className="flex items-center gap-2 text-sm mb-8" style={{ color: "var(--brand-muted)" }}>
          <Link to="/" className="hover:text-white transition-colors flex items-center gap-1">
            <Icon name="Home" size={13} />Главная
          </Link>
          <span>/</span>
          <span className="text-white">Доставка</span>
        </div>

        <div className="text-xs font-oswald tracking-widest text-blue-400 mb-3 uppercase">Логистика</div>
        <h1 className="font-oswald text-4xl text-white mb-10">УСЛОВИЯ ДОСТАВКИ</h1>

        {/* Steps */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-16">
          {steps.map((step, i) => (
            <div key={i} className="relative">
              <div className="rounded border p-5" style={{ background: "var(--brand-steel)", borderColor: "rgba(255,255,255,0.08)" }}>
                <div className="flex items-center gap-3 mb-3">
                  <div className="w-10 h-10 rounded flex items-center justify-center" style={{ background: "rgba(26, 143, 181, 0.12)" }}>
                    <Icon name={step.icon} fallback="Circle" size={20} style={{ color: "hsl(var(--primary))" }} />
                  </div>
                  <div className="font-oswald text-3xl font-bold" style={{ color: "rgba(255,255,255,0.1)" }}>0{i + 1}</div>
                </div>
                <h3 className="font-oswald text-white text-lg mb-2">{step.title}</h3>
                <p className="text-sm" style={{ color: "var(--brand-muted)" }}>{step.text}</p>
              </div>
            </div>
          ))}
        </div>

        {/* Delivery by cities */}
        <h2 className="font-oswald text-2xl text-white mb-6">СРОКИ И СТОИМОСТЬ ПО ГОРОДАМ</h2>
        <div className="rounded border overflow-hidden mb-12" style={{ borderColor: "rgba(255,255,255,0.08)" }}>
          <table className="w-full text-sm">
            <thead>
              <tr style={{ background: "var(--brand-steel)" }}>
                <th className="text-left px-5 py-3 font-oswald font-medium text-white tracking-wider">Город</th>
                <th className="text-left px-5 py-3 font-oswald font-medium text-white tracking-wider hidden md:table-cell">Склад</th>
                <th className="text-left px-5 py-3 font-oswald font-medium text-white tracking-wider">Срок</th>
                <th className="text-left px-5 py-3 font-oswald font-medium text-white tracking-wider">Цена от</th>
                <th className="px-5 py-3"></th>
              </tr>
            </thead>
            <tbody>
              {cities.map((c, i) => (
                <tr key={c.id} className="border-t transition-colors hover:bg-white/3"
                  style={{ borderColor: "rgba(255,255,255,0.06)", background: i % 2 === 0 ? "transparent" : "rgba(255,255,255,0.02)" }}>
                  <td className="px-5 py-3">
                    <div className="font-medium text-white">{c.name}</div>
                    <div className="text-xs" style={{ color: "var(--brand-muted)" }}>{c.region}</div>
                  </td>
                  <td className="px-5 py-3 hidden md:table-cell text-xs" style={{ color: "var(--brand-muted)" }}>{c.district}</td>
                  <td className="px-5 py-3 text-white">{c.deliveryTime}</td>
                  <td className="px-5 py-3">
                    <span className="font-oswald text-white">{c.pricePerTon.toLocaleString()}</span>
                    <span className="text-xs ml-1" style={{ color: "var(--brand-muted)" }}>руб./т</span>
                  </td>
                  <td className="px-5 py-3">
                    <Link to={`/city/${c.slug}`} className="text-xs px-3 py-1.5 rounded font-oswald"
                      style={{ background: "rgba(26, 143, 181, 0.12)", color: "hsl(var(--primary))" }}>
                      Подробнее
                    </Link>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Notes */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {[
            { icon: "Package", title: "Бесплатная доставка", text: "При заказе от 5 тонн доставка по городу — за наш счёт" },
            { icon: "FileText", title: "Полная документация", text: "Паспорт качества, сертификаты соответствия, накладные" },
            { icon: "RefreshCw", title: "Регулярные поставки", text: "Долгосрочные договоры с фиксированным графиком отгрузок" },
          ].map((item, i) => (
            <div key={i} className="rounded border p-5 flex items-start gap-4"
              style={{ background: "var(--brand-steel)", borderColor: "rgba(255,255,255,0.08)" }}>
              <div className="w-10 h-10 rounded flex items-center justify-center shrink-0" style={{ background: "rgba(26, 143, 181, 0.12)" }}>
                <Icon name={item.icon} fallback="Info" size={20} style={{ color: "hsl(var(--primary))" }} />
              </div>
              <div>
                <h3 className="font-oswald text-white mb-1">{item.title}</h3>
                <p className="text-sm" style={{ color: "var(--brand-muted)" }}>{item.text}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
