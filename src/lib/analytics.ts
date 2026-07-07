declare global {
  interface Window {
    fbq?: (...args: unknown[]) => void;
    clarity?: (...args: unknown[]) => void;
  }
}

export function trackLeadEvent() {
  if (typeof window === "undefined") return;
  window.fbq?.("track", "Lead");
  window.clarity?.("event", "lead_submitted");
}
