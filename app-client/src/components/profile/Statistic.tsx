import React from 'react';
import { Line } from 'react-chartjs-2';

const Statistic = () => {
    const data = {
        labels: [
            'January',
            'February',
            'March',
            'April',
            'May',
            'June',
        ],
        datasets: [{
            label: 'Learning activity',
            data: [65, 59, 80, 81, 56, 55, 40],
            fill: false,
            borderColor: 'rgb(98, 96, 219)',
            tension: 0.1
        }]
    };
    return (
        <div>
            <h3 className='font-bold my-2 text-base sm:text-lg'>Learning Activity</h3>
            <Line
                data={data}
            />
        </div>
    );
};

export default Statistic;