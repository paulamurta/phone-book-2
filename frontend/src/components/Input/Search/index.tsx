import { useState } from "react";
import { SearchProps } from "./types";
import { IoMdClose as CloseIcon } from "react-icons/io";
import { FiSearch as SearchIcon } from "react-icons/fi";
import { Container, IconBox } from "./styles";

export function Search({ inputWidth, message, onSearch }: SearchProps) {
  const [value, setValue] = useState("");

  function handleChange(e: React.ChangeEvent<HTMLInputElement>) {
    setValue(e.target.value);
    onSearch(e.target.value);
  }

  return (
    <Container size={inputWidth}>
      <IconBox>
        <SearchIcon />
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
          <CloseIcon />
        </IconBox>
      ) : (
        ""
      )}
    </Container>
  );
}
