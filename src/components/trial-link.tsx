import { APP } from "@/content/site";
import {
  buttonClass,
  type ButtonSize,
  type ButtonVariant,
} from "@/components/ui/button";

/**
 * Every call to action on the site. It is a plain link to the console's
 * sign-up, which takes name, email and password and starts the 14-day trial
 * without a card. No dialog, no form of our own: the product owns sign-up.
 */
export function TrialLink({
  children = "Start free trial",
  variant = "acid",
  size = "md",
  className,
}: {
  children?: React.ReactNode;
  variant?: ButtonVariant;
  size?: ButtonSize;
  className?: string;
}) {
  return (
    <a href={APP.signUp} className={buttonClass(variant, size, className)}>
      {children}
    </a>
  );
}
