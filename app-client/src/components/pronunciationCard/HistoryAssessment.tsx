import dayjs from 'dayjs';
import { Modal } from 'flowbite-react';
import React, { useEffect, useState } from 'react';
import { BsFillPlayFill, BsPauseFill } from 'react-icons/bs';
import { useDispatch } from 'react-redux';
import { useAppSelector } from '../../app/hooks';
import { AppDispatch } from '../../app/store';
import { getCurrentToken } from '../../features/authentication/authSlice';
import { asyncGetPronounceByCard } from '../../features/pronunciation_card_result/pronunciationCardResultApi';
import { getPronounceCardResultsByCard } from '../../features/pronunciation_card_result/pronunciationCardResultSlice';

interface typeProps {
    showHistory: boolean,
    onClose: () => void,
    card: {
        id: number
    }
}
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
            className="audio-play w-6 h-6 sm:w-7 sm:h-7 rounded-full bg-violet-500 p-1 cursor-pointer">
            {
                audioPlaying ?
                    <BsPauseFill size="100%" color="white" />
                    :
                    <BsFillPlayFill size="100%" color="white" />

            }

        </div>
    )
}

const HistoryAssessment = (props: typeProps) => {
    const { showHistory, onClose, card } = props
    const [errorHistory, setErrorHistory] = useState('')
    const [loadingHistory, setLoadingHistory] = useState(true)
    const dispatch = useDispatch<AppDispatch>()
    const history = useAppSelector(getPronounceCardResultsByCard)
    const accessToken = useAppSelector(getCurrentToken)


    useEffect(() => {
        if (showHistory) {
            const action = async () => {
                try {
                    setLoadingHistory(() => true)
                    let dataSubmit = {
                        flashcardId: card.id,
                        accessToken: accessToken
                    }
                    await dispatch(asyncGetPronounceByCard(dataSubmit)).unwrap()
                } catch (error: any) {
                    if (error.message) {
                        setErrorHistory(error.message)
                    } else {
                        setErrorHistory('Lỗi không xác định!')
                    }
                }
            }
            action()
            setLoadingHistory(() => false)
        }

    }, [showHistory])

    if (loadingHistory) {
        return (
            <Modal
                show={showHistory}
                onClose={onClose}
                popup={true}
                size={'xl'}
                className='h-screen'
            >
                <Modal.Header>
                    Lịch sử đánh giá
                </Modal.Header>
                <Modal.Body>

                </Modal.Body>
            </Modal>
        )
    }
    else if (!history || errorHistory) {
        return (
            <Modal
                show={showHistory}
                onClose={onClose}
                popup={true}
                size={'xl'}
                className='h-screen'
            >
                <Modal.Header>
                    Lịch sử đánh giá
                </Modal.Header>
                <Modal.Body>
                    <div className='mt-5'>
                        {
                            errorHistory ?
                                <p className='text-red-500 font-semibold text-center'>
                                    {errorHistory}
                                </p>
                                :
                                <p className='text-red-500 font-semibold text-center'>
                                    Lỗi không xác định
                                </p>
                        }

                    </div>
                </Modal.Body>
            </Modal>
        )
    }
    else if (history.length === 0) {
        return (
            <Modal
                show={showHistory}
                onClose={onClose}
                popup={true}
                size={'xl'}
                className='h-screen'
            >
                <Modal.Header>
                Lịch sử đánh giá
                </Modal.Header>
                <Modal.Body>
                    <div className='mt-5'>
                        <p className='text-[#3f3f3f] font-semibold text-center'>
                            Không có lịch sử phát âm của từ này được lưu lại
                        </p>
                    </div>
                </Modal.Body>
            </Modal>
        );
    }


    return (
        <Modal
            show={showHistory}
            onClose={onClose}
            popup={true}
            size={'xl'}
            className='h-screen'
        >
            <Modal.Header>
            Lịch sử đánh giá
            </Modal.Header>
            <Modal.Body>
                <div className='h-[400px] overflow-y-auto'>
                    {
                        history.map((item: any) => {
                            return (
                                <div key={item.id}
                                    className='flex items-center justify-between my-2'
                                >
                                    <div className="info flex items-center">
                                        <div className="score w-10">
                                            <p className={`font-semibold ${item.score_gain >= 80 ? 'text-[#7d2ae8] ' : `${item.score_gain >= 50 ? 'text-[#ffb41f] ' : `text-[#ff481f] `}`}`}>
                                                {item.score_gain}
                                            </p>
                                        </div>
                                        <div className="audio">
                                            <YourRecord audioUrl={item.pronounce_url} />
                                        </div>
                                    </div>

                                    <div className="created_at">
                                        <p>{dayjs(item.created_at).format('DD/MM/YYYY hh:mm:ss')}</p>
                                    </div>
                                </div>
                            )
                        })
                    }
                </div>
            </Modal.Body>
        </Modal>
    );
};

export default HistoryAssessment;