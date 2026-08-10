"use client";

import {
  createContext,
  useCallback,
  useContext,
  useMemo,
  useState,
} from "react";
import { WaitlistDialog } from "./waitlist-dialog";

type WaitlistContextValue = {
  /**
   * `presetEmail` is for callers that have already taken the address, such as
   * the field on /bio. The dialog still asks for a category, because the API
   * will not take a signup without one.
   */
  open: (presetCategory?: string, presetEmail?: string) => void;
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
  const [email, setEmail] = useState("");

  const open = useCallback((presetCategory?: string, presetEmail?: string) => {
    if (presetCategory) setCategory(presetCategory);
    setEmail(presetEmail ?? "");
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
        initialEmail={email}
        onCategoryChange={setCategory}
      />
    </WaitlistContext.Provider>
  );
}
