import { Injectable, BadRequestException } from '@nestjs/common';
import { ASRClient, Config } from 'coze-coding-dev-sdk';

@Injectable()
export class AsrService {
  private readonly asrClient: ASRClient;

  constructor() {
    const config = new Config();
    this.asrClient = new ASRClient(config);
  }

  async recognize(audioData: string): Promise<{ text: string }> {
    if (!audioData || audioData.length === 0) {
      throw new BadRequestException('音频数据为空');
    }

    console.log('音频数据长度:', audioData.length);
    console.log('音频数据预览:', audioData.substring(0, 100));

    try {
      const result = await this.asrClient.recognize({
        uid: 'mini-program-user',
        base64Data: audioData,
      });

      console.log('ASR 识别结果:', result.text);
      return { text: result.text };
    } catch (error) {
      console.error('ASR 识别失败:', error.message);
      throw new BadRequestException('语音识别失败，请重试');
    }
  }
}