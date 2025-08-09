import { Injectable } from '@nestjs/common';
import { SolanaClient, SlotData } from '@repo/solana-client';

@Injectable()
export class SolanaService {
  constructor(private readonly client: SolanaClient) {}

  getSlotData(slot: number): Promise<SlotData | null> {
    return this.client.getSlotData(slot);
  }
}
