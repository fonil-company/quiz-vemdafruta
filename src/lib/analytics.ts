declare global {
  interface Window {
    fbq?: (...args: unknown[]) => void;
    clarity?: (...args: unknown[]) => void;
  }
}

function fbqCustom(event: string, params?: Record<string, unknown>) {
  if (typeof window === "undefined") return;
  window.fbq?.("trackCustom", event, params);
}

// eventId, quando informado, vai como eventID (4º argumento do fbq) para o
// Pixel deduplicar com o evento equivalente disparado server-side via
// Conversions API pelo CRM.
function fbqStandard(event: string, params?: Record<string, unknown>, eventId?: string) {
  if (typeof window === "undefined") return;
  if (eventId) {
    window.fbq?.("track", event, params ?? {}, { eventID: eventId });
  } else {
    window.fbq?.("track", event, params);
  }
}

function clarityEvent(event: string) {
  if (typeof window === "undefined") return;
  window.clarity?.("event", event);
}

export function trackQuizStarted() {
  fbqCustom("QuizStarted");
  clarityEvent("quiz_started");
}

// O nome do evento leva o número da etapa (QuizStep1Answered, QuizStep2Answered...)
// em vez de um parâmetro, porque o Events Manager do Meta agrupa eventos
// customizados pelo nome — com um nome único por etapa, cada uma aparece
// separada na interface, sem precisar configurar Conversões Personalizadas
// para quebrar por parâmetro.
export function trackQuizStepAnswered(questionId: string, stepNumber: number) {
  fbqCustom(`QuizStep${stepNumber}Answered`, { question_id: questionId, step: stepNumber });
  clarityEvent(`quiz_step_${stepNumber}_${questionId}`);
}

export function trackCaptureViewed() {
  fbqCustom("QuizCaptureViewed");
  clarityEvent("quiz_capture_viewed");
}

export function trackLeadFormSubmitted() {
  fbqCustom("QuizFormSubmitted");
  clarityEvent("quiz_form_submitted");
}

// O evento padrão "Lead" do Pixel só dispara aqui, quando o webhook do CRM
// confirma o recebimento, para não reportar ao Meta uma conversão de lead
// que nunca chegou ao CRM. eventId é o mesmo enviado ao CRM, que dispara o
// "Lead" equivalente via Conversions API — precisa ser idêntico dos dois
// lados para a deduplicação (Pixel + CAPI) funcionar no Events Manager.
export function trackLeadConfirmed(eventId?: string) {
  fbqCustom("QuizLeadConfirmed");
  fbqStandard("Lead", undefined, eventId);
  clarityEvent("quiz_lead_confirmed");
}

export function trackLeadFailed() {
  fbqCustom("QuizLeadFailed");
  clarityEvent("quiz_lead_failed");
}

export function trackLeadTimeout() {
  fbqCustom("QuizLeadTimeout");
  clarityEvent("quiz_lead_timeout");
}

export function trackWhatsAppRedirect() {
  fbqCustom("QuizWhatsAppRedirect");
  clarityEvent("quiz_whatsapp_redirect");
}
