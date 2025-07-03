import { TTSService } from './tts.service.interface';
import { Emotion, TTSOptions, TTSResult } from './types';

/**
 * Заглушка для ElevenLabs TTS сервиса
 * TODO: Реализовать полный функционал
 */
export class ElevenLabsTTS implements TTSService {
  constructor(_apiKey: string) {
    // TODO: использовать apiKey для реального подключения к ElevenLabs
  }

  async convertTextToSpeech(text: string, options?: TTSOptions): Promise<TTSResult> {
    // Заглушка - возвращает пустой результат
    console.log(`ElevenLabs TTS: Converting text "${text}" with options:`, options);
    
    return {
      audio: Buffer.alloc(0),
      duration: 0,
      format: 'mp3' as any,
      cached: false,
    };
  }

  async generateEmotionalSpeech(text: string, emotion: Emotion): Promise<TTSResult> {
    console.log(`ElevenLabs TTS: Generating emotional speech for "${text}" with emotion: ${emotion}`);
    
    return {
      audio: Buffer.alloc(0),
      duration: 0,
      format: 'mp3' as any,
      cached: false,
    };
  }

  async getCachedAudio(key: string): Promise<TTSResult | null> {
    console.log(`ElevenLabs TTS: Getting cached audio for key: ${key}`);
    return null;
  }

  async clearCache(): Promise<void> {
    console.log('ElevenLabs TTS: Clearing cache');
  }
}
