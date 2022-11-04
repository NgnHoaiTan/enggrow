import React, {useState} from 'react';
import { useAppSelector } from '../../app/hooks';
import { getCourse } from '../../features/pronunciation_course/pronunCourseSlice';
import EditCourse from '../courses/EditCourse';
import { confirmAlert } from 'react-confirm-alert';
import 'react-confirm-alert/src/react-confirm-alert.css';
import { useDispatch } from 'react-redux';
import { AppDispatch } from '../../app/store';
import { asyncDeletePronunCourse, asyncGetAllPronunCourses } from '../../features/pronunciation_course/pronunCourseAPIs';
import { useNavigate, useParams } from 'react-router';

const CourseTool = () => {
    const [showModelEdit, setShowModelEdit] = useState(false)
    const handleCloseEditModel =()=>{
        setShowModelEdit(false)
    }
    const course = useAppSelector(getCourse)
    const navigate = useNavigate()
    const {courseId} = useParams()
    const dispatch = useDispatch<AppDispatch>()
    const handleConfirmDelete=()=>{
        confirmAlert({
            
            title: 'Confirm to Delete',
            message: 'Are you sure to do this.',
            buttons: [
              {
                label: 'Yes',
                onClick: () => handleDeleteCourse()
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

    const handleDeleteCourse= async()=>{
        try{
            const dataSubmit= {
                id: courseId,
                accessToken:'accessToken'
            }
            const deleteResult = await dispatch(asyncDeletePronunCourse(dataSubmit)).unwrap()
            const dataGet = {
                accessToken:'accessToken',
                query: null
            }
            dispatch(asyncGetAllPronunCourses(dataGet))
            navigate('/management/courses', {replace: true})

        }catch(error){
            console.log(error)
        }
    }
    return (
        <div className='pt-5 pr-5'>
            <div className="flex flex-row justify-end items-center">
                <div className="update-btn mr-5 cursor-pointer">
                    <button 
                    onClick={()=>setShowModelEdit(true)}
                    className='text-sm md:text-base px-4 py-2 rounded-lg bg-green-400 text-white font-semibold'>
                        Edit
                    </button>
                </div>
                <div className="delete-btn cursor-pointer">
                   <button 
                   onClick={handleConfirmDelete}
                   className='text-sm md:text-base px-4 py-2 rounded-lg bg-red-500 text-white font-semibold'>
                        Remove
                   </button>
                </div>
            </div>
            <EditCourse course={course} open={showModelEdit} onClose={handleCloseEditModel}/>
        </div>
    );
};

export default CourseTool;