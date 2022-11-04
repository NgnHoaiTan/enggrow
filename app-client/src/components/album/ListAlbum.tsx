import React from 'react';
import Card from '../flashcard/Card';
import Album from './Album';

const ListAlbum = (props: any) => {
    return (
        <div className='grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-2 md:gap-6 mt-4 md:mt-8'>
            {
                props.folderCards.map((folder: any)=>{
                    return(
                        <Album key={folder.folder_flashcard_id} folder={folder}/>
                    )
                })
            }
        </div>
    );
};

export default ListAlbum;