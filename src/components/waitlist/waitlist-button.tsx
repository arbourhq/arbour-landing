"use client";

import {
  buttonClass,
  type ButtonSize,
  type ButtonVariant,
} from "@/components/ui/button";
import { useWaitlist } from "./waitlist-context";

export function WaitlistButton({
  children = "Join the waitlist",
  variant = "acid",
  size = "md",
  className,
}: {
  children?: React.ReactNode;
  variant?: ButtonVariant;
  size?: ButtonSize;
  className?: string;
}) {
  const { open } = useWaitlist();

  return (
    <button
      type="button"
      onClick={() => open()}
      className={buttonClass(variant, size, className)}
    >
      {children}
    </button>
  );
}
