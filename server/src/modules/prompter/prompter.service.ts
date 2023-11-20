import { Injectable } from '@nestjs/common';

@Injectable()
export class PrompterService {
  generatePrompt(id: string, customerPrompts: unknown) {
    if (!id) {
      return customerPrompts;
    }
    // TODO: find presetPrompt By id

    const presetPrompt = [
      {
        role: 'system',
        content: 'please answer in English',
      },
    ];

    return [
      ...presetPrompt,
      ...(Array.isArray(customerPrompts) ? customerPrompts : [customerPrompts]),
    ];
  }
}
