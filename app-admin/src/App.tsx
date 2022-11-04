
import {
   BrowserRouter,
   Routes,
   Route,
} from "react-router-dom";
import { useAppSelector } from "./app/hooks";
import { getCurrentToken } from "./features/authentication/authSlice";
import Layout from './Layout';
import Courses from './pages/Courses';
import Dashboard from './pages/Dashboard';
import EpisodeDetail from "./pages/EpisodeDetail";
import Episodes from "./pages/Episodes";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import PrivateRoute from './PrivateRoute';


function App() {
   const accessToken = useAppSelector(getCurrentToken)
   console.log(accessToken)
   return (
      <div className="font-OpenSans">
         <BrowserRouter>
            <Routes>
               <Route path="login" element={<Login />}/>
               <Route path="signup" element={<Signup />}/>
               <Route path="/" element={<PrivateRoute />}>
                  <Route index element={<Layout page={<Dashboard />} />} />
               </Route>
               <Route path='management/courses' element={<PrivateRoute />}>
                  <Route index element={<Layout page={<Courses />} />} />
                  <Route path=':courseId' element={<Layout page={<Episodes />} />} />
               </Route>
               <Route path="management/episodes" element={<PrivateRoute />}>
                  <Route path=':episodeId' element={<Layout page={<EpisodeDetail />} />} />
               </Route>
               <Route path='/staff/profile' element={<PrivateRoute />}>
                  <Route path=':userId' />
               </Route>
               <Route path="/login" />
               <Route path="/signup" />
            </Routes>
         </BrowserRouter>
      </div>
   );
}

export default App;
