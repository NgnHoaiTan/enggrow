import React, {useEffect, useState} from 'react';

interface typeProps {
    result: any,
    showScore: boolean
}
const ScoreEstimate = (props: typeProps) => {
    const { result, showScore } = props
    const [grade, setGrade] = useState(0)
    const maxGrade = result ? result.score : 0

    useEffect(() => {
        if (showScore) {
            const increment = setTimeout(() => {
                setGrade(grade + 1)
            }, 25)
            if (grade == maxGrade) clearTimeout(increment)
        }
    }, [showScore, grade])

    return (
        <div className='flex flex-col justify-center items-center'>
            <p className='text-[#7d2ae8] font-bold text-lg mb-3 text-center'>Điểm đạt được</p>
            <div
                style={{ background: `conic-gradient(${grade >= 80 ? '#7d2ae8 ' : `${grade >= 50 ? '#ffb41f ' : `#ff481f`}`} ${grade * 3.6}deg, #e3e3e3 0deg)` }}
                className='circle-result relative w-[120px] h-[120px] rounded-full flex justify-center items-center ease-in
                    after:w-[100px] after:h-[100px] after:rounded-full after:bg-white after:absolute
                    after:top-1/2 after:-translate-y-1/2 after:left-1/2 after:-translate-x-1/2 after:z-10'>
                <p className={`grade relative z-20 text-2xl font-bold ${grade >= 80 ? 'text-[#7d2ae8] ' : `${grade >= 50 ? 'text-[#ffb41f] ' : `text-[#ff481f] `}`}`}>
                    {grade}
                </p>
            </div>
        </div>
    );
};

export default ScoreEstimate;