import { Link } from "react-router-dom";
import Icon from "@/components/ui/icon";
import { cities } from "@/data/cities";

export default function ReviewsPage() {
  const allReviews = cities.flatMap(c =>
    c.reviews.map(r => ({ ...r, city: c.name, citySlug: c.slug }))
  );

  return (
    <section className="min-h-screen py-16 bg-brand-pattern">
      <div className="container mx-auto px-4">
        <div className="flex items-center gap-2 text-sm mb-8" style={{ color: "var(--brand-muted)" }}>
          <Link to="/" className="hover:text-white transition-colors flex items-center gap-1">
            <Icon name="Home" size={13} />Главная
          </Link>
          <span>/</span>
          <span className="text-white">Отзывы</span>
        </div>

        <div className="text-xs font-oswald tracking-widest text-blue-400 mb-3 uppercase">Что говорят клиенты</div>
        <h1 className="font-oswald text-4xl text-white mb-10">ОТЗЫВЫ КЛИЕНТОВ</h1>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-12">
          {allReviews.map((review, i) => (
            <div key={i} className="rounded border p-6" style={{ background: "var(--brand-steel)", borderColor: "rgba(255,255,255,0.08)" }}>
              <div className="flex items-start justify-between mb-3">
                <div className="flex items-center gap-1">
                  {Array.from({ length: review.rating }).map((_, j) => (
                    <Icon key={j} name="Star" size={14} className="text-yellow-400" />
                  ))}
                </div>
                <Link to={`/city/${review.citySlug}`} className="text-xs px-2 py-1 rounded transition-colors hover:text-white"
                  style={{ background: "rgba(26, 143, 181, 0.12)", color: "hsl(var(--primary))" }}>
                  {review.city}
                </Link>
              </div>
              <p className="text-sm leading-relaxed mb-4 italic" style={{ color: "hsl(var(--foreground))" }}>
                «{review.text}»
              </p>
              <div className="flex items-center justify-between border-t pt-3" style={{ borderColor: "rgba(255,255,255,0.07)" }}>
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

        <div className="rounded border p-8 text-center" style={{ background: "var(--brand-steel)", borderColor: "rgba(255,255,255,0.08)" }}>
          <h2 className="font-oswald text-2xl text-white mb-3">ОСТАВЬТЕ ОТЗЫВ</h2>
          <p className="text-sm mb-6" style={{ color: "var(--brand-muted)" }}>
            Работаете с нами? Расскажите о своём опыте сотрудничества
          </p>
          <Link to="/contacts" className="inline-block px-8 py-3.5 rounded font-oswald text-sm tracking-widest"
            style={{ background: "hsl(var(--primary))", color: "white" }}>
            Написать отзыв
          </Link>
        </div>
      </div>
    </section>
  );
}
