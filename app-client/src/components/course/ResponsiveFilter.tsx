import React, { useState } from 'react';
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { IoCloseOutline } from 'react-icons/io5';
import { MdDateRange } from 'react-icons/md';
const ResponsiveFilter = (props: any) => {
    const [startDate, setStartDate] = useState(new Date());
    const [endDate, setEndDate] = useState(null);
    const [enablePickDate, setEnablePickDate] = React.useState(false)
    const [enableLevel, setEnableLevel] = React.useState(true)
    const onChange = (dates: Date[] | any) => {
        const [start, end] = dates;
        setStartDate(start);
        setEndDate(end);
    };
    return (
        <div className="absolute bg-white shadow-card z-50 mt-1 rounded-md">
            <div className='px-4 py-3 relative'>
                <div className="mb-2 h-5">
                    <IoCloseOutline onClick={()=>props.setShowFilter(!props.showFilter)} size="20px" className='absolute right-0 -translate-x-4' />
                </div>
                
                <div className="choose-level mb-3 flex items-center">
                    <div className="enable-picker mr-4 flex items-center">
                        <input onChange={() => setEnableLevel(!enableLevel)} checked={enableLevel} type="checkbox" name='enable-Datepicker' className="appearance-none checked:bg-blue-500 checked:outline-none mr-2" />
                        {/* <label htmlFor="enable-Datepicker">Schedule</label><br></br> */}
                    </div>
                    <select disabled={enableLevel ? false : true} className='disabled:bg-gray-200 disabled:text-gray-400 bg-white text-sm sm:text-base border border-solid border-gray-300 w-full rounded-md px-2 py-1 focus:border-blue-600 focus:outline-none bg-clip-padding bg-no-repeat'>
                        <option value="beginner">
                            Beginner
                        </option>
                        <option value="intermediate">
                            Intermediate
                        </option>
                        <option value="advanced">
                            Advanced
                        </option>
                    </select>

                </div>
                <div className="choose-time relative flex items-center">
                    <div className="enable-picker mr-4 flex items-center">
                        <input onChange={() => setEnablePickDate(!enablePickDate)} type="checkbox" name='enable-Datepicker' className="appearance-none checked:bg-blue-500 checked:outline-none mr-2" />
                        {/* <label htmlFor="enable-Datepicker">Schedule</label><br></br> */}
                    </div>
                    <div>
                        <div className='rounded-md'>
                            <DatePicker
                                disabled={!enablePickDate}
                                selected={startDate}
                                closeOnScroll={true}
                                onChange={(date: Date) => setStartDate(date)}
                                timeInputLabel="Time:"
                                dateFormat="MM/dd/yyyy h:mm aa"
                                showTimeInput
                                className={`rounded-lg py-1 border-gray-300 w-48 ${enablePickDate ? '' : 'text-gray-400 bg-gray-300'}`}
                                // selectsRange
                                placeholderText="choose date"
                            />
                        </div>
                        <div className="absolute top-1/2 -translate-y-1/2 left-full -translate-x-8">
                            <MdDateRange size="20px" color='gray' />
                        </div>
                    </div>

                </div>
                <div className="btn-verify mt-3 flex justify-end">
                    <button className='bg-violet-500 text-white py-1 px-3 rounded-md mr-2'>Cancel</button>
                    <button className='bg-blue-500 text-white py-1 px-3 rounded-md'>Filter</button>
                </div>
            </div>
        </div>
    );
};

export default ResponsiveFilter;