import { Modal } from 'flowbite-react';
import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { useAppSelector } from '../../app/hooks';
import { AppDispatch } from '../../app/store';
import { FormSubmitEvent, InputEvent, TextAreaEvent } from '../../events/events';
import { getCurrentToken } from '../../features/authentication/authSlice';
import { asyncAddStaffProfile, asyncGetMyProfile, asyncUpdateStaffProfile } from '../../features/profile/profileApis';
import Zoom from 'react-medium-image-zoom'
import 'react-medium-image-zoom/dist/styles.css'


interface typeProps {
    showModel: boolean,
    onClose: () => void,
    information: {
        id: number,
        introduction: string,
        certification_url: string
    }
}
const ModelEditStaffInfo = (props: typeProps) => {
    const { showModel, onClose, information } = props
    const [dataInput, setDataInput] = useState({
        introduction: information.introduction,
        certification_url: information.certification_url,
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
        const filesFormats = ['image/jpg', 'image/png', 'image/jpeg']
        setErrorFile('')
        if (e.target.files[0]) {
            const isRightFormat = filesFormats.includes(e.target.files[0].type)
            if (isRightFormat) {
                setDataInput(prevState => ({
                    ...prevState,
                    ['file']: e.target.files[0]
                }))


            } else {
                setErrorFile(`${e.target.files[0].type} không được hỗ trợ, chỉ chấp nhận jpg, png`)
            }
        }
    }


    const handleEditStaffInfo = async (e: FormSubmitEvent) => {
        e.preventDefault()
        try {
            setErrorCreate('')
            let dataSubmit = {
                data: dataInput,
                accessToken: accessToken,
                id: information.id
            }
            let dataGet = {
                accessToken: accessToken
            }
            await dispatch(asyncUpdateStaffProfile(dataSubmit)).unwrap()
            await dispatch(asyncGetMyProfile(dataGet)).unwrap()
            onClose()
        } catch (error: any) {
            if (error.message) {
                setErrorCreate(error.message)
            } else (
                setErrorCreate('Lỗi không xác định, thử lại sau!')
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
                Cập nhật thông tin nhân viên
            </Modal.Header>
            <Modal.Body>
                <div className='h-[600px] overflow-y-auto'>
                    <p className='text-red-500 mb-5'>{errorCreate}</p>
                    <form
                        onSubmit={handleEditStaffInfo}
                        className='flex flex-col justify-between p-3'>
                        <div className='flex flex-col my-3'>
                            <label htmlFor="introduction" className='font-semibold  mb-3'>Giới thiệu</label>
                            <textarea
                                onChange={handleChangeInput}
                                value={dataInput.introduction}
                                name="introduction" id="introduction" cols={30} rows={8}
                                className='rounded-lg p-3 border-2'
                            ></textarea>
                        </div>
                        {
                            information.certification_url ?
                                <div>
                                    <p className="font-semibold my-3">Chứng chỉ</p>
                                    {
                                        showModel &&
                                        <Zoom>
                                            <img src={information.certification_url} alt="certification" className='w-[100px] mx-auto' />
                                        </Zoom>
                                    }

                                </div>
                                :
                                <>
                                </>
                        }

                        <div>
                            <label htmlFor="file" className="font-semibold ">Tải chứng chỉ mới</label>
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
                            Cập nhật
                        </button>
                    </form>
                </div>
            </Modal.Body>
        </Modal>
    );
};

export default ModelEditStaffInfo;