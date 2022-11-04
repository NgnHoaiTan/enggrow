import React, { useEffect, useState } from 'react';
import { Modal } from 'flowbite-react/lib/esm/components';
import { FormSubmitEvent, InputEvent, TextAreaEvent } from '../../events/events';
import { useDispatch } from 'react-redux';
import { AppDispatch } from '../../app/store';
import { useParams } from 'react-router';
import { asyncGetEpisodeById, asyncUpdateEpisode } from '../../features/episode/episodeAPIs';


interface EditTypeProps {
    showFormEdit: boolean,
    onClose: () => void,
    episode: {
        name: string,
        description: string
    }
}

const EditEpisode = (props: EditTypeProps) => {
    const { showFormEdit, onClose, episode } = props
    const [inputData, setInputData] = useState({
        name: '',
        description: '',
        file: '',
    })
    const [error, setError] = useState('')
    const [errorFile, setErrorFile] = useState('')
    const dispatch = useDispatch<AppDispatch>()
    const { episodeId } = useParams()
    useEffect(() => {
        setInputData(() => ({
            name: episode.name,
            description: episode.description,
            file:''
        }))
    }, [episode])
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
    const handleEditEpisode = async (e: FormSubmitEvent) => {
        e.preventDefault()
        try {
            if (episodeId && parseInt(episodeId)) {
                const dataUpdate = {
                    id: episodeId,
                    data: inputData,
                    accessToken: 'accessToken'
                }
                const dataGet = {
                    id: episodeId,
                    accessToken: 'accessToken'
                }
                await dispatch(asyncUpdateEpisode(dataUpdate)).unwrap()
                await dispatch(asyncGetEpisodeById(dataGet))
                onClose()
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
            <div>
                <Modal
                    show={props.showFormEdit}
                    onClose={props.onClose}
                    popup={true}
                >
                    <Modal.Header />
                    <Modal.Body>
                        <form onSubmit={handleEditEpisode} encType="multipart/form-data">
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
                                        required
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
                                <button
                                    type='submit'
                                    className='bg-blue-600 rounded-lg py-2 px-3 text-white font-semibold text-base
                                    md:text-base'>
                                    Update
                                </button>
                            </div>
                        </form>


                    </Modal.Body>

                </Modal>
            </div>
        </div>
    );
};

export default EditEpisode;