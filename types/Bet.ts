export type Bet = {
  timestamp: string;
  tx_id: string;
  account: string;
  status: number;
  amount: string;
  gainLossAmount: string;
  value: number;
  roll: number;
  vrf_proof: string;
  vrf_hash: string;
  roll_tx_id: string;
};

export enum BetStatus {
  NOT_ROLLED = 0,
  WON,
  LOST,
}
