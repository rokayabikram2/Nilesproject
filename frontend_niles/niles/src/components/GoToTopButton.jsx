import React, { useEffect, useState } from 'react';

function GoToTopButton() {
    const [scrolled, setScrolled] = useState(false);
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

    const handleGoUp = () => {
        window.scrollTo({
            top: 0,
            behavior: 'smooth',
        });
    }
    return (
        <>
            <button onClick={handleGoUp} className={`fixed py-3 px-4 bg-sky-500 bottom-10 right-2 text-white z-[9999] hover:bg-sky-700 hover:border border-sky-700 ${scrolled ? '' : 'hidden'}`}>
                <i className="fa-sharp fa-solid fa-arrow-up"></i>
            </button>
        </>
    )
}

export default GoToTopButton;
