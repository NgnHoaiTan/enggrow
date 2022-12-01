import React, {useEffect} from 'react';
import Album from './Album';
import { useDispatch } from 'react-redux';
import { AppDispatch } from '../../app/store';
import { asyncGetDuefolder } from '../../features/folder/folderApis';
import { getCurrentToken } from '../../features/authentication/authSlice';
import { useAppSelector } from '../../app/hooks';
import { getDueFolder } from '../../features/folder/folderSlice';


const ListAlbum = (props: any) => {
    const dispatch = useDispatch<AppDispatch>()
    const accessToken = useAppSelector(getCurrentToken)
    const dueFolders = useAppSelector(getDueFolder)
    useEffect(() => {
        const action = async () => {
            try {
                await dispatch(asyncGetDuefolder(accessToken)).unwrap()
            } catch (error) {
                console.log(error)
            }

        }
        action()
    }, [])
    return (
        <div className='grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-2 md:gap-6 mt-4 md:mt-8'>
            {
                props.folderCards.map((folder: any)=>{
                    return(
                        <Album key={folder.id} folder={folder} dueFolders={dueFolders}/>
                    )
                })
            }
        </div>
    );
};

export default ListAlbum;