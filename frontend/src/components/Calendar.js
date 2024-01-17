import {useState} from 'react';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import {TextField} from "@mui/material";
import { ProgressbarImage } from './ProgressbarImage';
import { Progressbar } from './Progressbar';
import "./Calendar.css";
 
export default function Calendar({onDate, mode}) {
  

    const [date, setDate] = useState()
    var modeprogress;

    const handleDateChange = (newValue) => {
      const year = newValue.$y;
      const month = newValue.$M + 1;
      const day = newValue.$D;
      
      const formattedMonth = month < 10 ? `0${month}` : month;
      const formattedDay = day < 10 ? `0${day}` : day;
      
      const result = `${year}${formattedMonth}${formattedDay}`;
        setDate(result);
    
        if (onDate) {
          onDate(result);
        }
      }
      
      if (mode === 1){
        modeprogress = <div className = "progress_bar"> <Progressbar state = {1}/> </div>
      }
      else if (mode === 2){
        modeprogress = <div className = "progress_bar"> <ProgressbarImage state = {1}/> </div>
      }
      else {
        modeprogress = <div></div>
      }

    return (
    <>
      <div className = "contents">  
        {modeprogress}
        <LocalizationProvider className="datepicker" dateAdapter={AdapterDayjs}>
          <DatePicker 
            slotProps={{
                textField: {
                    size: "small",
                },
            }}
            format="YYYY.MM.DD"
            value={date}
            onChange = {handleDateChange}
            mask = {"____-__-__"}
            renderInput = {(params) => <TextField{...params} />}
          />
        </LocalizationProvider>
        </div>
    </>
  );
}