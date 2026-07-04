import { Controller, Post, Body, HttpCode } from '@nestjs/common';
import { AsrService } from './asr.service';

@Controller('asr')
export class AsrController {
  constructor(private readonly asrService: AsrService) {}

  @Post('recognize')
  @HttpCode(200)
  async recognize(@Body() body: { audioData: string }) {
    const { audioData } = body;
    const result = await this.asrService.recognize(audioData);
    return { code: 200, msg: 'success', data: result };
  }
}