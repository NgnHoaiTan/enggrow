import React, { useEffect, useState } from 'react';
import { RiVolumeUpLine } from 'react-icons/ri';
import { ReactMediaRecorder } from 'react-media-recorder';
import Recorewave from './Recorewave';
import { schemaAssessment } from '../../apis/sample_assessment'
import { useLocation, useNavigate, useParams } from 'react-router';
import { createSearchParams } from 'react-router-dom';
import pronun_assessment from '../../apis/pronun_assessment';
import { BsFillPlayFill, BsPauseFill } from 'react-icons/bs';
import { useAppSelector } from '../../app/hooks';
import { getCurrentToken, getCurrentUser } from '../../features/authentication/authSlice';
import { useDispatch } from 'react-redux';
import { AppDispatch } from '../../app/store';
import { asyncSavePronounceResult } from '../../features/pronunciation_card_result/pronunciationCardResultApi';
import ScoreEstimate from './ScoreEstimate';
import HistoryAssessment from './HistoryAssessment';
import { updateResults } from '../../features/pronunciation_card_result/pronunciationCardResultSlice';
interface ExerciseProps {
    exercise: number,
    flashcards: any[]
}
const mediaRecorderOptions = {
    mimeType: "audio/webm"
};
const YourRecord = (props: any) => {
    const { audioUrl } = props
    let audio = new Audio(audioUrl)
    const [audioPlaying, setAudioPlaying] = useState(false)

    const playAudio = () => {
        setAudioPlaying(true)
        audio.play()
        setTimeout(() => {
            setAudioPlaying(() => false)
        }, 500)
    }

    return (
        <div
            onClick={() => playAudio()}
            className="audio-play w-6 h-6 sm:w-8 sm:h-8 rounded-full bg-violet-500 p-1 cursor-pointer">
            {
                audioPlaying ?
                    <BsPauseFill size="100%" color="white" />
                    :
                    <BsFillPlayFill size="100%" color="white" />

            }

        </div>
    )
}

