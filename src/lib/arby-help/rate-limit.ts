/** A bounded, per-process backstop. Use hosting rate limits across instances. */
export function createRateLimit() {
  const visitors = new Map<string, { count: number; expires: number }>();
  let total = { count: 0, expires: 0 };
  return (key: string, now = Date.now()) => {
    if (total.expires <= now) {
      total = { count: 0, expires: now + 60_000 };
      for (const [id, entry] of visitors)
        if (entry.expires <= now) visitors.delete(id);
    }
    if (total.count >= 60) return false;
    let visitor = visitors.get(key);
    if (!visitor || visitor.expires <= now) {
      if (!visitor && visitors.size >= 2000) return false;
      visitor = { count: 0, expires: now + 60_000 };
      visitors.set(key, visitor);
    }
    if (visitor.count >= 12) return false;
    visitor.count += 1;
    total.count += 1;
    return true;
  };
}
