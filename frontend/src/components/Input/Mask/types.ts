import { DefaultInputProps } from "../DefaultInput/types";

export interface MaskInputProps extends DefaultInputProps {
  mask: string;
}

export interface IContainer {
  height?: string;
  width?: string;
}
