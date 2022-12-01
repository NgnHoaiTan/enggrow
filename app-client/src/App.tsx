import { useEffect } from 'react';
import './App.css';
import {
   BrowserRouter,
   Routes,
   Route,
   Navigate,
} from "react-router-dom";
import Landingpage from './pages/Landingpage';
import Login from './pages/Login';
import Signup from './pages/Signup';
import Home from './pages/Home';
import Layout from './layout';
import Album from './pages/Album';
import DetailAlbum from './pages/DetailAlbum';
import Course from './pages/Course';
import DetailCourse from './pages/DetailCourse';
import Profile from './pages/Profile';
import Test from './pages/Test';
import PrivateRoute from './PrivateRoute';
import PracticeFlashcards from './pages/PracticeFlashcards';
import FinishPracticeCard from './pages/FinishPracticeCard';
import { useDispatch } from 'react-redux';
import { AppDispatch } from './app/store';
import { asyncGetRemindPractice } from './features/folder/folderApis';
import { useAppSelector } from './app/hooks';
import { getCurrentToken } from './features/authentication/authSlice';
import PronunciationFlashcard from './pages/PronunciationFlashcard';
import OverviewCourse from './pages/OverviewCourse';
import DetailEpisode from './pages/DetailEpisode';
import LearningFlashcard from './pages/LearningFlashcard';
import ResultPronunciationCard from './pages/ResultPronunciationCard';
import ResultPracticeCard from './pages/ResultPracticeCard';
import PageNotFound from './pages/PageNotFound';
function App() {
   const dispatch = useDispatch<AppDispatch>()
   const accessToken = useAppSelector(getCurrentToken)
   const sessionGet = (key: string) => {
      let stringValue = sessionStorage.getItem(key)
      if (stringValue !== null) {
         let value = JSON.parse(stringValue)
         let expirationDate = new Date(value.expirationDate)
         if (expirationDate > new Date()) {
            return value.value
         } else {
            sessionStorage.removeItem(key)
         }
      }
      return null
   }
   const sessionSet = async (key: string, value: string, expirationInMin = 10) => {
      let expirationDate = new Date(new Date().getTime() + (60000 * expirationInMin))
      let newValue = {
         value: value,
         expirationDate: expirationDate.toISOString()
      }
      sessionStorage.setItem(key, JSON.stringify(newValue))
      if (accessToken) {
         await dispatch(asyncGetRemindPractice({ accessToken }))
      }

   }
   useEffect(() => {
      const sessionValue = sessionGet('access-website')
      if (!sessionValue) {
         sessionSet('access-website', 'access-website')
      }
      // sessionStorage.removeItem('access-website')

   }, [])
   return (
      <BrowserRouter>
         <Routes>
            {/* <Route path="/test-audio" element={<Test />} /> */}
            {/* <Route element={<PrivateRoute />}>
               <Route path="/" element={<Layout page={<Home />} />} />
            </Route> */}
            {/* folder card */}
            <Route path="/" element={<Navigate to="/folders" />} />
            <Route path='/folders' element={<PrivateRoute />}>
               <Route index element={<Layout page={<Album />} />} />
               <Route path='flashcard/:folderId' element={<Layout page={<DetailAlbum />} />} />
               <Route path='flashcard/learning/:folderId' element={<LearningFlashcard />} />
               <Route path='flashcard/practice/:folderId' element={<PracticeFlashcards />} />
               <Route path='flashcard/pronunciation/:folderId' element={<PronunciationFlashcard />} />
               <Route path='flashcard/pronunciation/finished/:folderId' element={<ResultPronunciationCard />} />
               <Route path='flashcard/learning/finished/:folderId' element={<ResultPronunciationCard />} />
               <Route path='flashcard/practice/finished/:folderId' element={<ResultPracticeCard />} />
            </Route>
            {/* courses */}
            <Route path='/courses' element={<PrivateRoute />}>
               <Route index element={<Layout page={<Course />} />} />
               <Route path='detail/:courseId' element={<Layout page={<DetailCourse />} />} />
               <Route path='overview/:courseId' element={<Layout page={<OverviewCourse />} />} />
            </Route>
            <Route path='/episode' element={<PrivateRoute />}>
               <Route path='detail/:episodeId' element={<Layout page={<DetailEpisode />} />} />
               <Route path='practice/:episodeId' element={<Layout page={<DetailEpisode />} />} />
            </Route>
            {/* profile user */}
            <Route path='/profile' element={<PrivateRoute />}>
               <Route path=':id' element={<Layout page={<Profile />} />} />
            </Route>
            <Route path="/landingpage" element={<Landingpage />} />
            <Route path="/login" element={<Login />} />
            <Route path="/signup" element={<Signup />} />
            <Route path="/pagenotfound" element={<PageNotFound />} />
            <Route path='*' element={<Navigate to="/pagenotfound" />} />
         </Routes>
      </BrowserRouter>

   );
}

export default App;
