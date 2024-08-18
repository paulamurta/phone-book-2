/* eslint-disable @typescript-eslint/no-explicit-any */
import { TextFieldProps } from "@mui/material";

export type Option = {
  id: number;
  value: string;
};

export interface ISelectCurrentValue {
  id?: number | any;
  value?: string | any;
}
export interface ISelectOption {
  id: number;
  value: string;
}

export type SelectProps = {
  id?: string;
  isLoading?: boolean;
  label?: string;
  placeholder?: string;
  width?: string;
  keyError?: string;
  disabled?: boolean;
  readOnly?: boolean;
  setError?: (newValue: { field: string; message: string }) => void;
  removeError?: (newValue: string) => void;
  values?: Array<{
    id: any;
    value: string;
  }>;
  double?: boolean;
  currentValue?: ISelectCurrentValue | null;
  text?: string;
  noOptionsText?: string;
  onChangeValue: (newValue: ISelectCurrentValue | null) => void;
  showFixedText?: boolean;
  maxWidth?: string;
} & TextFieldProps;
