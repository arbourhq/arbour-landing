"use client";

import { createContext, useCallback, useContext, useMemo, useState } from "react";
import { WaitlistDialog } from "./waitlist-dialog";

type WaitlistContextValue = {
  open: (presetCategory?: string) => void;
  close: () => void;
  /** The category chosen in the hero chips, used to preselect the dialog. */
  category: string | null;
  setCategory: (category: string) => void;
};

const WaitlistContext = createContext<WaitlistContextValue | null>(null);

export function useWaitlist() {
  const ctx = useContext(WaitlistContext);
  if (!ctx) {
    throw new Error("useWaitlist must be used inside <WaitlistProvider>");
  }
  return ctx;
}

export function WaitlistProvider({ children }: { children: React.ReactNode }) {
  const [isOpen, setIsOpen] = useState(false);
  const [category, setCategory] = useState<string | null>(null);

  const open = useCallback((presetCategory?: string) => {
    if (presetCategory) setCategory(presetCategory);
    setIsOpen(true);
  }, []);

  const close = useCallback(() => setIsOpen(false), []);

  const value = useMemo(
    () => ({ open, close, category, setCategory }),
    [open, close, category],
  );

  return (
    <WaitlistContext.Provider value={value}>
      {children}
      <WaitlistDialog
        isOpen={isOpen}
        onClose={close}
        initialCategory={category}
        onCategoryChange={setCategory}
      />
    </WaitlistContext.Provider>
  );
}
