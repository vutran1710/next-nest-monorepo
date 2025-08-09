import { Connection, clusterApiUrl } from "@solana/web3.js";

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

export class SolanaClient {
  private connection: Connection;

  constructor(endpoint: string = clusterApiUrl("mainnet-beta")) {
    this.connection = new Connection(endpoint, "confirmed");
  }

  public async getSlotData(slotNumber: number): Promise<SlotData | null> {
    const block = await this.connection.getBlock(slotNumber, {
      maxSupportedTransactionVersion: 0,
    });

    if (!block) {
      return null;
    }

    const blockTime = block.blockTime ?? null;
    const blockHash = block.blockhash;

    let totalSuccess = 0;
    let totalFail = 0;

    const transactions: Transaction[] = block.transactions.map((tx) => {
      const status = tx.meta?.err ? "fail" : "success";
      if (status === "success") totalSuccess++;
      else totalFail++;

      return {
        signature: tx.transaction.signatures[0]!,
        status,
        timestamp: blockTime ?? 0,
        fee: tx.meta?.fee ?? 0,
      };
    });

    return {
      totalTransaction: transactions.length,
      totalSuccess,
      totalFail,
      blockTime,
      blockNumber: slotNumber,
      blockHash,
      transactions,
    };
  }
}
