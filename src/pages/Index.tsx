import { useEffect, useRef, useState } from "react";
import Icon from "@/components/ui/icon";

const PHOTO_URL =
  "https://cdn.poehali.dev/files/86a09adc-2681-4546-9826-2e68e6a1091a.png";

const NAV_LINKS = [
  { label: "Главная", href: "#hero" },
  { label: "Опыт", href: "#experience" },
  { label: "Кейсы", href: "#cases" },
  { label: "Контакты", href: "#contacts" },
];

function useInView(threshold = 0.15) {
  const ref = useRef<HTMLDivElement>(null);
  const [inView, setInView] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setInView(true);
          observer.disconnect();
        }
      },
      { threshold }
    );
    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, []);

  return { ref, inView };
}

function Section({
  id,
  children,
  className = "",
  dark = false,
}: {
  id?: string;
  children: React.ReactNode;
  className?: string;
  dark?: boolean;
}) {
  const { ref, inView } = useInView();
  return (
    <section
      id={id}
      className={`section-line py-20 md:py-28 ${dark ? "bg-foreground" : ""} ${className}`}
    >
      <div
        ref={ref}
        className={`max-w-4xl mx-auto px-6 md:px-12 transition-all duration-700 ${
          inView ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6"
        }`}
      >
        {children}
      </div>
    </section>
  );
}

function Label({ children, dark = false }: { children: React.ReactNode; dark?: boolean }) {
  return (
    <p className={`text-xs tracking-[0.2em] uppercase font-['IBM_Plex_Sans'] mb-6 ${dark ? "text-white/50" : "text-muted-foreground"}`}>
      {children}
    </p>
  );
}

function Heading({
  children,
  className = "",
  dark = false,
}: {
  children: React.ReactNode;
  className?: string;
  dark?: boolean;
}) {
  return (
    <h2
      className={`font-['Cormorant'] font-light text-4xl md:text-5xl leading-tight mb-8 ${dark ? "text-background" : "text-foreground"} ${className}`}
    >
      {children}
    </h2>
  );
}

function ListItem({ children, dark = false }: { children: React.ReactNode; dark?: boolean }) {
  return (
    <li className={`flex items-start gap-3 py-3 border-b last:border-0 ${dark ? "border-white/10" : "border-border"}`}>
      <span className={`mt-2 w-1 h-1 rounded-full flex-shrink-0 ${dark ? "bg-white/40" : "bg-muted-foreground"}`} />
      <span className={`text-base leading-relaxed ${dark ? "text-white/70" : "text-foreground/80"}`}>{children}</span>
    </li>
  );
}

