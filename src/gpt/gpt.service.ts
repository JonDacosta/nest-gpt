/* eslint-disable prettier/prettier */
import { Injectable } from '@nestjs/common';

import OpenAI from 'openai';

import { orthographyCheckUseCase } from './use-cases';
import { OrthographyDto } from './dtos';

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
}