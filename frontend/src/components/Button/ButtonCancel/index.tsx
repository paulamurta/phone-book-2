import { Button } from "./styles";
import { ButtonCancelProps } from "./types";

export function ButtonCancel({ label, width, height, type, disabled, onClick }: ButtonCancelProps) {
  return (
    <Button onClick={onClick} type={type} disabled={disabled} width={width} height={height}>
      {label}
    </Button>
  );
}
