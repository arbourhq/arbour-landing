/**
 * The ARIA tabs contract: arrows move between tabs, Home and End jump, and
 * only the active tab sits in the Tab order. Selection follows focus.
 */
export function onTabKey(
  event: React.KeyboardEvent<HTMLButtonElement>,
  index: number,
  count: number,
  select: (next: number) => void,
) {
  const step: Record<string, number | undefined> = {
    ArrowRight: index + 1,
    ArrowDown: index + 1,
    ArrowLeft: index - 1,
    ArrowUp: index - 1,
    Home: 0,
    End: count - 1,
  };
  const target = step[event.key];
  if (target === undefined) return;
  event.preventDefault();
  const next = (target + count) % count;
  select(next);
  const tabs = event.currentTarget.parentElement?.children;
  (tabs?.[next] as HTMLElement | undefined)?.focus();
}
