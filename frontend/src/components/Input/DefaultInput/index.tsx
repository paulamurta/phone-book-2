import { Container, IconButton, InputContainer } from "./styles";
import { DefaultInputProps } from "./types";
import { LabelText, Small } from "../../../styles/typography";
import { Eye, EyeSlash } from "@phosphor-icons/react";
import { useState } from "react";

export function DefaultInput({
  label,
  placeholder,
  width,
  height,
  disabled,
  onChange,
  message,
  value,
  type = "text",
}: DefaultInputProps) {
  const [showPassword, setShowPassword] = useState(false);

  function handleChange(e: React.ChangeEvent<HTMLInputElement>) {
    const newValue = e.target.value;
    onChange(newValue);
  }

  function togglePasswordVisibility(e: React.MouseEvent<HTMLButtonElement>) {
    e.preventDefault();
    setShowPassword((prev) => !prev);
  }

  return (
    <Container>
      <LabelText>{label}</LabelText>
      <InputContainer $height={height} $width={width}>
        <input
          type={type === "password" && showPassword ? "text" : type}
          placeholder={placeholder ? placeholder : "Insert here..."}
          value={value || ""}
          onChange={handleChange}
          disabled={disabled ? disabled : false}
        />
        {type === "password" && (
          <IconButton onClick={togglePasswordVisibility}>
            {showPassword ? <EyeSlash /> : <Eye />}
          </IconButton>
        )}
      </InputContainer>
      {message && <Small>{message}</Small>}
    </Container>
  );
}
