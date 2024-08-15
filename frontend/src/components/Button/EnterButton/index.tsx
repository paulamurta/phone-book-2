import { Button } from "./styles";

export function EnterButton({ width, onClick, text, icon }: any) {
  return (
    <Button $width={width} onClick={onClick}>
      {text}
      {icon && icon}
    </Button>
  );
}
