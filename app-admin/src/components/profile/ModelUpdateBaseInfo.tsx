import { Modal } from 'flowbite-react';
import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { useAppSelector } from '../../app/hooks';
import { AppDispatch } from '../../app/store';
import { FormSubmitEvent, InputEvent } from '../../events/events';
import { getCurrentToken } from '../../features/authentication/authSlice';
import { asyncGetMyProfile, asyncUpdateBaseProfile } from '../../features/profile/profileApis';
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

interface typeProps {
    onClose: () => void,
    showModel: boolean,
    information: any
}
const ModelUpdateBaseInfo = (props: typeProps) => {
    const { showModel, onClose, information } = props
    const [errorUpdate, setErrorUpdate] = useState('')
    const [dataInput, setDataInput] = useState({
        name: information.name,
        address: information.address || '',
        email: information.email || '',
        phone_number: information.phone_number || '',
        dob: information.dob ? information.dob : new Date().toISOString()
    })
    const dispatch = useDispatch<AppDispatch>()
    const accessToken = useAppSelector(getCurrentToken)

    const validatePhone = (phone: string) => {
        return phone.match(/(84|0[3|5|7|8|9])+([0-9]{8})\b/)
    }
    const validateEmail = (email: string) => {
        return email.match(/^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/)
    }
    // function
    const handleUpdateBaseInformation = async (e: FormSubmitEvent) => {
        e.preventDefault()
        try {
            let validate_phone = validatePhone(dataInput.phone_number)
            let validate_email = validateEmail(dataInput.email)
            if (!validate_email) {
                throw new Error('Sai định dạng email')
            }
            else if (!validate_phone) {
                throw new Error('Sai định dạng số điện thoại')
            }
            let dataUpdate = {
                data: dataInput,
                accessToken: accessToken,
                userId: information.id
            }
            await dispatch(asyncUpdateBaseProfile(dataUpdate)).unwrap()
            await dispatch(asyncGetMyProfile({ accessToken })).unwrap()
            onClose()
        } catch (error: any) {
            if (error.message) {
                setErrorUpdate(error.message)
            } else (
                setErrorUpdate('Lỗi không xác định, thử lại sau !')
            )
        }
    }

    const handleChangeInput = (e: InputEvent) => {
        setDataInput((prev) => ({
            ...prev,
            [e.target.name]: e.target.value
        }))
    }

    return (
        <Modal
            show={showModel}
            onClose={onClose}
            popup={true}
            size={'xl'}
            className='h-screen'
        >
            <Modal.Header className='ml-3'>
                Cập nhật thông tin cơ bản
            </Modal.Header>
            <Modal.Body>
                <div className='h-[600px] overflow-y-auto'>
                    <p className='text-red-500 mb-5'>{errorUpdate}</p>
                    <form
                        onSubmit={handleUpdateBaseInformation}
                        className='flex flex-col justify-between p-3'>
                        <div className='flex flex-col my-2'>
                            <label htmlFor="name" className='font-semibold  mb-3'>Họ và tên</label>
                            <input required type="text" name='name'
                                className='p-3 w-full border-[1px] rounded-lg outline-none focus:ring-2 focus:ring-violet-700'
                                value={dataInput.name}
                                onChange={handleChangeInput}
                            />
                        </div>
                        <div className='flex flex-col my-2'>
                            <label htmlFor="email" className='font-semibold  mb-3'>Email</label>
                            <input required type="text" name='email'
                                className='p-3 w-full border-[1px] rounded-lg outline-none focus:ring-2 focus:ring-violet-700'
                                value={dataInput.email}
                                onChange={handleChangeInput}
                            />
                        </div>
                        <div className='flex flex-col my-2'>
                            <label htmlFor="phone_number" className='font-semibold  mb-3'>Số điện thoại</label>
                            <input required type="text" name='phone_number'
                                className='p-3 w-full border-[1px] rounded-lg outline-none focus:ring-2 focus:ring-violet-700'
                                value={dataInput.phone_number}
                                onChange={handleChangeInput}
                            />
                        </div>
                        <div className='flex flex-col my-2'>
                            <label htmlFor="address" className='font-semibold  mb-3'>Địa chỉ</label>
                            <input required type="text" name='address'
                                className='p-3 w-full border-[1px] rounded-lg outline-none focus:ring-2 focus:ring-violet-700'
                                value={dataInput.address}
                                onChange={handleChangeInput}
                            />
                        </div>
                        <div className='mb-3'>
                            <label htmlFor="name" className='font-semibold mb-2'>Ngày sinh</label>
                            <DatePicker
                                className='border-2 border-violet-500 rounded-lg p-1'
                                selected={new Date(dataInput.dob)}
                                onChange={(date: Date) => setDataInput((prev) => ({ ...prev, ['dob']: date.toISOString() }))}
                            />
                        </div>
                        <div className="flex gap-4 justify-center mt-5">

                            <button
                                type='button'
                                onClick={onClose}
                                className='bg-gray-200 font-semibold rounded-lg py-2 px-5'
                            >
                                Hủy
                            </button>
                            <button type='submit'
                                className='bg-gradient-to-r from-[#3494E6] to-[#EC6EAD]
                            px-3 py-2 rounded-xl text-white font-bold flex items-center justify-center'
                            >
                                Cập nhật
                            </button>
                        </div>

                    </form>
                </div>
            </Modal.Body>
        </Modal>
    );
};

export default ModelUpdateBaseInfo;