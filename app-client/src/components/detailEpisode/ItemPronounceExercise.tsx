import React, { useEffect, useState } from 'react';
import { BsPlayFill } from 'react-icons/bs';
import Recorewave from '../pronunciationCard/Recorewave';
import { HiOutlineMicrophone } from 'react-icons/hi'
import { ReactMediaRecorder } from 'react-media-recorder';
import { DotLoaderOverlay } from 'react-spinner-overlay';
import ResultExercise2 from './ResultExercise2';
import pronun_assessment from '../../apis/pronun_assessment';
import { useDispatch } from 'react-redux';
import { AppDispatch } from '../../app/store';
import { asyncCreatePronunciationResult, asyncGetHistoryAssessmentsByExercise } from '../../features/resultPronounceExercise/resultApis';
import { useAppSelector } from '../../app/hooks';
import { getCurrentToken } from '../../features/authentication/authSlice';
import { getResultPronunciationAssessment } from '../../features/resultPronounceExercise/resultPronounceExerciseSlice';
import AssessmentPronunciationHistory from './AssessmentPronunciationHistory';

interface pronunciation_exercise {
    id: number,
    phrase: string,
    meaning: string,
    episodeId: number
}
interface typeProps {
    exercise: pronunciation_exercise,
}
const mediaRecorderOptions = {
    mimeType: "audio/webm"
};

const LoadingSpin = (props: any) => {
    return (
        <>
            <DotLoaderOverlay
                loading={props.loading}
                overlayColor="#ebebeb31"
                color='#3f3f3f'
            />
        </>
    )
}

