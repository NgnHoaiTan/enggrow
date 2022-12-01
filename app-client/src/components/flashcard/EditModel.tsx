import React, { useEffect, useState } from 'react';
import { Modal } from 'flowbite-react/lib/esm/components';
import { FormSubmitEvent, InputEvent, TextAreaEvent } from '../../events/events';
import { useAppSelector } from '../../app/hooks';
import { getCurrentToken } from '../../features/authentication/authSlice';
import { asyncGetFlashcardsByFolder, asyncUpdateFlashcard } from '../../features/flashcard/flashcardApis';
import { unwrapResult } from '@reduxjs/toolkit';
import { useDispatch } from 'react-redux';
import { AppDispatch } from '../../app/store';
import { useParams } from 'react-router';

interface EditModelProps {
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
    showModelEdit: boolean,
    onClose: () => void
}
const EditModel = (props: EditModelProps) => {
    const { card } = props
    const [data, setData] = useState({
        term: '',
        meaning: '',
        example: ''
    })
    const {folderId} = useParams()
    const dispatch = useDispatch<AppDispatch>()
    const accessToken = useAppSelector(getCurrentToken)
    useEffect(() => {
        if (card) {
            setData((prev) => ({
                ...prev,
                term: card.term,
                meaning: card.meaning || '',
                example: card.example || ''
            }))
        }
    }, [card])

    const handleChangeInput = (e: InputEvent | TextAreaEvent) => {
        setData((prev) => ({
            ...prev,
            [e.target.name]: e.target.value
        }))
    }
    const handleUpdate = async(e: FormSubmitEvent) => {
        e.preventDefault()
        try{
            const dataSubmit = {
                id: card.id,
                dataCard: data,
                accessToken:accessToken
            }
            const action = await dispatch(asyncUpdateFlashcard(dataSubmit))
            unwrapResult(action)
            const dataGet = {
                folderId: parseInt(folderId!),
                accessToken: accessToken
            }
            await dispatch(asyncGetFlashcardsByFolder(dataGet))
            props.onClose()
            
        }catch(error){
            console.log(error)
        }
    }
    return (
        <Modal
            show={props.showModelEdit}
            onClose={props.onClose}
        >
            <Modal.Header>
                Cập nhật thẻ từ vựng - Flashcard
            </Modal.Header>
            <Modal.Body>
                <form onSubmit={handleUpdate}>
                    <div className='flex flex-col pb-5'>
                        <div className="">
                            <label htmlFor="term" className='font-semibold'>Từ / Cụm từ</label>
                            <input
                                onChange={handleChangeInput}
                                value={data.term}
                                type="text" name="term" className='mt-2 rounded-md w-full' />
                        </div>
                        <div className="mt-2">
                            <label htmlFor="term" className='font-semibold'>Nghĩa</label>
                            <textarea
                                value={data.meaning}
                                onChange={handleChangeInput} name="meaning" rows={3} className='w-full rounded-md mt-2'>


                            </textarea>
                        </div>
                        <div className='mt-2'>
                            <label htmlFor="meaning" className='font-semibold'>Ví dụ</label>
                            <input
                                onChange={handleChangeInput}
                                value={data.example}
                                type="text" name="example" className='mt-2 rounded-md w-full' />
                        </div>

                    </div>
                    <div className="flex justify-end items-center">
                        <button 
                        type='button'
                        onClick={props.onClose}
                        className="close-model mr-2 p-2 rounded-md font-semibold bg-white border-2 border-gray-300">
                            Hủy
                        </button>
                        <button
                            type='submit'
                            className='bg-violet-600 text-white font-semibold p-2 rounded-md'
                        >
                            Cập nhật
                        </button>
                    </div>

                </form>



            </Modal.Body>

        </Modal>
    );
};

export default EditModel;