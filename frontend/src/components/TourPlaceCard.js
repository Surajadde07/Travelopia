import React from 'react';

const TourPlaceCard = ({ image, title, tours }) => {
    return (
        <div className='flex flex-col justify-center items-center gap-4r relative gap-5 '>
            <div className="flex flex-col items-center w-[16rem] text-center rounded-t-[48%]  overflow-hidden shadow-lg">
                <div
                    className="h-[23rem] w-full bg-cover bg-center "
                    style={{ backgroundImage: `url(${image})` }}
                ></div>
            </div>
            <h2 className='text-yellow-500 absolute bottom-7 px-2 rounded-lg bg-white text-lg font-bold'>⭐4.6</h2>
            <h1>{title}</h1>
        </div>
    );
};

export default TourPlaceCard;
