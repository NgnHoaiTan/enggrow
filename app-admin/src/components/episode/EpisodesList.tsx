import React from 'react';
import ItemEpisode from './ItemEpisode';
import NoResult from './NoResult';

interface episodeListProps {
    episodes: any[] | null
    loadingEpisodes: boolean
}

const EpisodesList = (props: episodeListProps) => {
    const {episodes, loadingEpisodes} = props
    if(loadingEpisodes) {
        return (
            <div>

            </div>
        )
    }
    else if(!episodes) {
        return (
            <div>
                
            </div>
        )
    }
    else if(episodes.length === 0) {
        return (
            <div className='my-20'>
                <NoResult message='There is no episode' />
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
                                <ItemEpisode episode={episode}/>
                            </React.Fragment>
                        )
                    })
                }
            </div>
        </div>
    );
};

export default EpisodesList;