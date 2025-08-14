const hits = new Map<string, { count: number; reset: number }>();

export function allow(ip: string, limit = 8, windowMs = 60_000) {
  const now = Date.now();
  const rec = hits.get(ip);
  if (!rec || now > rec.reset) {
    hits.set(ip, { count: 1, reset: now + windowMs });
    return { ok: true, remaining: limit - 1 };
  }
  if (rec.count >= limit)
    return { ok: false, remaining: 0, retryAfterMs: rec.reset - now };
  rec.count++;
  return { ok: true, remaining: limit - rec.count };
}
