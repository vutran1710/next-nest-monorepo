import { Module } from '@nestjs/common';
import { SolanaService } from './solana.service';
import { SolanaController } from './solana.controller';
import { SolanaClient } from '@repo/solana-client';

@Module({
  controllers: [SolanaController],
  providers: [
    SolanaService,
    {
      provide: SolanaClient,
      useFactory: () =>
        new SolanaClient(
          process.env.SOLANA_RPC_URL || 'https://api.mainnet-beta.solana.com',
        ),
    },
  ],
})
export class SolanaModule {}
