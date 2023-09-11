import React, { useState, useEffect } from 'react';
// import Images from './GalleryImages';
import ImageModal from '../job/ImageModal';
import axios from 'axios';

function Gallery() {
    // const images = Images;
    const [currentPage, setCurrentPage] = useState(1);
    const itemsPerPage = 3; // Adjust this based on your design
    const [Pages, setTotalPages] = useState(1)
    const [galleryImage, setGalleryImage] = useState([]);
    const [gallery, setGallery] = useState([])

    const GalleryData = async () => {
        try {
            const response = await axios.get(
                "http://127.0.0.1:8000/api/navigations/"
            );
            let newgallery =[...response.data]
            newgallery = newgallery.reverse()
            const galleryDatas = newgallery.filter(
                (item) => item.status === "Publish" && item.page_type === "Gallery"

            );
            setGalleryImage(galleryDatas);
            const gallDatas = response.data.filter(
                (item) => item.status === "Publish" && item.page_type === "gallery/doc"

            );
            setGallery(gallDatas[0]);

            const startIndex = (currentPage - 1) * itemsPerPage;
            const endIndex = startIndex + itemsPerPage;
            const paginatedGalleryDatas = galleryDatas.slice(startIndex, endIndex);

            setGalleryImage(paginatedGalleryDatas);

            const totalPages = Math.ceil(galleryDatas.length / itemsPerPage);
            setTotalPages(totalPages);
        } catch (error) {
            console.error("Errror on fetching data:", error);
        }
    };

    useEffect(() => {
        GalleryData();
    }, [currentPage]);
    console.log(galleryImage);
    console.log(gallery);

    const word = gallery.name || "";
    const words = word.split(" ");
    const firstWord = words[0];
    const otherWords = words.slice(1).join(" ");

    return (
        <>
            <section className='py-20 relative'>
                <img className='absolute h-full w-full top-0 left-0 object-cover' src={gallery.slider_image} alt="background" />
                <div className="bg-gradient-to-t from-black to-transparent opacity-50 absolute w-full z-10 h-full top-0 left-0"></div>
                <div className="container py-12 relative z-20 mt-10" data-aos="zoom-in" data-aos-duration="1000" data-aos-once='true'>
                    <h1 className='md:text-6xl sm:text-4xl text-3xl font-extrabold text-center text-white'><big className='text-yellow-300'>{firstWord} </big> {otherWords}</h1>
                </div>
            </section>
            <section className='py-12'>
                <div className="container flex flex-col items-center">
                    <h2 className='lg:text-4xl sm:text-3xl text-2xl font-bold pb-2 mb-8 relative pseudo-border' data-aos="fade-up" data-aos-duration="1000" data-aos-once='true'>{gallery.title}</h2>
                    <div className='grid md:grid-cols-3 sm:grid-cols-2 grid-cols-1 gap-4'>
                        {galleryImage.map((data, index) => (
                            <ImageModal imageUrl={data.bannerimage} images={galleryImage} index={index} key={data.id} />

                        ))}
                    </div>
                </div>

                <nav className="flex justify-center items-center space-x-2 pt-5">
                    <button
                        className="text-gray-500 hover:text-blue-600 p-4 inline-flex items-center gap-2 rounded-md"
                        onClick={() => setCurrentPage(currentPage - 1)}
                        disabled={currentPage === 1}
                    >
                        <span aria-hidden="true">«</span>
                        <span className="sr-only">Previous</span>
                    </button>
                    {Array.from({ length: Pages }).map((_, index) => (
                        <button
                            key={index + 1}
                            className={`w-10 h-10 ${currentPage === index + 1
                                    ? "bg-blue-500 text-white"
                                    : "text-gray-500 hover:text-blue-600"
                                } p-4 inline-flex items-center text-sm font-medium rounded-full`}
                            onClick={() => setCurrentPage(index + 1)}
                        >
                            {index + 1}
                        </button>
                    ))}
                    <button
                        className="text-gray-500 hover:text-blue-600 p-4 inline-flex items-center gap-2 rounded-md"
                        onClick={() => setCurrentPage(currentPage + 1)}
                        disabled={currentPage === Pages}
                    >
                        <span className="sr-only">Next</span>
                        <span aria-hidden="true">»</span>
                    </button>
                </nav>

            </section>
        </>
    )
}

export default Gallery;
