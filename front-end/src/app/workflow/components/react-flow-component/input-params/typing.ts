export interface InputParamsValue {
  name?: string;
  type?: InputParamsValueType;
  value?: string;
}

export enum InputParamsValueType {
  Reference = "reference",
  Input = "input",
}

export interface InputParamsProps {
  value?: InputParamsValue[];
  onChange?: (val: InputParamsValue[]) => void;
}
