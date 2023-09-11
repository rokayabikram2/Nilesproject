import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import logo from '/src/assets/images/logo.png';
import axios from 'axios';

function Footer() {
    const [data, setData] = useState([])
    const [parentId, setParentId] = useState(null);

    const [navigation, setNavigation] = useState([]);


    useEffect(() => {
        // Axios GET request to fetch data
        const footerData = async () => {
            try {
                const response = await axios.get('http://127.0.0.1:8000/api/globals/');
                // Handle the response data here
                // if (data.length > 0){
                response.data && setData(response.data[0]);
                // }

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

            } catch (error) {
                console.error("Error fetching data:", error);
            }

        }
        footerData();


    }, [parentId]);
    console.log(data);
    console.log(navigation);



   


    return (
        <footer className=" text-black">

            <div className="bg-gray-100">


                <div className="pb-6 pt-8 container grid lg:grid-cols-4 md:grid-cols-2 grid-cols-1 lg:gap-3 md:gap-8 gap-4">
                    {/* ----logo---- */}
                    <div className="sm:mb-4 mb-10">
                        <img className="lg:w-10/12 md:w-full sm:w-2/3 w-full" src={data.logo} alt="logo" />
                        <div className="mt-10">
                            <a href={data.brochure} target="_blank" className="bg-sky-500 text-white py-2 px-3 rounded hover:bg-sky-600 hover:border hover:border-sky-600">{data.broc_name}</a>
                        </div>

                    </div>
                    {/* ----contact area---- */}
                    <div className="flex lg:justify-center justify-start sm:mb-4 mb-10">
                        <div className="w-full">
                            <h4 className="text-xl font-semibold mb-4">Contact Us</h4>
                            <div className="flex flex-col gap-2">
                                <span className="flex items-center font-regular text-gray-700">
                                    <i className="fa-solid fa-location-dot me-1"></i>
                                    <p>{data.SiteAddress}</p>
                                </span>
                                <span className="flex items-center font-regular text-gray-700">
                                    <i className="fa-solid fa-phone me-1"></i>
                                    <p className="">{data.SiteContact}</p>
                                </span>
                                <span className="flex items-center font-regular text-gray-700">
                                    <i className="fa-solid fa-envelope me-1"></i>
                                    <p>{data.SiteEmail}</p>
                                </span>

                            </div>
                            <div className="flex justify-between gap-1 items-center mt-5 lg:w-1/3 w-1/4">
                                <a href={data.Sitefacebooklink} target="_blank" rel="noreferrer"><i className="fa fa-facebook text-2xl text-blue-600"></i></a>
                                <a href={data.Sitetwitterlink} target="_blank" rel="noreferrer"><i className="fa fa-twitter text-2xl text-sky-600"></i></a>
                                <a href={data.Siteyoutubelink} target="_blank" rel="noreferrer"><i className="fa fa-youtube text-2xl text-red-600"></i></a>
                            </div>
                        </div>
                    </div>
                    {/* ----nav area---- */}
                    <div className="flex lg:justify-center justify-start sm:mb-4 mb-10">
                        <div className="w-full">
                            <h4 className="text-xl font-semibold mb-4">Links</h4>
                            <div className="flex flex-col gap-2">
                                {navigation[navigation?.findIndex(item => item?.id === 31)] &&(
                                <Link to="/WhoWeAre" className="font-regular text-gray-700"><i className="fa-solid fa-arrow-right me-1"></i>About Us</Link>
                                )}
                                {navigation[navigation?.findIndex(item => item?.id === 67)] &&( 
                                <Link to="/RecruitmentProcess" className="font-regular text-gray-700"><i className="fa-solid fa-arrow-right me-1"></i>Services</Link>
                                )}
                                {navigation[navigation?.findIndex(item => item?.id === 121)] &&( 
                                <Link to="/Vacancy" className="font-regular text-gray-700"><i className="fa-solid fa-arrow-right me-1"></i>Available Job</Link>
                                )}
                                {navigation[navigation?.findIndex(item => item?.id === 75)] &&(
                                <Link to="/Category" className="font-regular text-gray-700"><i className="fa-solid fa-arrow-right me-1"></i>Job Category</Link>
                                )}
                                {navigation[navigation?.findIndex(item => item?.id === 133)] &&(
                                <Link to="/Contact" className="font-regular text-gray-700"><i className="fa-solid fa-arrow-right me-1"></i>Contact Us</Link>
                                )}
                            </div>
                        </div>
                    </div>
                    {/* ----map area---- */}
                    <div className="flex md:justify-center justify-start sm:mb-4 mb-10">
                        <div className="w-full">
                            <h4 className="text-xl font-semibold mb-4">Map</h4>
                            <iframe className="w-full border-2" src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3532.601159402349!2d85.34929757393606!3d27.698719425874703!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x39eb1986e9bdcec3%3A0x54389fea89ce22e5!2sNile%20International%20Manpower%20Agency%20Pvt.%20Ltd.!5e0!3m2!1sen!2snp!4v1690868161348!5m2!1sen!2snp" allowFullScreen="" loading="lazy" height='170px' referrerPolicy="no-referrer-when-downgrade"></iframe>
                        </div>
                    </div>
                </div>
            </div>
            {/* ----copyright area---- */}
            <div className="border-t bg-sky-600 text-white">
                <div className="container py-2">
                    <p className="md:text-base text-sm">
                        Copyright &copy; 2023 All rights reserved. Nile International Manpower
                        Agency Pvt. Ltd.
                    </p>
                    <p className="md:text-base text-sm">Powered by
                        <a className="ms-1 text-yellow-300" target="_blank" rel="noreferrer" href="https://radiantnepal.com/">
                            Radiant Infotech Nepal
                        </a>
                    </p>
                </div>
            </div>
        </footer>
    );
}

export default Footer;
