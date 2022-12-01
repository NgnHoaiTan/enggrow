import { Modal } from 'flowbite-react';
import React, { useState } from 'react';
import { confirmAlert } from 'react-confirm-alert';
import 'react-confirm-alert/src/react-confirm-alert.css';
import { useDispatch } from 'react-redux';
import { useAppSelector } from '../../app/hooks';
import { AppDispatch } from '../../app/store';
import { FormSubmitEvent } from '../../events/events';
import { getCurrentToken } from '../../features/authentication/authSlice';
import { asyncChangeAvatar, asyncGetMyAlbumAvatar, asyncGetMyProfile, asyncUploadNewAvatar } from '../../features/profile/profileApi';
import { getMyAvatars } from '../../features/profile/profileSlice';

interface typeProps {
    onClose: () => void,
    showModel: boolean,
}


const ModelChangeAvatar = (props: typeProps) => {
    const { showModel, onClose } = props
    const [dataUpload, setDataUpload] = useState({
        file: ''
    })
    const dispatch = useDispatch<AppDispatch>()
    const accessToken = useAppSelector(getCurrentToken)
    const albumAvatars = useAppSelector(getMyAvatars)
    const [errorFile, setErrorFile] = useState('')
    const [errorUpload, setErrorUpload] = useState('')
    const [loadingUpload, setLoadingUpload] = useState(false)

    const handleInputFile = (e: any) => {
        const filesFormats = ['image/jpg', 'image/png', 'image/jpeg']
        setErrorFile('')
        if (e.target.files[0]) {
            const isRightFormat = filesFormats.includes(e.target.files[0].type)
            if (isRightFormat) {
                setDataUpload(prevState => ({
                    ...prevState,
                    ['file']: e.target.files[0]
                }))


            } else {
                setErrorFile(`${e.target.files[0].type} không được hỗ trợ`)
            }
        }
    }

    const handleUploadNewAvatar = async (e: FormSubmitEvent) => {
        e.preventDefault()
        try {
            setErrorUpload('')
            setLoadingUpload(() => true)
            let dataSubmit = {
                data: dataUpload,
                accessToken: accessToken
            }
            await dispatch(asyncUploadNewAvatar(dataSubmit)).unwrap()
            await dispatch(asyncGetMyAlbumAvatar(accessToken)).unwrap()
            await dispatch(asyncGetMyProfile(accessToken)).unwrap()
            setLoadingUpload(() => false)
            onClose()
        } catch (error: any) {
            if (error.message) {
                setErrorUpload(error.message)
            } else (
                setErrorUpload('Lỗi, thử lại sau !')
            )
        }
    }
    const handleConfirmChangeAvatar = (avatarId: number) => {
        confirmAlert({
            
            title: 'Xác nhận thay đổi ảnh đại diện',
            message: 'Xác nhận',
            buttons: [
              {
                label: 'Yes',
                onClick: () => handleChangeAvatar(avatarId)
              },
              {
                label: 'No',
                //onClick: () => alert('Click No')
              }
            ],
            closeOnEscape: true,
            closeOnClickOutside: true,
          });
    }
    const handleChangeAvatar = async (avatarId: number) => {
        try {
            let dataSubmit = {
                data: {
                    avatarId: avatarId
                },
                accessToken: accessToken
            }
            await dispatch(asyncChangeAvatar(dataSubmit)).unwrap()
            await dispatch(asyncGetMyAlbumAvatar(accessToken)).unwrap()
            await dispatch(asyncGetMyProfile(accessToken)).unwrap()
            setLoadingUpload(() => false)
            onClose() 
        }catch(error: any) {
            console.log(error)
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
                Cập nhật ảnh đại diện
            </Modal.Header>
            <Modal.Body>
                <div className='h-[400px] overflow-y-auto relative'>
                    <div className="absolute bottom-0 left-1/2 -translate-x-1 -translate-y-1/2">
                        {
                            loadingUpload &&
                            <div className='z-10 bg-[#3f3f3f86] w-full py-1'>
                                <p className='text-white font-semibold text-center'>đang cập nhật</p>
                            </div>
                        }
                    </div>
                    <div className="upload-new mt-5">
                        <div className=''>
                            <p className="font-semibold my-2">Tải ảnh lên</p>
                            <p className='text-red-500 my-2'>{errorUpload}</p>
                            <form
                                onSubmit={handleUploadNewAvatar}
                                className='flex items-center justify-between'
                            >
                                <label className="block w-fit">
                                    <input
                                        required
                                        onChange={handleInputFile}
                                        type="file" className="block w-fit text-sm text-slate-500
                                        file:mr-4 file:py-2 file:px-4
                                        file:rounded-full file:border-0
                                        file:text-sm file:font-semibold
                                        file:bg-violet-50 file:text-violet-700
                                        hover:file:bg-violet-100
                                        "/>
                                </label>
                                <button type='submit' className='bg-blue-500 text-white font-semibold py-1 px-3 rounded-md'>
                                    Cập nhật
                                </button>
                            </form>
                            <p className='text-red-500 my-2'>{errorFile}</p>
                        </div>
                    </div>


                    <div className="exist-avatar">
                        <p className='font-semibold my-2'>
                            Ảnh đã tải lên
                        </p>
                        {
                            albumAvatars ?
                                <div className='grid grid-cols-4 sm:grid-cols-6 gap-2'>
                                    {
                                        albumAvatars.map((avatar: any) => {
                                            return (
                                                <div key={avatar.id} 
                                                onClick={()=>handleConfirmChangeAvatar(avatar.id)}
                                                className='w-full h-[100px] cursor-pointer'>
                                                    <img src={avatar.image_url} alt="avatar" className='w-full h-full rounded-md object-cover'/>
                                                </div>
                                            )
                                        })
                                    }
                                </div>
                                :
                                <div className='font-semibold text-gray-400 mt-3'>
                                    <p>Bạn không có ảnh nào đã được tải lên</p>
                                </div>
                        }

                    </div>
                </div>
            </Modal.Body>
        </Modal>
    );
};

export default ModelChangeAvatar;