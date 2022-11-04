import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { useParams } from 'react-router';
import { AppDispatch } from '../../app/store';
import { FormSubmitEvent, InputEvent, TextAreaEvent } from '../../events/events';
import { Modal } from 'flowbite-react/lib/esm/components';
import { asyncCreateExercise, asyncGetAllExercisesByEpisode } from '../../features/exercise/exerciseAPIs';

interface typeProps {
    showFormCreate: boolean,
    onClose: ()=>void
}
const CreateModel = (props: typeProps) => {
    const {showFormCreate, onClose} = props
    const [inputData, setInputData] = useState({
        phrase: '',
    })
    const [error, setError] = useState('')
    const { episodeId } = useParams()
    const dispatch = useDispatch<AppDispatch>()
    const handleInputData = (e: InputEvent | TextAreaEvent) => {
        setInputData(prevState => ({
            ...prevState,
            [e.target.name]: e.target.value
        }))
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
                await dispatch(asyncCreateExercise(dataSubmit)).unwrap()
                await dispatch(asyncGetAllExercisesByEpisode(dataGet)).unwrap()
                onClose()
                setInputData(() => ({
                    phrase: '',
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
                        <h3 className="text-xl font-medium text-gray-900 dark:text-white mb-4">Create new Exercise</h3>
                        <p className='text-red-500'>{error}</p>
                        <div className="flex ">
                            <div className="mb-3 w-full">
                                <label htmlFor="phrase" className="form-label inline-block mb-2 text-gray-700">Phrase - word</label>
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
                                    id="sentence"
                                    name='phrase'
                                    value={inputData.phrase}
                                    placeholder="Enter sentence or word"
                                />
                            </div>

                        </div>
                        {/* <div className="flex ">
                            <div className="mb-3 w-full">
                                <label htmlFor="meaning" className="form-label inline-block mb-2 text-gray-700">The meaning of sentence</label>
                                <textarea
                                    value={inputData.meaning}
                                    onChange={handleInputData} name="meaning" rows={2}
                                    className='form-control
                                        block w-full px-3 py-1.5 text-base font-normal text-gray-700  bg-white bg-clip-padding
                                        border border-solid border-gray-300  rounded transition
                                        ease-in-out m-0
                                        focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none
                                    '>
                                </textarea>
                            </div>

                        </div> */}
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

export default CreateModel;