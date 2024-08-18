import TextField from "@mui/material/TextField";
import Autocomplete from "@mui/material/Autocomplete";
import { useState, useEffect } from "react";
import { Option, SelectProps } from "./types";
import { useTheme } from "styled-components";
import { CaretDown as ArrowDown } from "@phosphor-icons/react";
import { ItemText, PaperBox, LoadingBox } from "./styles";
import { CircularProgress } from "@mui/material";

export function Select({
  id,
  width,
  placeholder,
  label,
  values,
  currentValue,
  disabled,
  double,
  text,
  onChangeValue,
  required,
  keyError,
  setError,
  removeError,
  isLoading,
  showFixedText,
  maxWidth,
  ...rest
}: SelectProps) {
  const useWidth = width;
  const [open, setOpen] = useState(false);
  const [options, setOptions] = useState<readonly Option[]>([]);
  const { colors: theme } = useTheme();

  useEffect(() => {
    if (open) {
      if (isLoading) {
        setOptions([]);
      } else {
        setOptions(values || []);
      }
    }
  }, [open, isLoading, values]);

  return (
    <Autocomplete
      PaperComponent={({ children }) => <PaperBox>{children}</PaperBox>}
      fullWidth={true}
      id={id}
      loading={isLoading}
      loadingText={
        <LoadingBox>
          <CircularProgress color="inherit" size={20} />
        </LoadingBox>
      }
      open={open}
      noOptionsText="Sem resultados"
      onOpen={() => {
        setOpen(true);
      }}
      onClose={() => setOpen(false)}
      popupIcon={<ArrowDown weight="bold" />}
      disabled={disabled}
      renderOption={(props, option) => (
        <li {...props}>
          <ItemText>{option.value}</ItemText>
        </li>
      )}
      ListboxProps={{
        style: {
          maxHeight: "25vh",
          backgroundColor: `${theme.input.unSelectedBg}`,
        },
      }}
      sx={{
        ".MuiOutlinedInput-root": {
          padding: 0,
          position: "relative",
        },
        "& .MuiAutocomplete-endAdornment": {
          right: "1.1vw",
        },
        "& .MuiInputBase-root": {
          paddingRight: "1.2vw !important",
          paddingLeft: "1.2vw !important",
          fontSize: "clamp(1.7vh, 0.5rem + 4vh, 1.8vh)",
          fontFamily: "Inter 400",
          height: "5vh",
          borderRadius: "10vh",
          backgroundColor: "transparent",
          color: `${theme.input.text}`,
          "& .Mui-disabled": {
            "-webkit-text-fill-color": theme.input.disabled,
            "& svg": {
              color: `${theme.input.disabled}`,
            },
          },
        },
        "& fieldset": {
          borderColor: `${theme.input.border} !important`,
          borderWidth: "1.5px",
        },
        "&:hover fieldset": {
          borderColor: `${theme.primary.main} !important`,
        },
        "& .Mui-focused fieldset": {
          borderColor: `${theme.primary.main} !important`,
        },
        "&.Mui-error": {
          "& fieldset": {
            borderColor: `${theme.danger.main} !important`,
          },
          "& input, & textarea": {
            "&::placeholder": {
              color: `${theme.danger.main} !important`,
            },
          },
        },
        "& .Mui-disabled fieldset": {
          borderColor: `${theme.input.disabled} !important`,
        },
        "& input": {
          paddingLeft: 0,
          paddingRight: 0,
          fontSize: "clamp(1.7vh, 0.5rem + 4vh, 1.8vh)",
          fontFamily: "Inter 400",
          "&::placeholder": {
            fontFamily: "Inter 400",
            fontSize: "clamp(1.7vh, 0.5rem + 4vh, 1.8vh)",
            color: `${theme.input.placeholder} !important`,
            opacity: 1,
          },
          "&:-webkit-autofill": {
            WebkitTextFillColor: `${theme.input.text}`,
            border: "none",
            boxShadow: "none",
          },
        },
      }}
      isOptionEqualToValue={(option, values) => option.id === values.id}
      getOptionLabel={(option) =>
        double ? `${option.id} - ${option.value}` : `${option.value}`
      }
      options={isLoading ? [] : options}
      value={currentValue || null}
      onChange={(_e, newValue) => {
        onChangeValue(newValue);
        if (required && !newValue) {
          setError &&
            keyError &&
            setError({ field: keyError, message: "Choose an option" });
        } else {
          removeError && keyError && removeError(keyError);
        }
      }}
      style={{ width: useWidth }}
      renderInput={(params) => (
        <TextField
          {...params}
          error={!!rest.error}
          variant="outlined"
          placeholder={placeholder}
          type="text"
          sx={{
            "& svg": {
              color: `${theme.input.border}`,
              height: "2vh",
              width: "2vh",
            },
          }}
          InputProps={{
            ...params.InputProps,
            endAdornment: <>{params.InputProps.endAdornment}</>,
          }}
        />
      )}
    />
  );
}
