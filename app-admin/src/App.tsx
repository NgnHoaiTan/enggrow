
import {
   BrowserRouter,
   Routes,
   Route,
} from "react-router-dom";
import { useAppSelector } from "./app/hooks";
import { getCurrentToken, getCurrentUser } from "./features/authentication/authSlice";
import Layout from './Layout';
import Courses from './pages/Courses';
import EpisodeDetail from "./pages/EpisodeDetail";
import Episodes from "./pages/Episodes";
import Home from "./pages/Home";
import ListMyCourses from "./pages/ListMyCourses";
import Login from "./pages/Login";
import MyProfile from "./pages/MyProfile";
import SearchUsers from "./pages/SearchUsers";
import StaffsManagement from "./pages/StaffsManagement";
import Statistic from "./pages/Statistic";
import UsersManagement from "./pages/UsersManagement";
import PrivateRoute from './PrivateRoute';


function App() {
   const user = useAppSelector(getCurrentUser)
   console.log(user)
   return (
      <div className="font-OpenSans">
         <BrowserRouter>
            {
               user.role.id === 1 &&
               <Routes>

                  <Route path="login" element={<Login />} />
                  <Route path="/" element={<PrivateRoute />}>
                     <Route index element={<Layout page={<Home />} />} />
                  </Route>
                  <Route path="/profile" element={<PrivateRoute />}>
                     <Route path=":userId" element={<Layout page={<MyProfile />} />} />
                  </Route>
                  <Route path="/statistic" element={<PrivateRoute />}>
                     <Route index element={<Layout page={<Statistic />} />} />
                  </Route>
                  <Route path="/" element={<PrivateRoute />}>
                     <Route path="mycourses" element={<Layout page={<ListMyCourses />} />} />
                  </Route>
                  <Route path='management/courses' element={<PrivateRoute />}>
                     <Route index element={<Layout page={<Courses />} />} />
                     <Route path=':courseId' element={<Layout page={<Episodes />} />} />
                  </Route>
                  <Route path="management/episodes" element={<PrivateRoute />}>
                     <Route path=':episodeId' element={<Layout page={<EpisodeDetail />} />} />
                  </Route>
                  <Route path="management/users" element={<PrivateRoute />}>
                     <Route index element={<Layout page={<UsersManagement />} />} />
                     <Route path="search" element={<Layout page={<SearchUsers />} />} />
                  </Route>
                  <Route path="management/staffs" element={<PrivateRoute />}>
                     <Route index element={<Layout page={<StaffsManagement />} />} />
                  </Route>
               </Routes>
            }
            {
               user.role.id === 2 &&
               <Routes>

                  <Route path="login" element={<Login />} />
                  <Route path="/" element={<PrivateRoute />}>
                     <Route index element={<Layout page={<Home />} />} />
                  </Route>
                  <Route path="/profile" element={<PrivateRoute />}>
                     <Route path=":userId" element={<Layout page={<MyProfile />} />} />
                  </Route>
                  <Route path="/statistic" element={<PrivateRoute />}>
                     <Route index element={<Layout page={<Statistic />} />} />
                  </Route>
                  <Route path="/" element={<PrivateRoute />}>
                     <Route path="mycourses" element={<Layout page={<ListMyCourses />} />} />
                  </Route>
                  <Route path='management/courses' element={<PrivateRoute />}>
                     <Route index element={<Layout page={<Courses />} />} />
                     <Route path=':courseId' element={<Layout page={<Episodes />} />} />
                  </Route>
                  <Route path="management/episodes" element={<PrivateRoute />}>
                     <Route path=':episodeId' element={<Layout page={<EpisodeDetail />} />} />
                  </Route>
               </Routes>
            }
         </BrowserRouter>
      </div>
   );
}

export default App;
