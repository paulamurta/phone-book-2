export type DateRangePickerProps = {
  setPage?: React.Dispatch<React.SetStateAction<number>>;
  refetch?: any;
  disabled?: boolean;
  onlyFutureDates?: boolean;
  onlyPastDates?: boolean;
  maxRange?: number;

  startDate?: Date | null;
  setStartDate?: React.Dispatch<React.SetStateAction<Date | null>>;
  endDate?: Date | null;
  setEndDate?: React.Dispatch<React.SetStateAction<Date | null>>;

  isSingleDate?: boolean;
  singleDate?: Date | null;
  setSingleDate?: React.Dispatch<React.SetStateAction<Date | null>>;
};
