import React, { useState } from 'react';
import { BiEdit } from 'react-icons/bi';
import { RiVolumeUpLine } from 'react-icons/ri';
import EditModel from './EditModel';


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
    const [showModelEdit, setShowModelEdit] = useState(false)
    const handleCloseEdit = () => {
        setShowModelEdit(false)
    }
    const handleShowEdit = (e: React.MouseEvent<HTMLElement>) => {
        setShowModelEdit(true)
        e.stopPropagation()
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
                            `${index+1}/${total}`
                        }
                    </p>
                    <div onClick={(e) => handleShowEdit(e)} className="cursor-pointer edit">
                        <BiEdit size="20px" color="#adadad" />
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
                        card.example
                    }
                </p>
            </div>
            <EditModel showModelEdit={showModelEdit} onClose={handleCloseEdit} card={card}/>
        </div>
    );
};

export default Flashcard;