export default function Index() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const scrollTo = (href: string) => {
    setMenuOpen(false);
    const el = document.querySelector(href);
    if (el) el.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <div className="min-h-screen bg-background text-foreground">
      {/* NAV */}
      <header
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
          scrolled ? "bg-background/95 backdrop-blur-sm border-b border-border" : ""
        }`}
      >
        <div className="max-w-4xl mx-auto px-6 md:px-12 h-16 flex items-center justify-between">
          <span className="font-['Cormorant'] text-lg font-light tracking-wide">
            А. Кузиков
          </span>
          <nav className="hidden md:flex items-center gap-8">
            {NAV_LINKS.map((l) => (
              <button
                key={l.href}
                onClick={() => scrollTo(l.href)}
                className="nav-link text-sm text-muted-foreground hover:text-foreground transition-colors"
              >
                {l.label}
              </button>
            ))}
          </nav>
          <button
            className="md:hidden text-foreground"
            onClick={() => setMenuOpen(!menuOpen)}
            aria-label="Меню"
          >
            <Icon name={menuOpen ? "X" : "Menu"} size={20} />
          </button>
        </div>
        {menuOpen && (
          <div className="md:hidden bg-background border-b border-border">
            {NAV_LINKS.map((l) => (
              <button
                key={l.href}
                onClick={() => scrollTo(l.href)}
                className="block w-full text-left px-6 py-4 text-sm text-muted-foreground hover:text-foreground border-b border-border last:border-0"
              >
                {l.label}
              </button>
            ))}
          </div>
        )}
      </header>

      {/* HERO */}
      <div id="hero" className="pt-16 section-line">
        <div className="max-w-4xl mx-auto px-6 md:px-12 py-24 md:py-36">
          <div className="flex flex-col md:flex-row md:items-start md:gap-16 gap-10">
            <div className="flex-shrink-0 opacity-0-init animate-fade-in">
              <div className="w-28 h-28 md:w-36 md:h-36 overflow-hidden bg-muted">
                <img
                  src={PHOTO_URL}
                  alt="Александр Кузиков"
                  className="w-full h-full object-cover object-top grayscale"
                />
              </div>
            </div>
            <div className="flex-1">
              <p className="opacity-0-init animate-fade-up delay-100 text-xs tracking-[0.2em] uppercase text-muted-foreground mb-4">
                Александр Кузиков
              </p>
              <h1 className="opacity-0-init animate-fade-up delay-200 font-['Cormorant'] font-light text-4xl md:text-6xl leading-tight text-foreground mb-6">
                Рост выручки через продукт, визуал и продажи
              </h1>
              <p className="opacity-0-init animate-fade-up delay-300 text-base md:text-lg text-muted-foreground leading-relaxed max-w-xl mb-10">
                Если маркетинг не даёт денег — проблема в системе. Я её
                пересобираю: продукт, предложение, продажи и экономика
                начинают работать вместе.
              </p>
              <div className="opacity-0-init animate-fade-up delay-400 flex flex-wrap gap-3">
                <a
                  href="https://t.me/AVKuzikov"
                  target="_blank"
                  rel="noreferrer"
                  className="inline-flex items-center gap-2 px-6 py-3 bg-foreground text-background text-sm hover:opacity-80 transition-opacity"
                >
                  <Icon name="Send" size={15} />
                  Написать в Telegram
                </a>
                <a
                  href="https://www.linkedin.com/in/alexander-kuzikov/"
                  target="_blank"
                  rel="noreferrer"
                  className="inline-flex items-center gap-2 px-6 py-3 border border-border text-foreground text-sm hover:border-foreground transition-colors"
                >
                  <Icon name="Linkedin" size={15} />
                  LinkedIn
                </a>
                <a
                  href="mailto:alexander.kuzikov@mail.ru"
                  className="inline-flex items-center gap-2 px-6 py-3 border border-border text-foreground text-sm hover:border-foreground transition-colors"
                >
                  <Icon name="Mail" size={15} />
                  Email
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* CONTEXT */}
      <Section>
        <div className="grid md:grid-cols-2 gap-12">
          <div>
            <Label>Контекст</Label>
            <Heading>Fashion. Beauty. Retail.</Heading>
          </div>
          <div className="flex flex-col justify-end">
            <p className="text-base text-muted-foreground leading-relaxed mb-4">
              Федеральные и международные бренды: Shopping Live, MODIS, SELA,
              O'STIN, New Yorker, LPP Group, FMSG.
            </p>
            <p className="text-base text-muted-foreground leading-relaxed">
              Форматы: офлайн-ритейл, e-commerce, live и TV commerce.
              Понимаю продукт и спрос через реальный опыт продаж и управления
              ассортиментом.
            </p>
          </div>
        </div>
      </Section>

      {/* PAIN */}
      <Section>
        <Label>Где бизнес теряет деньги</Label>
        <Heading>Знакомые симптомы?</Heading>
        <ul className="mt-2">
          <ListItem>маркетинг работает отдельно от продукта</ListItem>
          <ListItem>ассортимент не соответствует спросу</ListItem>
          <ListItem>много активности, мало результата</ListItem>
          <ListItem>решения принимаются без опоры на экономику</ListItem>
        </ul>
        <p className="mt-8 text-muted-foreground italic font-['Cormorant'] text-2xl">
          Проблема не в каналах — в системе.
        </p>
      </Section>

      {/* USP */}
      <Section>
        <Label>Что я делаю</Label>
        <Heading>Система важнее инструментов.</Heading>
        <ul className="mt-2">
          <ListItem>привожу продукт и предложение в соответствие со спросом</ListItem>
          <ListItem>собираю систему: продукт × маркетинг × продажи</ListItem>
          <ListItem>повышаю оборачиваемость, скорость и конверсию</ListItem>
          <ListItem>перевожу решения в управляемую экономику</ListItem>
        </ul>
      </Section>

      {/* APPROACH */}
      <Section>
        <Label>Подход</Label>
        <Heading>Как работаю</Heading>
        <ul className="mt-2">
          <ListItem>быстро нахожу, где бизнес теряет деньги</ListItem>
          <ListItem>упрощаю и ускоряю процессы</ListItem>
          <ListItem>собираю команды под задачу</ListItem>
          <ListItem>делаю результат устойчивым, а не разовым</ListItem>
        </ul>
      </Section>

      {/* CASE */}
      <Section id="cases">
        <Label>Кейс</Label>
        <Heading>Shopping Live</Heading>
        <p className="text-muted-foreground leading-relaxed mb-10 max-w-xl">
          Пересобрал модель роста: продукт × контент × трафик × аналитика.
          Сделал e-commerce ключевым каналом бизнеса. Рост среднего чека через
          live-механику и работу с ценностью. Маркетинг стал управляться через
          экономику, а не набор активностей.
        </p>
        <div className="grid grid-cols-2 gap-px bg-border">
          <div className="bg-background p-8">
            <p className="font-['Cormorant'] text-5xl font-light text-foreground mb-2">
              5% → 55%
            </p>
            <p className="text-xs tracking-widest uppercase text-muted-foreground">
              e-commerce доля
            </p>
          </div>
          <div className="bg-background p-8">
            <p className="font-['Cormorant'] text-5xl font-light text-foreground mb-2">
              1,7 → 3,5
            </p>
            <p className="text-xs tracking-widest uppercase text-muted-foreground">
              UPT
            </p>
          </div>
        </div>
      </Section>

      {/* SCALE */}
      <Section>
        <Label>Масштаб</Label>
        <Heading>Цифры — инструмент управления.</Heading>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-px bg-border">
          <div className="bg-background p-8">
            <p className="font-['Cormorant'] text-4xl font-light text-foreground mb-2">
              40–120+
            </p>
            <p className="text-sm text-muted-foreground">
              человек — команды маркетинга, продукта, продаж
            </p>
          </div>
          <div className="bg-background p-8">
            <p className="font-['Cormorant'] text-4xl font-light text-foreground mb-2">
              100+
            </p>
            <p className="text-sm text-muted-foreground">
              магазинов — опыт работы с retail-сетями
            </p>
          </div>
          <div className="bg-background p-8">
            <p className="font-['Cormorant'] text-4xl font-light text-foreground mb-2">
              РФ и СНГ
            </p>
            <p className="text-sm text-muted-foreground">
              разные рынки и уровни зрелости бизнеса
            </p>
          </div>
        </div>
      </Section>

      {/* INDUSTRIES */}
      <Section>
        <Label>Индустрии</Label>
        <div className="flex flex-wrap gap-3 mt-2">
          {["Fashion", "Beauty", "Retail", "E-commerce", "Live & TV commerce"].map((ind) => (
            <span
              key={ind}
              className="px-4 py-2 border border-border text-sm text-muted-foreground hover:border-foreground hover:text-foreground transition-colors cursor-default"
            >
              {ind}
            </span>
          ))}
        </div>
      </Section>

      {/* EXPERIENCE */}
      <Section id="experience">
        <Label>Опыт</Label>
        <Heading>Компании</Heading>
        <div>
          {[
            { company: "Shopping Live", role: "трансформация e-commerce и модели продаж" },
            { company: "MODIS", role: "рост сети и пересборка маркетинга" },
            { company: "SELA / O'STIN / New Yorker / LPP", role: "масштабный retail" },
          ].map((item) => (
            <div
              key={item.company}
              className="flex flex-col md:flex-row md:items-center md:justify-between py-5 border-b border-border last:border-0 gap-1"
            >
              <span className="font-['Cormorant'] text-xl font-light text-foreground">
                {item.company}
              </span>
              <span className="text-sm text-muted-foreground">{item.role}</span>
            </div>
          ))}
        </div>
      </Section>

      {/* FILTER */}
      <Section>
        <Label>Фильтр</Label>
        <Heading>Не подойду, если</Heading>
        <ul className="mt-2">
          <ListItem>нужен «маркетолог для рекламы»</ListItem>
          <ListItem>нет готовности менять продукт или процессы</ListItem>
          <ListItem>решения принимаются без опоры на экономику</ListItem>
        </ul>
      </Section>

      {/* CTA */}
      <section id="contacts" className="section-line bg-foreground py-20 md:py-28">
        <div className="max-w-4xl mx-auto px-6 md:px-12">
          <Label dark>Контакты</Label>
          <p className="font-['Cormorant'] font-light text-3xl md:text-5xl leading-tight text-background mb-10">
            Если нужен рост, а не имитация — можно обсудить.
          </p>
          <div className="flex flex-wrap gap-3">
            <a
              href="https://t.me/AVKuzikov"
              target="_blank"
              rel="noreferrer"
              className="inline-flex items-center gap-2 px-6 py-3 bg-background text-foreground text-sm hover:opacity-90 transition-opacity"
            >
              <Icon name="Send" size={15} />
              Написать в Telegram
            </a>
            <a
              href="mailto:alexander.kuzikov@mail.ru"
              className="inline-flex items-center gap-2 px-6 py-3 border border-white/30 text-background text-sm hover:border-white transition-colors"
            >
              <Icon name="Mail" size={15} />
              Email
            </a>
          </div>
        </div>
      </section>

      {/* FOOTER */}
      <footer className="border-t border-border py-6">
        <div className="max-w-4xl mx-auto px-6 md:px-12 flex flex-col md:flex-row justify-between items-center gap-2">
          <span className="font-['Cormorant'] text-sm font-light text-muted-foreground">
            Александр Кузиков
          </span>
          <span className="text-xs text-muted-foreground">
            © {new Date().getFullYear()}
          </span>
        </div>
      </footer>
    </div>
  );
}