import { CircularProgress } from "@mui/material";
import { Button } from "./styles";
import { ButtonConfirmProps } from "./types";
import { useTheme } from "styled-components";

export function ButtonConfirm({
  label,
  width,
  height,
  type,
  disabled,
  onClick,
  isLoading,
}: ButtonConfirmProps) {
  const { colors: theme } = useTheme();

  return (
    <Button
      onClick={onClick}
      type={type}
      disabled={disabled}
      width={width}
      height={height}
    >
      {!isLoading && label}
      {isLoading && (
        <CircularProgress
          size={16}
          disableShrink
          sx={{ color: theme.typography.white }}
        />
      )}
    </Button>
  );
}
