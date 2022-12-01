import React, { useEffect, useState } from 'react';
import { Modal } from 'flowbite-react/lib/esm/components';
import { getCurrentToken } from '../../features/authentication/authSlice';
import { useAppSelector } from '../../app/hooks';
import { getResultPronunciationAssessment } from '../../features/resultPronounceExercise/resultPronounceExerciseSlice';
import { asyncGetHistoryAssessmentsByExercise } from '../../features/resultPronounceExercise/resultApis';
import { useDispatch } from 'react-redux';
import { AppDispatch } from '../../app/store';
import AssessmentItem from './AssessmentItem';

interface word_assessment {
    id: number,
    label: string,
    score: number,
    phone_assessment: any[]
}
interface assessment {
    id: number,
    score_gain: number,
    pronounce_url: string,
    created_at: string,
    word_assessment: word_assessment[]
}

interface typeProps {
    showModelHistory: boolean,
    onClose: () => void,
    exercise: any
}


const AssessmentPronunciationHistory = (props: typeProps) => {
    const { showModelHistory, onClose, exercise } = props
    const [loadingAssessments, setLoadingAssessments] = useState(true)
    const [errorAssessments, setErrorAssessments] = useState('')
    const accessToken = useAppSelector(getCurrentToken)
    const resultAssessment = useAppSelector(getResultPronunciationAssessment)
    const dispatch = useDispatch<AppDispatch>()

    useEffect(() => {
        if (showModelHistory) {
            const fetchAssessments = async () => {
                try {
                    setLoadingAssessments(() => true)
                    let dataGetAssessment = {
                        exerciseId: exercise.id,
                        accessToken: accessToken
                    }
                    await dispatch(asyncGetHistoryAssessmentsByExercise(dataGetAssessment)).unwrap()

                } catch (error: any) {
                    if (error.message) {
                        setErrorAssessments(error.message)
                    }
                    else {
                        setErrorAssessments('Unknow error when got assessments')
                    }
                }
            }
            fetchAssessments()
            setLoadingAssessments(() => false)


        }

    }, [showModelHistory])


    if (loadingAssessments) {
        return (
            <Modal
                show={showModelHistory}
                onClose={onClose}
            >
                <Modal.Header>
                    Lịch sử đánh giá
                </Modal.Header>
                <Modal.Body>
                    <div className='flex justify-center mt-5'>

                    </div>
                </Modal.Body>
            </Modal>
        )
    }
    else if (!resultAssessment) {
        return (
            <div>
                <p className='text-red-500 text-center mt-5'>
                    {errorAssessments}
                </p>
            </div>
        )
    }
    else if (resultAssessment.length === 0) {
        return (
            <div>
                <Modal
                    show={showModelHistory}
                    onClose={onClose}
                >
                    <Modal.Header>
                    Lịch sử đánh giá
                    </Modal.Header>
                    <Modal.Body>
                        <div className='h-[200px]'>
                            <p className='text-center text-gray-400 font-semibold text-lg mt-5'>
                                Bạn chưa có đánh giá nào cho bài tập này
                            </p>
                        </div>

                    </Modal.Body>
                </Modal>
            </div>
        )
    }
    return (
        <Modal
            show={showModelHistory}
            onClose={onClose}
        >
            <Modal.Header>
            Lịch sử đánh giá
            </Modal.Header>
            <Modal.Body>
                <div className='h-[400px] overflow-y-auto'>
                    {
                        !loadingAssessments && resultAssessment.map((result: assessment) => {
                            return (
                                <div key={result.id}>
                                    <AssessmentItem assessment={result} />
                                </div>
                            )
                        })
                    }
                </div>

            </Modal.Body>
        </Modal>
    );
};

export default AssessmentPronunciationHistory;