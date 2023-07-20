import React, { useEffect, useRef, useState } from 'react';
import { VscSearch } from "react-icons/vsc"
import { HiSun, HiMoon, HiUserCircle, HiMenu, HiOutlineX } from "react-icons/hi";
import { useAppDispatch, useAppSelector } from '../store';
import { changeTheme } from '../store/reducers/themeSlice';
import { Theme } from '../ts/enums/theme';
import { Link, useNavigate } from 'react-router-dom';
import { Pages } from "../ts/enums/pages";
import useMediaQuery from '../hooks/useMediaQuery';
import { useLazyGetSearchQuery } from '../services/Anime';
import { debounce } from "lodash";
import { GetSearchResponse } from '../ts/interfaces/anime';
import SearchCard from './SearchCard';

type Props = {
    isBurgerOpen: boolean;
    setIsBurgerOpen: React.Dispatch<React.SetStateAction<boolean>>;
}

const Navbar = ({isBurgerOpen, setIsBurgerOpen}: Props) => {
    const theme = useAppSelector(state => state.themeSlice.theme);
    const user = useAppSelector(state => state.authSlice.user);
    const dispatch = useAppDispatch();
    const navigate = useNavigate();
    const isAboveMediumScreens = useMediaQuery("(min-width: 768px)");
    const [isSearchOpen, setIsSearchOpen] = useState(false);
    const [getSearch] = useLazyGetSearchQuery();
    const [searchResult, setSearchResult] = useState<GetSearchResponse | undefined>()

    const searchHandler = async (query: string) => {
        return await getSearch(query).unwrap();
    }

    const debouncedSearch = useRef(
        debounce(async (query) => {
            setSearchResult(await searchHandler(query));
        }, 100)
    ).current;

    useEffect(() => {
        return () => {
            debouncedSearch.cancel();
        };
    }, [debouncedSearch]);

    const searchCloseHandler = () => {
        setIsSearchOpen(!isSearchOpen);
        setSearchResult(undefined);
    }

    const searchCardClickHandler = (id: string) => {
        navigate(`anime/info/${id}`);
        searchCloseHandler();
        if (isBurgerOpen) {
            setIsBurgerOpen(!isBurgerOpen);
        }
    }

    const closeBurgerHandler = () => {
        setIsBurgerOpen(!isBurgerOpen);
        if (isSearchOpen) {
            searchCloseHandler();
        }
    }

    const profileHandler = () => {
        if (isBurgerOpen) {
            setIsBurgerOpen(!isBurgerOpen);
        }
    }

    return (
        <nav className='w-full fixed z-20 max-h-14'>
            {(!isBurgerOpen || isAboveMediumScreens) && (
                <div className='sm:w-5/6 bg-light-300 dark:bg-dark-100'>
                    <div className='flex p-2 gap-x-2 justify-between'>
                        <div className='dark:text-white cursor-pointer'>
                            <Link to={Pages.HOME}>
                                <img
                                    src={`${process.env.REACT_APP_BASE_SERVER_URL}/assets/logo.svg`}
                                    className='max-h-10 invert-[68%] contrast-[84%] dark:invert dark:contrast-100'
                                    alt='Luna'
                                />
                            </Link>
                        </div>

                        {isAboveMediumScreens && !isSearchOpen ? (
                            <div className='flex items-center w-full justify-end'>
                                <button onClick={() => setIsSearchOpen(!isSearchOpen)}>
                                    <VscSearch className='h-4 w-4 dark:text-white' />
                                </button>
                            </div>
                        ) : isAboveMediumScreens && (
                            <div className='w-full flex relative'>
                                <input
                                    type="text"
                                    className='w-full rounded-md dark:text-dark-100'
                                    onChange={e => debouncedSearch(e.target.value)}
                                />            
                                <div
                                    className='absolute top-6 w-full bg-white w-[calc(100%_-_1.5rem)] rounded-md z-20 dark:bg-black overflow-auto max-h-[500px]'
                                >
                                    {(searchResult && searchResult.results.length) ? searchResult.results.map((an) =>
                                        <SearchCard
                                            key={an.id}
                                            id={an.id}
                                            image={an.image}
                                            title={an.title}
                                            releaseDate={an.releaseDate}
                                            functionHandler={searchCardClickHandler}
                                        />
                                    ) : searchResult ? <div>not found</div> : <></>}
                                </div>
                                <button className='flex items-center' onClick={searchCloseHandler}>
                                    <HiOutlineX className='h-6 w-6 dark:text-white' />
                                </button>
                            </div>
                        )}

                        {isAboveMediumScreens ? (
                            <div className='flex justify-between gap-x-1.5 justify-self-end items-center'>
                                <button
                                    className='h-6 w-6 dark:text-white'
                                    onClick={() => dispatch(changeTheme())}
                                >
                                    {theme === Theme.LIGHT ? (
                                        <HiSun />
                                    ) : (
                                        <HiMoon />
                                    )
                                    }
                                </button>
                                <Link to={user ? Pages.PROFILE : Pages.REGISTRATION} relative="path">
                                    <HiUserCircle className='h-6 w-6 dark:text-white' />
                                </Link>
                            </div>
                        ) : (
                            <button
                                className="rounded-full bg-secondary-500"
                                onClick={() => setIsBurgerOpen(!isBurgerOpen)}
                            >
                                <HiMenu className="h-6 w-6 dark:text-white" />
                            </button>
                        )
                        }
                    </div>
                </div>
            )}

            {!isAboveMediumScreens && isBurgerOpen && (
                <div className="relative bottom-0 z-40 h-screen w-full bg-light-300 dark:bg-dark-100 drop-shadow-xl">
                    {/* CLOSE ICON */}
                    <div className="flex justify-between p-4 items-center">
                        <div className='flex gap-4'>
                            <Link to={user ? Pages.PROFILE : Pages.REGISTRATION} relative="path" onClick={profileHandler}>
                                <HiUserCircle className='h-6 w-6 dark:text-white' />
                            </Link>
                            <button
                                className='h-6 w-6 dark:text-white'
                                onClick={() => dispatch(changeTheme())}
                            >
                                {theme === Theme.LIGHT ? (
                                    <HiSun />
                                ) : (
                                    <HiMoon />
                                )
                                }
                            </button>
                        </div>
                        <Link to={Pages.HOME}>
                            <img
                                src={`${process.env.REACT_APP_BASE_SERVER_URL}/assets/logo.svg`}
                                className='max-h-10  invert-[68%] contrast-[84%] dark:invert dark:contrast-100'
                                alt='Luna'
                            />
                        </Link>
                        <button onClick={closeBurgerHandler}>
                            <HiOutlineX className="h-6 w-6 text-gray-400" />
                        </button>
                    </div>
                    {/* MENU ITEMS */}
                    <div className="flex flex-col gap-4 items-center p-2">
                        {!isSearchOpen ? (
                            <div className='flex items-center w-full justify-center'>
                                <button onClick={() => setIsSearchOpen(!isSearchOpen)}>
                                    <VscSearch className='h-4 w-4 dark:text-white' />
                                </button>
                            </div>
                        ) : (
                            <div className='w-full flex relative'>
                                <input
                                    type="text"
                                    className='w-full rounded-md dark:text-dark-100'
                                    onChange={e => debouncedSearch(e.target.value)}
                                />
                                <div
                                    className='absolute top-6 w-full bg-white w-[calc(100%_-_1.5rem)] rounded-md z-20 dark:bg-black overflow-auto max-h-[500px]'
                                >
                                    {(searchResult && searchResult.results.length) ? searchResult.results.map((an) =>
                                        <SearchCard
                                            key={an.id}
                                            id={an.id}
                                            image={an.image}
                                            title={an.title}
                                            releaseDate={an.releaseDate}
                                            functionHandler={searchCardClickHandler}
                                        />
                                    ) : searchResult ? <div>not found</div> : <></>}
                                </div>
                                <button className='flex items-center' onClick={searchCloseHandler}>
                                    <HiOutlineX className='h-6 w-6 dark:text-white' />
                                </button>
                            </div>
                        )}
                    </div>
                </div>
            )}
        </nav>
    )
}

export default Navbar;