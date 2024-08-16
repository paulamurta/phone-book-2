import { Button } from "./styles";
import { CommonButtonProps } from "./types";

export function CommonButton({
  width,
  onClick,
  text,
  icon,
  color,
}: CommonButtonProps) {
  return (
    <Button $color={color} $width={width} onClick={onClick}>
      {text}
      {icon && icon}
    </Button>
  );
}
