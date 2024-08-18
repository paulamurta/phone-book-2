import { Button } from "./styles";
import { CommonButtonProps } from "./types";

export function CommonButton({
  width,
  onClick,
  text,
  icon,
  color,
  disabled,
}: CommonButtonProps) {
  return (
    <Button $color={color} $width={width} onClick={onClick} disabled={disabled}>
      {text}
      {icon && icon}
    </Button>
  );
}
