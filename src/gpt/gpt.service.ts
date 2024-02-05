/* eslint-disable prettier/prettier */
import { Injectable } from '@nestjs/common';

import OpenAI from 'openai';

import { orthographyCheckUseCase, prosConsDiscusserStreamUseCase, prosConsDiscusserUseCase } from './use-cases';
import { OrthographyDto, ProsConsDiscusserDto } from './dtos';
import { TranslateDto } from './dtos/translate.dto';
import { translateUseCase } from './use-cases/translate.use-case';

@Injectable()
export class GptService {
    
    private openai = new OpenAI({
        apiKey: process.env.OPENAI_API_KEY,
      })

    // Solo va a llamar caso de uso
    async orthographyCheck(orthographyDto: OrthographyDto) {
        return await orthographyCheckUseCase( this.openai, {
            prompt: orthographyDto.prompt,
        });

    }
    async prosConsDiscusser(prosConsDiscusserDto: ProsConsDiscusserDto) {
        return await prosConsDiscusserUseCase(this.openai, {
            prompt: prosConsDiscusserDto.prompt
        });
    }

    async prosConsDiscusserStream(prosConsDiscusserDto: ProsConsDiscusserDto) {
        return await prosConsDiscusserStreamUseCase(this.openai, {
            prompt: prosConsDiscusserDto.prompt
        });
    }

    async translateText({ prompt, lang }: TranslateDto) {
        return await translateUseCase(this.openai, {
            prompt, lang
        });
    }
}