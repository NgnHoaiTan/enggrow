import { Modal } from 'flowbite-react';
import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { useAppSelector } from '../../app/hooks';
import { AppDispatch } from '../../app/store';
import { FormSubmitEvent, InputEvent, TextAreaEvent } from '../../events/events';
import { getCurrentToken } from '../../features/authentication/authSlice';
import { asyncAddStaffProfile, asyncGetMyProfile } from '../../features/profile/profileApis';

interface typeProps {
    showModel: boolean,
    onClose: () => void
}
const ModelCreateStaffInfo = (props: typeProps) => {
    const { showModel, onClose } = props
    const [dataInput, setDataInput] = useState({
        introduction: '',
        file: ''
    })
    const [errorFile, setErrorFile] = useState('')
    const [errorCreate, setErrorCreate] = useState('')
    const accessToken = useAppSelector(getCurrentToken)
    const dispatch = useDispatch<AppDispatch>()

    const handleChangeInput = (e: TextAreaEvent) => {
        setDataInput((prev) => ({
            ...prev,
            [e.target.name]: e.target.value
        }))
    }

    const handleInputFile = (e: any) => {
        const filesFormats = ['image/jpg', 'image/png','image/jpeg']
        setErrorFile('')
        if (e.target.files[0]) {
            const isRightFormat = filesFormats.includes(e.target.files[0].type)
            if (isRightFormat) {
                setDataInput(prevState => ({
                    ...prevState,
                    ['file']: e.target.files[0]
                }))


            } else {
                setErrorFile(`${e.target.files[0].type} không được hỗ trợ, chỉ hỗ trợ jpg, png`)
            }
        }
    }


    const handleCreateStaffInfo = async (e: FormSubmitEvent) => {
        e.preventDefault()
        try {
            setErrorCreate('')
            let dataSubmit = {
                data: dataInput,
                accessToken: accessToken
            }
            let dataGet = {
                accessToken: accessToken
            }
            await dispatch(asyncAddStaffProfile(dataSubmit)).unwrap()
            await dispatch(asyncGetMyProfile(dataGet)).unwrap()
            onClose()
        } catch (error: any) {
            if (error.message) {
                setErrorCreate(error.message)
            } else (
                setErrorCreate('Lỗi không xác định, vui lòng thử lại sau !')
            )
        }
    }
    return (
        <Modal
            show={showModel}
            onClose={onClose}
            popup={true}
            size={'2xl'}
            className='h-screen'
        >
            <Modal.Header className='ml-3'>
                Tạo thông tin nhân viên
            </Modal.Header>
            <Modal.Body>
                <div className=''>
                    <p className='text-red-500 '>{errorCreate}</p>
                    <form
                        onSubmit={handleCreateStaffInfo}
                        className='flex flex-col justify-between p-3'>
                        <div className='flex flex-col my-3'>
                            <label htmlFor="introduction" className='font-semibold  mb-3'>Giới thiệu</label>
                            <textarea 
                                onChange={handleChangeInput}
                                value={dataInput.introduction}
                                name="introduction" id="introduction" cols={30} rows={5}
                                className='rounded-lg p-3 border-2'
                            ></textarea>
                        </div>

                        <div>
                            <label htmlFor="file" className="font-semibold ">Đăng tải chứng chỉ</label>
                            <label className="block my-3">
                                <span className="sr-only">Choose poster</span>
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
                        </div>

                        <button type='submit'
                            className='bg-gradient-to-r from-[#3494E6] to-[#EC6EAD]
                            px-3 py-4 rounded-xl text-white font-bold my-3 flex items-center justify-center'
                        >
                            Tạo
                        </button>
                    </form>
                </div>
            </Modal.Body>
        </Modal>
    );
};

export default ModelCreateStaffInfo;