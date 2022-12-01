import { Modal } from 'flowbite-react';
import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { string } from 'yup';
import { useAppSelector } from '../../app/hooks';
import { AppDispatch } from '../../app/store';
import { FormSubmitEvent, InputEvent } from '../../events/events';
import { getCurrentToken } from '../../features/authentication/authSlice';
import { asyncGetMyProfile, asyncUpdateBaseProfile } from '../../features/profile/profileApi';
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

interface typeProps {
    showModel: boolean,
    onClose: () => void,
    information: {
        id: number,
        name: string,
        email: string,
        phone_number: string,
        address: string,
        dob: string
    }
}
const ModelInfo = (props: typeProps) => {
    const { showModel, onClose, information } = props
    const accessToken = useAppSelector(getCurrentToken)
    const dispatch = useDispatch<AppDispatch>()
    const [edit, setEdit] = useState(false)
    const [errorUpdate, setErrorUpdate] = useState('')
    const [dataInput, setDataInput] = useState({
        name: information.name,
        email: information.email,
        address: information.address,
        phone_number: information.phone_number,
        dob: information.dob ? new Date(information.dob).toISOString() : new Date().toISOString()
    })
    const validateEmail = (email: string) => {
        return email.match(/^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/)
    }
    const validatePhone = (phone: string) => {
        return phone.match(/(84|0[3|5|7|8|9])+([0-9]{8})\b/)
    }
    const handleCloseEdit = () => {
        setEdit(false)
    }
    const handleChangeInput = async(e: InputEvent) => {
        setDataInput((prev)=>({
            ...prev,
            [e.target.name]: e.target.value
        }))
    }
    const handleUpdateInfo = async (e: FormSubmitEvent) => {
        e.preventDefault()
        setErrorUpdate('')
        try{
            let validate_email = validateEmail(dataInput.email) 
            let validate_phone = validatePhone(dataInput.phone_number)
            if(!validate_email) {
                throw new Error('Sai định dạng email')
            }
            else if(!validate_phone) {
                throw new Error('Sai định dạng số điện thoại')
            }
            let dataUpdate = {
                data: dataInput,
                accessToken: accessToken,
                userId: information.id
            }
            await dispatch(asyncUpdateBaseProfile(dataUpdate)).unwrap()
            await dispatch(asyncGetMyProfile(accessToken)).unwrap()
            onClose()
        }catch(error: any){
            if (error.message) {
                setErrorUpdate(error.message)
            } else (
                setErrorUpdate('Lỗi không xác định, thử lại sau!')
            )
        }
    }
    if (edit) {
        return (
            <Modal
                show={showModel}
                onClose={onClose}
                size={'xl'}
                className='h-screen'
            >
                <Modal.Header>
                </Modal.Header>
                <Modal.Body>
                    <div className={`h-[500px] relative overflow-y-auto`}>
                        <p className='text-center font-semibold text-lg mb-4'>Cập nhật thông tin cá nhân</p>
                        <div className='w-full sm:w-3/5 mx-auto'>
                            <form onSubmit={handleUpdateInfo}>
                                <p className='text-center text-red-500 mb-2'>{errorUpdate}</p>
                                <div className='mb-3'>
                                    <label htmlFor="name" className='font-semibold mb-2'>Họ tên</label>
                                    <input type="text" name="name" id=""
                                        onChange={handleChangeInput}
                                        value={dataInput.name}
                                        className='w-full rounded-lg p-2'
                                    />
                                </div>
                                <div className='mb-3'>
                                    <label htmlFor="name" className='font-semibold mb-2'>Email</label>
                                    <input type="text" name="email" id=""
                                        onChange={handleChangeInput}
                                        value={dataInput.email}
                                        className='w-full rounded-lg p-2'
                                    />
                                </div>
                                <div className='mb-3'>
                                    <label htmlFor="name" className='font-semibold mb-2'>Số điện thoại</label>
                                    <input type="text" name="phone_number" id=""
                                        onChange={handleChangeInput}
                                        value={dataInput.phone_number}
                                        className='w-full rounded-lg p-2'
                                    />
                                </div>
                                <div className='mb-3'>
                                    <label htmlFor="name" className='font-semibold mb-2'>Địa chỉ</label>
                                    <input type="text" name="address" id=""
                                        onChange={handleChangeInput}
                                        value={dataInput.address}
                                        className='w-full rounded-lg p-2'
                                    />
                                </div>
                                <div className='mb-3'>
                                    <label htmlFor="name" className='font-semibold mb-2'>Ngày sinh</label>
                                    <DatePicker 
                                        selected={new Date(dataInput.dob)} 
                                        onChange={(date:Date) => setDataInput((prev)=>({...prev,['dob']: date.toISOString()}))} 
                                    />
                                </div>
                                <div className="flex gap-4 justify-center">

                                    <button
                                        type='button'
                                        onClick={handleCloseEdit}
                                        className='bg-gray-200 font-semibold rounded-lg py-1 px-3'
                                    >
                                        Hủy
                                    </button>
                                    <button
                                        type='submit'
                                        className='bg-blue-500 text-white font-semibold rounded-lg py-1 px-3'
                                    >
                                        Cập nhật
                                    </button>
                                </div>
                            </form>
                        </div>

                    </div>
                </Modal.Body>
            </Modal>
        )
    }
    return (
        <Modal
            show={showModel}
            onClose={onClose}
            size={'xl'}
            className='h-screen'
        >
            <Modal.Header>
            </Modal.Header>
            <Modal.Body>
                <div className={`h-[200px] relative overflow-y-auto`}>

                    <p className='text-center font-semibold text-lg mb-4'>Thông tin cá nhân</p>
                    <div>
                        <div className="name flex items-center">
                            <p className='font-semibold w-32'>Họ tên:</p>
                            <p>{information.name}</p>
                        </div>
                        <div className="name flex items-center">
                            <p className='font-semibold w-32'>Email:</p>
                            <p>{information.email}</p>
                        </div>
                        <div className="name flex items-center">
                            <p className='font-semibold w-32'>Số điện thoại:</p>
                            <p>{information.phone_number}</p>
                        </div>
                        <div className="name flex items-center">
                            <p className='font-semibold w-32'>Địa chỉ:</p>
                            <p>{information.address}</p>
                        </div>
                    </div>
                    <button
                        onClick={() => setEdit(true)}
                        className='bg-white mt-3 py-1 px-3 drop-shadow-lg text-center'>
                        Cập nhật thông tin hiển thị
                    </button>
                </div>
            </Modal.Body>
        </Modal>
    );
};

export default ModelInfo;