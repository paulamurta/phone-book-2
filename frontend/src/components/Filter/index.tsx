import { useState } from "react";
import { Select } from "../Select";
import { FilterProps } from "./types";
import { Popover } from "@mui/material";
import { useTheme } from "styled-components";
import { Body3 } from "../../styles/typography";
import { ISelectCurrentValue } from "../Select/types";
import { Funnel, Eraser } from "@phosphor-icons/react";
import { useFetchGroups } from "../../hooks/useFetchGroups";
import {
  Container,
  FilterBtn,
  CountFilter,
  Row,
  ConfirmButton,
} from "./styles";

export function Filter({
  setGroup,
  width,
  isFilterOpen,
  anchorEl,
  handleOpenFilter,
  handleCloseFilter,
  refetch,
}: FilterProps) {
  const { colors: theme } = useTheme();
  const [filterCounter, setFilterCounter] = useState<number>(0);
  const [localGroup, setLocalGroup] = useState<ISelectCurrentValue | null>(
    null,
  );
  const { groups } = useFetchGroups();

  function setCounter() {
    const isLotSelected = localGroup?.id ? 1 : 0;
    setFilterCounter(isLotSelected);
  }

  function handleApply() {
    setGroup(localGroup);
    setCounter();
    handleCloseFilter();
    refetch();
  }

  function handleClear() {
    setGroup(null);
    setLocalGroup(null);
    setFilterCounter(0);
    refetch();
  }

  return (
    <Container>
      <FilterBtn onClick={handleOpenFilter}>
        <Funnel />
        Filter
        {filterCounter > 0 && <CountFilter>{filterCounter}</CountFilter>}
      </FilterBtn>

      <Popover
        open={isFilterOpen}
        anchorEl={anchorEl}
        onClose={handleCloseFilter}
        anchorOrigin={{
          vertical: "bottom",
          horizontal: "left",
        }}
        transformOrigin={{
          vertical: "top",
          horizontal: "left",
        }}
        disableAutoFocus
        elevation={2}
        style={{
          marginTop: "1vh",
        }}
        sx={{
          "& .MuiPaper-root": {
            borderRadius: "1vh",
            padding: "1vw",
            width: width ? width : "33vw",
            border: `1px solid ${theme.border.main}`,
            backgroundColor: theme.background.white,
            boxShadow: "2px 2px 10px #2d2d2d29",
            display: "flex",
            flexDirection: "column",
            gap: "2vh",
          },
        }}
      >
        <>
          <Body3 $bold>Groups</Body3>
          <Select
            required={true}
            width="100%"
            id="group"
            placeholder="None"
            key={"group"}
            values={groups}
            onChangeValue={(groupObject: ISelectCurrentValue | null) =>
              setLocalGroup(groupObject)
            }
            currentValue={localGroup}
            fullWidth
          />
        </>

        <Row $position={"flex-end"} $marginTop={"8vh"}>
          <ConfirmButton $clear onClick={handleClear}>
            <Eraser weight="bold" />
            Clear
          </ConfirmButton>
          <ConfirmButton disabled={!localGroup?.id} onClick={handleApply}>
            Apply
          </ConfirmButton>
        </Row>
      </Popover>
    </Container>
  );
}
