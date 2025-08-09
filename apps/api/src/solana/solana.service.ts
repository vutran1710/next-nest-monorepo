import { Injectable } from '@nestjs/common';
import { SolanaClient, SlotData } from '@repo/solana-client';
import { SolanaCache } from './solana.cache';

@Injectable()
export class SolanaService {
  constructor(
    private readonly client: SolanaClient,
    private readonly cache: SolanaCache,
  ) {}

  async getSlotData(slot: number): Promise<SlotData | null> {
    const hit = this.cache.get(slot);

    if (hit) {
      if (typeof hit === 'string') {
        console.warn(`Cache hit for negative value slot=${slot}: ${hit}`);
        return null;
      }
      console.info(`Cache hit for slot=${slot}`);
      return hit;
    }

    console.info(`Cache miss for slot=${slot}, fetching from client...`);
    const data = await this.client.getSlotData(slot);
    this.cache.set(slot, data ?? 'not-found');
    return data;
  }
}
