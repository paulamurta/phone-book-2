export interface CalendarContainerProps {
  children: React.ReactNode;
  handleClearDates: () => void;
  handleApplyDates: () => void;
  tempStartDate: Date | null;
  tempEndDate?: Date | null;
  tempSingleDate?: Date | null;
  isSingleDate?: boolean;
}
