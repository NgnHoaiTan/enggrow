import React, { useEffect, useState } from 'react';
import { Modal } from 'flowbite-react/lib/esm/components';
import { useDispatch } from 'react-redux';
import { AppDispatch } from '../../app/store';
import { useParams } from 'react-router';
import { FormSubmitEvent, InputEvent, TextAreaEvent } from '../../events/events';
import { getCurrentToken } from '../../features/authentication/authSlice';
import { useAppSelector } from '../../app/hooks';
import { getFolder } from '../../features/folder/folderSlice';
import { asyncGetFolderById, asyncUpdateFolder } from '../../features/folder/folderApis';
import { unwrapResult } from '@reduxjs/toolkit';

interface EditAlbum {
    folder: any,
    onClose: ()=>void,
    show: boolean
}
const EditAlbum = (props: EditAlbum) => {
    const { folder } = props
    const [data, setData] = useState({
        name: '',
        description: ''
    })
    const dispatch = useDispatch<AppDispatch>()
    const accessToken = useAppSelector(getCurrentToken)
    useEffect(() => {
        if (folder) {
            setData((prev) => ({
                ...prev,
                name: folder.name,
                description: folder.description
            }))
        }
    }, [folder])
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
                id: folder.id,
                data: data,
                accessToken:accessToken
            }
            const action = await dispatch(asyncUpdateFolder(dataSubmit))
            unwrapResult(action)
            const dataSend = {
                id: folder.id,
                accessToken: accessToken
            }
            await dispatch(asyncGetFolderById(dataSend))
            props.onClose()
            
        }catch(error){
            console.log(error)
        }
    }
    return (
        <Modal
            show={props.show}
            onClose={props.onClose}
        >
            <Modal.Header>
                Update Folder
            </Modal.Header>
            <Modal.Body>
                <form onSubmit={handleUpdate}>
                    <div className='flex flex-col pb-5'>
                        <div className="">
                            <label htmlFor="name" className='font-semibold'>Name</label>
                            <input
                                onChange={handleChangeInput}
                                value={data.name}
                                type="text" name="name" className='mt-2 rounded-md w-full' />
                        </div>
                        <div className="mt-2">
                            <label htmlFor="description" className='font-semibold'>Description</label>
                            <textarea
                                value={data.description}
                                onChange={handleChangeInput} name="description" rows={3} className='w-full rounded-md mt-2'>


                            </textarea>
                        </div>
                    
                    </div>
                    <div className="flex justify-end items-center">
                        <button
                            type='button'
                            onClick={props.onClose}
                            className="close-model mr-2 p-2 rounded-md font-semibold bg-white border-2 border-gray-300">
                            Cancel
                        </button>
                        <button
                            type='submit'
                            className='bg-violet-600 text-white font-semibold p-2 rounded-md'
                        >
                            Update
                        </button>
                    </div>

                </form>



            </Modal.Body>

        </Modal>
    );
};

export default EditAlbum;