import React from 'react';
import Slider from './Slider';
import Intro from './Intro';
import Offer from './Offer';
import Clients from './Clients';
import Work from './Work';

function Homepage() {
    return (
        <>
            <Slider />
            <Intro />
            <Offer />
            <Work />
            <Clients />
        </>
    )
}

export default Homepage;
