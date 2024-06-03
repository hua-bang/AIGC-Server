export interface OutputParameter {
  type: string;
  name: string;
  required: boolean;
  description: string;
  schema?: OutputParameter;
}
