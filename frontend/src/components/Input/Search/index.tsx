import { useState } from "react";
import { SearchProps } from "./types";
import { X, MagnifyingGlass } from "@phosphor-icons/react";

import { Container, IconBox } from "./styles";

export function Search({ inputWidth, message, onSearch }: SearchProps) {
  const [value, setValue] = useState("");

  function handleChange(e: React.ChangeEvent<HTMLInputElement>) {
    setValue(e.target.value);
    onSearch(e.target.value);
  }

  return (
    <Container $size={inputWidth}>
      <IconBox>
        <MagnifyingGlass />
      </IconBox>
      <input
        type="text"
        placeholder={message ? message : `${"Search..."}`}
        value={value}
        onChange={handleChange}
      />
      {value ? (
        <IconBox
          onClick={() => {
            setValue("");
            onSearch("");
          }}
        >
          <X />
        </IconBox>
      ) : (
        ""
      )}
    </Container>
  );
}
