import React, { useState } from 'react';
import { Modal } from 'flowbite-react';
import { FormSubmitEvent, InputEvent } from '../../events/events';
import { useDispatch } from 'react-redux';
import { AppDispatch } from '../../app/store';
import { useAppSelector } from '../../app/hooks';
import { getCurrentToken } from '../../features/authentication/authSlice';
import { asyncGetListStaffs, asyncRegisterNewStaff } from '../../features/staff_management/staff_managementApis';

interface typeProps {
    showModel: boolean,
    onClose: () => void
}
const CreateModel = (props: typeProps) => {
    const { showModel, onClose } = props
    const dispatch = useDispatch<AppDispatch>()
    const accessToken = useAppSelector(getCurrentToken)
    const [dataInput, setDataInput] = useState({
        username: '',
        password: '',
        name: ''
    })
    const [errorCreate, setErrorCreate] = useState('')

    const handleInput = (e: InputEvent) => {
        setDataInput((prev) => ({
            ...prev,
            [e.target.name]: e.target.value
        }))
    }

    const handleCreateStaff = async (e: FormSubmitEvent) => {
        e.preventDefault()
        try{
            setErrorCreate(()=>'')
            const dataSubmit = {
                data: dataInput,
                accessToken: accessToken
            }
            await dispatch(asyncRegisterNewStaff(dataSubmit)).unwrap()
            await dispatch(asyncGetListStaffs(accessToken))
            setDataInput((prev)=>({
                ...prev,
                username:'',
                password:'',
                name:''
            }))
            onClose()
        }catch(error: any) {
            if(error.message) {
                setErrorCreate(()=>error.message)
            }
        }
    }
    return (
        <Modal
            show={showModel}
            onClose={onClose}
            popup={true}
            size={'lg'}
            className='h-screen'
        >
            <Modal.Header className='ml-3'>
                Tạo tài khoản nhân viên
            </Modal.Header>
            <Modal.Body>
                <div className='h-[400px]'>
                    <h2 className='font-bold text-lg my-3 text-center'>Điền thông tin tài khoản nhân viên</h2>
                    <p className='text-red-500 mb-5'>{errorCreate}</p>
                    <form
                        onSubmit={handleCreateStaff}
                        className='flex flex-col justify-between p-3'>
                        <div>
                            <input required type="text" name='username' placeholder='Tên tài khoản'
                                className='p-3 my-3 w-full border-[1px] rounded-lg outline-none focus:ring-2 focus:ring-violet-700'
                                value={dataInput.username}
                                onChange={handleInput}
                            />
                            <input
                                required
                                value={dataInput.password}
                                onChange={handleInput}
                                className='p-3 my-3 w-full border-[1px] rounded-lg outline-none focus:ring-2 focus:ring-violet-700'
                                type="password" name="password" id="password" placeholder='Mật khẩu' />


                            <input
                                required
                                value={dataInput.name}
                                onChange={handleInput}
                                className='p-3 my-3 w-full border-[1px] rounded-lg outline-none focus:ring-2 focus:ring-violet-700'
                                type="text" name="name" id="name" placeholder='Họ tên' />
                        </div>

                        <button type='submit'
                            className='bg-gradient-to-r from-[#3494E6] to-[#EC6EAD]
                            px-3 py-4 rounded-xl text-white font-bold my-3 flex items-center justify-center'
                        >
                            Thêm
                        </button>
                    </form>
                </div>
            </Modal.Body>
        </Modal>
    );
};

export default CreateModel;