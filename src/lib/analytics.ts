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

// Dispara só quando o webhook confirma que o CRM recebeu o lead. O Newtracking
// já envia o evento "Lead" para o Meta via Conversions API (server-side) nesse
// mesmo momento, então de propósito NÃO disparamos o "Lead" padrão do Pixel
// aqui — isso duplicaria a conversão no Ads Manager, já que as duas chamadas
// não compartilham um event_id para dedupe.
export function trackLeadConfirmed() {
  fbqCustom("QuizLeadConfirmed");
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
