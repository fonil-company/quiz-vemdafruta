import { createServerFn } from "@tanstack/react-start";

const LEAD_WEBHOOK_URL =
  "https://newtracking-sales-sys.vercel.app/api/webhooks/leads/cmr9kdbyd0004h244iknwq0fb";

export type LeadWebhookInput = {
  name: string;
  whatsapp: string;
  cnpj: string;
  city?: string;
  business?: string;
  pain?: string;
  volume?: string;
  frequency?: string;
};

function buildObservacoes(data: LeadWebhookInput) {
  const linhas = [
    `Nome: ${data.name}`,
    `WhatsApp: ${data.whatsapp}`,
    `CNPJ: ${data.cnpj}`,
    `Cidade: ${data.city?.trim() || "não informada"}`,
    `Tipo de negócio: ${data.business ?? "não informado"}`,
    `Maior dificuldade hoje: ${data.pain ?? "não informado"}`,
    `Volume de compra mensal: ${data.volume ?? "não informado"}`,
    `Frequência de compra: ${data.frequency ?? "não informado"}`,
  ];
  return [
    "Lead qualificado pelo quiz Vem da Fruta.",
    "",
    "Dados preenchidos:",
    ...linhas.map((linha) => `- ${linha}`),
  ].join("\n");
}

// Roda no servidor para evitar CORS e não expor o endpoint/token no client.
export const sendLeadWebhook = createServerFn({ method: "POST" })
  .validator((data: LeadWebhookInput) => data)
  .handler(async ({ data }) => {
    const payload = {
      name: data.name,
      phone: data.whatsapp.replace(/\D/g, ""),
      document: data.cnpj.replace(/\D/g, ""),
      city: data.city?.trim() || undefined,
      pipeline_stage: "Qualificado",
      observacoes: buildObservacoes(data),
      notes: buildObservacoes(data),
    };

    try {
      const response = await fetch(LEAD_WEBHOOK_URL, {
        method: "POST",
        headers: { "content-type": "application/json" },
        body: JSON.stringify(payload),
      });
      if (!response.ok) {
        console.error("Lead webhook respondeu com erro", response.status, await response.text());
      }
    } catch (error) {
      console.error("Falha ao enviar lead para o webhook", error);
    }

    return { ok: true };
  });
