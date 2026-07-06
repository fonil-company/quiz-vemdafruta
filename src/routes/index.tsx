import { createFileRoute } from "@tanstack/react-router";
import { useEffect, useMemo, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import {
  Truck,
  Snowflake,
  ArrowRight,
  Check,
  Sparkles,
  Loader2,
  MessageCircle,
  PackageCheck,
  ShieldCheck,
  Trophy,
  Star,
  Timer,
} from "lucide-react";
import vemDaFrutaLogo from "@/assets/Logo Vem da fruta.png";
import exercitoLogo from "@/assets/Exercito logo.webp";
import funasaLogo from "@/assets/FUNASA logo.jfif";
import hospitalSaoMarcosLogo from "@/assets/Hospital são marcos logo.jfif";
import hospitalSaoPauloLogo from "@/assets/Hospital são paulo logo.png";
import faustinoLogo from "@/assets/Logo faustino.png";
import ferreiraLogo from "@/assets/Logo ferreira.png";
import malaguetaLogo from "@/assets/Malagueta logo.jfif";
import rCarvalhoLogo from "@/assets/R Carvalho logo.jfif";
import texasLogo from "@/assets/Texas logo.jfif";
import heroFruits from "@/assets/hero-fruits.jpg";

export const Route = createFileRoute("/")({
  component: QuizFunnelPage,
});

/* ------------------------------ CONFIG ------------------------------ */

const WHATSAPP_NUMBER = "5599999999999"; // placeholder — troque pelo número real

type OptionKey = string;
type Answers = {
  business?: OptionKey;
  pain?: OptionKey;
  volume?: OptionKey;
  frequency?: OptionKey;
  name?: string;
  whatsapp?: string;
  company?: string;
  city?: string;
};

const QUESTIONS = [
  {
    id: "business",
    title: "Qual desses melhor descreve seu negócio?",
    options: ["Mercado", "Padaria", "Distribuidor", "Restaurante", "Outro"],
    accent: "var(--brand-green)",
  },
  {
    id: "pain",
    title: "Qual desses problemas mais te incomoda hoje?",
    options: ["Produto estraga", "Fornecedor atrasa", "Poucos fornecedores", "Margem baixa"],
    followUp: "Entendido! Isso é mais comum do que parece.",
    accent: "var(--brand-guava)",
  },
  {
    id: "volume",
    title: "Quanto você compra por mês?",
    options: ["Até R$500", "R$500–1500", "R$1500–3000", "Acima de R$3000"],
    accent: "var(--brand-orange)",
  },
  {
    id: "frequency",
    title: "Com que frequência você compra?",
    options: ["Semanal", "Quinzenal", "Mensal", "Ainda não vendo"],
    accent: "var(--brand-yellow)",
  },
] as const;

const PARTNERS = [
  { name: "Rede Ferreira", badge: "Top 1 em vendas", color: "var(--brand-green)" },
  { name: "Rede Carvalho", badge: "Top 1 em vendas", color: "var(--brand-orange)" },
  { name: "Rede Hospitalar", badge: "Fornecedor Oficial", color: "var(--brand-guava)" },
  { name: "Maternidade Pública", badge: "Maior do Brasil", color: "var(--brand-pink)" },
  { name: "Rede Vida", badge: "Parceiro Premium", color: "var(--brand-yellow)" },
];

const PARTNER_LOGOS = [
  { name: "Exército", logo: exercitoLogo },
  { name: "FUNASA", logo: funasaLogo },
  { name: "Hospital São Marcos", logo: hospitalSaoMarcosLogo },
  { name: "Hospital São Paulo", logo: hospitalSaoPauloLogo },
  { name: "Faustino", logo: faustinoLogo },
  { name: "Ferreira", logo: ferreiraLogo },
  { name: "Malagueta", logo: malaguetaLogo },
  { name: "R Carvalho", logo: rCarvalhoLogo },
  { name: "Texas", logo: texasLogo },
];

const HERO_HIGHLIGHTS = [
  { icon: PackageCheck, label: "Pedido mínimo", value: "R$ 200" },
  { icon: Truck, label: "Frete grátis", value: "na primeira rota" },
  { icon: Timer, label: "Cotação rápida", value: "em 60 segundos" },
];

/* ------------------------------ SHARED ------------------------------ */

function OrganicBackdrop() {
  return (
    <div aria-hidden className="pointer-events-none absolute inset-0 overflow-hidden">
      <div
        className="absolute top-1/3 -right-32 h-[28rem] w-[28rem] rounded-full opacity-30 blur-3xl"
        style={{ background: "radial-gradient(circle, var(--brand-yellow) 0%, transparent 70%)" }}
      />
      <div
        className="absolute bottom-0 left-1/4 h-80 w-80 rounded-full opacity-25 blur-3xl"
        style={{ background: "radial-gradient(circle, var(--brand-orange) 0%, transparent 70%)" }}
      />
    </div>
  );
}

function Logo({ className = "" }: { className?: string }) {
  return <img src={vemDaFrutaLogo} alt="Vem da Fruta - Sucos Naturais" className={className} />;
}

/* ------------------------------ SECTIONS ------------------------------ */

function Hero({ onStart }: { onStart: () => void }) {
  return (
    <section className="relative overflow-hidden bg-hero-radial">
      <OrganicBackdrop />
      <div
        aria-hidden
        className="hero-fruit-wash"
        style={{ backgroundImage: `url(${heroFruits})` }}
      />
      <div aria-hidden className="hero-sheen" />
      <div className="relative mx-auto flex min-h-screen max-w-7xl items-center justify-center px-6 py-16 md:py-20">
        <div className="flex w-full items-center justify-center">
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, ease: "easeOut" }}
            className="mx-auto flex max-w-4xl flex-col items-center text-center"
          >
            <motion.div
              className="hero-logo-aura mb-8"
              initial={{ scale: 0.96, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ duration: 0.7, delay: 0.1, ease: "easeOut" }}
            >
              <Logo className="h-24 w-auto drop-shadow-sm md:h-32" />
            </motion.div>
            <span className="pill-shine inline-flex items-center gap-2 rounded-full border border-brand-green/25 bg-white/75 px-4 py-2 text-xs font-semibold text-brand-green-dark shadow-sm backdrop-blur md:text-sm">
              <Trophy className="h-4 w-4" />
              Fornecedor de grandes redes e instituições de saúde
            </span>

            <h1 className="mt-6 text-4xl leading-[1.05] font-extrabold tracking-tight text-foreground md:text-6xl">
              Compre polpas de fruta direto da indústria com frete grátis e pedido mínimo de apenas
              <span className="headline-glow"> R$ 200.</span>
            </h1>

            <p className="mt-6 mx-auto max-w-xl text-lg text-muted-foreground md:text-xl">
              Cadastre seu comércio e descubra as condições especiais para oferecer produtos de alta
              qualidade com mais margem de lucro.
            </p>

            <div className="mt-8 flex flex-col items-center gap-4 sm:flex-row sm:items-center sm:justify-center">
              <button
                onClick={onStart}
                className="btn-primary btn-glow group inline-flex items-center gap-2 rounded-full px-7 py-4 text-base font-semibold md:text-lg"
              >
                Ver se meu comércio se qualifica
                <ArrowRight className="h-5 w-5 transition-transform group-hover:translate-x-0.5" />
              </button>
              <div className="flex items-center gap-2 text-sm text-muted-foreground">
                <Sparkles className="h-4 w-4 text-brand-orange" />
                Leva menos de 60 segundos
              </div>
            </div>

            <div className="mt-10 grid w-full max-w-3xl gap-3 sm:grid-cols-3">
              {HERO_HIGHLIGHTS.map((item, index) => (
                <motion.div
                  key={item.label}
                  initial={{ opacity: 0, y: 16 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.35 + index * 0.08, duration: 0.45, ease: "easeOut" }}
                  className="metric-card group"
                >
                  <span className="metric-icon">
                    <item.icon className="h-5 w-5" />
                  </span>
                  <span className="text-xs font-semibold uppercase text-muted-foreground">
                    {item.label}
                  </span>
                  <strong className="mt-1 text-sm text-foreground">{item.value}</strong>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}

function SocialProof() {
  const carouselItems = [...PARTNER_LOGOS, ...PARTNER_LOGOS];

  return (
    <section className="relative overflow-hidden py-16 md:py-24">
      <div aria-hidden className="section-sparkle section-sparkle-left" />
      <div className="mx-auto max-w-7xl px-6">
        <div className="mx-auto mb-10 max-w-3xl text-center">
          <div>
            <p className="inline-flex items-center gap-2 rounded-full bg-brand-green/10 px-4 py-2 text-sm font-semibold tracking-widest text-brand-green-dark uppercase">
              <ShieldCheck className="h-4 w-4" />
              Quem já confia
            </p>
            <h2 className="mt-2 text-3xl font-bold tracking-tight md:text-4xl">
              Parceiros que abastecem milhões
            </h2>
          </div>
        </div>

        <div className="partner-carousel relative overflow-hidden py-2">
          <div className="partner-carousel-track flex w-max gap-5">
            {carouselItems.map((p, index) => (
              <motion.div
                key={`${p.name}-${index}`}
                whileHover={{ y: -4 }}
                className="logo-card glass-card flex h-40 w-[220px] shrink-0 flex-col items-center justify-center rounded-3xl p-6 text-center md:w-[260px]"
              >
                <img
                  src={p.logo}
                  alt={`Logo ${p.name}`}
                  className="max-h-20 max-w-full object-contain"
                  loading="lazy"
                />
                <span className="mt-4 text-sm font-bold text-foreground">{p.name}</span>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

function Benefits({ onStart }: { onStart: () => void }) {
  const items = [
    {
      icon: Truck,
      title: "Entrega em até 48h",
      desc: "Logística ágil para sua região não parar de vender.",
      color: "var(--brand-green)",
    },
    {
      icon: Snowflake,
      title: "Estoque garantido",
      desc: "Cadeia de frio robusta e estoque contínuo o ano todo.",
      color: "var(--brand-orange)",
    },
    {
      icon: Star,
      title: "Validado por grandes redes",
      desc: "Produto aprovado por hospitais, maternidades e varejo.",
      color: "var(--brand-guava)",
    },
  ];
  return (
    <section className="relative overflow-hidden py-16 md:py-24">
      <div aria-hidden className="section-sparkle section-sparkle-right" />
      <div className="mx-auto max-w-7xl px-6">
        <div className="mx-auto max-w-2xl text-center">
          <h2 className="text-3xl font-bold tracking-tight md:text-5xl">
            Por que revender <span className="text-brand-green-dark">Vem da Fruta</span>?
          </h2>
          <p className="mt-4 text-lg text-muted-foreground">
            Uma operação pensada para quem não pode perder tempo com fornecedor.
          </p>
        </div>

        <div className="mt-14 grid gap-6 md:grid-cols-3">
          {items.map((it, i) => (
            <motion.div
              key={it.title}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-60px" }}
              transition={{ duration: 0.5, delay: i * 0.08 }}
              className="benefit-card glass-card rounded-3xl p-8"
            >
              <div
                className="grid h-14 w-14 place-items-center rounded-2xl text-white shadow-lg"
                style={{ background: it.color, boxShadow: `0 12px 30px -12px ${it.color}` }}
              >
                <it.icon className="h-7 w-7" />
              </div>
              <h3 className="mt-6 text-xl font-bold">{it.title}</h3>
              <p className="mt-2 text-muted-foreground">{it.desc}</p>
            </motion.div>
          ))}
        </div>

        <div className="mt-14 flex justify-center">
          <button
            onClick={onStart}
            className="btn-primary group inline-flex items-center gap-2 rounded-full px-8 py-4 text-lg font-semibold"
          >
            Ver se meu comércio se qualifica
            <ArrowRight className="h-5 w-5 transition-transform group-hover:translate-x-0.5" />
          </button>
        </div>
      </div>
    </section>
  );
}

/* ------------------------------ QUIZ ------------------------------ */

function ProgressBar({ step, total }: { step: number; total: number }) {
  const pct = Math.min(100, (step / total) * 100);
  return (
    <div className="sticky top-0 z-30 w-full border-b border-brand-green/10 bg-white/80 backdrop-blur">
      <div className="mx-auto flex max-w-3xl items-center gap-4 px-6 py-4">
        <Logo className="h-10 w-auto" />
        <div className="flex-1">
          <div className="mb-1.5 flex items-center justify-between text-xs font-semibold text-muted-foreground">
            <span>
              Pergunta {Math.min(step, total)} de {total}
            </span>
            <span>{Math.round(pct)}%</span>
          </div>
          <div className="h-2 overflow-hidden rounded-full bg-brand-green/10">
            <motion.div
              className="h-full rounded-full"
              style={{
                background: "linear-gradient(90deg, var(--brand-green), var(--brand-green-dark))",
              }}
              initial={{ width: 0 }}
              animate={{ width: `${pct}%` }}
              transition={{ duration: 0.5, ease: "easeOut" }}
            />
          </div>
        </div>
      </div>
    </div>
  );
}

function QuestionCard({
  q,
  onAnswer,
}: {
  q: (typeof QUESTIONS)[number];
  onAnswer: (value: string) => void;
}) {
  const [selected, setSelected] = useState<string | null>(null);
  const [showFollowUp, setShowFollowUp] = useState(false);

  const handleSelect = (opt: string) => {
    if (selected) return;
    setSelected(opt);
    const followUp = "followUp" in q ? q.followUp : undefined;
    if (followUp) {
      setShowFollowUp(true);
      setTimeout(() => onAnswer(opt), 1400);
    } else {
      setTimeout(() => onAnswer(opt), 450);
    }
  };

  return (
    <motion.div
      key={q.id}
      initial={{ opacity: 0, x: 40 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: -40 }}
      transition={{ duration: 0.4, ease: "easeOut" }}
      className="mx-auto flex min-h-[calc(100vh-88px)] w-full max-w-2xl flex-col justify-center px-6 py-12"
    >
      <h2 className="text-3xl leading-tight font-bold tracking-tight md:text-4xl">{q.title}</h2>
      <p className="mt-3 text-muted-foreground">
        Selecione a opção que mais faz sentido para você.
      </p>

      <div className="mt-8 grid gap-3">
        {q.options.map((opt, i) => {
          const isSelected = selected === opt;
          return (
            <motion.button
              key={opt}
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.05 * i }}
              whileHover={{ scale: selected ? 1 : 1.01 }}
              whileTap={{ scale: 0.99 }}
              onClick={() => handleSelect(opt)}
              className={`group flex items-center justify-between rounded-2xl border-2 px-6 py-5 text-left text-base font-semibold transition ${
                isSelected
                  ? "border-brand-green bg-brand-green/10 text-brand-green-dark"
                  : "border-border bg-white hover:border-brand-green/60 hover:bg-brand-green/5"
              }`}
            >
              <span>{opt}</span>
              <span
                className={`grid h-7 w-7 place-items-center rounded-full border-2 transition ${
                  isSelected
                    ? "border-brand-green bg-brand-green text-white"
                    : "border-border text-transparent group-hover:border-brand-green/50"
                }`}
              >
                <Check className="h-4 w-4" />
              </span>
            </motion.button>
          );
        })}
      </div>

      <AnimatePresence>
        {showFollowUp && "followUp" in q && q.followUp && (
          <motion.div
            initial={{ opacity: 0, y: 10, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0 }}
            className="mt-6 flex items-center gap-3 rounded-2xl bg-brand-green/10 px-5 py-4 text-brand-green-dark"
          >
            <Sparkles className="h-5 w-5" />
            <span className="font-medium">{q.followUp}</span>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
}

function CaptureForm({
  onSubmit,
}: {
  onSubmit: (data: { name: string; whatsapp: string; company?: string; city?: string }) => void;
}) {
  const [name, setName] = useState("");
  const [whatsapp, setWhatsapp] = useState("");
  const [company, setCompany] = useState("");
  const [city, setCity] = useState("");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const t = setTimeout(() => setLoading(false), 1800);
    return () => clearTimeout(t);
  }, []);

  if (loading) {
    return (
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        className="mx-auto flex min-h-[calc(100vh-88px)] w-full max-w-md flex-col items-center justify-center px-6 text-center"
      >
        <div className="relative">
          <div className="absolute inset-0 animate-ping rounded-full bg-brand-green/30" />
          <div className="relative grid h-20 w-20 place-items-center rounded-full bg-white shadow-xl">
            <Loader2 className="h-9 w-9 animate-spin text-brand-green-dark" />
          </div>
        </div>
        <h3 className="mt-8 text-2xl font-bold">Estamos analisando suas respostas...</h3>
        <p className="mt-2 text-muted-foreground">
          Calculando as melhores condições para o seu perfil.
        </p>
      </motion.div>
    );
  }

  const canSubmit = name.trim().length >= 2 && whatsapp.replace(/\D/g, "").length >= 10;

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="mx-auto flex min-h-[calc(100vh-88px)] w-full max-w-xl flex-col justify-center px-6 py-12"
    >
      <div className="mb-6 inline-flex w-fit items-center gap-2 rounded-full bg-brand-green/10 px-4 py-1.5 text-sm font-semibold text-brand-green-dark">
        <Check className="h-4 w-4" /> Perfil aprovado
      </div>
      <h2 className="text-3xl leading-tight font-bold md:text-4xl">
        Falta pouco! Onde enviamos sua condição especial?
      </h2>
      <p className="mt-3 text-muted-foreground">
        Seu contato é usado apenas para envio da proposta. Sem spam.
      </p>

      <form
        className="mt-8 grid gap-4"
        onSubmit={(e) => {
          e.preventDefault();
          if (!canSubmit) return;
          onSubmit({
            name: name.trim(),
            whatsapp: whatsapp.trim(),
            company: company.trim(),
            city: city.trim(),
          });
        }}
      >
        <Field label="Nome completo" required>
          <input
            value={name}
            onChange={(e) => setName(e.target.value.slice(0, 80))}
            placeholder="Seu nome"
            className="w-full rounded-2xl border-2 border-border bg-white px-5 py-4 text-base outline-none transition focus:border-brand-green"
          />
        </Field>
        <Field label="WhatsApp" required>
          <input
            value={whatsapp}
            onChange={(e) => setWhatsapp(e.target.value.replace(/[^\d\s()+-]/g, "").slice(0, 20))}
            placeholder="(00) 00000-0000"
            inputMode="tel"
            className="w-full rounded-2xl border-2 border-border bg-white px-5 py-4 text-base outline-none transition focus:border-brand-green"
          />
        </Field>
        <div className="grid gap-4 sm:grid-cols-2">
          <Field label="Cidade">
            <input
              value={city}
              onChange={(e) => setCity(e.target.value.slice(0, 60))}
              placeholder="Sua cidade"
              className="w-full rounded-2xl border-2 border-border bg-white px-5 py-4 text-base outline-none transition focus:border-brand-green"
            />
          </Field>
          <Field label="Empresa (opcional)">
            <input
              value={company}
              onChange={(e) => setCompany(e.target.value.slice(0, 80))}
              placeholder="Nome do comércio"
              className="w-full rounded-2xl border-2 border-border bg-white px-5 py-4 text-base outline-none transition focus:border-brand-green"
            />
          </Field>
        </div>
        <button
          type="submit"
          disabled={!canSubmit}
          className="btn-primary mt-2 inline-flex items-center justify-center gap-2 rounded-full px-8 py-4 text-base font-semibold disabled:cursor-not-allowed disabled:opacity-50"
        >
          Quero receber minha condição especial
          <ArrowRight className="h-5 w-5" />
        </button>
      </form>
    </motion.div>
  );
}

function Field({
  label,
  required,
  children,
}: {
  label: string;
  required?: boolean;
  children: React.ReactNode;
}) {
  return (
    <label className="block">
      <span className="mb-1.5 block text-sm font-semibold text-foreground">
        {label} {required && <span className="text-brand-guava">*</span>}
      </span>
      {children}
    </label>
  );
}

function ResultScreen({ answers }: { answers: Answers }) {
  const message = useMemo(() => {
    const tipo = answers.business ?? "não informado";
    const cidade = answers.city?.trim() || "não informada";
    const dor = answers.pain ?? "não informada";
    return `Olá! Fiz o quiz da Vem da Fruta e me qualifiquei.\n\nMeu tipo de negócio é: ${tipo}\nMinha cidade é: ${cidade}\nMinha maior dificuldade é: ${dor}\n\nGostaria de conhecer as condições especiais.`;
  }, [answers]);

  const href = `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(message)}`;

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="relative mx-auto flex min-h-[calc(100vh-88px)] w-full max-w-2xl flex-col items-center justify-center px-6 py-16 text-center"
    >
      <motion.div
        initial={{ scale: 0, rotate: -30 }}
        animate={{ scale: 1, rotate: 0 }}
        transition={{ type: "spring", stiffness: 200, damping: 15, delay: 0.1 }}
        className="relative"
      >
        <div className="absolute inset-0 animate-ping rounded-full bg-brand-green/25" />
        <div className="relative grid h-24 w-24 place-items-center rounded-full bg-gradient-to-br from-brand-green to-brand-green-dark text-white shadow-xl">
          <Check className="h-12 w-12" strokeWidth={3} />
        </div>
      </motion.div>

      <motion.h2
        initial={{ opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3 }}
        className="mt-8 text-4xl leading-tight font-extrabold md:text-5xl"
      >
        Parabéns{answers.name ? `, ${answers.name.split(" ")[0]}` : ""}!
      </motion.h2>
      <motion.p
        initial={{ opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.4 }}
        className="mt-4 max-w-lg text-lg text-muted-foreground"
      >
        Seu comércio se qualifica para as{" "}
        <strong className="text-foreground">condições especiais da Vem da Fruta</strong>.
      </motion.p>

      <motion.ul
        initial={{ opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.5 }}
        className="mt-8 grid w-full max-w-md gap-3 text-left"
      >
        {["Entrega em até 48h", "Estoque garantido", "Sem cobrança de frete"].map((b) => (
          <li
            key={b}
            className="flex items-center gap-3 rounded-2xl bg-white px-5 py-3 shadow-sm ring-1 ring-brand-green/10"
          >
            <span className="grid h-8 w-8 place-items-center rounded-full bg-brand-green/15 text-brand-green-dark">
              <Check className="h-4 w-4" strokeWidth={3} />
            </span>
            <span className="font-semibold">{b}</span>
          </li>
        ))}
      </motion.ul>

      <motion.div
        initial={{ opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.6 }}
        className="mt-8 flex items-center gap-3 rounded-2xl border border-brand-orange/30 bg-brand-orange/10 px-5 py-4 text-left"
      >
        <Sparkles className="h-5 w-5 shrink-0 text-brand-orange" />
        <p className="text-sm font-medium text-foreground">
          Estamos abrindo <strong>novas rotas de entrega</strong> na sua região. Fale agora com um
          especialista para garantir sua vaga.
        </p>
      </motion.div>

      <motion.a
        href={href}
        target="_blank"
        rel="noopener noreferrer"
        initial={{ opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.7 }}
        className="btn-primary mt-8 inline-flex items-center gap-2 rounded-full px-8 py-4 text-lg font-semibold"
      >
        <MessageCircle className="h-5 w-5" />
        Falar com especialista
      </motion.a>
    </motion.div>
  );
}

function Footer() {
  return (
    <footer className="border-t border-brand-green/10 bg-white/60 py-10">
      <div className="mx-auto flex max-w-7xl flex-col items-center justify-between gap-4 px-6 md:flex-row">
        <Logo className="h-10 w-auto" />
        <p className="text-sm text-muted-foreground">
          © {new Date().getFullYear()} Vem da Fruta — Sucos Naturais. Todos os direitos reservados.
        </p>
      </div>
    </footer>
  );
}

/* ------------------------------ PAGE ------------------------------ */

type Stage = "landing" | "quiz" | "capture" | "result";

function QuizFunnelPage() {
  const [stage, setStage] = useState<Stage>("landing");
  const [stepIndex, setStepIndex] = useState(0);
  const [answers, setAnswers] = useState<Answers>({});

  const totalQuizSteps = QUESTIONS.length + 1; // + capture

  const start = () => {
    setStepIndex(0);
    setStage("quiz");
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const handleAnswer = (value: string) => {
    const q = QUESTIONS[stepIndex];
    setAnswers((a) => ({ ...a, [q.id]: value }));
    if (stepIndex + 1 < QUESTIONS.length) {
      setStepIndex(stepIndex + 1);
    } else {
      setStage("capture");
    }
  };

  const handleCapture = (data: {
    name: string;
    whatsapp: string;
    company?: string;
    city?: string;
  }) => {
    setAnswers((a) => ({ ...a, ...data }));
    setStage("result");
  };

  const currentStep =
    stage === "quiz" ? stepIndex + 1 : stage === "capture" ? totalQuizSteps : totalQuizSteps;

  return (
    <main className="min-h-screen bg-background">
      {stage === "landing" && (
        <>
          <Hero onStart={start} />
          <SocialProof />
          <Benefits onStart={start} />
          <Footer />
        </>
      )}

      {stage !== "landing" && (
        <div className="relative min-h-screen bg-hero-radial">
          <OrganicBackdrop />
          <div className="relative">
            {stage !== "result" && <ProgressBar step={currentStep} total={totalQuizSteps} />}
            <AnimatePresence mode="wait">
              {stage === "quiz" && (
                <QuestionCard
                  key={QUESTIONS[stepIndex].id}
                  q={QUESTIONS[stepIndex]}
                  onAnswer={handleAnswer}
                />
              )}
              {stage === "capture" && <CaptureForm key="capture" onSubmit={handleCapture} />}
              {stage === "result" && <ResultScreen key="result" answers={answers} />}
            </AnimatePresence>
          </div>
        </div>
      )}
    </main>
  );
}
