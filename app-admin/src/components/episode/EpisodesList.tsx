import React from 'react';
import ItemEpisode from './ItemEpisode';

interface episodeListProps {
    episodes: any[] | null
    loadingEpisodes: boolean
}

const EpisodesList = (props: episodeListProps) => {
    const { episodes, loadingEpisodes } = props
    if (loadingEpisodes) {
        return (
            <div>

            </div>
        )
    }
    else if (!episodes) {
        return (
            <div>

            </div>
        )
    }
    else if (episodes.length === 0) {
        return (
            <div className="flex justify-center flex-col items-center mb-10">
                <div className='w-full px-10 sm:w-[200px] sm:px-0 md:w-[400px] lg:w-[500px]'>
                    <img
                        className='w-full drop-shadow-md'
                        src="https://res.cloudinary.com/hoaitan/image/upload/v1668606328/engrow/Search_concept_Yellow_Folder_and_magnifier_icons_hand_drawn_cartoon_art_illustration-removebg-preview_ydpu85.png" alt="notfound" />
                </div>
                <h2 className='font-bold text-lg sm:text-xl text-center text-[#3f3f3f] mt-5'>Không có bài học, tạo ngay ?</h2>
            </div>
        )
    }
    return (
        <div>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-2 xl:grid-cols-3 gap-5 md:gap-8">
                {
                    episodes.map((episode: any) => {
                        return (
                            <React.Fragment key={episode.id}>
                                <ItemEpisode episode={episode} />
                            </React.Fragment>
                        )
                    })
                }
            </div>
        </div>
    );
};

export default EpisodesList;