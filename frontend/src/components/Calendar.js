import {useState, useEffect} from 'react';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import {TextField} from "@mui/material";
 
export default function Calendar() {
  

    const [date, setDate] = useState()
  
    return (
    <LocalizationProvider dateAdapter={AdapterDayjs}>
      <DatePicker 
         slotProps={{
             textField: {
                 size: "small",
             },
         }}
         format="YYYY.MM.DD"
         value={date}
         onChange={(newValue) => {
             setDate(
                 newValue
             );
         }}
         mask = {"____-__-__"}
         renderInput = {(params) => <TextField{...params} />}
      />
    </LocalizationProvider>
  );
}