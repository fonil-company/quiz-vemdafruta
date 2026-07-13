import { createFileRoute } from "@tanstack/react-router";
import { useEffect, useMemo, useState } from "react";
import { preload } from "react-dom";
import { AnimatePresence, motion } from "framer-motion";
import {
  Truck,
  Snowflake,
  ArrowRight,
  ArrowLeft,
  Check,
  Sparkles,
  Loader2,
  MessageCircle,
  PackageCheck,
  ShieldCheck,
  Trophy,
  Star,
  Timer,
  ChevronDown,
  MapPin,
  Instagram,
} from "lucide-react";
import vemDaFrutaLogo from "@/assets/Logo Vem da fruta.png";
import faustinoLogo from "@/assets/Logo faustino.png";
import ferreiraLogo from "@/assets/Logo ferreira.png";
import malaguetaLogo from "@/assets/Malagueta logo.jfif";
import rCarvalhoLogo from "@/assets/R Carvalho logo.jfif";
import texasLogo from "@/assets/Texas logo.jfif";
import cincoSentidosLogo from "@/assets/Cinco Sentidos logo.jpg";
import casaDoChurrascoLogo from "@/assets/Casa do Churrasco logo.jpg";
import evolucaoPadariaLogo from "@/assets/Evolucao Padaria logo.jpg";
import padariaNacionalLogo from "@/assets/Padaria Nacional logo.jpg";
import armazemDomSeverinoLogo from "@/assets/Armazem Dom Severino logo.jpg";
import modeloLogo from "@/assets/Modelo logo.jpg";
import saoBrazLogo from "@/assets/Sao Braz logo.jpg";
import mercadoDosGraosLogo from "@/assets/Mercado dos Graos logo.jpg";
import aFavoritaPadariaLogo from "@/assets/A Favorita Padaria logo.jpg";
import redePlanaltoLogo from "@/assets/Rede Planalto logo.jpg";
import paoDaHoraLogo from "@/assets/Pao da Hora logo.jpg";
import carvalhoSuperLogo from "@/assets/Carvalho Super logo.jpg";
import emporioBellaTheLogo from "@/assets/Emporio Bella The logo.jpg";
import padariaIdealLogo from "@/assets/Padaria Ideal logo.jpg";
import texanoPicanhariaLogo from "@/assets/Texano Picanharia logo.jpg";
import heroFruits from "@/assets/hero-fruits.jpg";
import vemDaFrutaLogoReveal from "@/assets/vem-da-fruta-logo-reveal.mp4";
import produtoManga from "@/assets/produtos/produto-1.jpg";
import produtoSucoAcerola from "@/assets/produtos/produto-2.jpg";
import produtoCaju from "@/assets/produtos/produto-3.jpg";
import produtoAcerola from "@/assets/produtos/produto-4.jpg";
import produtoSucoGoiaba from "@/assets/produtos/produto-5.jpg";
import produtoSucoTamarindo from "@/assets/produtos/produto-6.jpg";
import produtoAbacaxi from "@/assets/produtos/produto-7.jpg";
import produtoCaja from "@/assets/produtos/produto-8.jpg";
import produtoBacuri from "@/assets/produtos/produto-9.jpg";
import produtoMaracuja from "@/assets/produtos/produto-10.jpg";
import produtoSucoAbacaxi from "@/assets/produtos/produto-11.jpg";
import produtoSucoCaja from "@/assets/produtos/produto-12.jpg";
import produtoSucoCupuacu from "@/assets/produtos/produto-13.jpg";
import produtoSucoBacuri from "@/assets/produtos/produto-14.jpg";
import produtoSucoCaju from "@/assets/produtos/produto-15.jpg";
import produtoTamarindo from "@/assets/produtos/produto-16.jpg";
import produtoCupuacu from "@/assets/produtos/produto-17.jpg";
import produtoGoiaba from "@/assets/produtos/produto-18.jpg";
import produtoSucoMaracuja from "@/assets/produtos/produto-19.jpg";
import {
  trackQuizStarted,
  trackQuizStepAnswered,
  trackCaptureViewed,
  trackLeadFormSubmitted,
  trackLeadConfirmed,
  trackLeadFailed,
  trackLeadTimeout,
  trackWhatsAppRedirect,
} from "@/lib/analytics";
import { sendLeadWebhook } from "@/lib/lead-webhook";
import { captureUtmParams } from "@/lib/utm";
import { maskCnpj, isValidCnpj } from "@/lib/cnpj";
import { maskPhone, isValidPhone } from "@/lib/phone";

