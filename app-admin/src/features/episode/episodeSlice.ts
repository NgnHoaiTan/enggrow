import { createSlice } from '@reduxjs/toolkit';
import { asyncGetAllEpisodesByCourse, asyncGetEpisodeById } from './episodeAPIs';
interface episode{
    id: number,
    name: string,
    description: string,
    pronunciationCourseId: number
}
interface episodeState {
    all_episodes: episode[] | null,
    episode: episode | null,
}
const initialState: episodeState = {
    all_episodes: null,
    episode: null
}

const episodeSlice = createSlice({
    name:'episode',
    initialState,
    reducers:{},
    extraReducers: (builder) => {
        builder
            .addCase(asyncGetAllEpisodesByCourse.fulfilled,(state, action)=>{
                return {
                    ...state,
                    all_episodes: action.payload
                }
            })
            .addCase(asyncGetEpisodeById.fulfilled,(state, action)=>{
                return {
                    ...state,
                    episode: action.payload
                }
            })
    }
})
export const getAllEpisodes = (state: any) => state.episode.all_episodes
export const getEpisode = (state: any) => state.episode.episode
export default episodeSlice.reducer;