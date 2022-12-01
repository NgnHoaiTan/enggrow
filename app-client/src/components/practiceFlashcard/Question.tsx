import React, { useEffect, useState } from 'react';
import { BsQuestionSquare } from 'react-icons/bs';
import { GiAlarmClock } from 'react-icons/gi';


const Question = (props: any) => {
    const { question, practiceCards } = props

    return (
        <div className="card-question p-5 bg-white rounded-xl h-60 relative">
            <p className='font-semibold text-lg'>
                Câu hỏi {question}
            </p>
            <div className="h-full mt-10">
                <div className="flex items-center flex-col justify-start h-full">
                    <div className='w-6'>
                        <BsQuestionSquare size="100%" />
                    </div>
                    <p className='font-semibold text-#2e2e2e text-2xl'>
                        {practiceCards[question - 1].term}
                    </p>

                </div>

            </div>
        </div>
    );
};

export default Question;