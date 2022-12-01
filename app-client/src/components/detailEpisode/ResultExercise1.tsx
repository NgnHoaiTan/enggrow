import React, { useEffect, useState } from 'react';
import { Modal } from 'flowbite-react/lib/esm/components';


interface exercise {
    id: number,
    true_word: string
    false_word: string,
    audio_url: any,
    episodeId: number
}

interface typeProps {
    showModelResult: boolean,
    onClose: () => void,
    selectAnswer: string,
    exercise: exercise,
    definitions: {
        true_word: any,
        false_word: any
    }
}
const ResultExercise1 = (props: typeProps) => {
    const [result, setResult] = useState<boolean | null>(null)
    const { showModelResult, selectAnswer, exercise, onClose, definitions } = props
    useEffect(() => {
        setResult(() => selectAnswer == exercise.true_word)
    }, [selectAnswer, exercise])

    return (
        <Modal
            show={showModelResult}
            onClose={onClose}
        >
            <Modal.Header>
                Result
            </Modal.Header>
            <Modal.Body>
                <div className='result-exercise-1'>
                    <div className=''>
                        {
                            result === true ?
                                <p className='text-green-600 font-semibold text-lg mb-5 text-center'>
                                    You correct!
                                </p>
                                :
                                <p className='text-red-600 font-semibold text-lg mb-5 text-center'>
                                    You false
                                </p>

                        }
                    </div>
                    <div>
                        <p className='font-bold text-[#3f3f3f]'>Explaination</p>
                        <div className="fisrt_word_explain flex flex-col items-center sm:flex-row my-5 ">
                            <div className="word bg-[#644ff1] border-2 border-[#644ff1] drop-shadow-md font-bold rounded-xl w-full sm:w-1/3 py-2 px-4">
                                <p className=' text-white text-center'>
                                    {exercise.true_word}
                                </p>

                            </div>
                            <div className='information  w-full sm:w-2/3 pl-5'>

                                <p className='text-center sm:text-left'>
                                    {definitions.true_word}
                                </p>
                            </div>
                        </div>
                        <div className="second_word_explain flex flex-col items-center sm:flex-row  my-5">
                            <div className="word bg-[#ffffff]  border-2 drop-shadow-md font-bold rounded-xl w-full sm:w-1/3 py-2 px-4">
                                <p className='text-[#3f3f3f] text-center'>
                                    {exercise.false_word}
                                </p>
                            </div>
                            <div className='information text-center sm:text-left w-full sm:w-2/3 pl-5'>
                                <p className='text-center sm:text-left'>
                                    {definitions.false_word}
                                </p>
                            </div>
                        </div>
                    </div>

                </div>
            </Modal.Body>
        </Modal>
    );
};

export default ResultExercise1;