import { Link } from "react-router-dom";
import Icon from "@/components/ui/icon";

export default function AboutPage() {
  const timeline = [
    { year: "2008", text: "Основание компании. Первый склад в Москве, поставки кварцевого песка по Московской области." },
    { year: "2012", text: "Открытие производственной линии электрокорунда. Запуск склада в Санкт-Петербурге." },
    { year: "2015", text: "Расширение ассортимента: карбид кремния, цеолиты, стеклянные шарики. Склад в Екатеринбурге." },
    { year: "2019", text: "Сертификация по ISO 9001:2015. Более 1000 активных клиентов по России." },
    { year: "2022", text: "Открытие складов в Новосибирске и Казани. Автопарк собственной логистики — 24 машины." },
    { year: "2024", text: "2 400+ клиентов. Годовой объём поставок — свыше 85 000 тонн материалов." },
  ];

  return (
    <section className="min-h-screen py-16 bg-brand-pattern">
      <div className="container mx-auto px-4">
        <div className="flex items-center gap-2 text-sm mb-8" style={{ color: "var(--brand-muted)" }}>
          <Link to="/" className="hover:text-white transition-colors flex items-center gap-1">
            <Icon name="Home" size={13} />Главная
          </Link>
          <span>/</span>
          <span className="text-white">О компании</span>
        </div>

        <div className="text-xs font-oswald tracking-widest text-blue-400 mb-3 uppercase">Кто мы</div>
        <h1 className="font-oswald text-4xl text-white mb-6">О КОМПАНИИ</h1>

        <div className="grid lg:grid-cols-2 gap-12 mb-16">
          <div>
            <p className="text-gray-300 leading-relaxed mb-4">
              <strong className="text-white">ООО «Абразив Опт»</strong> — российский производитель и поставщик абразивных
              материалов и промышленных сыпучих для B2B рынка с 2008 года. Работаем напрямую с промышленными
              предприятиями, строительными компаниями и научными организациями по всей России.
            </p>
            <p className="text-gray-300 leading-relaxed mb-4">
              Собственное производство позволяет контролировать качество на каждом этапе — от добычи сырья
              до фасовки и отгрузки. Все партии проходят лабораторный контроль и сопровождаются полным
              комплектом документации.
            </p>
            <p className="text-gray-300 leading-relaxed">
              Региональная сеть складов в 5 городах обеспечивает доставку в течение 24–72 часов
              для большинства регионов России.
            </p>
          </div>
          <div className="grid grid-cols-2 gap-4">
            {[
              { value: "16+", label: "лет работы" },
              { value: "2 400+", label: "клиентов" },
              { value: "85 000 т", label: "поставок в год" },
              { value: "5", label: "городов присутствия" },
            ].map(stat => (
              <div key={stat.label} className="rounded border p-5 text-center"
                style={{ background: "var(--brand-steel)", borderColor: "rgba(255,255,255,0.08)" }}>
                <div className="font-oswald text-3xl mb-1" style={{ color: "hsl(var(--primary))" }}>{stat.value}</div>
                <div className="text-sm" style={{ color: "var(--brand-muted)" }}>{stat.label}</div>
              </div>
            ))}
          </div>
        </div>

        {/* Timeline */}
        <h2 className="font-oswald text-2xl text-white mb-8">ИСТОРИЯ КОМПАНИИ</h2>
        <div className="relative">
          <div className="absolute left-16 top-0 bottom-0 w-px" style={{ background: "rgba(255,255,255,0.08)" }} />
          <div className="space-y-6">
            {timeline.map((item, i) => (
              <div key={i} className="flex gap-8 items-start">
                <div className="w-14 text-right">
                  <span className="font-oswald text-sm" style={{ color: "hsl(var(--primary))" }}>{item.year}</span>
                </div>
                <div className="relative flex-1 pb-2">
                  <div className="absolute -left-4 top-1.5 w-2 h-2 rounded-full" style={{ background: "hsl(var(--primary))" }} />
                  <p className="text-sm text-gray-300 leading-relaxed pl-2">{item.text}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Certificates */}
        <div className="mt-16 rounded border p-8" style={{ background: "var(--brand-steel)", borderColor: "rgba(255,255,255,0.08)" }}>
          <h2 className="font-oswald text-2xl text-white mb-6">СЕРТИФИКАТЫ И ДОКУМЕНТЫ</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {[
              { icon: "Award", title: "ISO 9001:2015", text: "Система менеджмента качества" },
              { icon: "Shield", title: "ГОСТ соответствие", text: "Все продукты соответствуют ГОСТ РФ" },
              { icon: "FileCheck", title: "Паспорта качества", text: "На каждую партию — полная документация" },
            ].map((cert, i) => (
              <div key={i} className="flex items-start gap-3 p-4 rounded" style={{ background: "rgba(26, 143, 181, 0.06)" }}>
                <Icon name={cert.icon} fallback="Award" size={20} style={{ color: "hsl(var(--primary))" }} className="mt-0.5 shrink-0" />
                <div>
                  <div className="font-oswald text-white">{cert.title}</div>
                  <div className="text-xs" style={{ color: "var(--brand-muted)" }}>{cert.text}</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
