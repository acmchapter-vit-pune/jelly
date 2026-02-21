import React from 'react';
import Image from "next/image";
import jelly from "@/public/assets/jelly.png";

const Title = ({title, className = ''}) => {
    return (
        <div className={`z-10 pt-2 sm:pt-2 md:pt-3 relative inline-block ${className}`}>
            <div className="absolute left-[-35px] sm:left-[-47px] md:left-[-58px] lg:left-[-70px] top-[-25px] sm:top-[-33px] md:top-[-42px] lg:top-[-50px] pointer-events-none z-100">
                <Image
                    src={jelly}
                    alt="jelly"
                    className="w-20 h-20 sm:w-24 sm:h-24 md:w-28 md:h-28 lg:w-32 lg:h-32"
                />
            </div>
            <div className={'text-[36px] sm:text-[48px] md:text-[60px] lg:text-[72px] font-[800] z-10 relative'}>
                {title}
            </div>
        </div>
    );
};

export default Title;
