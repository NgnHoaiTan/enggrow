import React, { useState } from 'react';
import { AiFillAudio } from 'react-icons/ai';
import { RiVolumeUpLine } from 'react-icons/ri';
import { ReactMediaRecorder } from 'react-media-recorder';
import Recorewave from './Recorewave';
import { schemaAssessment } from '../../apis/sample_assessment'
import ChartScore from './ChartScore';
import { useLocation, useNavigate, useParams } from 'react-router';
import { createSearchParams } from 'react-router-dom';
interface ExerciseProps {
    exercise: number,
    flashcards: any[]
}
const mediaRecorderOptions = {
    mimeType: "audio/webm"
};

const Exercise = (props: ExerciseProps) => {
    const { exercise, flashcards } = props
    const [onRecord, setOnRecord] = useState(false)
    const [blobURL, setBlobURL] = useState(null)
    const [onEstimate, setOnEstimate] = useState(false)
    const navigate = useNavigate()
    const location = useLocation()
    console.log(schemaAssessment)
    const {folderId} = useParams()
    const speak = (message: string) => {
        var msg = new SpeechSynthesisUtterance(message)
        var voices = window.speechSynthesis.getVoices()
        msg.voice = voices[0]

        window.speechSynthesis.speak(msg)
    }
    const handleRecording = (callback: () => void) => {
        setBlobURL(null)
        setOnRecord(true)
        callback()
    }
    const handleStopRecoreding = async (callback: () => void) => {
        setOnRecord(false)
        callback()
    }
    const handleEstimatePronunciation = (audio: any, blob: any) => {
        console.log(audio)
        console.log(blob.type)
        setBlobURL(audio)
        var reader = new FileReader()
        reader.readAsBinaryString(blob);
        reader.onload = () => {
            const result: any = reader.result
            // console.log(btoa(result))
        }
        reader.onerror = (error) => {
            console.log(error)
        }
    }
    const handleMoveNext=()=>{
        setTimeout(() => {

            if (exercise < flashcards.length) {
                const nextExercise:any = exercise + 1
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
            <div className="relative rounded-xl p-5 h-[330px] shadow-md bg-white  w-full md:w-[550px] lg:w-[600px] xl:w-[700px] mx-auto">
                <div className='flex text-[#696969] flex-col items-center justify-center'>
                    <p className='text-center text-sm md:text-base'>Listen and record your pronunciation</p>
                    <p className='text-center text-sm md:text-base'>We will estimate and evaluate your pronunciation score</p>
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


                <div>
                    {
                        onRecord && <Recorewave />
                    }
                </div>
                <ReactMediaRecorder
                    mediaRecorderOptions={mediaRecorderOptions}
                    onStop={(audio, blob) => handleEstimatePronunciation(audio, blob)}
                    render={({ startRecording, stopRecording, mediaBlobUrl }) => (
                        <div className="absolute bottom-0 left-1/2 -translate-x-1/2 -translate-y-1/2">
                            {
                                !onRecord ?
                                    <button
                                        onClick={() => handleRecording(startRecording)}
                                        className='rounded-xl bg-violet-500 border-violet-500 border-2 text-white font-semibold px-4 py-2 w-[200px]'>
                                        Practice now
                                    </button>
                                    :
                                    <button
                                        onClick={() => handleStopRecoreding(stopRecording)}
                                        className='rounded-xl bg-white text-violet-500 border-violet-500 border-2 font-semibold px-4 py-2 w-[200px]'>
                                        Finish
                                    </button>
                            }
                        </div>
                    )}
                />



            </div>
            <div className='relative rounded-xl p-5 shadow-md bg-white  w-full md:w-[550px] lg:w-[600px] xl:w-[700px] mx-auto mt-5'>
                <div className="">
                    {
                        blobURL &&
                        <div className='review-pronunciation flex justify-center'>
                            <audio controls className=''>
                                <source src={blobURL} />
                            </audio>
                        </div>
                    }
                </div>
                <div className="result-pronunciation mt-5">
                    <p className='font-bold text-center text-lg'>Review your pronunciation</p>
                    <div className="list-result-words my-3">
                        <ul className='flex items-center justify-center'>
                            {
                                schemaAssessment.words.map((word: any, index: number) => {
                                    return (
                                        <li
                                            key={index}
                                            className={`mr-[6px] last:mr-0 font-semibold text-xl
                                                ${word.score >= 85 ? 'text-green-500' :
                                                    `${word.score >= 70 ? 'text-orange-400' :
                                                        `${word.score >= 50 ? 'text-orange-500' : 'text-red-600'}`}`}
                                            `}
                                        >
                                            {word.label}
                                        </li>
                                    )
                                })
                            }

                        </ul>
                        <div className='my-3'>
                            <p className='font-bold mb-2 text-lg text-center'>Review your error</p>
                            {
                                schemaAssessment.words.filter((item: any) => item.score <= 70).map((word: any, index: number) => {
                                    return (
                                        <div key={index + 'error'}
                                            className='flex items-center justify-center flex-wrap'
                                        >
                                            <p className={`font-semibold text-lg text-center
                                                ${word.score >= 85 ? 'text-green-500' :
                                                    `${word.score >= 70 ? 'text-orange-400' :
                                                        `${word.score >= 50 ? 'text-orange-500' : 'text-red-600'}`}`}
                                                `}>
                                                {word.label}
                                                <span className='text-black font-normal ml-2'>
                                                    should be
                                                </span>
                                                <span className='text-violet-500 ml-2'>
                                                    {
                                                        word.phones.map((phones: any, index: number) => {
                                                            return (
                                                                <>
                                                                    {
                                                                        phones.label_ipa
                                                                    }
                                                                </>
                                                            )
                                                        })
                                                    }
                                                </span>
                                            </p>
                                            <p className='text-lg ml-2 text-center'>
                                                but your pronunciation sounds like
                                                <span className='text-violet-500 ml-2 font-semibold'>
                                                    {
                                                        word.phones.map((phones: any, index: number) => {
                                                            return (
                                                                <>
                                                                    {
                                                                        phones.sounds_like[0].label_ipa
                                                                    }
                                                                </>
                                                            )
                                                        })
                                                    }
                                                </span>

                                            </p>
                                        </div>
                                    )
                                })
                            }
                        </div>
                    </div>
                    {/* <div className="accent-prediction my-2">
                        <p className='font-semibold text-xl text-blue-600 mb-2'>
                            Accent prediction
                        </p>
                        <p className='text-lg'>
                            Australians accent: {
                                schemaAssessment.accent_predictions.en_AU
                            }
                        </p>
                        <p className='text-lg'>
                            UK accent: {
                                schemaAssessment.accent_predictions.en_UK
                            }
                        </p>
                        <p className='text-lg'>
                            USA accent: {
                                schemaAssessment.accent_predictions.en_US
                            }
                        </p>
                    </div> */}

                    <div className="score">
                        <p className='font-semibold text-lg text-black text-center'>
                            Your score is
                            <span className='ml-2'>
                                {schemaAssessment.score}
                            </span>
                        </p>
                        <ChartScore score={schemaAssessment.score} />
                    </div>
                </div>

            </div>
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