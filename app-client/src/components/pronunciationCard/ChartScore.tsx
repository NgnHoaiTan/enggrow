import React from 'react';
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js';
import { Doughnut } from 'react-chartjs-2';

ChartJS.register(ArcElement, Tooltip, Legend);

interface ChartScoreProps {
    score: number
}
const ChartScore = (props: ChartScoreProps) => {
    const { score } = props
    const data = {
        // labels: [],
        datasets: [
            {
                label: 'Estimate your score',
                data: [score, 100 - score],
                backgroundColor: [
                    '#844bef',
                    '#ffffff',
                ],
                borderWidth: 0,
                
            },

        ],
    };
    return (
        <div className='w-[100px] h-[100px] mx-auto'>
            <Doughnut data={data}
            
            />;
        </div>
    );
};

export default ChartScore;