const ItemPronounceExercise = (props: typeProps) => {
    const { exercise } = props
    const [onListen, setOnListen] = useState(false)
    const [onRecord, setOnRecord] = useState(false)
    const dispatch = useDispatch<AppDispatch>()
    const [blobURL, setBlobURL] = useState(null)
    const [showModelResult, setShowModelResult] = useState(false)
    const [resultPronounce, setResultPronounce] = useState<any>()
    const [errorRecord, setErrorRecord] = useState('')
    const [loadingResult, setLoadingResult] = useState(false)
    const [showModelAssessment, setShowModelAssessment] = useState(false)
    const accessToken = useAppSelector(getCurrentToken)


    const speak = (message: string) => {
        var msg = new SpeechSynthesisUtterance(message)
        var voices = window.speechSynthesis.getVoices()
        msg.voice = voices[0]

        window.speechSynthesis.speak(msg)
    }
    const handleCloseModelAssessmentHistory = () => {
        setShowModelAssessment(() => false)
    }
    const handleCloseModelResult = () => {
        setShowModelResult(() => false)
    }
    const handleListenPhrase = (message: string) => {
        setOnListen(() => true)
        speak(message)
        setTimeout(() => {
            setOnListen(() => false)
        }, 700)
    }
    const handleRecording = (callback: () => void) => {
        setResultPronounce(null)
        setErrorRecord('')
        setBlobURL(null)
        setOnRecord(true)
        callback()
    }
    const handleStopRecoreding = async (callback: () => void) => {
        setOnRecord(false)
        callback()
    }
    const handleEstimatePronunciation = async (audio: any, blob: any) => {
        setLoadingResult(() => true)
        setBlobURL(audio)
        try {
            var reader = new FileReader()
            reader.readAsBinaryString(blob);
            reader.onloadend = async () => {
                let result: any = reader.result
                // console.log(btoa(result))
                let data = {
                    audio_base64: btoa(result),
                    audio_format: 'm4a',
                    text: exercise.phrase
                }
                let result_pronouce = await pronun_assessment.post('', data)

                // console.log(result_pronouce.data)
                // save result and assessment

                let assessments: any[] = []
                result_pronouce.data.words.map((word: any) => {
                    let datapush = {
                        word: word.label,
                        phones: word.phones,
                        score: word.score
                    }
                    assessments.push(datapush)
                })
                const dataResult = {
                    file: blob,
                    exerciseId: exercise.id,
                    score_gain: result_pronouce.data.score,
                    word_assessments: assessments
                }
                let dataSubmit = {
                    data: dataResult,
                    accessToken: accessToken
                }
                dispatch(asyncCreatePronunciationResult(dataSubmit))
                // display result
                setResultPronounce(result_pronouce.data)
                setTimeout(() => {
                    setLoadingResult(() => false)
                    setShowModelResult(true)
                }, 300)

            }
            reader.onerror = (error: any) => {
                console.log(error)
                setErrorRecord('Không thể nghe thành công, thử lại')
            }
        } catch (error: any) {
            console.log(error)
            if (error.message)
                setErrorRecord(error.message)
            setLoadingResult(() => false)
        }



    }

    return (
        <div className='mt-10 mb-20'>
            <LoadingSpin loading={loadingResult} />
            <div className="my-10 flex flex-col items-center">
                <p className='font-bold text-center text-xl mb-3'>
                    {
                        exercise.phrase
                    }
                </p>
                <p className='font-semibold text-center text-base mb-3'>
                    {
                        exercise.meaning ? exercise.meaning : ''
                    }
                </p>

                <div className='h-[50px] relative'>
                    <div className='absolute left-1/2 -translate-x-1/2'>
                        {
                            !onListen ?
                                <>
                                    <button
                                        onClick={() => handleListenPhrase(exercise.phrase)}
                                        className='py-1 px-3 mt-4 rounded-2xl bg-gradient-to-r from-[#4568DC] to-[#b06ab3] ease-in-out duration-75'>
                                        <BsPlayFill size="20px" color='white' className='' />
                                    </button>
                                </>
                                :
                                <div
                                    className='ease-in-out duration-75'>
                                    <button onClick={() => setOnListen(false)}>
                                        <Recorewave />
                                    </button>

                                </div>
                        }
                    </div>
                </div>

            </div>
            <div className='flex justify-center flex-col items-center'>
                <p className='font-semibold text-center mb-3'>Nghe và lặp lại phát âm của từ</p>
                <ReactMediaRecorder
                    mediaRecorderOptions={mediaRecorderOptions}
                    onStop={(audio, blob) => handleEstimatePronunciation(audio, blob)}
                    render={({ startRecording, stopRecording, mediaBlobUrl }) => (
                        <div className='flex flex-col items-center'>
                            {
                                !onRecord ?
                                    <button
                                        onClick={() => handleRecording(startRecording)}
                                        className="relative w-20 h-10 p-2 rounded-full bg-violet-600 hover:bg-violet-500 
                                        after:content-[' '] after:w-[45px] after:h-[45px] after:rounded-full 
                                        after:bg-gray-100 after:block after:absolute after:top-1/2 after:left-1/2 
                                        after:-translate-y-1/2 after:-translate-x-1/2 after:-z-10">
                                        <HiOutlineMicrophone size="100%" color="white" className='' />
                                    </button>
                                    :
                                    <button
                                        onClick={() => handleStopRecoreding(stopRecording)}
                                        className="relative w-20 h-10 p-2 rounded-full bg-white border-2 border-violet-600 
                                        after:content-[' '] after:w-[45px] after:h-[45px] after:rounded-full 
                                        after:bg-gray-100 after:block after:absolute after:top-1/2 after:left-1/2 
                                        after:-translate-y-1/2 after:-translate-x-1/2 after:-z-10">
                                        <div className='flex items-center justify-center'>
                                            <div className="relative mr-2">
                                                <div className={`absolute block left-1/2 top-1/2 -translate-y-1/2 after:content-[' '] after:block mr-1 animate-recordWave_5 w-[3px] bg-violet-500 rounded-md`}>

                                                </div>
                                            </div>
                                            <div className="relative mr-2">
                                                <div className={`absolute left-1/2 top-1/2 -translate-y-1/2 block after:content-[' '] after:block mr-1 animate-recordWave_1 w-[3px] bg-violet-500 rounded-md`}>

                                                </div>
                                            </div>
                                            <div className="relative mr-2">
                                                <div className={`absolute block left-1/2 top-1/2 -translate-y-1/2 after:content-[' '] after:block mr-1 animate-recordWave_2 w-[3px] bg-violet-500 rounded-md`}>

                                                </div>
                                            </div>
                                            <div className="relative mr-2">
                                                <div className={`absolute block left-1/2 top-1/2 -translate-y-1/2 after:content-[' '] after:block mr-1 animate-recordWave_3 w-[3px] bg-violet-500 rounded-md`}>
                                                </div>
                                            </div>
                                            <div className="relative mr-2">
                                                <div className={`absolute block left-1/2 top-1/2 -translate-y-1/2 after:content-[' '] after:block mr-1 animate-recordWave_4 w-[3px] bg-violet-500 rounded-md`}>

                                                </div>
                                            </div>
                                            <div className="relative">
                                                <div className={`absolute block left-1/2 top-1/2 -translate-y-1/2 after:content-[' '] after:block mr-1 animate-recordWave_5 w-[3px] bg-violet-500 rounded-md`}>

                                                </div>
                                            </div>

                                        </div>
                                    </button>
                            }
                            {
                                errorRecord &&
                                <p className='text-red-500 my-3 text-center'>
                                    {errorRecord}
                                </p>
                            }
                        </div>
                    )}
                />

                <button
                    onClick={() => setShowModelAssessment(true)}
                    className='mt-5 underline text-violet-600'>
                    Xem lịch sử đánh giá
                </button>
            </div>
            <AssessmentPronunciationHistory
                exercise={exercise}
                showModelHistory={showModelAssessment}
                onClose={handleCloseModelAssessmentHistory} />

            {resultPronounce &&
                <ResultExercise2 showModelResult={showModelResult} onClose={handleCloseModelResult} pronunciation_result={resultPronounce} />
            }

        </div>
    );
};

export default ItemPronounceExercise;