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
   * the field on /bio. The category is always asked for, never preselected,
   * because a chip chosen elsewhere on the page is a browse, not an answer.
   */
  open: (presetEmail?: string) => void;
  close: () => void;
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
  const [email, setEmail] = useState("");

  const open = useCallback((presetEmail?: string) => {
    setEmail(presetEmail ?? "");
    setIsOpen(true);
  }, []);

  const close = useCallback(() => setIsOpen(false), []);

  const value = useMemo(() => ({ open, close }), [open, close]);

  return (
    <WaitlistContext.Provider value={value}>
      {children}
      <WaitlistDialog isOpen={isOpen} onClose={close} initialEmail={email} />
    </WaitlistContext.Provider>
  );
}
