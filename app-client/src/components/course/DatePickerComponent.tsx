import React, { useState } from 'react';
// import dayjs, { Dayjs } from 'dayjs';
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
const DatePickerComponent = (props:any) => {
    const [startDate, setStartDate] = useState(new Date());
    const [endDate, setEndDate] = useState(null);
    const onChange = (dates: Date[] | any) => {
        const [start, end] = dates;
        setStartDate(start);
        setEndDate(end);
    };

    return (
        <div className='rounded-md'>
            <DatePicker 
                selected={startDate}
                closeOnScroll={true}
                onChange={(date: Date) => setStartDate(date)}
                timeInputLabel="Time:"
                dateFormat="MM/dd/yyyy h:mm aa"
                showTimeInput
                className={`rounded-lg py-1 border-gray-300 w-48`}
                // selectsRange
                placeholderText="choose date"
            />
        </div>

    );
};

export default DatePickerComponent;