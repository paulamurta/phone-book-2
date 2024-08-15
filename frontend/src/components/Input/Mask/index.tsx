import { Container, StyledInputMask } from "./styles";
import { MaskInputProps } from "./types";
import { LabelText, Small } from "../../../styles/typography";

export function MaskInput({
  label,
  placeholder,
  width,
  height,
  disabled,
  onChange,
  message,
  mask,
  value,
}: MaskInputProps) {
  function handleChange(e: React.ChangeEvent<HTMLInputElement>) {
    const newValue = e.target.value;

    onChange(newValue);
  }

  return (
    <Container>
      <LabelText>{label}</LabelText>
      <StyledInputMask
        height={height}
        width={width}
        mask={mask}
        placeholder={placeholder}
        onChange={handleChange}
        disabled={disabled ? disabled : false}
        maskChar={null}
        value={value || ""}
      />
      {message && <Small>{message}</Small>}
    </Container>
  );
}
