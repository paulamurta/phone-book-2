export type DefaultInputProps = {
  label?: string;
  placeholder?: string;
  disabled?: boolean;
  height?: string;
  width?: string;
  message?: string;
  onChange: (value: string) => void;
  value?: string;
  type?: string;
};

export interface IContainer {
  $height?: string;
  $width?: string;
}
