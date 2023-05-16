import './App.css';
import {BrowserRouter as Router, Route, Routes} from "react-router-dom";
import HomeLayout from "./components/HomeLayout";
import {PortfolioPage} from "./pages/PortfolioPage";
import {ProjectsPage} from "./pages/ProjectsPage";
import {WelcomePage} from "./pages/WelcomePage";
import {RegistrationPage} from "./pages/RegistrationPage";
import {AuthorizationPage} from "./pages/AuthorizationPage";
import RequireUnauth from "./hoc/RequireUnauth";
import {NotFoundPage} from "./pages/NotFoundPage";
import {ProjectPage} from "./pages/ProjectPage";
import PortfolioLayout from "./components/ProtfolioLayout";
import {ProfilePage} from "./pages/ProfilePage";
import RequireAuth from "./hoc/RequireAuth";
import ProfileLayout from "./components/ProfileLayout";
import {ComponentsPage} from "./pages/ComponentsPage";
import {EditPortfolioPage} from "./pages/EditPortfolioPage";
import {ActivatePage} from "./pages/ActivatePage";
import {EditProfilePage} from "./pages/EditProfilePage";
import {FavouriteProjectsPage} from "./pages/FavouriteProjetsPage";
import {NotImplementPage} from "./pages/NotImplementPage";
import {EditProjectsPage} from "./pages/EditProjectsPage";
import ScrollToTop from "./hoc/ScrollToTop";
import {CatalogPage} from "./pages/CatalogPage";

function App() {
    return (
        <Router>
            <ScrollToTop>
                <Routes>
                    <Route path='/' element={<HomeLayout/>}>
                        <Route index element={<WelcomePage/>}/>
                        <Route path='/registration' element={
                            <RequireUnauth>
                                <RegistrationPage/>
                            </RequireUnauth>}/>
                        <Route path='/authorization' element={
                            <RequireUnauth>
                                <AuthorizationPage/>
                            </RequireUnauth>}/>
                        <Route path='/activate/:link' element={
                            // <RequireUnauth>
                            <ActivatePage/>
                            // </RequireUnauth>
                        }
                        />
                        <Route path='/catalog' element={<CatalogPage/>}/>
                        <Route path='*' element={<NotFoundPage/>}/>
                    </Route>

                    <Route path='/' element={<ProfileLayout/>}>

                        <Route path='/:userId' element={<PortfolioPage/>}/>
                        <Route path='/:userId/projects' element={<ProjectsPage/>}/>
                        <Route path='/:userId/projects/edit' element={<EditProjectsPage/>}/>
                        <Route path='/:userId/project/:projectId/' element={<ProjectPage/>}/>
                        <Route path='/:userId/profile' element={
                            <RequireAuth>
                                <ProfilePage/>
                            </RequireAuth>}/>
                        <Route path='/:userId/profile/edit' element={
                            <RequireAuth>
                                <EditProfilePage/>
                            </RequireAuth>}/>
                        <Route path='/:userId/profile/favourite' element={
                            <RequireAuth>
                                <FavouriteProjectsPage/>
                            </RequireAuth>}/>
                        <Route path='/:userId/edit' element={
                            <RequireAuth>
                                <EditPortfolioPage/>
                            </RequireAuth>}/>
                    </Route>

                    <Route path='/' element={<ProfileLayout/>}>
                        <Route path='/components' element={<ComponentsPage/>}/>
                    </Route>
                </Routes>
            </ScrollToTop>
        </Router>);
}

export default App;
