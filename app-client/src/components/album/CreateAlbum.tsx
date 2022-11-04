import React, { useState } from 'react';
import { Modal } from 'flowbite-react/lib/esm/components';
import { useDispatch } from 'react-redux';
import { AppDispatch } from '../../app/store';
import { asyncCreateFolder, asyncGetMyFolders } from '../../features/folder/folderApis';
import { FormSubmitEvent, InputEvent } from '../../events/events';
import { unwrapResult } from '@reduxjs/toolkit';
import { useAppSelector } from '../../app/hooks';
import { getCurrentUser } from '../../features/authentication/authSlice';
interface CreateAlbumProps {
    showFormCreate: boolean,
    onClose: () => void
}
const CreateAlbum = (props: CreateAlbumProps) => {
    const [data, setData] = useState({
        name: '',
        description: ''
    })
    const user = useAppSelector(getCurrentUser)
    const [error, setError] = useState('')
    const dispatch = useDispatch<AppDispatch>()
    const handleInputData = (e: InputEvent) => {
        setData(prevState => ({
            ...prevState,
            [e.target.name]: e.target.value
        }))
    }
    const handleCreateFolder = async (e: FormSubmitEvent) => {
        e.preventDefault()
        console.log('submit create')
        try {
            const sendData = {
                name: data.name,
                description: data.description,
                userId: user.id
            }
            const action = await dispatch(asyncCreateFolder(sendData))
            const result = unwrapResult(action)
            console.log(result)
            await dispatch(asyncGetMyFolders(user.id))
            setData({
                name: '',
                description: ''
            })
            props.onClose()
        } catch (error: any) {
            console.log(error)
            setError(error)
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
                    <form onSubmit={handleCreateFolder}>
                        <h3 className="text-xl font-medium text-gray-900 dark:text-white mb-4">Create your new folder</h3>
                        <p className='text-red-500'>{error}</p>
                        <div className="flex ">
                            <div className="mb-3 w-full">
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
                                    id="name folder"
                                    name='name'
                                    value={data.name}
                                    placeholder="Enter name of folder"
                                />
                            </div>

                        </div>
                        <div className="flex ">
                            <div className="mb-3 w-full">
                                <label htmlFor="exampleFormControlInput1" className="form-label inline-block mb-2 text-gray-700">Description of folder</label>
                                <input
                                    onChange={(e) => handleInputData(e)}
                                    name='description'
                                    type="text"
                                    value={data.description}
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
                                    id="description folder"
                                    placeholder="Description (optional)"
                                />
                            </div>

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

export default CreateAlbum;