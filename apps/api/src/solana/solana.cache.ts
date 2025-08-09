import { Injectable } from '@nestjs/common';
import { LRUCache } from 'lru-cache';
import type { SlotData } from '@repo/solana-client';

export type CachedValue = SlotData | string; // string for not-found slots

export interface SolanaCacheOptions {
  max?: number;
  ttlMs?: number; // success cache TTL
  negativeTtlMs?: number; // not-found cache TTL
}

@Injectable()
export class SolanaCache {
  private cache: LRUCache<string, CachedValue>;
  private ttl: number;
  private negTtl: number;

  constructor(opts: SolanaCacheOptions = {}) {
    const {
      max = Number(process.env.SOLANA_CACHE_MAX ?? 500),
      ttlMs = Number(process.env.SOLANA_CACHE_TTL_MS ?? 30_000),
      negativeTtlMs = Number(process.env.SOLANA_CACHE_NEGATIVE_TTL_MS ?? 5_000),
    } = opts;

    this.cache = new LRUCache<string, CachedValue>({ max });
    this.ttl = ttlMs;
    this.negTtl = negativeTtlMs;
  }

  private key(slot: number) {
    return `slot:${slot}`;
  }

  get(slot: number): CachedValue | undefined {
    return this.cache.get(this.key(slot));
  }

  set(slot: number, value: CachedValue) {
    const ttl = value ? this.ttl : this.negTtl;
    this.cache.set(this.key(slot), value, { ttl });
  }

  del(slot: number) {
    this.cache.delete(this.key(slot));
  }

  clear() {
    this.cache.clear();
  }
}
