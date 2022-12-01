import React, { useRef, useState } from 'react';
import { Modal } from 'flowbite-react/lib/esm/components';
import { FormSubmitEvent, InputEvent, TextAreaEvent } from '../../events/events';
import dictionary from '../../apis/dictionary';
import urbanDictionary from '../../apis/urbanDictionary';
import { useDispatch } from 'react-redux';
import { AppDispatch } from '../../app/store';
import { asyncCreateFlashcard, asyncGetFlashcardsByFolder } from '../../features/flashcard/flashcardApis';
import { useAppSelector } from '../../app/hooks';
import { getCurrentToken } from '../../features/authentication/authSlice';
import {useParams} from 'react-router-dom'
import { unwrapResult } from '@reduxjs/toolkit';
interface AddModelProps {
    showModelAdd: boolean,
    onClose: () => void
}

const AddModel = (props: AddModelProps) => {
    const [data, setData] = useState({
        term: '',
        meaning: '',
        example: ''
    })
    const {folderId} = useParams()
    const accessToken = useAppSelector(getCurrentToken)
    const dispatch = useDispatch<AppDispatch>()
    const [error, setError] = useState('')
    const typingTimeoutRef = useRef<NodeJS.Timeout | null>(null)
    const [definition, setDefinition] = useState<[] | null>(null)
    const handleChangeInput = (e: InputEvent | TextAreaEvent) => {
        setData((prev) => ({
            ...prev,
            [e.target.name]: e.target.value
        }))
        if (typingTimeoutRef.current) {
            clearTimeout(typingTimeoutRef.current)
        }
   
        if (e.target.name === 'term' && e.target.value !== '' && data.meaning === '') {
            typingTimeoutRef.current = setTimeout(async () => {
                const word = e.target.value
                await handleSuggesstionDefinition(word)
            }, 400)
        }
        else if(e.target.name === 'meaning' && e.target.value !== '') {
            setDefinition(()=>null)
        }
        else if (e.target.name === 'term' && e.target.value === '') {
            setDefinition(()=>null)
        }

    }
    const handleCloseModel = () => {
        setData({
            term: '',
            meaning: '',
            example: ''
        })
        props.onClose()
        setDefinition(null)
        if (typingTimeoutRef.current) {
            clearTimeout(typingTimeoutRef.current)
        }
    }
    const handleSuggesstionDefinition = async (word: string) => {
        try {
            const result = await urbanDictionary.get(`define?term=${word}`)
            setDefinition(result.data.list)

        } catch (error) {
            console.log(error)
        }
    }

    const handleSubmitAdd = async (e: FormSubmitEvent) => {
        e.preventDefault()
        try {
            if(data.term.length > 50) {
                throw new Error('Maximum 50 character in word field')
            }
            if(folderId) {
                const dataCard = {
                    term: data.term,
                    meaning: data.meaning,
                    example: data.example,
                    folderId: parseInt(folderId)
                }
    
                const action = await dispatch(asyncCreateFlashcard({dataCard, accessToken}))
                const result = unwrapResult(action)
                const dataGet = {
                    folderId: parseInt(folderId),
                    accessToken:accessToken
                }
                await dispatch(asyncGetFlashcardsByFolder(dataGet))
                handleCloseModel()
            }
            
        } catch (error: any) {
            console.log(error)
            if(error.message) {
                setError(error.message)
            }else {
                setError('Unknow error happen when create flashcard')
            }
            
        }
    }
    const handleChooseDefinition = (e: React.MouseEvent<HTMLDivElement>) => {
        const value = e.currentTarget.textContent
        if (value) {
            setData((prev) => ({
                ...prev,
                ['meaning']: value
            }))
            setDefinition(null)
        }
    }
    return (
        <Modal
            show={props.showModelAdd}
            onClose={handleCloseModel}
        >
            <Modal.Header>
                Thêm thẻ từ vựng - Flashcard
            </Modal.Header>
            <Modal.Body>
                <p className='text-red-500'>{error}</p>
                <form onSubmit={handleSubmitAdd}>
                    <div className='flex flex-col pb-5'>
                        <div className="">
                            <label htmlFor="term" className='font-semibold'>Từ / Cụm từ</label>
                            <input
                                required
                                value={data.term}
                                onChange={handleChangeInput}
                                type="text" name="term" className='mt-2 rounded-md w-full' />
                        </div>
                        <div className='mt-2 relative'>
                            <label htmlFor="meaning" className='font-semibold'>Nghĩa</label>
                            <textarea
                                value={data.meaning}
                                onChange={handleChangeInput} 
                                name="meaning" rows={3} className='w-full rounded-md mt-2'>


                            </textarea>

                            {
                                definition &&
                                <div className='absolute translate-y-2 suggesstion bg-white border-2 max-h-52 overflow-y-auto'>
                                    <div className="flex justify-end">
                                        <button 
                                        onClick={()=>setDefinition(null)}
                                        className='text-sm p-1'>đóng</button>
                                    </div>
                                    {
                                        definition && definition.length > 0 ?
                                            <>
                                                {
                                                    definition.map((item: any, index: number) => {
                                                        return (
                                                            <div key={index}
                                                                onClick={(e: React.MouseEvent<HTMLDivElement>) => handleChooseDefinition(e)}
                                                                className='first:mt-0 mt-2 p-2 font-semibold cursor-pointer hover:bg-gray-100'
                                                            >
                                                                {item.definition}
                                                            </div>
                                                        )
                                                    })
                                                }
                                            </>
                                            :
                                            <>
                                            </>
                                    }
                                </div>
                            }
                            <label htmlFor="example" className='font-semibold'>Ví dụ</label>
                            <input
                                value={data.example}
                                onChange={handleChangeInput}
                                type="text" name="example" className='mt-2 rounded-md w-full' />

                        </div>
                        <button type='submit'
                            className=' mt-4 p-2 rounded-md bg-violet-600 text-white font-semibold'
                        >
                            Thêm thẻ
                        </button>

                    </div>
                </form>



            </Modal.Body>

        </Modal>
    );
};

export default AddModel;