const Exercise = (props: ExerciseProps) => {
    const { exercise, flashcards } = props
    const [showHistory, setShowHistory] = useState(false)
    const [onRecord, setOnRecord] = useState(false)
    const [blobURL, setBlobURL] = useState(null)
    const [result, setResult] = useState<any>(null)
    const [showScore, setShowScore] = useState(false)
    const [loadingEstimate, setLoadingEstimate] = useState(false)
    const navigate = useNavigate()
    const location = useLocation()
    const accessToken = useAppSelector(getCurrentToken)
    const user = useAppSelector(getCurrentUser)
    const dispatch = useDispatch<AppDispatch>()
    const { folderId } = useParams()


    const handleCloseHistory = () => {
        setShowHistory(false)
    }

    const speak = (message: string) => {
        var msg = new SpeechSynthesisUtterance(message)
        var voices = window.speechSynthesis.getVoices()
        msg.voice = voices[0]

        window.speechSynthesis.speak(msg)
    }
    const handleRecording = (callback: () => void) => {
        setShowScore(false)
        setBlobURL(null)
        setOnRecord(true)
        callback()
    }
    const handleStopRecoreding = async (callback: () => void) => {
        setOnRecord(false)
        callback()
    }
    const handleEstimatePronunciation = (audio: any, blob: any) => {
        setResult(null)
        setLoadingEstimate(() => true)
        var reader = new FileReader()
        reader.readAsBinaryString(blob);
        reader.onload = async () => {
            const result: any = reader.result
            // console.log(btoa(result))
            let dataAudio = {
                audio_base64: btoa(result),
                audio_format: 'm4a',
                text: flashcards[exercise - 1].term
            }
            let result_pronouce = await pronun_assessment.post('', dataAudio)
            console.log(result_pronouce)
            let dataSubmit = {
                data: {
                    score_gain: result_pronouce.data.score,
                    flashcardId: flashcards[exercise - 1].id,
                    userId: user.id,
                    file: blob
                },
                accessToken: accessToken
            }
            await dispatch(asyncSavePronounceResult(dataSubmit)).unwrap()

            setBlobURL(audio)
            setResult(result_pronouce.data)
            setShowScore(() => true)
            setLoadingEstimate(() => false)
        }
        reader.onerror = (error) => {
            console.log(error)
            setLoadingEstimate(() => false)
        }
    }

    useEffect(() => {
        setResult(() => null)
        setBlobURL(() => null)
    }, [exercise])

    const handleMoveNext = () => {
        setTimeout(() => {

            if (exercise < flashcards.length) {
                const nextExercise: any = exercise + 1
                navigate({
                    pathname: location.pathname,
                    search: createSearchParams({
                        exercise: nextExercise
                    }).toString()
                });
            }
            else {
                navigate(`/folders/flashcard/pronunciation/finished/${folderId}`)
            }
        }, 200)
    }
    return (
        <div>
            <div className="relative rounded-xl p-5 h-[360px] shadow-md bg-white  w-full md:w-[550px] lg:w-[600px] xl:w-[700px] mx-auto">
                <div className='flex text-[#696969] flex-col items-center justify-center'>
                    <p className='text-center text-sm md:text-base'>Lắng nghe phát âm và ghi lại phát âm</p>
                    <p className='text-center text-sm md:text-base'>Hệ thống sẽ phân tích và đánh giá phát âm của bạn</p>
                </div>

                <div className="vocabulary mt-5 flex flex-col  justify-center items-center">
                    <p className='font-bold text-violet-600 text-3xl md:text-2xl xl:text-3xl'>
                        {flashcards[exercise - 1].term}
                    </p>
                    <div
                        onClick={() => speak(flashcards[exercise - 1].term)}
                        className='mt-3 cursor-pointer'>
                        <RiVolumeUpLine color='white' size="30px" className='p-[5px] rounded-full bg-violet-500' />
                    </div>
                </div>


                <div className='mt-8'>
                    {
                        onRecord && <Recorewave />
                    }
                </div>
                <ReactMediaRecorder
                    mediaRecorderOptions={mediaRecorderOptions}
                    onStop={(audio, blob) => handleEstimatePronunciation(audio, blob)}
                    render={({ startRecording, stopRecording, mediaBlobUrl }) => (
                        <div className="absolute bottom-0 left-1/2 -translate-x-1/2 -translate-y-1/2 flex flex-col items-center">
                            {
                                !onRecord ?
                                    <button
                                        onClick={() => handleRecording(startRecording)}
                                        className='rounded-xl bg-violet-500 border-violet-500 border-2 text-white font-semibold px-4 py-2 w-[200px]'>
                                        Luyện tập
                                    </button>
                                    :
                                    <button
                                        onClick={() => handleStopRecoreding(stopRecording)}
                                        className='rounded-xl bg-white text-violet-500 border-violet-500 border-2 font-semibold px-4 py-2 w-[200px]'>
                                        Kết thúc
                                    </button>
                            }
                            <button
                                onClick={() => setShowHistory(true)}
                                className='text-blue-400 py-1 px-3 rounded-lg bg-white drop-shadow-md text-sm text-center mt-3'>
                                Xem lịch sử đánh giá
                            </button>
                            <HistoryAssessment showHistory={showHistory} onClose={handleCloseHistory} card={flashcards[exercise - 1]} />
                        </div>
                    )}
                />



            </div>

            {
                (result && blobURL) ?
                    <div className='relative rounded-xl p-5 shadow-md bg-white  w-full md:w-[550px] lg:w-[600px] xl:w-[700px] mx-auto mt-5'>
                        <div className="">
                            {
                                blobURL &&
                                <div className='review-pronunciation flex justify-center'>
                                    <YourRecord audioUrl={blobURL} />
                                </div>
                            }
                        </div>
                        <div className="result-pronunciation mt-5">
                            {
                                result &&
                                <div>
                                    <p className='font-bold text-center text-lg'>Kết quả đánh giá phát âm</p>
                                    <ScoreEstimate result={result} showScore={showScore} />
                                    <div>
                                        <p className='text-[#454545] font-bold my-4'>Chi tiết</p>
                                        <div>
                                            <p className='text-center font-semibold'>
                                                {
                                                    result.words.map((word: any, index: number) => {
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
                                                    result.words.map((word: any, index: number) => {
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

                                </div>
                            }

                        </div>

                    </div>
                    :
                    <React.Fragment>
                        {
                            loadingEstimate ?
                                <div className='relative rounded-xl p-5 shadow-md bg-white  w-full md:w-[550px] lg:w-[600px] xl:w-[700px] mx-auto mt-5 py-5'>
                                    <Recorewave />
                                </div>
                                :
                                <div className='relative rounded-xl p-5 shadow-md bg-white  w-full md:w-[550px] lg:w-[600px] xl:w-[700px] mx-auto mt-5'>
                                    <div className='flex justify-center my-3'>
                                        <img src="https://res.cloudinary.com/hoaitan/image/upload/v1667311147/engrow/image_processing20210907-13511-1juj33d_xrlfla.gif" alt="robot"
                                            className='w-28'
                                        />
                                    </div>
                                    <p className='text-violet-600 font-bold text-center'>Click record and say the word, we will assessment your pronunciation</p>
                                </div>
                        }
                    </React.Fragment>

            }

            <div className="redirect-btns flex justify-center mt-5">
                {
                    exercise === 1 ?
                        <button
                            onClick={() => navigate(-1)}
                            className='px-5 py-3 bg-white shadow-md font-semibold text-black mr-6 cursor-pointer rounded-xl'>
                            Back
                        </button> :
                        <button
                            onClick={() => navigate(-1)}
                            className='px-5 py-3 bg-white sshadow-md font-semibold text-black mr-6 cursor-pointer rounded-xl'>

                            Previous
                        </button>
                }

                <button
                    onClick={() => handleMoveNext()}
                    className='px-5 py-3 bg-violet-500 shadow-md font-semibold text-white ml-6 cursor-pointer rounded-xl'
                >
                    Next
                </button>
            </div>
        </div>

    );
};

export default Exercise;