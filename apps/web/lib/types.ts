export interface Transaction {
  signature: string;
  status: "success" | "fail";
  timestamp: number;
  fee: number;
}

export interface SlotData {
  totalTransaction: number;
  totalSuccess: number;
  totalFail: number;
  blockTime: number | null;
  blockNumber: number;
  blockHash: string;
  transactions: Transaction[];
}
