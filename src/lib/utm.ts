const UTM_STORAGE_KEY = "vdf_utm_params";

const TRACKED_PARAM_KEYS = [
  "utm_source",
  "utm_medium",
  "utm_campaign",
  "utm_term",
  "utm_content",
  "fbclid",
  "gclid",
] as const;

export type UtmParams = Partial<Record<(typeof TRACKED_PARAM_KEYS)[number], string>>;

function readStoredUtmParams(): UtmParams {
  try {
    const raw = sessionStorage.getItem(UTM_STORAGE_KEY);
    return raw ? JSON.parse(raw) : {};
  } catch {
    return {};
  }
}

// Lê os parâmetros de tracking da URL de entrada e funde com o que já estava
// salvo na sessão — assim, se o usuário navegar dentro do funil e a URL não
// carregar mais os UTMs (ex.: refresh numa etapa), a atribuição original do
// clique no anúncio não se perde.
export function captureUtmParams(): UtmParams {
  if (typeof window === "undefined") return {};

  const search = new URLSearchParams(window.location.search);
  const fromUrl: UtmParams = {};
  for (const key of TRACKED_PARAM_KEYS) {
    const value = search.get(key);
    if (value) fromUrl[key] = value;
  }

  const merged = { ...readStoredUtmParams(), ...fromUrl };

  if (Object.keys(fromUrl).length > 0) {
    try {
      sessionStorage.setItem(UTM_STORAGE_KEY, JSON.stringify(merged));
    } catch {
      // sessionStorage indisponível (ex. modo privado) — segue só com o que veio da URL
    }
  }

  return merged;
}
