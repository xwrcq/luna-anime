import { Pages } from "./ts/enums/pages";
import Registration from './pages/Registration';
import Login from './pages/Login';
import AnimeInfo from './pages/AnimeInfo';
import AnimeLists from './pages/AnimeLists';
import EmailActivation from "./pages/EmailActivation";
import Profile from "./pages/Profile";
import Home from "./pages/Home";
import User from "./pages/User";

export const authRoutes = [
    {
        path: Pages.HOME,
        Element: <Home />
    },
    {
        path: Pages.ANIME_INFO,
        Element: <AnimeInfo />
    },
    {
        path: Pages.ANIME_LISTS,
        Element: <AnimeLists />
    },
    {
        path: Pages.PROFILE,
        Element: <Profile />
    },
    {
        path: Pages.USER,
        Element: <User />
    },
]

export const noAuthRoutes = [
    {
        path: Pages.HOME,
        Element: <Home />
    },
    {
        path: Pages.REGISTRATION,
        Element: <Registration />
    },
    {
        path: Pages.LOGIN,
        Element: <Login />
    },
    {
        path: Pages.ANIME_INFO,
        Element: <AnimeInfo />
    },
    {
        path: Pages.ANIME_LISTS,
        Element: <AnimeLists />
    },
    {
        path: Pages.EMAIL_ACTIVATION,
        Element: <EmailActivation />
    },
]