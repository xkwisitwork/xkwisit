export type BotChallenge = {
  challengeId: string;
  issuedAt: number;
  signature: string;
  minWaitMs: number;
  expiresInMs: number;
};

/** Fields merged into public form POST bodies. */
export type BotShieldFields = {
  /** Honeypot — must stay empty. */
  _hp: string;
  _bc: string;
  _bts: number;
  _bsig: string;
};
