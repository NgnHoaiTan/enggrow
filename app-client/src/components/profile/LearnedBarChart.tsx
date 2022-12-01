import React from 'react';
import { Bar } from 'react-chartjs-2';

interface typeProps {
    not_remember: number,
    not_sure: number,
    memorized: number
}
const LearnedBarChart = (props: typeProps) => {
    const { not_remember, not_sure, memorized } = props
    const option = {
        scales: {
            y: {
                beginAtZero: true
            }
        }
    }
    const labels = ['Chưa thuộc', 'Chưa chắc chắn', 'Đã thuộc'];
    const data = {
        labels,
        datasets: [
            {
                label: 'Thống kê kết quả học tập từ vựng',
                data: [not_remember | 0, not_sure | 0, memorized | 0],
                backgroundColor: [
                    'rgb(248, 56, 35)',
                    'rgb(255, 153, 58)',
                    'rgb(6, 163, 82)'
                ]
                ,
            }
        ],
        
    }
    return (
        <div>
            <Bar
                options={option}
                data={data}
                {...props}
            />
        </div>
    );
};

export default LearnedBarChart;