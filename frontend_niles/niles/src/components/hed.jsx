import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import logo from '/src/assets/images/logo.png';
import axios from "axios";

function Header() {
    const [showJobMenu, setShowJobMenu] = useState(false);
    const [showAboutMenu, setShowAboutMenu] = useState(false);
    const [showServiceMenu, setShowServiceMenu] = useState(false);
    const [scrolled, setScrolled] = useState(false);
    const [isNavbarOpen, setIsNavbarOpen] = useState(false);
    const [data, setData] = useState([])

    const [parentId, setParentId] = useState(null);
    // const [nav, setNav] = useState(true)
    //   const handleNav = () => {
    //     setNav(!nav)
    //   }
    //   const closeNav = () => {
    //     setNav(!nav)
    //   }


    //   const [subMenu, setSubMenu] = useState(true)
    //   const handleSubMenu = (parentItemId) => {
    //     setSubMenu(!subMenu)
    //     setSubMenu2(true)
    //     setSubMenu3(true)
    //     setParentId(47)
    //   }

    //   const [subMenu2, setSubMenu2] = useState(true)
    //   const handleSubMenu2 = () => {
    //     setSubMenu2(!subMenu2)
    //     setSubMenu(true)
    //     setSubMenu3(true)
    //   }

    //   const [subMenu3, setSubMenu3] = useState(true)
    //   const handleSubMenu3 = () => {
    //     setSubMenu3(!subMenu3)
    //     setSubMenu(true)
    //     setSubMenu2(true)
    //   }

    //   const handleSubMenu4 = (parentItemId) => {
    //     setSubMenu((prevSubMenu) => !prevSubMenu);
    //     setSubMenu2(true);
    //     setSubMenu3(true);
    //     setParentId(parentItemId);
    //   }

    const [navigation, setNavigation] = useState([
        {
            id: 1,
            title: "Home",
            parentId: null, // Top-level item
            path: "/",
        },
        {
            id: 30,
            title: "About",
            parentId: null, // Top-level item
            path: "/About",
        },
        {
            id: 66,
            title: "Services",
            parentId: 2, // Belongs to "Who We Are"
            path: "/Services",
        },
        // Add other menu items...
    ]);

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
        setParentId(30)
    };

    const toggleServiceMenu = () => {
        setShowServiceMenu(!showServiceMenu);
        setParentId(66)
    };

    const toggleJobMenu = () => {
        setShowJobMenu(!showJobMenu);
        setParentId(112)
    };

    return (
        <>
            {/* ----top header---- */}
            <div className="border-b bg-sky-600 text-white md:block hidden">
                <div className="container py-4 flex justify-between items-center gap-2">
                    <div className="flex md:flex-row justify-between md:items-center items-start flex-col lg:w-5/12 md:w-7/12">
                        <p className="md:text-base text-xs">Gov. Lic. No.{data.Sitelicence}</p>
                        <p className="md:text-base text-xs">Reg.no.{data.SiteRegister}</p>
                    </div>
                    <div className="md:w-1/12 w-1/5 flex justify-between items-center">
                        <a href={data.Sitefacebooklink} target="_blank" rel="noreferrer"><i className="fa fa-facebook text-lg"></i></a>
                        <a href={data.Sitetwitterlink}><i className="fa fa-twitter text-lg"></i></a>
                        <a href={data.Siteyoutubelink}><i className="fa fa-youtube text-lg"></i></a>
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
                    <div className={`md:w-8/12 md:block md:h-auto h-screen ${isNavbarOpen ? 'custom-navbar' : 'hidden'}`}>
                        <div className="md:hidden inline-block ms-[172px] mb-4" onClick={toggleNavbar}>
                            <i className="fa-solid fa-xmark text-xl text-white"></i>
                        </div>
                        <nav className="md:text-black text-white">
                            <ul className="flex justify-between items-center">
                                <li className="md:w-auto w-full">
                                    <Link className="font-medium w-full inline-block py-3 relative after:absolute after:h-[2px] after:w-0 after:content-[''] after:bottom-[10px] after:left-0 after:bg-sky-600 after:transition-all after:duration-300 after:ease-in-out hover:after:w-full" to="/">
                                        Home
                                    </Link>
                                </li>
                                <li onMouseEnter={() => setShowAboutMenu(true)} onMouseLeave={() => setShowAboutMenu(false)} className={`relative md:w-auto w-full ${showAboutMenu ? 'md:h-auto h-[395px]' : ''}`}>
                                    <button className="font-medium py-3 relative flex justify-between items-center gap-2 w-full after:absolute after:h-[2px] after:w-0 after:content-[''] after:bottom-[10px] after:left-0 after:bg-sky-600 after:transition-all after:duration-300 after:ease-in-out hover:after:w-full" onClick={toggleAboutMenu}>
                                        About <i className="fa-solid fa-chevron-down text-sm"></i>
                                    </button>
                                    {showAboutMenu && <div className={`md:bg-white md:text-black text-gray-200 ${showAboutMenu ? 'block' : 'hidden'} md:absolute top-[48px] left-[-20px] md:border`}>

                                        <div className="flex flex-col w-[200px] h-full">
                                            <Link className="p-2 md:border-b hover:text-yellow-500" to="/WhoWeAre">Who We Are</Link>
                                            <Link className="p-2 md:border-b hover:text-yellow-500" to="/CompanyProfile">Company Profile</Link>
                                            <Link className="p-2 md:border-b hover:text-yellow-500" to="/ChairmanMessage">Message From Chairman</Link>
                                            <Link className="p-2 md:border-b hover:text-yellow-500" to="/MissionVision">Mission & Vision</Link>
                                            <Link className="p-2 md:border-b hover:text-yellow-500" to="/Objective">Objective</Link>
                                            <Link className="p-2 md:border-b hover:text-yellow-500" to="/OrganizationChart">Organization Chart</Link>
                                            <Link className="p-2 md:border-b hover:text-yellow-500" to="/LegalDocument">Legal Documents</Link>
                                            <Link className="p-2 hover:text-yellow-500" to="/Gallery">Gallery</Link>
                                        </div>



                                    </div>
                                    }
                                </li>
                                <li onMouseEnter={() => setShowServiceMenu(true)} onMouseLeave={() => setShowServiceMenu(false)} className={`relative md:w-auto w-full ${showServiceMenu ? 'md:h-auto h-[200px]' : ''}`}>
                                    <button className="font-medium py-3 relative flex justify-between items-center gap-2 w-full after:absolute after:h-[2px] after:w-0 after:content-[''] after:bottom-[10px] after:left-0 after:bg-sky-600 after:transition-all after:duration-300 after:ease-in-out hover:after:w-full" onClick={toggleServiceMenu}>
                                        Services <i className="fa-solid fa-chevron-down text-sm md:hidden"></i>
                                    </button>
                                    {showServiceMenu && <div className={`md:bg-white md:text-black text-gray-200 ${showServiceMenu ? 'block' : 'hidden'} md:absolute top-[48px] left-[-20px] md:border`}>

                                        <div className="flex flex-col w-[210px]">
                                            <Link className="block p-2 md:border-b hover:text-yellow-500" to="/RequiredDocument">Required Documents</Link>
                                            <Link className="block p-2 md:border-b hover:text-yellow-500" to="/RecruitmentProcess">Recruitment Process</Link>
                                            <Link className="block p-2 md:border-b hover:text-yellow-500" to="/ClientCandidateMatching">Client Candidate Matching</Link>
                                            <Link className="block p-2 hover:text-yellow-500" to="/IndustryExpertise">Industry Expertise</Link>
                                        </div>
                                    </div>
                                    }
                                </li>
                                <li onMouseEnter={() => setShowJobMenu(true)} onMouseLeave={() => setShowJobMenu(false)} className={`relative md:w-auto w-full ${showJobMenu ? 'md:h-auto h-[140px]' : ''}`}>
                                    <button className="font-medium py-3 relative flex justify-between items-center gap-2 w-full after:absolute after:h-[2px] after:w-0 after:content-[''] after:bottom-[10px] after:left-0 after:bg-sky-600 after:transition-all after:duration-300 after:ease-in-out hover:after:w-full" onClick={toggleJobMenu}>
                                        Available Job <i className="hidden fa-solid fa-chevron-down text-sm"></i>
                                    </button>
                                    {showJobMenu && <div className={`md:bg-white md:text-black text-gray-200 ${showJobMenu ? 'block' : 'hidden'} md:absolute top-[48px] left-[-20px] md:border`}>
                                        <div className="flex flex-col w-[180px]">
                                            <Link className="block p-2 md:border-b hover:text-yellow-500" to="/Vacancy">Vacancy</Link>
                                            <Link className="block p-2 hover:text-yellow-500" to="/NewspaperVacancy">Newspaper Vancancy</Link>
                                        </div>
                                    </div>
                                    }
                                </li>
                              
                                <li className="md:w-auto w-full">
                                    <Link className="font-medium w-full inline-block py-3 relative after:absolute after:h-[2px] after:w-0 after:content-[''] after:bottom-[10px] after:left-0 after:bg-sky-600 after:transition-all after:duration-300 after:ease-in-out hover:after:w-full" to="/Category">
                                        Job Category
                                    </Link>
                                </li>
                                <li className="md:w-auto w-full">
                                    <Link className="font-medium w-full py-3 inline-block relative after:absolute after:h-[2px] after:w-0 after:content-[''] after:bottom-[10px] after:left-0 after:bg-sky-600 after:transition-all after:duration-300 after:ease-in-out hover:after:w-full" to="/Contact">
                                        Contact Us
                                    </Link>
                                </li>
                                
                            </ul>
                        </nav>
                    </div>

                </div>
            </div>
            {navigation.map((nav) => (
                <React.Fragment key={nav.id} >
                  {nav.id !== 1 && (
                    <React.Fragment>
                      {nav.id === 101 && (
                        <li className="text-white hover:text-primaryOrange transition duration-300 uppercase text-sm py-8">
                          <Link to="/gallery">{nav.name}</Link>
                        </li>
                      )}
                      {nav.id === 96 && (
                        <li className="text-white hover:text-primaryOrange transition duration-300 uppercase text-sm py-8">
                          <Link to="/advertisement">{nav.name}</Link>
                        </li>
                      )}
                      {nav.id === 110 && (
                        <li className="text-white hover:text-primaryOrange transition duration-300 uppercase text-sm py-8">
                          <Link to="/contact">{nav.name}</Link>
                        </li>
                      )}
                      {nav.childs && nav.childs.length > 2 && (
                        <li className="text-white hover:text-primaryOrange transition duration-300 uppercase text-sm py-8">
                          <div className="relative group">
                            <span className="font-semibold cursor-pointer">
                              {nav.name} <i className="fa-solid fa-chevron-down"></i>
                            </span>
                            <div className="absolute top-full left-0 hidden bg-white z-50 w-60 group-hover:block">
                              <ul className="border">
                                {nav.childs.map((sub_nav) => (
                                  sub_nav.status === 'Publish' && (
                                    <li
                                      key={sub_nav.id}
                                      className="p-2 border-b hover:text-primaryOrange text-md font-regular"
                                    >
                                      <Link to={`/submenu?name=${sub_nav.id}`}>{sub_nav.name}</Link>
                                    </li>
                                  )
                                ))}
                              </ul>
                            </div>
                          </div>
                        </li>
                      )}
                      {nav.childs && nav.childs.length > 2 && (
                        <li className="text-white hover:text-primaryOrange transition duration-300 uppercase text-sm py-8">
                          <Link to={`/menu?name=${nav.id}`}>{nav.name}</Link>
                        </li>
                      )}
                    </React.Fragment>
                  )}
                </React.Fragment>
              ))}
        </>
    );

    import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import logo from '/src/assets/images/logo.png';
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


    };

    const toggleServiceMenu = () => {
        setShowServiceMenu(!showServiceMenu);

    };

    const toggleJobMenu = () => {
        setShowJobMenu(!showJobMenu);

    };

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
                        <a href={data.Sitetwitterlink}><i className="fa fa-twitter text-lg"></i></a>
                        <a href={data.Siteyoutubelink}><i className="fa fa-youtube text-lg"></i></a>
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
                                <li className="md:w-auto w-full">
                                    <Link className="font-medium w-full inline-block py-3 relative after:absolute after:h-[2px] after:w-0 after:content-[''] after:bottom-[10px] after:left-0 after:bg-sky-600 after:transition-all after:duration-300 after:ease-in-out hover:after:w-full" to="/">
                                        Home
                                    </Link>
                                </li>
                                {navigation.map((nav) => (
                                    <React.Fragment key={nav.id} >
                                        {nav.id !== 1 && (
                                            <React.Fragment>
                                                {nav.id === 30 && (
                                                    <li onMouseEnter={() => setShowAboutMenu(true)} onMouseLeave={() => setShowAboutMenu(false)} className={`relative md:w-auto w-full ${showAboutMenu ? 'md:h-auto h-[395px]' : ''}`}>
                                                        <button className="font-medium py-3 relative flex justify-between items-center gap-2 w-full after:absolute after:h-[2px] after:w-0 after:content-[''] after:bottom-[10px] after:left-0 after:bg-sky-600 after:transition-all after:duration-300 after:ease-in-out hover:after:w-full" onClick={toggleAboutMenu}>
                                                            {nav.name}<i className="fa-solid fa-chevron-down text-sm"></i>
                                                        </button>
                                                        {showAboutMenu && <div className={`md:bg-white md:text-black text-gray-200 ${showAboutMenu ? 'block' : 'hidden'} md:absolute top-[48px] left-[-20px] md:border`}>

                                                            <div className="flex flex-col w-[200px] h-full">
                                                                {nav.child_count > 0 && (
                                                                    <li onMouseEnter={() => setParentId(nav.id)} onMouseLeave={() => setParentId(null)} className={`relative md:w-auto w-full ${nav.id === parentId ? 'md:h-auto' : ''}`}>
                                                                        <button className="font-medium py-3 relative flex justify-between items-center gap-2 w-full after:absolute after:h-[2px] after:w-0 after:content-[''] after:bottom-[10px] after:left-0 after:bg-sky-600 after:transition-all after:duration-300 after:ease-in-out hover:after:w-full" onClick={() => setParentId(nav.id)}>
                                                                            {nav.name} <i className={`fa-solid ${nav.id === parentId ? 'fa-chevron-up' : 'fa-chevron-down'} text-sm`}></i>
                                                                        </button>
                                                                        {nav.id === parentId && (
                                                                            <div className={`md:bg-white md:text-black text-gray-200 ${nav.id === parentId ? 'block' : 'hidden'} md:absolute top-[48px] left-[-20px] md:border`}>
                                                                                <div className="flex flex-col w-[200px] h-full">
                                                                                    {nav.children.map((child) => (
                                                                                        <Link key={child.id} className="p-2 md:border-b hover:text-yellow-500" to={child.url}>{child.name}</Link>
                                                                                    ))}
                                                                                </div>
                                                                            </div>
                                                                        )}
                                                                    </li>
                                                                )}
                                                                {nav.id === 32 && (
                                                                    <Link className="p-2 md:border-b hover:text-yellow-500" to="/CompanyProfile">{nav.name}</Link>
                                                                )}
                                                                <Link className="p-2 md:border-b hover:text-yellow-500" to="/ChairmanMessage">Message From Chairman</Link>
                                                                <Link className="p-2 md:border-b hover:text-yellow-500" to="/MissionVision">Mission & Vision</Link>
                                                                <Link className="p-2 md:border-b hover:text-yellow-500" to="/Objective">Objective</Link>
                                                                <Link className="p-2 md:border-b hover:text-yellow-500" to="/OrganizationChart">Organization Chart</Link>
                                                                <Link className="p-2 md:border-b hover:text-yellow-500" to="/LegalDocument">Legal Documents</Link>
                                                                <Link className="p-2 hover:text-yellow-500" to="/Gallery">Gallery</Link>
                                                            </div>
                                                        </div>
                                                        }
                                                    </li>
                                                )}
                                                {nav.id === 66 && (
                                                    <li onMouseEnter={() => setShowServiceMenu(true)} onMouseLeave={() => setShowServiceMenu(false)} className={`relative md:w-auto w-full ${showServiceMenu ? 'md:h-auto h-[200px]' : ''}`}>
                                                        <button className="font-medium py-3 relative flex justify-between items-center gap-2 w-full after:absolute after:h-[2px] after:w-0 after:content-[''] after:bottom-[10px] after:left-0 after:bg-sky-600 after:transition-all after:duration-300 after:ease-in-out hover:after:w-full" onClick={toggleServiceMenu}>
                                                            Services <i className="fa-solid fa-chevron-down text-sm md:hidden"></i>
                                                        </button>
                                                        {showServiceMenu && <div className={`md:bg-white md:text-black text-gray-200 ${showServiceMenu ? 'block' : 'hidden'} md:absolute top-[48px] left-[-20px] md:border`}>

                                                            <div className="flex flex-col w-[210px]">
                                                                <Link className="block p-2 md:border-b hover:text-yellow-500" to="/RequiredDocument">Required Documents</Link>
                                                                <Link className="block p-2 md:border-b hover:text-yellow-500" to="/RecruitmentProcess">Recruitment Process</Link>
                                                                <Link className="block p-2 md:border-b hover:text-yellow-500" to="/ClientCandidateMatching">Client Candidate Matching</Link>
                                                                <Link className="block p-2 hover:text-yellow-500" to="/IndustryExpertise">Industry Expertise</Link>
                                                            </div>
                                                        </div>
                                                        }
                                                    </li>
                                                )}
                                                {nav.id === 112 && (
                                                    <li onMouseEnter={() => setShowJobMenu(true)} onMouseLeave={() => setShowJobMenu(false)} className={`relative md:w-auto w-full ${showJobMenu ? 'md:h-auto h-[140px]' : ''}`}>
                                                        <button className="font-medium py-3 relative flex justify-between items-center gap-2 w-full after:absolute after:h-[2px] after:w-0 after:content-[''] after:bottom-[10px] after:left-0 after:bg-sky-600 after:transition-all after:duration-300 after:ease-in-out hover:after:w-full" onClick={toggleJobMenu}>
                                                            Available Job <i className="hidden fa-solid fa-chevron-down text-sm"></i>
                                                        </button>
                                                        {showJobMenu && <div className={`md:bg-white md:text-black text-gray-200 ${showJobMenu ? 'block' : 'hidden'} md:absolute top-[48px] left-[-20px] md:border`}>
                                                            <div className="flex flex-col w-[180px]">
                                                                <Link className="block p-2 md:border-b hover:text-yellow-500" to="/Vacancy">Vacancy</Link>
                                                                <Link className="block p-2 hover:text-yellow-500" to="/NewspaperVacancy">Newspaper Vancancy</Link>
                                                            </div>
                                                        </div>
                                                        }
                                                    </li>
                                                )}
                                                {nav.id === 75 && (
                                                    <li className="md:w-auto w-full">
                                                        <Link className="font-medium w-full inline-block py-3 relative after:absolute after:h-[2px] after:w-0 after:content-[''] after:bottom-[10px] after:left-0 after:bg-sky-600 after:transition-all after:duration-300 after:ease-in-out hover:after:w-full" to="/Category">
                                                            {nav.name}
                                                        </Link>
                                                    </li>
                                                )}
                                                {nav.id === 133 && (
                                                    <li className="md:w-auto w-full">
                                                        <Link className="font-medium w-full py-3 inline-block relative after:absolute after:h-[2px] after:w-0 after:content-[''] after:bottom-[10px] after:left-0 after:bg-sky-600 after:transition-all after:duration-300 after:ease-in-out hover:after:w-full" to="/Contact">
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



}

export default Header;


