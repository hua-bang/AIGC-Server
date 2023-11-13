import { BasePromptValue } from './base-prompt-value';

export class StringPromptValue extends BasePromptValue {
  value: string;

  constructor(value: string) {
    super();
    this.value = value;
  }

  toString() {
    return this.value;
  }
}
