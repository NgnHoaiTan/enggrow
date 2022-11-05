import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { useParams } from 'react-router';
import { AppDispatch } from '../../app/store';
import { FormSubmitEvent, InputEvent, TextAreaEvent } from '../../events/events';
import { Modal } from 'flowbite-react/lib/esm/components';
import { asyncCreateIdentificationExercise, asyncCreatePronunciationExercise, asyncGetAllIdentificationExercisesByEpisode, asyncGetAllPronunciationExercisesByEpisode } from '../../features/exercise/exerciseAPIs';

interface typeProps {
    showFormCreate: boolean,
    onClose: () => void
}
const IdenExCreateModel = (props: typeProps) => {
    const { showFormCreate, onClose } = props
    const [inputData, setInputData] = useState({
        true_word: '',
        false_word: '',
        audio: '',
    })
    const [error, setError] = useState('')
    const { episodeId } = useParams()
    const dispatch = useDispatch<AppDispatch>()
    const [errorFile, setErrorFile] = useState('')
    const handleInputData = (e: InputEvent | TextAreaEvent) => {
        setInputData(prevState => ({
            ...prevState,
            [e.target.name]: e.target.value
        }))
    }
    const handleInputFile = (e: any) => {
        const filesFormats = ['audio/wav', 'audio/mp3', 'audio/ogg']
        setErrorFile('')
        if (e.target.files[0]) {
            const isRightFormat = filesFormats.includes(e.target.files[0].type)
            if (isRightFormat) {
                setInputData(prevState => ({
                    ...prevState,
                    ['file']: e.target.files[0]
                }))


            } else {
                setErrorFile(`${e.target.files[0].type} is not supported, just accept mp3, wav or ogg`)
            }
        }
    }
    const handleCreateExercise = async (e: FormSubmitEvent) => {
        e.preventDefault()
        try {
            if (episodeId && parseInt(episodeId)) {
                const data = {
                    ...inputData,
                    episodeId: parseInt(episodeId)
                }
                const dataSubmit = {
                    data: data,
                    accessToken: 'accessToken Test'
                }
                const dataGet = {
                    episodeId: episodeId,
                    accessToken: 'accessToken Test'
                }
                await dispatch(asyncCreateIdentificationExercise(dataSubmit)).unwrap()
                await dispatch(asyncGetAllIdentificationExercisesByEpisode(dataGet)).unwrap()
                onClose()
                setInputData((prev) => ({
                    ...prev,
                    true_word: '',
                    false_word: ''
                }))
            } else {
                throw new Error('episodeId must be valid')
            }
        } catch (error: any) {
            console.log(error)
            if (error.message)
                setError(error.message)
        }
    }
    return (
        <div>
            <Modal
                show={showFormCreate}
                onClose={onClose}
                popup={true}
            >
                <Modal.Header />
                <Modal.Body>
                    <form onSubmit={handleCreateExercise}>
                        <h3 className="text-xl font-medium text-gray-900 dark:text-white mb-4">Create new Identification Exercise</h3>
                        <p className='text-red-500'>{error}</p>
                        <div className="flex ">
                            <div className="mb-3 w-full">
                                <label htmlFor="phrase" className="form-label inline-block mb-2 text-gray-700">True word</label>
                                <input
                                    onChange={(e) => handleInputData(e)}
                                    type="text"
                                    required
                                    className="form-control block w-full px-3 py-1.5 text-base 
                                        font-normal bg-white bg-clip-padding border border-solid border-gray-300 
                                        rounded  transition ease-in-out m-0
                                        focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none "
                                    id="true_word"
                                    name='true_word'
                                    value={inputData.true_word}
                                    placeholder="Enter word"
                                />
                            </div>
                        </div>
                        <div className="flex ">
                            <div className="mb-3 w-full">
                                <label htmlFor="phrase" className="form-label inline-block mb-2 text-gray-700">False word</label>
                                <input
                                    onChange={(e) => handleInputData(e)}
                                    type="text"
                                    required
                                    className="form-control block w-full px-3 py-1.5 text-base 
                                        font-normal bg-white bg-clip-padding border border-solid border-gray-300 
                                        rounded  transition ease-in-out m-0
                                        focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none "
                                    id="false_word"
                                    name='false_word'
                                    value={inputData.false_word}
                                    placeholder="Enter word"
                                />
                            </div>
                        </div>
                        <div>
                            <label htmlFor="file" className="form-label inline-block mb-2 text-gray-700">Audio upload</label>
                            <label className="block mb-3">
                                <span className="sr-only">Choose pronunciation audio</span>
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
                        </div>

                        <div className="flex justify-end mt-2">
                            <button
                                type='submit'
                                className='bg-blue-600 rounded-lg py-2 px-3 text-white font-semibold text-base
                                    md:text-base'>
                                Create
                            </button>
                        </div>
                    </form>


                </Modal.Body>

            </Modal>
        </div>
    );
};

export default IdenExCreateModel;