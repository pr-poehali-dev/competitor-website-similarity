import { Link } from "react-router-dom";
import Icon from "@/components/ui/icon";

const posts = [
  {
    id: 1,
    title: "Как выбрать фракцию абразивного порошка для пескоструйной обработки",
    excerpt: "Правильный выбор фракции определяет качество обработки и срок службы оборудования. Разбираем ключевые параметры для разных задач.",
    date: "2026-02-10",
    category: "Технологии",
    readTime: "7 мин"
  },
  {
    id: 2,
    title: "Электрокорунд vs карбид кремния: что выбрать для промышленного шлифования",
    excerpt: "Сравниваем два популярных абразивных материала по твёрдости, стоимости и областям применения.",
    date: "2026-01-22",
    category: "Сравнения",
    readTime: "5 мин"
  },
  {
    id: 3,
    title: "Цеолит в водоочистке: нормы применения и дозировки",
    excerpt: "Практическое руководство по использованию природного цеолита в системах фильтрации воды на промышленных объектах.",
    date: "2026-01-08",
    category: "Применение",
    readTime: "9 мин"
  },
  {
    id: 4,
    title: "Транспортировка абразивных материалов: требования и упаковка",
    excerpt: "Какие требования предъявляются к упаковке и хранению кварцевого песка и абразивных порошков при транспортировке.",
    date: "2025-12-15",
    category: "Логистика",
    readTime: "4 мин"
  },
  {
    id: 5,
    title: "ГОСТ на кварцевый песок: что проверять при приёмке партии",
    excerpt: "Полный список параметров контроля качества кварцевого песка по ГОСТ 22551-77. Чеклист для технолога.",
    date: "2025-12-01",
    category: "ГОСТ и стандарты",
    readTime: "6 мин"
  },
  {
    id: 6,
    title: "Стеклянные шарики для дробеструйной обработки: полный гид",
    excerpt: "Особенности применения стеклянных микрошариков, выбор размера, расход и сравнение с другими абразивами.",
    date: "2025-11-20",
    category: "Технологии",
    readTime: "8 мин"
  },
];

export default function BlogPage() {
  return (
    <section className="min-h-screen py-16 bg-brand-pattern">
      <div className="container mx-auto px-4">
        <div className="flex items-center gap-2 text-sm mb-8" style={{ color: "var(--brand-muted)" }}>
          <Link to="/" className="hover:text-white transition-colors flex items-center gap-1">
            <Icon name="Home" size={13} />Главная
          </Link>
          <span>/</span>
          <span className="text-white">Блог</span>
        </div>

        <div className="text-xs font-oswald tracking-widest text-blue-400 mb-3 uppercase">Экспертиза</div>
        <h1 className="font-oswald text-4xl text-white mb-2">БЛОГ</h1>
        <p className="text-sm mb-10" style={{ color: "var(--brand-muted)" }}>
          Технические статьи и практические руководства для специалистов
        </p>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {posts.map(post => (
            <article key={post.id} className="card-hover rounded border overflow-hidden flex flex-col"
              style={{ background: "var(--brand-steel)", borderColor: "rgba(255,255,255,0.08)" }}>
              <div className="p-6 flex-1">
                <div className="flex items-center gap-2 mb-3">
                  <span className="text-xs px-2 py-0.5 rounded" style={{ background: "rgba(26, 143, 181, 0.12)", color: "hsl(var(--primary))" }}>
                    {post.category}
                  </span>
                  <span className="text-xs flex items-center gap-1" style={{ color: "var(--brand-muted)" }}>
                    <Icon name="Clock" size={11} />
                    {post.readTime}
                  </span>
                </div>
                <h2 className="font-oswald text-white text-lg mb-3 leading-snug hover:text-blue-400 transition-colors cursor-pointer">
                  {post.title}
                </h2>
                <p className="text-sm leading-relaxed" style={{ color: "var(--brand-muted)" }}>
                  {post.excerpt}
                </p>
              </div>
              <div className="px-6 py-4 border-t flex items-center justify-between"
                style={{ borderColor: "rgba(255,255,255,0.07)" }}>
                <span className="text-xs" style={{ color: "var(--brand-muted)" }}>
                  {new Date(post.date).toLocaleDateString("ru-RU", { day: "numeric", month: "long", year: "numeric" })}
                </span>
                <button className="text-xs flex items-center gap-1 hover:text-white transition-colors"
                  style={{ color: "hsl(var(--primary))" }}>
                  Читать
                  <Icon name="ArrowRight" size={12} />
                </button>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
