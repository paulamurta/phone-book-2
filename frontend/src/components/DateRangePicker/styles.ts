import styled from "styled-components";

interface IBox {
  $singleDate?: boolean;
  $disabled?: boolean;
}

export const Wrapper = styled.div<IBox>`
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: transparent;
  border-radius: 10vh;
  z-index: 10;
  border: 1.5px solid
    ${({ $disabled, theme }) =>
      $disabled ? theme.colors.input.disabled : theme.colors.border.main};
  padding: 0 1vw;
  height: 5vh;

  width: fit-content;

  &:hover {
    cursor: ${({ $disabled }) => ($disabled ? "not-allowed" : "pointer")};
    background-color: ${({ theme, $disabled }) =>
      $disabled ? "transparent" : theme.colors.calendar.inputHover};
    transition: all 0.2s ease-in;
  }

  .popper {
    padding: 0;
    margin-top: 1vw;

    .react-datepicker__navigation {
      top: 1vh;

      ::before {
        border-width: 0.3vh 0.3vh 0 0;
        height: 0.6vh;
        top: calc(50% - 0.3vh);
        width: 0.6vh;
        border-color: ${({ theme }) => theme.colors.calendar.weekDays};
      }
    }

    .react-datepicker__navigation--previous {
      left: 0.5vw;
    }

    .react-datepicker__navigation--next {
      right: 0.5vw;
    }
  }

  .react-datepicker-wrapper {
    width: 100%;
    height: 100%;
    display: flex;
    justify-content: center;
  }
  .react-datepicker__month-container {
  }

  .react-datepicker__header {
    background-color: transparent;
    border: none;
  }

  .react-datepicker__current-month {
    text-transform: capitalize;
    color: ${({ theme }) => theme.colors.calendar.month};
    margin-bottom: 1vh;
    font-family: "Inter 600", sans-serif;
    font-size: clamp(1.2vh, 0.3rem + 1vh, 2.5vh);
  }

  .react-datepicker__day-name {
    text-transform: capitalize;
    color: ${({ theme }) => theme.colors.calendar.weekDays};
    font-size: clamp(1.2vh, 0.3rem + 1vh, 2.5vh);

    font-family: "Inter 400", sans-serif;
    width: calc((100% - 14 * 0.1vh) / 7);
    margin: 0 0.1vh;
    height: 100%;
  }

  .react-datepicker__month {
    padding: 0;
    margin: 0;
  }

  .react-datepicker__year-read-view {
    display: flex;
    margin-top: 2vh;
    color: ${({ theme }) => theme.colors.calendar.month};
    margin-bottom: 1vh;
    font-family: "Inter 600", sans-serif;
    font-size: clamp(1.2vh, 0.3rem + 1vh, 2.5vh);
  }

  .react-datepicker__year-select {
    height: 4vh;
    &:focus-visible {
      outline: none;
    }
  }

  .react-datepicker__day {
    color: ${({ theme }) => theme.colors.calendar.month};
    font-size: clamp(1.2vh, 0.3rem + 1vh, 2.5vh);
    width: calc((100% - 14 * 0.15vh) / 7);
    margin: 0.15vh;
    padding: 0.3vh 0;

    font-family: "Inter 400", sans-serif;

    &:hover {
      background-color: ${({ theme }) => theme.colors.calendar.daysHover};
    }
  }

  .react-datepicker__day--outside-month {
    color: ${({ theme }) => theme.colors.calendar.popperBg};
  }

  .react-datepicker__day--disabled {
    color: ${({ theme }) => theme.colors.calendar.disabled} !important;
  }

  .react-datepicker__day.react-datepicker__day--keyboard-selected {
    background-color: transparent;
  }

  .react-datepicker__day.react-datepicker__day--selected {
    background-color: ${({ theme }) => theme.colors.calendar.daySelectedOld};
    color: ${({ theme }) => theme.colors.calendar.daysSelectedText};
  }
  .react-datepicker__day.react-datepicker__day--keyboard-selected,
  .react-datepicker__day.react-datepicker__day--in-selecting-range,
  .react-datepicker__day.react-datepicker__day--selecting-range-end,
  .react-datepicker__day.react-datepicker__day--selecting-range-start,
  .react-datepicker__day.react-datepicker__day--in-range {
    background-color: ${({ theme }) => theme.colors.calendar.daysSelected};
    color: ${({ theme }) => theme.colors.calendar.daysSelectedText};
  }

  .react-datepicker__day.react-datepicker__day--in-range:hover {
    background-color: ${({ theme }) => theme.colors.calendar.daysSelected};
    color: ${({ theme }) => theme.colors.calendar.daysSelectedText};
  }

  .react-datepicker__day--today {
    background-color: ${({ theme }) => theme.colors.calendar.popperBg};
    color: ${({ theme }) => theme.colors.calendar.daysSelected};
    outline: none;
  }
`;

export const CalendarWrapper = styled.div<IBox>`
  background-color: ${({ theme }) => theme.colors.calendar.popperBg};
  box-shadow: 0px 3px 6px #00000029;
  padding: 1vw;
  justify-content: space-between;
  display: flex;
  flex-direction: column;
  border-radius: 1vh;
  gap: 2vh;
  margin-bottom: 1vw;
  min-width: 17vw;
  border: 1px solid ${({ theme }) => theme.colors.border.main};

  position: absolute;
  top: -20vh;
  left: 6vw;
`;

export const Buttons = styled.div`
  width: 100%;
  justify-content: space-between;
  display: flex;
  align-items: center;
`;

export const TextBox = styled.div<IBox>`
  //input
  text-transform: capitalize;
  width: ${({ $singleDate }) => ($singleDate ? "8vw" : "10vw")};
  display: flex;
  align-items: center;
  justify-content: center;
  height: 5vh;
  background-color: transparent;
  color: ${({ theme, $disabled }) =>
    $disabled ? theme.colors.input.disabled : theme.colors.calendar.border};
  font-size: clamp(1.7vh, 0.3rem + 1.3vh, 2.1vh);
  letter-spacing: -0.05vw;

  &::placeholder {
    color: ${({ theme }) => theme.colors.calendar.border};
    font-size: clamp(1.7vh, 0.3rem + 1.3vh, 2.1vh);

    cursor: pointer;
  }
`;

export const CalendarIconBox = styled.button<IBox>`
  height: 1.5vw;
  width: 1.5vw;
  border: none;
  background-color: transparent;
  display: flex;
  justify-content: center;
  align-items: center;
  svg {
    height: auto;
    width: auto;
    color: ${({ theme, $disabled }) =>
      $disabled ? theme.colors.input.disabled : theme.colors.calendar.border};
  }
`;
