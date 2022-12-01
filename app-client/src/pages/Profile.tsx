import React, { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { useParams } from 'react-router';
import { useAppSelector } from '../app/hooks';
import { AppDispatch } from '../app/store';
import StatisticWordLearned from '../components/profile/StatisticWordLearned';
import UserProfile from '../components/profile/UserProfile';
import { getCurrentToken, getCurrentUser } from '../features/authentication/authSlice';
import { asyncGetLearnedCardResultByUser, asyncGetTodayLearnedCardtByUser} from '../features/card_learned/cardLearnedApi';
import { getTodayCardLearned } from '../features/card_learned/cardLearnedSlice';
import { asyncGetDuefolder } from '../features/folder/folderApis';
import { getDueFolder } from '../features/folder/folderSlice';
import { asyncGetMyProfile } from '../features/profile/profileApi';
import { getMyProfile } from '../features/profile/profileSlice';

const Profile = () => {
    const dispatch = useDispatch<AppDispatch>()
    const accessToken = useAppSelector(getCurrentToken)
    // card learned data
    const [loadTodayCardLearn, setLoadTodayCardLearn] = useState(true)
    const [errorLoadTodayCard, setErrorLoadTodayCard] = useState('')
    const todayCardLearned = useAppSelector(getTodayCardLearned)
    // due folder
    const [errorLoadDueFolder, setErrorLoadDueFolder] = useState('')
    const [loadDueFolder, setDueFolder] = useState(true)
    const dueFolder = useAppSelector(getDueFolder)
    // load data user
    const userId = useParams()
    const [loadingProfile, setLoadingProfile] = useState(true)
    const user = useAppSelector(getMyProfile)
    const [errorLoadProfile, setErrorLoadProfile] = useState('')
    // funtion 

    // get profile
    useEffect(() => {
        setErrorLoadProfile('')
        const fetchCard = async () => {
            try {
                setLoadingProfile(() => true)
                await dispatch(asyncGetMyProfile(accessToken)).unwrap()
            } catch (error: any) {
                if (error.message) {
                    setErrorLoadProfile(error.message)
                }
                else {
                    setErrorLoadProfile('Lỗi không xác định khi lấy dữ liệu thông tin cá nhân')
                }
            }
        }
        fetchCard()
        setLoadingProfile(() => false)
    }, [userId])

    // get due folder
    useEffect(() => {
        setErrorLoadDueFolder('')
        const fetchCard = async () => {
            try {
                setDueFolder(() => true)
                await dispatch(asyncGetDuefolder(accessToken)).unwrap()
            } catch (error: any) {
                if (error.message) {
                    setErrorLoadDueFolder(error.message)
                }
                else {
                    setErrorLoadDueFolder('Lỗi không xác định khi lấy dữ liệu thư mục')
                }
            }
        }
        fetchCard()
        setDueFolder(() => false)
    }, [])
    // get card learn
    useEffect(() => {
        setErrorLoadTodayCard('')
        const fetchCard = async () => {
            try {
                setLoadTodayCardLearn(() => true)
                await dispatch(asyncGetTodayLearnedCardtByUser(accessToken)).unwrap()
            } catch (error: any) {
                if (error.message) {
                    setErrorLoadTodayCard(error.message)
                }
                else {
                    setErrorLoadTodayCard('Lỗi không xác định khi lấy dữ liệu thẻ đã học')
                }
            }
        }
        fetchCard()
        setLoadTodayCardLearn(() => false)
    }, [])

    if (!user) {
        return (
            <div>

            </div>
        )
    }
    return (
        <div className='w-full min-h-screen max-h-fit bg-slate-100 pt-16 px-3 md:px-0 md:pt-20'>
            <div className='w-full md:w-[600px] lg:w-[800px] xl:w-[1000px] bg-white
            rounded-lg drop-shadow-md h-[1000px] mx-auto p-2 sm:p-4
            '>
                <UserProfile
                    user={user}
                />
                <div className="statistic mt-10 px-5">
                    <StatisticWordLearned
                        dueLearning={dueFolder}
                        loading={loadTodayCardLearn}
                        error={errorLoadTodayCard}
                        listCardLearned={todayCardLearned}
                    />
                    <div className="Remind-Learning">

                    </div>
                </div>
                
            </div>

        </div>
    );
};

export default Profile;