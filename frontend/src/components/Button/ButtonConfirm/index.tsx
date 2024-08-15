import { Button } from "./styles";
import { ButtonConfirmProps } from "./types";

export function ButtonConfirm({
  label,
  width,
  height,
  type,
  disabled,
  onClick,
}: ButtonConfirmProps) {
  return (
    <Button onClick={onClick} type={type} disabled={disabled} width={width} height={height}>
      {label}
    </Button>
  );
}
