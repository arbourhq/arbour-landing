export type WaitlistSignup = {
  email: string;
  /** One of the eleven vendor categories. */
  category: string;
};

export type WaitlistResult =
  | { ok: true; alreadyOnList: boolean }
  | { ok: false; reason: string };

/**
 * Resend is the temporary home for the waitlist. The eventual destination is
 * Pipedrive, so everything the site knows about storing a signup is behind
 * this one method: swapping providers should not touch a component.
 */
export interface WaitlistProvider {
  readonly name: string;
  add(signup: WaitlistSignup): Promise<WaitlistResult>;
}
