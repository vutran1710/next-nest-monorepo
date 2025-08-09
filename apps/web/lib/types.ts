export interface Transaction {
  id: number;
  signature: string;
  slot: number;
  blockTime: number;
  status: "success" | "fail";
  fee: number;
  memo?: string;
}

export interface SlotInfo {
  slotNumber: number;
  totalTransactions: number;
  totalSuccess: number;
  totalFail: number;
}