export const Route = createFileRoute("/")({
  component: QuizFunnelPage,
});

/* ------------------------------ CONFIG ------------------------------ */

const WHATSAPP_NUMBER = "5586933003023";

type OptionKey = string;
type Answers = {
  business?: OptionKey;
  pain?: OptionKey;
  volume?: OptionKey;
  frequency?: OptionKey;
  name?: string;
  whatsapp?: string;
  cnpj?: string;
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

const PARTNER_LOGOS = [
  { name: "Faustino", logo: faustinoLogo },
  { name: "Ferreira", logo: ferreiraLogo },
  { name: "Malagueta", logo: malaguetaLogo },
  { name: "R Carvalho", logo: rCarvalhoLogo },
  { name: "Texas", logo: texasLogo },
  { name: "Cinco Sentidos", logo: cincoSentidosLogo },
  { name: "Casa do Churrasco", logo: casaDoChurrascoLogo },
  { name: "Texano Picanharia", logo: texanoPicanhariaLogo },
  { name: "Evolução Padaria", logo: evolucaoPadariaLogo },
  { name: "Padaria Nacional", logo: padariaNacionalLogo },
  { name: "Armazém Dom Severino", logo: armazemDomSeverinoLogo },
  { name: "Modelo", logo: modeloLogo },
  { name: "São Braz", logo: saoBrazLogo },
  { name: "Mercado dos Grãos", logo: mercadoDosGraosLogo },
  { name: "A Favorita Padaria", logo: aFavoritaPadariaLogo },
  { name: "Rede Planalto", logo: redePlanaltoLogo },
  { name: "Pão da Hora", logo: paoDaHoraLogo },
  { name: "Carvalho Super", logo: carvalhoSuperLogo },
  { name: "Empório Bella Chá", logo: emporioBellaTheLogo },
  { name: "Padaria Ideal", logo: padariaIdealLogo },
];

const PARTNER_LOGOS_PREVIEW_COUNT = 8;

const INSTAGRAM_REELS = [
  "https://www.instagram.com/reel/DWZDBJkDill/",
  "https://www.instagram.com/reel/DPG87aejvA9/",
  "https://www.instagram.com/reel/DOYdemMjuaL/",
  "https://www.instagram.com/reel/DKIXUF1xAHq/",
  "https://www.instagram.com/reel/DJ9UYMiuJ6X/",
  "https://www.instagram.com/reel/DJo0owpO5Ja/",
  "https://www.instagram.com/reel/DJwIY3QuyaI/",
  "https://www.instagram.com/reel/DJZf0uGuLbu/",
  "https://www.instagram.com/reel/DJXZQQUvyKX/",
  "https://www.instagram.com/reel/DIjrGUuOPwB/",
];

declare global {
  interface Window {
    instgrm?: {
      Embeds: { process: () => void };
    };
  }
}

const PRODUCT_SHOWCASE = [
  { image: produtoManga, label: "Polpa de Manga" },
  { image: produtoSucoAcerola, label: "Suco de Acerola" },
  { image: produtoCaju, label: "Polpa de Caju" },
  { image: produtoAcerola, label: "Polpa de Acerola" },
  { image: produtoSucoGoiaba, label: "Suco de Goiaba" },
  { image: produtoSucoTamarindo, label: "Suco de Tamarindo" },
  { image: produtoAbacaxi, label: "Polpa de Abacaxi" },
  { image: produtoCaja, label: "Polpa de Cajá" },
  { image: produtoBacuri, label: "Polpa de Bacuri" },
  { image: produtoMaracuja, label: "Polpa de Maracujá" },
  { image: produtoSucoAbacaxi, label: "Suco de Abacaxi" },
  { image: produtoSucoCaja, label: "Suco de Cajá" },
  { image: produtoSucoCupuacu, label: "Suco de Cupuaçu" },
  { image: produtoSucoBacuri, label: "Suco de Bacuri" },
  { image: produtoSucoCaju, label: "Suco de Caju" },
  { image: produtoTamarindo, label: "Polpa de Tamarindo" },
  { image: produtoCupuacu, label: "Polpa de Cupuaçu" },
  { image: produtoGoiaba, label: "Polpa de Goiaba" },
  { image: produtoSucoMaracuja, label: "Suco de Maracujá" },
];

const HERO_HIGHLIGHTS = [
  { icon: PackageCheck, label: "Pedido mínimo", value: "R$ 200" },
  { icon: Truck, label: "Frete grátis", value: "em qualquer pedido" },
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

function HeroLogoReveal({ className = "" }: { className?: string }) {
  return (
    <video
      src={vemDaFrutaLogoReveal}
      aria-label="Vem da Fruta - Sucos Naturais"
      className={`rounded-2xl border border-brand-green/15 bg-white shadow-sm ${className}`}
      autoPlay
      muted
      playsInline
      disablePictureInPicture
    />
  );
}

/* ------------------------------ SECTIONS ------------------------------ */

function Hero({ onStart }: { onStart: () => void }) {
  // hero-fruits.jpg is the LCP element, but it's set as a CSS background-image
  // rather than an <img>, so the browser's preload scanner can't discover it
  // early on its own — this emits a high-priority <link rel="preload"> instead.
  preload(heroFruits, { as: "image", fetchPriority: "high" });

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
              <HeroLogoReveal className="h-24 w-auto drop-shadow-sm md:h-32" />
            </motion.div>
            <span className="pill-shine inline-flex items-center gap-2 rounded-full border border-brand-green/25 bg-white/75 px-4 py-2 text-xs font-semibold text-brand-green-dark shadow-sm backdrop-blur md:text-sm">
              <Trophy className="h-4 w-4" />
              Fábrica de Polpas e Sucos Naturais - Teresina, Piauí
            </span>

            <h1 className="mt-6 text-4xl leading-[1.05] font-extrabold tracking-tight text-foreground md:text-6xl">
              Compre polpas e sucos da fruta 100% naturais direto da fábrica.
            </h1>

            <p className="mt-6 mx-auto max-w-xl text-lg text-muted-foreground md:text-xl">
              Cadastro rápido, frete grátis e pedido mínimo de R$ 200,00.
            </p>

            <div className="mt-8 flex flex-col items-center gap-4 sm:flex-row sm:items-center sm:justify-center">
              <button
                onClick={onStart}
                className="btn-primary btn-glow group inline-flex items-center gap-2 rounded-full px-7 py-4 text-base font-semibold md:text-lg"
              >
                Comprar Agora
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

function ProductShowcase() {
  const carouselItems = [...PRODUCT_SHOWCASE, ...PRODUCT_SHOWCASE];

  return (
    <section className="relative overflow-hidden py-14 md:py-20">
      <div className="mx-auto max-w-7xl px-6">
        <div className="mx-auto mb-10 max-w-3xl text-center">
          <p className="inline-flex items-center gap-2 rounded-full bg-brand-orange/10 px-4 py-2 text-sm font-semibold tracking-widest text-brand-orange uppercase">
            <Sparkles className="h-4 w-4" />
            Nosso catálogo
          </p>
          <h2 className="mt-2 text-3xl font-bold tracking-tight md:text-4xl">
            Polpas e sucos que seus clientes vão amar
          </h2>
        </div>

        <div className="product-carousel relative overflow-hidden py-2">
          <div className="product-carousel-track flex w-max gap-5">
            {carouselItems.map((p, index) => (
              <motion.div
                key={`${p.label}-${index}`}
                whileHover={{ y: -4 }}
                className="product-card glass-card flex w-[180px] shrink-0 flex-col items-center rounded-3xl p-4 text-center md:w-[210px]"
              >
                <img
                  src={p.image}
                  alt={`Vem da Fruta - ${p.label}`}
                  className="h-64 w-full rounded-2xl object-cover md:h-72"
                  loading="lazy"
                />
                <span className="mt-3 text-sm font-bold text-foreground">{p.label}</span>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

function SocialProof() {
  const [expanded, setExpanded] = useState(false);
  const visibleLogos = expanded
    ? PARTNER_LOGOS
    : PARTNER_LOGOS.slice(0, PARTNER_LOGOS_PREVIEW_COUNT);
  const hiddenCount = PARTNER_LOGOS.length - PARTNER_LOGOS_PREVIEW_COUNT;

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
              Marcas que confiam na Vem da Fruta
            </h2>
          </div>
        </div>

        <div className="mx-auto grid max-w-4xl grid-cols-2 gap-4 sm:grid-cols-3 md:gap-5 lg:grid-cols-4">
          {visibleLogos.map((p, index) => (
            <motion.div
              key={p.name}
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-40px" }}
              whileHover={{ y: -4 }}
              transition={{ duration: 0.4, delay: (index % 8) * 0.04 }}
              className="logo-card glass-card flex h-36 flex-col items-center justify-center rounded-3xl p-5 text-center"
            >
              <img
                src={p.logo}
                alt={`Logo ${p.name}`}
                className="max-h-16 max-w-full object-contain"
                loading="lazy"
              />
              <span className="mt-3 text-sm font-bold text-foreground">{p.name}</span>
            </motion.div>
          ))}
        </div>

        <div className="mt-8 flex flex-col items-center gap-3 text-center">
          {hiddenCount > 0 && (
            <button
              onClick={() => setExpanded((v) => !v)}
              className="inline-flex items-center gap-2 rounded-full border border-brand-green/25 bg-white/75 px-5 py-2.5 text-sm font-semibold text-brand-green-dark shadow-sm backdrop-blur transition hover:bg-white"
            >
              {expanded ? "Ver menos" : `+ ${hiddenCount} parceiros`}
              <ChevronDown
                className={`h-4 w-4 transition-transform ${expanded ? "rotate-180" : ""}`}
              />
            </button>
          )}
          <p className="flex items-center gap-1.5 text-sm text-muted-foreground">
            <MapPin className="h-4 w-4 text-brand-orange" />
            e +358 parceiros pelo Piauí
          </p>
        </div>
      </div>
    </section>
  );
}

function Benefits({ onStart }: { onStart: () => void }) {
  const items = [
    {
      icon: Truck,
      title: "Entrega em até 48h em Teresina e região",
      desc: "Logística ágil para seu comércio não parar de vender.",
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
      desc: "Produto aprovado por Supermercados, Mercado, Restaurantes e Padarias.",
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
            Comprar Agora
            <ArrowRight className="h-5 w-5 transition-transform group-hover:translate-x-0.5" />
          </button>
        </div>
      </div>
    </section>
  );
}

/* ------------------------------ QUIZ ------------------------------ */

function ProgressBar({
  step,
  total,
  onBack,
}: {
  step: number;
  total: number;
  onBack?: () => void;
}) {
  const pct = Math.min(100, (step / total) * 100);
  return (
    <div className="sticky top-0 z-30 w-full border-b border-brand-green/10 bg-white/80 backdrop-blur">
      <div className="mx-auto flex max-w-3xl items-center gap-4 px-6 py-4">
        {onBack && (
          <button
            onClick={onBack}
            aria-label="Voltar"
            className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full border-2 border-border bg-white text-foreground transition hover:border-brand-green/60 hover:text-brand-green-dark"
          >
            <ArrowLeft className="h-5 w-5" />
          </button>
        )}
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

function PartnerTicker() {
  const items = [...PARTNER_LOGOS, ...PARTNER_LOGOS];

  return (
    <div className="w-full border-b border-brand-green/10 bg-white/70 py-2.5 opacity-60">
      <div className="mx-auto flex max-w-3xl items-center gap-3 px-6">
        <span className="hidden shrink-0 items-center gap-1.5 text-[11px] font-semibold tracking-wide text-muted-foreground uppercase sm:flex">
          <ShieldCheck className="h-3.5 w-3.5" />
          Parceiros que já confiam
        </span>
        <div className="partner-ticker-mask relative min-w-0 flex-1 overflow-hidden">
          <div className="partner-ticker-track flex w-max items-center gap-8">
            {items.map((p, index) => (
              <img
                key={`${p.name}-${index}`}
                src={p.logo}
                alt={p.name}
                className="h-6 w-auto shrink-0 object-contain"
                loading="lazy"
              />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

function QuestionCard({
  q,
  onAnswer,
  initialValue,
}: {
  q: (typeof QUESTIONS)[number];
  onAnswer: (value: string) => void;
  initialValue?: string;
}) {
  const [selected, setSelected] = useState<string | null>(initialValue ?? null);
  const [isTransitioning, setIsTransitioning] = useState(false);
  const [showFollowUp, setShowFollowUp] = useState(false);

  const handleSelect = (opt: string) => {
    if (isTransitioning) return;
    setSelected(opt);
    setIsTransitioning(true);
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
      className="mx-auto flex min-h-[calc(100vh-132px)] w-full max-w-2xl flex-col justify-center px-6 py-12"
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
  onSubmit: (data: { name: string; whatsapp: string; cnpj: string; city: string }) => void;
}) {
  const [name, setName] = useState("");
  const [whatsapp, setWhatsapp] = useState("");
  const [cnpj, setCnpj] = useState("");
  const [cnpjTouched, setCnpjTouched] = useState(false);
  const [city, setCity] = useState("");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const t = setTimeout(() => {
      setLoading(false);
      trackCaptureViewed();
    }, 1800);
    return () => clearTimeout(t);
  }, []);

  if (loading) {
    return (
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        className="mx-auto flex min-h-[calc(100vh-132px)] w-full max-w-md flex-col items-center justify-center px-6 text-center"
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

  const cnpjError = cnpjTouched && cnpj && !isValidCnpj(cnpj) ? "CNPJ inválido" : undefined;
  const canSubmit =
    name.trim().length >= 2 &&
    isValidPhone(whatsapp) &&
    isValidCnpj(cnpj) &&
    city.trim().length >= 2;

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="mx-auto flex min-h-[calc(100vh-132px)] w-full max-w-xl flex-col justify-center px-6 py-12"
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
            cnpj: cnpj.trim(),
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
            onChange={(e) => setWhatsapp(maskPhone(e.target.value))}
            placeholder="(00) 00000-0000"
            inputMode="tel"
            className="w-full rounded-2xl border-2 border-border bg-white px-5 py-4 text-base outline-none transition focus:border-brand-green"
          />
        </Field>
        <Field label="CNPJ" required error={cnpjError}>
          <input
            value={cnpj}
            onChange={(e) => setCnpj(maskCnpj(e.target.value))}
            onBlur={() => setCnpjTouched(true)}
            placeholder="00.000.000/0000-00"
            inputMode="numeric"
            className={`w-full rounded-2xl border-2 bg-white px-5 py-4 text-base outline-none transition ${
              cnpjError ? "border-brand-guava" : "border-border focus:border-brand-green"
            }`}
          />
        </Field>
        <Field label="Cidade" required>
          <input
            value={city}
            onChange={(e) => setCity(e.target.value.slice(0, 60))}
            placeholder="Sua cidade"
            className="w-full rounded-2xl border-2 border-border bg-white px-5 py-4 text-base outline-none transition focus:border-brand-green"
          />
        </Field>
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

function SendingScreen() {
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
      <h3 className="mt-8 text-2xl font-bold">Enviando suas informações...</h3>
      <p className="mt-2 text-muted-foreground">
        Só mais um instante para confirmar sua condição especial.
      </p>
    </motion.div>
  );
}

function Field({
  label,
  required,
  error,
  children,
}: {
  label: string;
  required?: boolean;
  error?: string;
  children: React.ReactNode;
}) {
  return (
    <label className="block">
      <span className="mb-1.5 block text-sm font-semibold text-foreground">
        {label} {required && <span className="text-brand-guava">*</span>}
      </span>
      {children}
      {error && <span className="mt-1.5 block text-sm font-medium text-brand-guava">{error}</span>}
    </label>
  );
}

function InstagramEmbed({ url }: { url: string }) {
  return (
    <div className="shrink-0 snap-center overflow-hidden rounded-3xl bg-white shadow-sm ring-1 ring-brand-green/10">
      <blockquote
        className="instagram-media"
        data-instgrm-permalink={url}
        data-instgrm-version="14"
        style={{ margin: 0, width: 328 }}
      />
    </div>
  );
}

function InstagramShowcase() {
  useEffect(() => {
    const processEmbeds = () => window.instgrm?.Embeds.process();

    if (window.instgrm) {
      processEmbeds();
      return;
    }

    const existingScript = document.getElementById(
      "instagram-embed-script",
    ) as HTMLScriptElement | null;
    if (existingScript) {
      existingScript.addEventListener("load", processEmbeds);
      return () => existingScript.removeEventListener("load", processEmbeds);
    }

    const script = document.createElement("script");
    script.id = "instagram-embed-script";
    script.src = "https://www.instagram.com/embed.js";
    script.async = true;
    script.addEventListener("load", processEmbeds);
    document.body.appendChild(script);
  }, []);

  return (
    <div className="mx-[calc(50%-50vw)] mt-8 w-screen">
      <p className="mb-4 flex items-center justify-center gap-2 text-sm font-semibold text-muted-foreground">
        <Instagram className="h-4 w-4 text-brand-orange" />
        Quem já compra segue a gente no Instagram
      </p>
      <div className="flex snap-x snap-mandatory gap-4 overflow-x-auto px-6 pb-2">
        {INSTAGRAM_REELS.map((url) => (
          <InstagramEmbed key={url} url={url} />
        ))}
      </div>
    </div>
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
        {[
          "Entrega em até 48h (Teresina e região)",
          "Estoque garantido",
          "Sem cobrança de frete",
        ].map((b) => (
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

      <motion.a
        href={href}
        target="_blank"
        rel="noopener noreferrer"
        onClick={() => trackWhatsAppRedirect()}
        initial={{ opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.6 }}
        className="btn-primary btn-glow group mt-8 inline-flex items-center gap-2 rounded-full px-8 py-4 text-lg font-semibold"
      >
        <MessageCircle className="h-5 w-5" />
        Falar com especialista no WhatsApp
      </motion.a>

      <motion.div
        initial={{ opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.65 }}
        className="mt-8 flex items-center gap-3 rounded-2xl border border-brand-orange/30 bg-brand-orange/10 px-5 py-4 text-left"
      >
        <Sparkles className="h-5 w-5 shrink-0 text-brand-orange" />
        <p className="text-sm font-medium text-foreground">
          Estamos abrindo <strong>novas rotas de entrega</strong> na sua região. Fale agora com um
          especialista para garantir sua vaga.
        </p>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.7 }}
        className="w-full"
      >
        <InstagramShowcase />
      </motion.div>
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

type Stage = "landing" | "quiz" | "capture" | "sending" | "result";

// Tempo máximo de espera pelo webhook do CRM antes de seguir em frente de qualquer forma.
// Precisa cobrir o pior caso das retries em sendLeadWebhook (3 tentativas de até 6s cada,
// mais backoff entre elas, ~20s no total), senão o usuário é redirecionado ao WhatsApp
// antes das tentativas terminarem e o navegador cancela a chamada pendente, perdendo o lead.
const LEAD_WEBHOOK_TIMEOUT_MS = 23000;

function QuizFunnelPage() {
  const [stage, setStage] = useState<Stage>("landing");
  const [stepIndex, setStepIndex] = useState(0);
  const [answers, setAnswers] = useState<Answers>({});
  const [utmParams] = useState(() => captureUtmParams());

  const totalQuizSteps = QUESTIONS.length + 1; // + capture

  const start = () => {
    setStepIndex(0);
    setStage("quiz");
    window.scrollTo({ top: 0, behavior: "smooth" });
    trackQuizStarted();
  };

  const handleAnswer = (value: string) => {
    const q = QUESTIONS[stepIndex];
    setAnswers((a) => ({ ...a, [q.id]: value }));
    trackQuizStepAnswered(q.id, stepIndex + 1);
    if (stepIndex + 1 < QUESTIONS.length) {
      setStepIndex(stepIndex + 1);
    } else {
      setStage("capture");
    }
  };

  const handleBack = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
    if (stage === "capture") {
      setStepIndex(QUESTIONS.length - 1);
      setStage("quiz");
    } else if (stage === "quiz") {
      if (stepIndex === 0) {
        setStage("landing");
      } else {
        setStepIndex(stepIndex - 1);
      }
    }
  };

  const handleCapture = async (data: {
    name: string;
    whatsapp: string;
    cnpj: string;
    city: string;
  }) => {
    setAnswers((a) => ({ ...a, ...data }));
    trackLeadFormSubmitted();
    setStage("sending");

    // Mesmo event_id enviado ao CRM e usado no fbq do Pixel abaixo, para o Meta
    // deduplicar o "Lead" do Pixel com o "Lead" que o CRM dispara via Conversions API.
    const eventId = crypto.randomUUID();

    // Aguardamos o envio (com timeout de segurança) antes de avançar para a tela de
    // resultado, que redireciona ao WhatsApp em poucos segundos. Se navegarmos antes
    // do webhook terminar, o navegador cancela a requisição e o lead se perde.
    const webhookPromise = sendLeadWebhook({
      data: {
        ...data,
        business: answers.business,
        pain: answers.pain,
        volume: answers.volume,
        frequency: answers.frequency,
        ...utmParams,
        event_id: eventId,
      },
    })
      .then((result) => (result.ok ? ("success" as const) : ("failed" as const)))
      .catch((error) => {
        console.error("Falha ao enviar lead", error);
        return "failed" as const;
      });

    const outcome = await Promise.race([
      webhookPromise,
      new Promise<"timeout">((resolve) =>
        setTimeout(() => resolve("timeout"), LEAD_WEBHOOK_TIMEOUT_MS),
      ),
    ]);

    if (outcome === "success") trackLeadConfirmed(eventId);
    else if (outcome === "failed") trackLeadFailed();
    else trackLeadTimeout();

    setStage("result");
  };

  const currentStep = stage === "quiz" ? stepIndex + 1 : totalQuizSteps;

  return (
    <main className="min-h-screen bg-background">
      {stage === "landing" && (
        <>
          <Hero onStart={start} />
          <SocialProof />
          <ProductShowcase />
          <InstagramShowcase />
          <Benefits onStart={start} />
          <Footer />
        </>
      )}

      {stage !== "landing" && (
        <div className="relative min-h-screen bg-hero-radial">
          <OrganicBackdrop />
          <div className="relative">
            {stage !== "result" && stage !== "sending" && (
              <>
                <ProgressBar step={currentStep} total={totalQuizSteps} onBack={handleBack} />
                <PartnerTicker />
              </>
            )}
            <AnimatePresence mode="wait">
              {stage === "quiz" && (
                <QuestionCard
                  key={QUESTIONS[stepIndex].id}
                  q={QUESTIONS[stepIndex]}
                  onAnswer={handleAnswer}
                  initialValue={answers[QUESTIONS[stepIndex].id]}
                />
              )}
              {stage === "capture" && <CaptureForm key="capture" onSubmit={handleCapture} />}
              {stage === "sending" && <SendingScreen key="sending" />}
              {stage === "result" && <ResultScreen key="result" answers={answers} />}
            </AnimatePresence>
          </div>
        </div>
      )}
    </main>
  );
}
