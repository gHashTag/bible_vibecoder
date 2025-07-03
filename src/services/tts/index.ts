import { TTSService } from './tts.service.interface';
import { ElevenLabsTTS } from './elevenlabs-tts.service';

export const ttsServiceFactory = (
  provider: 'elevenlabs' | 'openai' | 'google',
  apiKey?: string
): TTSService => {
  switch (provider) {
    case 'elevenlabs':
      if (!apiKey) throw new Error('ElevenLabs API key is required');
      return new ElevenLabsTTS(apiKey);
    // case 'openai':
    // 	// if (!apiKey) throw new Error('OpenAI API key is required');
    // 	// return new OpenAITextToSpeechService({ apiKey });
    default:
      throw new Error('Invalid TTS provider');
  }
};
