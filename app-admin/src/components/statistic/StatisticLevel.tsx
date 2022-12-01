import React,{useRef} from 'react';
import { Chart } from 'react-chartjs-2';
import { Chart as ChartJS,BarElement , LineController, LineElement, PointElement, LinearScale, CategoryScale } from 'chart.js';

ChartJS.register(LineController, BarElement, LineElement, PointElement, LinearScale ,CategoryScale);


interface typeProps {
    all_level: number,
    beginner: number,
    intermediate: number,
    upper_intermediate: number,
    advanced: number,
}
const StatisticLevel = (props: typeProps) => {
    const ref = useRef();
    const { all_level, intermediate, beginner, upper_intermediate, advanced } = props
    const option = {
        scales: {
            y: {
                beginAtZero: true
            }
        }
    }
    console.log(props)
    const labels = ['Mọi trình độ', 'Sơ cấp', 'Trung cấp', 'Trên trung cấp', 'Nâng cao'];
    const data = {
        labels,
        datasets: [
            {
                label: 'Thống kê xu hướng trình độ học tập',
                data: [all_level | 0, beginner | 0, intermediate | 0, upper_intermediate | 0, advanced | 0],
                backgroundColor: [
                    'rgb(45, 104, 244)',
                    'rgb(45, 104, 244)',
                    'rgb(45, 104, 244)',
                    'rgb(45, 104, 244)',
                    'rgb(45, 104, 244)'
                ]
                ,
            }
        ],

    }
    return (
        <div>
            <Chart
                type='bar'
                ref={ref}
                options={option}
                data={data}
                {...props}
            />
        </div>
    );
};

export default StatisticLevel;