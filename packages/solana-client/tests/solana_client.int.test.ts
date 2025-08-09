import { describe, it, expect, beforeAll } from "vitest";
import { Connection, clusterApiUrl } from "@solana/web3.js";
import { SolanaClient } from "../src";

const RPC =
  import.meta.env.VITE_SOLANA_RPC_URL || clusterApiUrl("mainnet-beta");

console.log(`[TEST-BOOT] Using RPC endpoint: ${RPC}`);

describe("SolanaClient (integration)", () => {
  let conn: Connection;
  let client: SolanaClient;

  beforeAll(() => {
    console.log("[SETUP] Initializing Solana connection and client...");
    conn = new Connection(RPC, "confirmed");
    client = new SolanaClient(RPC);
    console.log("[SETUP] Connection and client ready.");
  });

  async function findRecentBlockSlot(startSlot?: number): Promise<number> {
    console.log(
      `[FIND-BLOCK] Starting search from slot: ${startSlot ?? "latest"}`,
    );
    const latest = startSlot ?? (await conn.getSlot("confirmed"));
    console.log(`[FIND-BLOCK] Latest confirmed slot: ${latest}`);

    // Walk back up to 250 slots to find a slot with an available block
    for (let s = latest; s > latest - 250; s--) {
      console.log(`[FIND-BLOCK] Checking slot ${s}...`);
      const blk = await conn.getBlock(s, { maxSupportedTransactionVersion: 0 });
      if (blk) {
        console.log(`[FIND-BLOCK] Found valid block at slot ${s}`);
        return s;
      }
    }
    console.error("[FIND-BLOCK] Failed to find a block in the last 250 slots.");
    throw new Error("Could not find a recent block within 250 slots.");
  }

  it("returns SlotData with consistent counts and fields", async () => {
    console.log("[TEST] Looking for a recent valid slot...");
    const slot = await findRecentBlockSlot();
    console.log(`[TEST] Fetching SlotData for slot ${slot}...`);
    const data = await client.getSlotData(slot);
    console.log("[TEST] SlotData retrieved:", JSON.stringify(data, null, 2));

    if (!data) {
      console.error(`[ERROR] No block data found for slot ${slot}.`);
      throw new Error(
        `No block data found for slot ${slot}. It may be pruned or unavailable.`,
      );
    }

    // Basic shape
    console.log("[ASSERT] Checking blockNumber and blockHash...");
    expect(data.blockNumber).toBe(slot);
    expect(typeof data.blockHash).toBe("string");
    expect(data.blockHash.length).toBeGreaterThan(0);

    // Time / height are nullable in RPC
    if (data.blockTime !== null) {
      console.log("[ASSERT] blockTime is a number:", data.blockTime);
      expect(typeof data.blockTime).toBe("number");
    }

    // Transactions consistency
    console.log("[ASSERT] Validating transaction counts...");
    expect(Array.isArray(data.transactions)).toBe(true);
    expect(data.totalTransaction).toBe(data.transactions.length);
    expect(data.totalSuccess + data.totalFail).toBe(data.totalTransaction);

    // Sample per-tx checks
    console.log(
      `[ASSERT] Checking ${data.transactions.length} transactions...`,
    );
    for (const tx of data.transactions) {
      console.log(
        `[TX] ${tx.signature} | status=${tx.status} | fee=${tx.fee} | ts=${tx.timestamp}`,
      );
      expect(typeof tx.signature).toBe("string");
      expect(tx.status === "success" || tx.status === "fail").toBe(true);
      expect(typeof tx.timestamp).toBe("number");
      expect(typeof tx.fee).toBe("number");
      expect(tx.fee).toBeGreaterThanOrEqual(0);
    }

    console.log("[TEST] SlotData checks completed successfully.");
  });
});
