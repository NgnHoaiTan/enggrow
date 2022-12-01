import React, { useState } from 'react';
import { BiEdit } from 'react-icons/bi';
import { MdDeleteForever } from 'react-icons/md';
import { RiVolumeUpLine } from 'react-icons/ri';
import EditModel from './EditModel';
import { confirmAlert } from 'react-confirm-alert';
import 'react-confirm-alert/src/react-confirm-alert.css';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useAppSelector } from '../../app/hooks';
import { getCurrentToken } from '../../features/authentication/authSlice';
import { useDispatch } from 'react-redux';
import { AppDispatch } from '../../app/store';
import { asyncDeleteFlashcard, asyncGetFlashcardsByFolder } from '../../features/flashcard/flashcardApis';
import { useParams } from 'react-router';

interface flashcardProps {
    card: {
        id: number,
        term: string,
        meaning: string,
        example: string,
        created_at: string,
        updated_at: string,
        status: string,
        folderFlashcardId: number
    },
    total: number,
    index: number
}

const Flashcard = (props: flashcardProps) => {
    const { card, total, index } = props
    const {folderId} = useParams()
    const accessToken = useAppSelector(getCurrentToken)
    const dispatch = useDispatch<AppDispatch>()
    const [showModelEdit, setShowModelEdit] = useState(false)
    const handleCloseEdit = () => {
        setShowModelEdit(false)
    }
    const handleShowEdit = (e: React.MouseEvent<HTMLElement>) => {
        setShowModelEdit(true)
        e.stopPropagation()
    }
    const notifySuccess = (msg: string) => toast.success(msg)
    const notifyFailed = (msg: string) => toast.error(msg)
    const handleVerifyDelete=()=>{
        confirmAlert({
            title: 'Xác nhận xóa',
            message: 'Vui lòng xác nhận xóa thẻ từ vựng',
            buttons: [
                {
                    label: 'Yes',
                    onClick: () => handleDeleteCard()
                },
                {
                    label: 'No',
                }
            ],
            closeOnEscape: true,
            closeOnClickOutside: true,
        });
    }
    const handleDeleteCard=async()=>{
        try{
            if(folderId) {
                let dataDelete ={
                    id: card.id,
                    accessToken: accessToken
                }
                let dataFetchCard = {
                    folderId: folderId,
                    accessToken: accessToken
                }
                await dispatch(asyncDeleteFlashcard(dataDelete)).unwrap()
                await dispatch(asyncGetFlashcardsByFolder(dataFetchCard)).unwrap()
                notifySuccess('Xóa thành công')
            }
            else {
                throw new Error('Folder Id is invalid')
            }
        }catch(error: any) {
            if(error.message) {
                notifyFailed(error.message)
            }
            else {
                notifyFailed('Lỗi xảy ra trong quá trình xóa thẻ từ vựng, thử lại sau!')
            }
        }
    }

    const speak = (message: string) => {
        var msg = new SpeechSynthesisUtterance(message)
        var voices = window.speechSynthesis.getVoices()
        msg.voice = voices[0]

        window.speechSynthesis.speak(msg)
    }

    return (
        <div className='flex flex-col items-center h-[400px]'>
            <div className="term h-1/2 flex flex-col  items-center justify-center w-full relative">
                <div className="absolute top-0 flex justify-between items-center w-full">
                    <p className='text-gray-400 text-sm'>
                        {
                            `${index + 1}/${total}`
                        }
                    </p>
                    <div className="flex items-center gap-3">
                        <div onClick={() => handleVerifyDelete()} className="cursor-pointer delete">
                            <MdDeleteForever size="22px" color="#ff3a0e" />
                        </div>
                        <div onClick={(e) => handleShowEdit(e)} className="cursor-pointer edit">
                            <BiEdit size="20px" color="#adadad" />
                        </div>
                    </div>

                </div>

                <p className='font-bold text-violet-600 text-3xl'>
                    {
                        card.term
                    }
                </p>
                <div
                    onClick={() => speak(card.term)}
                    className='mt-3 cursor-pointer'>
                    <RiVolumeUpLine color='white' size="30px" className='p-[5px] rounded-full bg-violet-500' />
                </div>

            </div>
            <div className="h-1/2 meaning w-full flex flex-col items-center justify-center">
                <p className='font-semibold text-lg text-center'>
                    {card.meaning}
                </p>
                <p className='example italic'>
                    {
                        card.example &&
                        <>
                            Ví dụ:
                            <span className='ml-1'>
                                {
                                    card.example
                                }
                            </span>
                        </>

                    }


                </p>
            </div>
            <ToastContainer
                position="top-right"
                autoClose={3000}
            />
            <EditModel showModelEdit={showModelEdit} onClose={handleCloseEdit} card={card} />
        </div>
    );
};

export default Flashcard;