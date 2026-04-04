import React from 'react';

const Footer = () => {
    return (
        <div id={"contact"} className={'relative z-10 w-full bg-black border-t border-gray-800 flex flex-col sm:flex-row sm:justify-around items-center gap-3 sm:gap-4 md:gap-5 p-3 sm:p-4 md:p-5 lg:p-6'}>
            <p className={'text-[14px] sm:text-[16px] md:text-[20px] lg:text-[24px] font-[400] text-center sm:text-left text-gray-300'}>
                © 2026 ACMClub - VIT Pune
            </p>
            <div className={'flex items-center justify-center flex-wrap gap-3 sm:gap-4 md:gap-5'}>
                <p className={'text-[#E7BE23] text-[14px] sm:text-[16px] md:text-[20px] lg:text-[24px] font-[500] cursor-pointer hover:text-white transition-colors'}>Linkedin</p>
                <p className={'text-[#E7BE23] text-[14px] sm:text-[16px] md:text-[20px] lg:text-[24px] font-[500] cursor-pointer hover:text-white transition-colors'}>Instagram</p>
                <p className={'text-[#E7BE23] text-[14px] sm:text-[16px] md:text-[20px] lg:text-[24px] font-[500] cursor-pointer hover:text-white transition-colors'}>Github</p>
                <p className={'text-[#E7BE23] text-[14px] sm:text-[16px] md:text-[20px] lg:text-[24px] font-[500] cursor-pointer hover:text-white transition-colors'}>Discord</p>
            </div>
            <p className={'text-[14px] sm:text-[16px] md:text-[20px] lg:text-[24px] font-[500] text-center sm:text-right text-gray-300'}>
                Developed by Web Team '26
            </p>
        </div>
    );
};

export default Footer;