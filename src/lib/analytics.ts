// Sends named moments ("Hire form sent", "App opened: Gold Kinen"…) to
// Microsoft Clarity, so recordings can be filtered by what people did.
// Does nothing until Clarity has loaded (or when a visitor said no).

type ClarityFn = (...args: unknown[]) => void;

function clarity(): ClarityFn | null {
  if (typeof window === "undefined") return null;
  const fn = (window as unknown as { clarity?: ClarityFn }).clarity;
  return typeof fn === "function" ? fn : null;
}

export function track(event: string) {
  clarity()?.("event", event.slice(0, 120));
}

// Session-level labels, e.g. which button opened the hire form.
export function tag(key: string, value: string) {
  clarity()?.("set", key, value.slice(0, 120));
}
