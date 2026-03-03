import { DatePicker, type DatePickerProps } from "@mui/x-date-pickers/DatePicker";

interface Props extends DatePickerProps {
  width?: number;
}

const DatePickerFilter = ({ width, ...props }: Props) => {
  return (
    <DatePicker
      {...props}
      slotProps={{ textField: { fullWidth: true, size: "small", sx: { width } } }}
    />
  );
};

export default DatePickerFilter;
