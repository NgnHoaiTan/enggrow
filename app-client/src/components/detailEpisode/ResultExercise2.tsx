import React, { useEffect, useState } from 'react';
import { Modal } from 'flowbite-react/lib/esm/components';
import ScoreEstimate from '../pronunciationCard/ScoreEstimate';


interface typeProps {
    showModelResult: boolean,
    onClose: () => void,
    pronunciation_result: any
}

// const ScoreEstimate = (props: any) => {
//     return (
//         <div
//             style={{ background: `conic-gradient(${props.grade >= 80 ? '#7d2ae8 ' : `${props.grade >= 50 ? '#ffb41f ' : `#ff481f`}`}${props.grade * 3.6}deg, #e3e3e3 0deg)` }}
//             className='circle-result relative w-[120px] h-[120px] rounded-full 
//                         flex justify-center items-center
//                         ease-in
//                         after:w-[100px] after:h-[100px] after:rounded-full after:bg-white after:absolute
//                         after:top-1/2 after:-translate-y-1/2 after:left-1/2 after:-translate-x-1/2 after:z-10'>
//             <p className={`grade relative z-20 text-2xl font-bold ${props.grade >= 80 ? 'text-[#7d2ae8] ' : `${props.grade >= 50 ? 'text-[#ffb41f] ' : `text-[#ff481f] `}`}`}>
//                 {props.grade}
//             </p>
//         </div>
//     )
// }
const ResultExercise2 = (props: typeProps) => {
    const { showModelResult, onClose, pronunciation_result } = props
    const [grade, setGrade] = useState(0)
    const maxGrade = pronunciation_result ? pronunciation_result.score : 0

    useEffect(() => {
        if (showModelResult) {
            const increment = setTimeout(() => {
                setGrade(grade + 1)
            }, 25)
            if (grade == maxGrade) clearTimeout(increment)
        }


    }, [showModelResult, grade])

    if (!pronunciation_result) {
        return (
            <Modal
                show={showModelResult}
                onClose={onClose}
            >
                <Modal.Header>
                    Kết quả
                </Modal.Header>
                <Modal.Body>
                    <div className='my-3'>
                        <p className='font-semibold text-center'>Không thể đánh giá, vui lòng thử lại với âm thanh rõ hơn</p>
                    </div>
                </Modal.Body>
            </Modal>
        )
    }
    // console.log(pronunciation_result)
    return (
        <Modal
            show={showModelResult}
            onClose={onClose}
        >
            <Modal.Header>
                Kết quả
            </Modal.Header>
            <Modal.Body>
                <div className='flex flex-col justify-center items-center'>
                    <ScoreEstimate showScore={showModelResult} result={pronunciation_result} />
                </div>
                <div>
                    <p className='text-[#454545] font-bold my-4'>Đánh giá chi tiết</p>
                    <div>
                        <p className='text-center font-semibold'>
                            {
                                pronunciation_result.words.map((word: any, index: number) => {
                                    return (
                                        <span className='mr-1 last:mr-0' key={index + 'word-label'}>
                                            {word.label}
                                        </span>
                                    )
                                })
                            }
                        </p>
                        <p className='text-center'>
                            /
                            {
                                pronunciation_result.words.map((word: any, index: number) => {
                                    return (
                                        <span
                                            key={`word-${index}`}
                                            className='mr-2 last:mr-0 font-semibold'
                                        >
                                            {
                                                word.phones.map((phone: any, index: number) => {
                                                    return (
                                                        <span key={`phone-${index}`}
                                                            className={`mr-[2px] last:mr-0 ${phone.score >= 80 ? 'text-[#1ac320]' : `${phone.score >= 50 ? 'text-[#ffb41f]' : 'text-[#ff481f]'}`} 
                                                            
                                                            `}
                                                        >
                                                            {phone.label_ipa ? phone.label_ipa : ''}
                                                        </span>
                                                    )
                                                })
                                            }
                                        </span>
                                    )
                                })
                            }
                            /
                        </p>

                    </div>
                </div>
            </Modal.Body>
        </Modal>
    );
};

export default ResultExercise2;