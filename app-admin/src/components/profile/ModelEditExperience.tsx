import { Modal } from 'flowbite-react';
import React, { useState } from 'react';
import { FormSubmitEvent, InputEvent, TextAreaEvent } from '../../events/events';
import DatePicker from "react-datepicker";
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';
import "react-datepicker/dist/react-datepicker.css";
import { BsCalendarWeek } from 'react-icons/bs';
import { useAppSelector } from '../../app/hooks';
import { getMyProfile } from '../../features/profile/profileSlice';
import { getCurrentToken } from '../../features/authentication/authSlice';
import { useDispatch } from 'react-redux';
import { AppDispatch } from '../../app/store';
import { asyncGetMyProfile, asyncUpdateExperience } from '../../features/profile/profileApis';


interface typeProps {
    onClose: () => void,
    showModel: boolean,
    experience: {
        id: number,
        position: string,
        description: string,
        from_time: string,
        to_time: string
    }
}
const ModelEditExperience = (props: typeProps) => {
    const { showModel, onClose, experience } = props
    const [errorEdit, setErrorEdit] = useState('')
    const [dataInput, setDataInput] = useState({
        position: experience.position,
        description: experience.description
    })
    const [startDate, setStartDate] = useState<Date>(new Date(experience.from_time));
    const [endDate, setEndDate] = useState<Date>(new Date(experience.to_time));
    const profile = useAppSelector(getMyProfile)
    const accessToken = useAppSelector(getCurrentToken)
    const dispatch = useDispatch<AppDispatch>()


    const handleInputTextEditor = (value: string) => {
        setDataInput((prev) => ({
            ...prev,
            ['description']: value
        }))
    }

    const handleChangeInput = (e: InputEvent | TextAreaEvent) => {
        setDataInput((prev) => ({
            ...prev,
            [e.target.name]: e.target.value
        }))
    }


    const handleAddExperience = async (e: FormSubmitEvent) => {
        e.preventDefault()
        try {
            setErrorEdit('')
            let data = {
                position: dataInput.position,
                description: dataInput.description,
                from_time: startDate.toISOString(),
                to_time: endDate.toISOString()
            }
            let dataSubmit = {
                data: data,
                id: experience.id,
                accessToken: accessToken
            }
            await dispatch(asyncUpdateExperience(dataSubmit)).unwrap()
            await dispatch(asyncGetMyProfile({ accessToken })).unwrap()
            onClose()
        } catch (error: any) {
            if (error.message) {
                setErrorEdit(error.message)
            } else (
                setErrorEdit('Lỗi không xác định, thử lại sau !')
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
                Cập nhật kinh nghiệm làm việc
            </Modal.Header>
            <Modal.Body>
                <div className=''>
                    <p className='text-red-500 mb-5'>{errorEdit}</p>
                    <form
                        onSubmit={handleAddExperience}
                        className='flex flex-col justify-between p-3'>

                        <div className='flex flex-col my-2'>
                            <label htmlFor="position" className='font-semibold  mb-3'>Vị trí làm việc</label>
                            <input required type="text" name='position' placeholder='position'
                                className='p-3 w-full border-[1px] rounded-lg outline-none focus:ring-2 focus:ring-violet-700'
                                value={dataInput.position}
                                onChange={handleChangeInput}
                            />
                        </div>
                        <div className='flex flex-col my-2'>
                            <div className="mb-3 w-full">
                                <label htmlFor="description" className='font-semibold  mb-3'>Mô tả thông tin công việc</label>

                                <div className="max-h-[300px] text-base overflow-y-auto">
                                    <ReactQuill theme="snow" value={dataInput.description} onChange={handleInputTextEditor} />
                                </div>

                            </div>
                        </div>
                        <div className="from_date my-2">
                            <p className='font-semibold  mb-3'>Thời gian bắt đầu làm việc</p>
                            <div className="relative w-fit">
                                <DatePicker selected={startDate}
                                    onChange={(date: Date) => setStartDate(date)}
                                    className='border-2 border-blue-400 p-2 rounded-lg'
                                />
                                <div className="absolute right-0 -translate-x-full top-1/2 -translate-y-1/2">
                                    <BsCalendarWeek size={'18px'} color='#636363' />
                                </div>
                            </div>

                        </div>
                        <div className="to_date my-2">
                            <p className='font-semibold  mb-3'>Thời gian kết thúc làm việc</p>
                            <div className="relative w-fit">
                                <DatePicker selected={endDate}
                                    onChange={(date: Date) => setEndDate(date)}
                                    className='border-2 border-blue-400 p-2 rounded-lg'
                                />
                                <div className="absolute right-0 -translate-x-full top-1/2 -translate-y-1/2">
                                    <BsCalendarWeek size={'18px'} color='#636363' />
                                </div>
                            </div>

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

export default ModelEditExperience;