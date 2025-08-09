import {
  Controller,
  Get,
  Param,
  ParseIntPipe,
  BadRequestException,
  NotFoundException,
  InternalServerErrorException,
} from '@nestjs/common';
import { SolanaService } from './solana.service';
import { SlotData } from '@repo/solana-client';

@Controller('data/solana')
export class SolanaController {
  constructor(private readonly solana: SolanaService) {}

  @Get(':slotNumber')
  async bySlot(
    @Param('slotNumber', ParseIntPipe) slotNumber: number,
  ): Promise<SlotData> {
    console.info('Querying Solana slot data for slot:', slotNumber);

    // 400: negative slot
    if (slotNumber < 0) {
      throw new BadRequestException('slotNumber must be >= 0');
    }

    try {
      const data = await this.solana.getSlotData(slotNumber);

      // 404: not found/null
      if (!data) {
        throw new NotFoundException(`Slot ${slotNumber} not found`);
      }

      // ok
      return data;
    } catch (err: any) {
      // 500: unexpected errors
      throw new InternalServerErrorException(
        err?.message ?? 'Internal server error',
      );
    }
  }
}
