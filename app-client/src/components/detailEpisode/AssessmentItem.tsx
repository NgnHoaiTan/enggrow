import React, { useState } from 'react';
import { AiOutlinePlayCircle } from 'react-icons/ai';
import { BsFillPlayFill, BsPauseFill } from 'react-icons/bs';
import dayjs from 'dayjs';

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
    assessment: assessment
}
const AssessmentItem = (props: typeProps) => {
    const { assessment } = props
    const [audioPlaying, setAudioPlaying] = useState(false)
    let audio = new Audio(assessment.pronounce_url)

    const playAudio = () => {
        setAudioPlaying(true)
        audio.play()
        setTimeout(() => {
            setAudioPlaying(() => false)
        }, 500)
    }
    const stopAudio = () => {
        setAudioPlaying(false)
        audio.pause()
    }
    return (
        <div className='mb-2'>
            <div className='flex items-center justify-between '>
                <div className="main-content">
                    <div className='p-1 bg-violet-500 rounded-lg mb-1 w-[130px]'>
                        <p className='text-xs text-white text-center'>
                            {dayjs(assessment.created_at).format('DD/MM/YYYY hh:mm:ss')}
                        </p>
                    </div>
                    <div className="word-assessment flex items-center text-lg font-semibold">
                        {
                            assessment.word_assessment.map((word: word_assessment) => {
                                return (
                                    <div key={word.id} className=''>
                                        <span className={`mr-1 
                                        ${assessment.score_gain >= 80 ? 'text-[#6dd441] ' : `${assessment.score_gain >= 50 ? 'text-[#ffb41f]' : 'text-[#ff481f]'}`}`
                                        }>
                                            {word.label}
                                        </span>
                                    </div>
                                )
                            })
                        }
                    </div>
                    <div className="phone-assessment">
                        /
                        {
                            assessment.word_assessment.map((word: word_assessment) => {
                                return (
                                    <span key={word.id} className='mr-1 last:mr-0 font-semibold'>
                                        {
                                            word.phone_assessment.map((phone: any) => {
                                                return (
                                                    <React.Fragment key={phone.id}>
                                                        <span className={`mr-[2px] last:mr-0
                                                        ${phone.score >= 80 ? 'text-[#6dd441] ' : `${phone.score >= 50 ? 'text-[#ffb41f]' : 'text-[#ff481f]'}`}
                                                    `}>
                                                            {
                                                                phone.label_ipa
                                                            }
                                                        </span>
                                                    </React.Fragment>
                                                )
                                            })
                                        }
                                    </span>
                                )
                            })
                        }
                        /
                    </div>
                </div>
                <div className="right-content flex items-center">
                    <div className={`grade-point mr-2 w-6 h-6 rounded-full flex items-center justify-center p-1
                ${assessment.score_gain >= 80 ? 'bg-[#6dd441] ' : `${assessment.score_gain >= 50 ? 'bg-[#ffb41f]' : 'bg-[#ff481f]'}`}
                `}>
                        <p className={`text-sm text-white`}>
                            {assessment.score_gain}
                        </p>
                    </div>
                    <div
                        onClick={() => playAudio()}
                        className="audio-play w-6 h-6 rounded-full bg-violet-500 p-1 cursor-pointer">
                        {
                            audioPlaying ?
                                <BsPauseFill size="100%" color="white" />
                                :
                                <BsFillPlayFill size="100%" color="white" />

                        }

                    </div>
                </div>
            </div>

            <div className='w-full h-[1px] bg-gray-200 rounded-lg mt-2'></div>
        </div>
    );
};

export default AssessmentItem;