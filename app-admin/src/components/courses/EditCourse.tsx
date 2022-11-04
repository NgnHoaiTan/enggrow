import React, { useState, Fragment, useEffect } from 'react';
import { Modal } from 'flowbite-react/lib/esm/components';
import { FormSubmitEvent, InputEvent, TextAreaEvent } from '../../events/events';
import { Listbox, Transition } from '@headlessui/react'
import { FaAngleDown } from 'react-icons/fa';
import { useParams } from 'react-router';
import { useDispatch } from 'react-redux';
import { AppDispatch } from '../../app/store';
import { asyncGetPronunCourseById, asyncUpdatePronunCourse } from '../../features/pronunciation_course/pronunCourseAPIs';
import { unwrapResult } from '@reduxjs/toolkit';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';

const LevelOptions = [
    {
        id: 1,
        name: 'All Level',
        value: 'all',

    },
    {
        id: 2,
        name: 'Intermediate Level',
        value: 'intermediate',

    },
    {
        id: 3,
        name: 'Upper Intermediate Level',
        value: 'upper intermediate',
    },
    {
        id: 4,
        name: 'Advanced Level',
        value: 'advanced',
    },

]
function classNames(...classes: any[]) {
    return classes.filter(Boolean).join(' ')
}

interface PropsType {
    open: boolean,
    onClose: () => void,
    course: {
        name: string,
        description: string,
        level: string
    }
}
const EditCourse = (props: PropsType) => {
    const { open, onClose, course } = props
    const [selected, setSelected] = useState(LevelOptions[0])
    const [error, setError] = useState('')
    const [errorFile, setErrorFile] = useState('')
    const [inputData, setInputData] = useState({
        name: '',
        description: '',
        level: '',
        file: ''
    })
    useEffect(() => {
        setInputData(() => ({
            name: course.name,
            description: course.description,
            level: course.level,
            file:''
        }))
    }, [course])
    const dispatch = useDispatch<AppDispatch>()
    const { courseId } = useParams()

    const handleSelectLevel = (value: any) => {
        setSelected(value)
        setInputData((prev) => ({
            ...prev,
            ['level']: value.value
        }))
    }
    const handleInputFile = (e: any) => {
        const filesFormats = ['image/jpg', 'image/png', 'image/jpeg']
        setErrorFile('')
        if (e.target.files[0]) {
            const isRightFormat = filesFormats.includes(e.target.files[0].type)
            if (isRightFormat) {
                const reader = new FileReader()
                reader.readAsDataURL(e.target.files[0])
                reader.onloadend = (e)=>{
                    console.log(e)
                }
                setInputData(prevState => ({
                    ...prevState,
                    ['file']: e.target.files[0]
                }))
            } else {
                setErrorFile(`${e.target.files[0].type} is not supported, just accept jpg or png`)
            }
        }
    }
    const handleInputTextEditor = (value: string) => {
        setInputData((prev) => ({
            ...prev,
            ['description']: value
        }))
    }

    const handleInputData = (e: InputEvent | TextAreaEvent) => {
        setInputData((prev) => ({
            ...prev,
            [e.target.name]: e.target.value
        }))
    }
    const handleUpdateCourse = async (e: FormSubmitEvent) => {
        e.preventDefault()
        try {
            console.log(inputData)
            const dataUpdate = {
                id: courseId,
                data: inputData,
                accessToken: 'accessToken'
            }
            const dataGet = {
                id: courseId,
                accessToken: 'accessToken'
            }
            const updateResult = await dispatch(asyncUpdatePronunCourse(dataUpdate))
            unwrapResult(updateResult)
            await dispatch(asyncGetPronunCourseById(dataGet)).unwrap()
            onClose()

        } catch (error: any) {
            if (error.message) {
                setError(error.message)
            }
            console.log(error)
        }
    }
    return (
        <div>
            <div>
                <Modal
                    show={open}
                    onClose={onClose}
                    popup={true}
                >
                    <Modal.Header />
                    <Modal.Body>
                        <form onSubmit={handleUpdateCourse}>
                            <h3 className="text-xl font-medium text-gray-900 dark:text-white mb-4">Create new Course</h3>
                            <p className='text-red-500'>{error}</p>
                            <div className="flex ">
                                <div className="mb-3 w-full">
                                    <label htmlFor="name" className="form-label inline-block mb-2 text-gray-700">Name of Course</label>
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
                                        id="name course"
                                        name='name'
                                        value={inputData.name}
                                        placeholder="Enter name of course"
                                    />
                                </div>

                            </div>
                            <div className="flex ">
                                <div className="mb-3 w-full">
                                    <label htmlFor="description" className="form-label inline-block mb-2 text-gray-700">Description of Course</label>
                                    <div className="text-base max-h-[300px] overflow-y-auto">
                                        <ReactQuill theme="snow" value={inputData.description} onChange={handleInputTextEditor} />
                                    </div>
                                </div>

                            </div>
                            <label htmlFor="file" className="form-label inline-block mb-2 text-gray-700">Poster upload</label>
                        <label className="block mb-3">
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
                        {
                            errorFile &&
                            <p className='text-red-500'>
                                {errorFile}
                            </p>
                        }

                            <Listbox value={selected} onChange={(value) => handleSelectLevel(value)}>
                                {({ open }) => (
                                    <>
                                        <Listbox.Label className="block mb-2 text-gray-700">Level</Listbox.Label>
                                        <div className="relative mt-1">
                                            <Listbox.Button className="relative w-full cursor-default rounded-md border border-gray-300 bg-white py-2 pl-3 pr-10 text-left shadow-sm focus:border-indigo-500 focus:outline-none focus:ring-1 focus:ring-indigo-500 sm:text-sm">
                                                <span className="flex items-center">
                                                    <span className="block truncate text-base">{selected.name}</span>
                                                </span>
                                                <span className="pointer-events-none absolute inset-y-0 right-0 ml-3 flex items-center pr-2">
                                                    <FaAngleDown className="h-5 w-5 text-gray-400" />
                                                </span>
                                            </Listbox.Button>

                                            <Transition
                                                show={open}
                                                as={Fragment}
                                                leave="transition ease-in duration-100"
                                                leaveFrom="opacity-100"
                                                leaveTo="opacity-0"
                                            >
                                                <Listbox.Options className="absolute z-10 mt-1 max-h-56 w-full overflow-auto rounded-md bg-white py-1 text-base shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none sm:text-sm">
                                                    {LevelOptions.map((level) => (
                                                        <Listbox.Option
                                                            key={level.id}
                                                            className={({ active }) =>
                                                                classNames(
                                                                    active ? 'text-white bg-indigo-600' : 'text-gray-900',
                                                                    'relative cursor-default select-none py-2 pl-3 pr-9'
                                                                )
                                                            }
                                                            value={level}
                                                        >
                                                            {({ selected, active }) => (
                                                                <>
                                                                    <div className="flex items-center">
                                                                        <span
                                                                            className={classNames(selected ? 'font-bold' : 'font-normal', 'block truncate text-base')}
                                                                        >
                                                                            {level.name}
                                                                        </span>
                                                                    </div>


                                                                </>
                                                            )}
                                                        </Listbox.Option>
                                                    ))}
                                                </Listbox.Options>
                                            </Transition>
                                        </div>
                                    </>
                                )}
                            </Listbox>

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

export default EditCourse;