import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";

function Header() {
    const [showJobMenu, setShowJobMenu] = useState(false);
    const [showAboutMenu, setShowAboutMenu] = useState(false);
    const [showServiceMenu, setShowServiceMenu] = useState(false);
    const [scrolled, setScrolled] = useState(false);
    const [isNavbarOpen, setIsNavbarOpen] = useState(false);
    const [data, setData] = useState([])

    const [parentId, setParentId] = useState(null);

    const [navigation, setNavigation] = useState([]);

    const headerData = async () => {
        try {
            const response = await axios.get('http://127.0.0.1:8000/api/globals/');
            // Handle the response data here
            response.data && setData(response.data[0]);

            // Fetch navigation data based on parentId and page_type
            const navigationResponse = await axios.get(
                "http://127.0.0.1:8000/api/navigations/",
                {
                    params: {
                        parent_id: parentId,      // Set the parentId as a parameter
                        page_type: "Group"        // Filter by page_type
                    }
                }
            );

            if (navigationResponse.data) {
                const navigationData = navigationResponse.data.filter(
                    (item) => item.status === "Publish"
                );

                setNavigation(navigationData);
            }
        }
        catch (error) {
            console.error("Error fetching data:", error);
        }
    }
    useEffect(() => {
        // Axios GET request to fetch data
        headerData();
    }, [parentId]);
    // console.log(data);
    console.log(navigation);

    const handleScroll = () => {
        const scrollTop = window.scrollY;
        if (scrollTop > 0) {
            setScrolled(true);
        } else {
            setScrolled(false);
        }
    };
    useEffect(() => {
        window.addEventListener("scroll", handleScroll);
        return () => {
            window.removeEventListener("scroll", handleScroll);
        };
    }, []);





    const toggleNavbar = () => {
        setIsNavbarOpen(!isNavbarOpen);
        if (!isNavbarOpen) {
            document.body.classList.add('overflow-hidden');
        } else {
            document.body.classList.remove('overflow-hidden');
        }
    };

    const toggleAboutMenu = () => {
        setShowAboutMenu(!showAboutMenu);
        setShowServiceMenu(false)
        setShowJobMenu(false)
    };

    const toggleServiceMenu = () => {
        setShowServiceMenu(!showServiceMenu);
        setShowAboutMenu(false)
        setShowJobMenu(false)
    };

    const toggleJobMenu = () => {
        setShowJobMenu(!showJobMenu);
        setShowServiceMenu(false)
        setShowAboutMenu(false)
    };

    const closeNav = () => {
        setIsNavbarOpen(false);
        document.body.classList.remove('overflow-hidden');
    }

    return (
        <>
            {/* ----top header---- */}
            <div className="border-b bg-sky-600 text-white md:block hidden">
                <div className="container py-4 flex justify-between items-center gap-2">
                    <div className="flex md:flex-row justify-between md:items-center items-start flex-col lg:w-4/12 md:w-7/12">
                        <p className="md:text-base text-xs">Gov. Lic. No.{data.Sitelicence}</p>
                        <p className="md:text-base text-xs">Reg.no.{data.SiteRegister}</p>
                    </div>
                    <div className="md:w-1/12 w-1/5 flex justify-between items-center">
                        <a href={data.Sitefacebooklink} target="_blank" rel="noreferrer"><i className="fa fa-facebook text-lg"></i></a>
                        <a href={data.Sitetwitterlink} target="_blank" rel="noreferrer"><i className="fa fa-twitter text-lg"></i></a>
                        <a href={data.Siteyoutubelink} target="_blank" rel="noreferrer"><i className="fa fa-youtube text-lg"></i></a>
                    </div>
                </div>
            </div>
            {/* ----bottom header---- */}
            <div className={`sticky top-0 left-0 py-2 right-0 w-full z-30 bg-white ${scrolled ? 'shadow-[0_0_30px_2px_rgba(0,0,0,0.3)]' : 'shadow-none'}`}>
                <div className="container md:py-0 py-3 flex justify-between items-center">
                    <div className="logo md:w-3/12 w-5/12">
                        <Link to="/">
                            <img
                                className="w-full"
                                src={data.logo}
                                alt="logo"
                            />
                        </Link>
                    </div>
                    <div className="md:hidden block" onClick={toggleNavbar}>
                        <i className="fa-solid fa-bars text-xl"></i>
                    </div>
                    <div className={`absolute top-[0px] right-0 opacity-20 h-screen w-full bg-black  ${isNavbarOpen ? 'block' : 'hidden'}`} onClick={toggleNavbar}></div>
                    <div className={`lg:w-7/12 md:w-8/12 md:block md:h-auto h-screen ${isNavbarOpen ? 'custom-navbar' : 'hidden'}`}>
                        <div className="md:hidden inline-block ms-[172px] mb-4" onClick={toggleNavbar}>
                            <i className="fa-solid fa-xmark text-xl text-white"></i>
                        </div>
                        <nav className="md:text-black text-white">
                            <ul className="flex justify-between items-center">
                                <li onClick={closeNav} className="md:w-auto w-full">
                                    <Link className="font-medium w-full inline-block md:py-3 py-2 relative after:absolute after:h-[2px] after:w-0 after:content-[''] after:bottom-[10px] after:left-0 after:bg-sky-600 after:transition-all after:duration-300 after:ease-in-out hover:after:w-full" to="/">
                                        Home
                                    </Link>
                                </li>
                                {navigation.map((nav) => (
                                    <React.Fragment key={nav.id}>
                                        {nav.id !== 1 && (
                                            <React.Fragment>
                                                {nav.id === 30 && (
                                                    <li
                                                        onMouseEnter={() => { if (window.innerWidth > 768) { setShowAboutMenu(true) } }}
                                                        onMouseLeave={() => { if (window.innerWidth > 768) { setShowAboutMenu(false) } }}
                                                        className={`relative md:w-auto w-full ${showAboutMenu ? 'md:h-auto h-[395px]' : ''}`}>
                                                        <button className="font-medium md:py-3 py-2 relative flex justify-between items-center gap-2 w-full after:absolute after:h-[2px] after:w-0 after:content-[''] after:bottom-[10px] after:left-0 after:bg-sky-600 after:transition-all after:duration-300 after:ease-in-out hover:after:w-full" onClick={toggleAboutMenu}>
                                                            {nav.name}<i className="fa-solid fa-chevron-down text-sm"></i>
                                                        </button>
                                                        {showAboutMenu && <div className={`md:bg-white md:text-black text-gray-200 ${showAboutMenu ? 'block' : 'hidden'} md:absolute top-[48px] left-[-20px] md:border`}>

                                                            <div className="flex flex-col w-[200px] h-full">
                                                                {navigation[navigation?.findIndex(item => item?.id === 31)] && (
                                                                    <Link onClick={closeNav} className="p-2 md:border-b hover:text-yellow-500" to="/WhoWeAre">{navigation[navigation?.findIndex(item => item?.id === 31)]?.name}</Link>
                                                                )}
                                                                {navigation[navigation?.findIndex(item => item?.id === 32)] && (
                                                                    <Link onClick={closeNav} className="p-2 md:border-b hover:text-yellow-500" to="/CompanyProfile">{navigation[navigation?.findIndex(item => item?.id === 32)]?.name}</Link>
                                                                )}
                                                                {navigation[navigation?.findIndex(item => item?.id === 42)] && (
                                                                    <Link onClick={closeNav} className="p-2 md:border-b hover:text-yellow-500" to="/ChairmanMessage">{navigation[navigation?.findIndex(item => item?.id === 42)]?.name}</Link>
                                                                )}
                                                                {navigation[navigation?.findIndex(item => item?.id === 43)] && (
                                                                    <Link onClick={closeNav} className="p-2 md:border-b hover:text-yellow-500" to="/MissionVision">{navigation[navigation?.findIndex(item => item?.id === 43)]?.name}</Link>
                                                                )}
                                                                {navigation[navigation?.findIndex(item => item?.id === 44)] && (
                                                                    <Link onClick={closeNav} className="p-2 md:border-b hover:text-yellow-500" to="/Objective">{navigation[navigation?.findIndex(item => item?.id === 44)]?.name}</Link>
                                                                )}
                                                                {navigation[navigation?.findIndex(item => item?.id === 45)] && (
                                                                    <Link onClick={closeNav} className="p-2 md:border-b hover:text-yellow-500" to="/OrganizationChart">{navigation[navigation?.findIndex(item => item?.id === 45)]?.name}</Link>
                                                                )}
                                                                {navigation[navigation?.findIndex(item => item?.id === 47)] && (
                                                                    <Link onClick={closeNav} className="p-2 md:border-b hover:text-yellow-500" to="/LegalDocument">{navigation[navigation?.findIndex(item => item?.id === 47)]?.name}</Link>
                                                                )}
                                                                {navigation[navigation?.findIndex(item => item?.id === 57)] && (
                                                                    <Link onClick={closeNav} className="p-2 hover:text-yellow-500" to="/Gallery">{navigation[navigation?.findIndex(item => item?.id === 57)]?.name}</Link>
                                                                )}
                                                            </div>
                                                        </div>
                                                        }
                                                    </li>
                                                )}
                                                {nav.id === 66 && (
                                                    <li
                                                        onMouseEnter={() => { if (window.innerWidth > 768) { setShowServiceMenu(true) } }}
                                                        onMouseLeave={() => { if (window.innerWidth > 768) { setShowServiceMenu(false) } }}
                                                        className={`relative md:w-auto w-full ${showServiceMenu ? 'md:h-auto h-[200px]' : ''}`}>
                                                        <button className="font-medium md:py-3 py-2 relative flex justify-between items-center gap-2 w-full after:absolute after:h-[2px] after:w-0 after:content-[''] after:bottom-[10px] after:left-0 after:bg-sky-600 after:transition-all after:duration-300 after:ease-in-out hover:after:w-full" onClick={toggleServiceMenu}>
                                                            Services <i className="fa-solid fa-chevron-down text-sm md:hidden"></i>
                                                        </button>
                                                        {showServiceMenu && <div className={`md:bg-white md:text-black text-gray-200 ${showServiceMenu ? 'block' : 'hidden'} md:absolute top-[48px] left-[-20px] md:border`}>

                                                            <div className="flex flex-col w-[210px]">
                                                                {navigation[navigation?.findIndex(item => item?.id === 71)] && (
                                                                    <Link onClick={closeNav} className="block p-2 md:border-b hover:text-yellow-500" to="/RequiredDocument">{navigation[navigation?.findIndex(item => item?.id === 71)]?.name}</Link>
                                                                )}
                                                                {navigation[navigation?.findIndex(item => item?.id === 67)] && (
                                                                    <Link onClick={closeNav} className="block p-2 md:border-b hover:text-yellow-500" to="/RecruitmentProcess">{navigation[navigation?.findIndex(item => item?.id === 67)]?.name}</Link>
                                                                )}
                                                                {navigation[navigation?.findIndex(item => item?.id === 68)] && (
                                                                    <Link onClick={closeNav} className="block p-2 md:border-b hover:text-yellow-500" to="/ClientCandidateMatching">{navigation[navigation?.findIndex(item => item?.id === 68)]?.name}</Link>
                                                                )}
                                                                {navigation[navigation?.findIndex(item => item?.id === 69)] && (
                                                                    <Link onClick={closeNav} className="block p-2 hover:text-yellow-500" to="/IndustryExpertise">{navigation[navigation?.findIndex(item => item?.id === 69)]?.name}</Link>
                                                                )}
                                                            </div>
                                                        </div>
                                                        }
                                                    </li>
                                                )}
                                                {nav.id === 112 && (
                                                    <li
                                                        onMouseEnter={() => { if (window.innerWidth > 768) { setShowJobMenu(true) } }}
                                                        onMouseLeave={() => { if (window.innerWidth > 768) { setShowJobMenu(false) } }}
                                                        className={`relative md:w-auto w-full ${showJobMenu ? 'md:h-auto h-[140px]' : ''}`}>
                                                        <button className="font-medium md:py-3 py-2 relative flex justify-between items-center gap-2 w-full after:absolute after:h-[2px] after:w-0 after:content-[''] after:bottom-[10px] after:left-0 after:bg-sky-600 after:transition-all after:duration-300 after:ease-in-out hover:after:w-full" onClick={toggleJobMenu}>
                                                            Available Job <i className="hidden fa-solid fa-chevron-down text-sm"></i>
                                                        </button>
                                                        {showJobMenu && <div className={`md:bg-white md:text-black text-gray-200 ${showJobMenu ? 'block' : 'hidden'} md:absolute top-[48px] left-[-20px] md:border`}>
                                                            <div className="flex flex-col w-[180px]">
                                                                {navigation[navigation?.findIndex(item => item?.id === 121)] && (
                                                                    <Link onClick={closeNav} className="block p-2 md:border-b hover:text-yellow-500" to="/Vacancy">{navigation[navigation?.findIndex(item => item?.id === 121)]?.name}</Link>
                                                                )}

                                                                <Link onClick={closeNav} className="block p-2 hover:text-yellow-500" to="/NewspaperVacancy">Newspaper Vancancy</Link>
                                                            </div>
                                                        </div>
                                                        }
                                                    </li>
                                                )}
                                                {nav.id === 75 && (
                                                    <li onClick={closeNav} className="md:w-auto w-full">
                                                        <Link className="font-medium w-full inline-block md:py-3 py-2 relative after:absolute after:h-[2px] after:w-0 after:content-[''] after:bottom-[10px] after:left-0 after:bg-sky-600 after:transition-all after:duration-300 after:ease-in-out hover:after:w-full" to="/Category">
                                                            {nav.name}
                                                        </Link>
                                                    </li>
                                                )}
                                                {nav.id === 133 && (
                                                    <li onClick={closeNav} className="md:w-auto w-full">
                                                        <Link className="font-medium w-full md:py-3 py-2 inline-block relative after:absolute after:h-[2px] after:w-0 after:content-[''] after:bottom-[10px] after:left-0 after:bg-sky-600 after:transition-all after:duration-300 after:ease-in-out hover:after:w-full" to="/Contact">
                                                            {nav.name}
                                                        </Link>
                                                    </li>
                                                )}
                                            </React.Fragment>
                                        )}
                                    </React.Fragment>
                                ))}
                            </ul>
                        </nav>
                    </div>

                </div>
            </div>
        </>
    );
}

export default Header;


