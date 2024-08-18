import { Paper } from "@mui/material";
import styled from "styled-components";

export interface IItem {
  $selected?: boolean;
}

export const PaperBox = styled(Paper)`
  & .MuiAutocomplete-noOptions {
    background-color: ${({ theme }) => theme.colors.input.unSelectedBg};
    color: ${({ theme }) => theme.colors.input.text};
    font-size: 1.7vh;
    font-family: "Inter 400";
  }

  & .MuiAutocomplete-option {
    background-color: ${({ theme }) => theme.colors.input.unSelectedBg};
    color: ${({ theme }) => theme.colors.input.text};
    font-size: 1.7vh;
    font-family: "Inter 400";
  }
  & .MuiAutocomplete-option[aria-selected="true"] {
    background-color: ${({ theme }) =>
      theme.colors.input.selectedBg} !important;
  }
  & .MuiAutocomplete-option.Mui-focused {
    background-color: ${({ theme }) => theme.colors.input.hover} !important;
  }
`;

export const ItemText = styled.p`
  font-size: 1.7vh !important;
  font-family: "Inter 400" !important;
  color: ${({ theme }) => theme.colors.input.text};
`;

export const LoadingBox = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
`;
