import { Module } from '@nestjs/common';
import { S2sController } from '../routes/s2s/s2s.controller';
import { S2sService } from '../routes/s2s/s2s.service';

@Module({
  imports: [],
  controllers: [S2sController],
  providers: [S2sService],
  exports: [],
})
export class S2sModule {}
