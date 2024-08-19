import React, { useEffect, useState } from "react";
import "react-datepicker/dist/react-datepicker.css";
import CalendarContainer from "./components/CalendarContainer";
import DatePicker from "react-datepicker";
import { CalendarBlank as Calendar } from "@phosphor-icons/react";
import { CalendarIconBox, Wrapper, TextBox } from "./styles";
import { DateRangePickerProps } from "./types";
import { SvgIcon } from "@mui/material";
import { addDays, format } from "date-fns";

export default function DateRangePicker({
  startDate,
  setStartDate,
  endDate,
  setEndDate,
  setPage,
  refetch,
  isSingleDate,
  singleDate,
  setSingleDate,
  disabled,
  onlyFutureDates,
  onlyPastDates,
  maxRange,
}: DateRangePickerProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [minDate, setMinDate] = useState<Date | null>(null);
  const [maxDate, setMaxDate] = useState<Date | null>(null);
  const [tempStartDate, setTempStartDate] = useState<Date | null>(
    startDate || null,
  );
  const [tempEndDate, setTempEndDate] = useState<Date | null>(endDate || null);
  const [tempSingleDate, setTempSingleDate] = useState<Date | null>(
    singleDate || null,
  );
  const [inputValue, setInputValue] = useState<string>("DD, MM, AAAA*");

  useEffect(() => {
    if (isSingleDate) {
      singleDate
        ? setInputValue(format(singleDate, "dd MMM, yyyy"))
        : setInputValue("DD, MM, YYYY*");
    } else {
      startDate && endDate
        ? setInputValue(
            `${format(startDate, "dd MMM, yy")} - ${format(
              endDate,
              "dd MMM, yy",
            )}`,
          )
        : setInputValue("DD, MM, YYYY*");
    }
  }, [isSingleDate, singleDate, startDate, endDate]);

  useEffect(() => {
    if (isSingleDate) {
      if (onlyFutureDates) {
        setMinDate(new Date());
        setMaxDate(null);
      } else if (onlyPastDates) {
        setMaxDate(new Date());
        setMinDate(null);
      }
    }
  }, [isSingleDate, onlyFutureDates, onlyPastDates]);

  useEffect(() => {
    if (!isSingleDate && tempStartDate && maxRange) {
      const range = addDays(tempStartDate, maxRange);
      setMaxDate(range);
    } else {
      setMaxDate(null);
    }
  }, [isSingleDate, tempStartDate, maxRange]);

  const onChange = (dates: Date | [Date | null, Date | null]) => {
    if (isSingleDate) {
      setTempSingleDate(dates as Date);
    } else {
      const [start, end] = dates as [Date | null, Date | null];
      setTempStartDate(start);
      setTempEndDate(end);
    }
  };

  function handleClearDates() {
    setPage && setPage(0);
    setStartDate && setStartDate(null);
    setEndDate && setEndDate(null);
    setSingleDate && setSingleDate(null);
    setTempStartDate(null);
    setTempEndDate(null);
    setTempSingleDate(null);
    setInputValue("DD, MM, YYYY*");
    !isSingleDate && setMaxDate(null);
    refetch && refetch();
  }

  function handleApplyDates() {
    setPage && setPage(0);
    if (isSingleDate) {
      setSingleDate && setSingleDate(tempSingleDate);
    } else {
      setStartDate && setStartDate(tempStartDate);
      setEndDate && setEndDate(tempEndDate);
    }
    setIsOpen(false);
    refetch && refetch();
  }

  const CustomInput = React.forwardRef<
    HTMLInputElement,
    { value: string; onClick: () => void }
  >(({ value, onClick }, ref) => (
    <TextBox
      $disabled={disabled}
      $singleDate={isSingleDate}
      ref={ref}
      onClick={onClick}
    >
      {(startDate && endDate) || singleDate ? value : "DD, MM, YYYY*"}
    </TextBox>
  ));

  return (
    <Wrapper $disabled={disabled}>
      <CalendarIconBox
        $disabled={disabled}
        onClick={disabled ? () => {} : () => setIsOpen(!isOpen)}
        type="button"
      >
        <SvgIcon>
          <Calendar weight="fill" />
        </SvgIcon>
      </CalendarIconBox>
      <DatePicker
        selected={isSingleDate ? singleDate : tempStartDate}
        startDate={tempStartDate}
        endDate={tempEndDate}
        onChange={onChange}
        open={isOpen}
        showYearDropdown
        scrollableYearDropdown
        dropdownMode="select"
        onInputClick={disabled ? () => {} : () => setIsOpen(true)}
        onClickOutside={() => setIsOpen(false)}
        shouldCloseOnSelect={false}
        calendarStartDay={1}
        selectsRange={!isSingleDate}
        customInput={
          <CustomInput
            value={inputValue}
            onClick={disabled ? () => {} : () => setIsOpen(true)}
          />
        }
        calendarContainer={({ children }) => (
          <CalendarContainer
            children={children}
            handleClearDates={handleClearDates}
            handleApplyDates={handleApplyDates}
            tempStartDate={tempStartDate}
            tempEndDate={tempEndDate}
            tempSingleDate={tempSingleDate}
            isSingleDate={isSingleDate}
          />
        )}
        popperClassName="popper"
        maxDate={maxDate}
        minDate={minDate}
        dateFormat={isSingleDate ? "dd MMM, yyyy" : "dd MMM, yy"}
        showPopperArrow={false}
        popperPlacement="bottom"
      />
    </Wrapper>
  );
}
