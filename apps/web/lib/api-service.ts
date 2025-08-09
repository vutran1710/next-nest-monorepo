import { SlotData } from "./types";

export class ApiService {
  constructor(private baseURL: string) {
    if (!baseURL) throw new Error("ApiService: baseURL is required");
    this.baseURL = baseURL.replace(/\/+$/, "");
  }

  private urlForSlot(slot: number) {
    if (!Number.isInteger(slot) || slot < 0) {
      throw new Error(`Invalid slot: ${slot}`);
    }
    return `${this.baseURL}/data/solana/${slot}`;
  }

  /**
   * GET {base}/data/solana/:slot
   */
  async getSolanaData(slot: number): Promise<SlotData> {
    const url = this.urlForSlot(slot);

    const res = await fetch(url, {
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
    });

    if (!res.ok) {
      const resp = await res.json();
      const text =
        resp?.message || resp?.error || `Error fetching slot ${slot}`;
      console.error(`[API-ERROR] ${text}`);
      throw new Error(text);
    }

    return res.json() as Promise<SlotData>;
  }
}

export const api = new ApiService(
  process.env.BACKEND_URL || "http://localhost:3001",
);
