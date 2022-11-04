import React from 'react';
import Banner from '../components/dashboard/Banner';
import MyCourses from '../components/dashboard/MyCourses';
import MyVideo from '../components/dashboard/MyVideo';
import Schedule from '../components/dashboard/Schedule';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import 'swiper/css/scrollbar';
import DatePicker from 'react-datepicker'
import "react-datepicker/dist/react-datepicker.css";
const Dashboard = () => {
    const [startDate, setStartDate] = React.useState(new Date());
    return (
        <div className='flex flex-col xl:flex-row items-start justify-between p-3 md:py-2 md:px-4 mt-5'>
            <div id="main-dashboard" className='w-full xl:w-4/6 mr-2'>
                <Banner />
                <MyCourses />
                <MyVideo />
            </div>
            <div className='w-full xl:w-1/3  ml-2 px-5'>
                <div className="mb-3 w-full bg-white rounded-xl flex justify-center shadow-card p-4">
                    <DatePicker
                        selected={startDate}
                        className="red-border"
                        onChange={(date: Date) => setStartDate(date)}
                        inline
                    />
                </div>

                <div id="schedule" className=' bg-white shadow-card rounded-xl p-4 '>

                    <Schedule />

                </div>
            </div>

        </div>
    );
};

export default Dashboard;