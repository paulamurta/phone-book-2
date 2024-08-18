import { ConfirmButton } from "../../../Filter/styles";
import { Buttons, CalendarWrapper } from "../../styles";
import { CalendarContainerProps } from "./types";
import { Eraser } from "@phosphor-icons/react";

export default function CalendarContainer({
  children,
  handleClearDates,
  handleApplyDates,
  tempStartDate,
  tempEndDate,
  isSingleDate,
  tempSingleDate,
}: CalendarContainerProps) {
  return (
    <CalendarWrapper $singleDate={isSingleDate}>
      {children}
      <Buttons>
        <ConfirmButton $clear onClick={handleClearDates}>
          <Eraser weight="bold" />
          Clear
        </ConfirmButton>
        <ConfirmButton
          disabled={
            isSingleDate ? !tempSingleDate : !tempStartDate || !tempEndDate
          }
          onClick={handleApplyDates}
        >
          Apply
        </ConfirmButton>
      </Buttons>
    </CalendarWrapper>
  );
}
