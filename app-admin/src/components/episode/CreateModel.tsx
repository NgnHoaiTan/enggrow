import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { useParams } from 'react-router';
import { AppDispatch } from '../../app/store';
import { FormSubmitEvent, InputEvent, TextAreaEvent } from '../../events/events';
import { Modal } from 'flowbite-react/lib/esm/components';
import { asyncCreateEpisode, asyncGetAllEpisodesByCourse } from '../../features/episode/episodeAPIs';
import { unwrapResult } from '@reduxjs/toolkit';

interface CreateModelProps {
    showFormCreate: boolean,
    onClose: () => void
}
const CreateModel = (props: CreateModelProps) => {
    const [inputData, setInputData] = useState({
        name: '',
        description: '',
        file: '',
    })
    const [creating, setCreating] = useState(false)
    const { courseId } = useParams()
    const [error, setError] = useState('')
    const [errorFile, setErrorFile] = useState('')
    const dispatch = useDispatch<AppDispatch>()

    const handleInputData = (e: InputEvent | TextAreaEvent) => {
        setInputData(prevState => ({
            ...prevState,
            [e.target.name]: e.target.value
        }))
    }
    const handleInputFile = (e: any) => {
        const filesFormats = ['video/mp4', 'video/webm']
        setErrorFile('')
        if (e.target.files[0]) {
            const isRightFormat = filesFormats.includes(e.target.files[0].type)
            if (isRightFormat) {
                setInputData(prevState => ({
                    ...prevState,
                    ['file']: e.target.files[0]
                }))
            } else {
                setErrorFile(`${e.target.files[0].type} is not supported, just accept video/mp4 or video/webm`)
            }
        }
    }
    const handleCreateEpisode = async (e: FormSubmitEvent) => {
        e.preventDefault()
        setCreating(true)
        try {
            if (courseId && parseInt(courseId)) {
                const data = {
                    ...inputData,
                    courseId: parseInt(courseId)
                }
                const dataSubmit = {
                    data: data,
                    accessToken: 'accessToken Test'
                }
                const result = await dispatch(asyncCreateEpisode(dataSubmit))
                unwrapResult(result)
                setCreating(false)
                const dataget = {
                    courseId: courseId,
                    accessToken: 'accessToken'
                }
                dispatch(asyncGetAllEpisodesByCourse(dataget))
                setInputData((prev) => (
                    {
                        name: '',
                        description: '',
                        file: ''
                    }
                ))

                setErrorFile('')
                props.onClose()
            } else {
                setCreating(false)
                throw new Error('courseId must be valid')
            }
        } catch (error: any) {
            if (error.message)
                setError(error.message)
        }
    }
    return (
        <div>
            <Modal
                show={props.showFormCreate}
                onClose={props.onClose}
                popup={true}
            >
                <Modal.Header />
                <Modal.Body>
                    <form onSubmit={handleCreateEpisode} encType="multipart/form-data">
                        <h3 className="text-xl font-medium text-gray-900 dark:text-white mb-4">Create new Episode</h3>
                        <p className='text-red-500'>{error}</p>
                        <div className="flex ">
                            <div className="mb-3 w-full">
                                <label htmlFor="name" className="form-label inline-block mb-2 text-gray-700">Name of Episode</label>
                                <input
                                    onChange={(e) => handleInputData(e)}
                                    type="text"
                                    required
                                    className="
                                    form-control
                                    block
                                    w-full
                                    px-3
                                    py-1.5
                                    text-base
                                    font-normal
                                    text-gray-700
                                    bg-white bg-clip-padding
                                    border border-solid border-gray-300 
                                    rounded
                                    transition
                                    ease-in-out
                                    m-0
                                    focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none
                                "
                                    id="name episode"
                                    name='name'
                                    value={inputData.name}
                                    placeholder="Enter name of Episode"
                                />
                            </div>

                        </div>
                        <div className="flex ">
                            <div className="mb-3 w-full">
                                <label htmlFor="description" className="form-label inline-block mb-2 text-gray-700">Description of Episode</label>
                                <textarea
                                    value={inputData.description}
                                    onChange={handleInputData} name="description" rows={3}
                                    className='form-control
                                    block w-full px-3 py-1.5 text-base font-normal text-gray-700  bg-white bg-clip-padding
                                    border border-solid border-gray-300  rounded transition
                                    ease-in-out m-0
                                    focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none
                                    '>
                                </textarea>
                            </div>

                        </div>
                        <label htmlFor="file" className="form-label inline-block mb-2 text-gray-700">Video file upload</label>
                        <label className="block mb-3">
                            <span className="sr-only">Choose video</span>
                            <input type="file"
                                onChange={handleInputFile}
                                className="block w-full text-sm text-slate-500
                                file:mr-4 file:py-2 file:px-4
                                file:rounded-full file:border-0
                                file:text-sm file:font-semibold
                                file:bg-violet-50 file:text-violet-700
                                hover:file:bg-violet-100
                                "/>
                        </label>
                        {
                            errorFile &&
                            <p className='text-red-500'>
                                {errorFile}
                            </p>
                        }
                        <div className="flex justify-end mt-2">
                            {
                                creating ?
                                    <button
                                        type='button'
                                        className='bg-blue-600 rounded-lg py-2 px-3 text-white font-semibold text-base duration-150
                                            md:text-base'>
                                        Creating...
                                    </button>
                                    :
                                    <button
                                        type='submit'
                                        className='bg-blue-600 rounded-lg py-2 px-3 text-white font-semibold text-base duration-150
                                            md:text-base'>
                                        Create
                                    </button>
                            }

                        </div>
                    </form>


                </Modal.Body>

            </Modal>
        </div>
    );
};

export default CreateModel;