// import React from 'react';
// import Navbar from "@/components/Navbar";
// import Image from "next/image";
// import hackathon_bg from '../public/assets/hackathon-bg.png';
// import hackathon_abt from '../public/assets/hackathon-abt.png';
// import HackTime from "@/components/HackTime";
// import Faqs from "@/components/Faqs";
//
// const Hackathon = () => {
//     return (
//         <div className="w-full overflow-x-hidden">
//
//             {/* HERO SECTION */}
//             <div className="relative w-full min-h-screen">
//
//                 {/* Background Image */}
//                 <Image
//                     src={hackathon_bg}
//                     alt="hackathon background"
//                     fill
//                     priority
//                     className="object-cover -z-10"
//                 />
//
//                 {/* Content */}
//                 <div className="relative z-10 text-white">
//                     <Navbar />
//
//                     <div className="flex flex-col items-center justify-center text-center mt-28 space-y-6">
//                         <p className="hack text-[128px] font-400">CONVERGE</p>
//
//                         <div className="space-y-2 text-[16px] font-300">
//                             <div >Aeronautical Auditorium</div>
//
//                             <div className={'flex gap-3'}>
//                                 <div>7th February 2024</div> |
//                                 <div>12:00pm - 2:00pm</div>
//                             </div>
//                         </div>
//
//                         <button className="px-[20px] py-[10px] border-white border-[2px] rounded-md text-[16px] font-300">
//                             Register Now
//                         </button>
//                     </div>
//                 </div>
//
//             </div>
//
//             {/*about converge*/}
//
//             <div className="grid grid-cols-2 px-[84px] gap-[84px] border-t-[1px] border-b-[1px] border-dashed border-gray-500">
//                 <div className={'flex flex-col gap-5 py-[84px] border-l-[1px] border-r-[1px] border-dashed border-gray-500'}>
//                     <p className={'ml-5 text-[20px] text-300 text-[#6C6C6C]'}>[ABOUT CONVERGE]</p>
//                     <p className={'hack pl-5 pb-5 border-t-[1px] border-b-[1px] border-dashed border-gray-500 text-[64px] font-400 text-[#FF4600]'}>kya hai converge?</p>
//                     <p className={'text-[20px] text-300  pl-5 pr-5'}>{`{ Confused about hackathons, cohorts, and meetups? Converge cracks the code! Converge demystifies hackathons, cohorts, and meetups, empowering you to navigate the thrilling world of tech & marketing events. Expert talks, interactive challenges, and epic connections. Soch kya rahe ho? Register karo ! 😉. }`}</p>
//                 </div>
//                 <div className={'px-[84px] py-[84px] border-r-[1px] border-dashed border-gray-500'}>
//                     <Image
//                         src={hackathon_abt}
//                         alt="hackathon about"
//                         className={'w-[464px] h-[400px]'}
//                     />
//                 </div>
//             </div>
//
//             {/*outline*/}
//             <div className="flex flex-col px-[84px] gap-[84px] border-t-[1px] border-b-[1px] border-dashed border-gray-500">
//                 <div className={'text-center flex flex-col gap-5 py-[84px] border-l-[1px] border-r-[1px] border-dashed border-gray-500'}>
//                     <p className={'ml-5 text-[20px] text-300 text-[#6C6C6C]'}>[EVENT OUTLINE]</p>
//                     <p className={'hack pl-5 pb-5 border-t-[1px] border-b-[1px] border-dashed border-gray-500 text-[64px] font-400 text-[#3080ED]'}>event ki rooprekha</p>
//                     <HackTime />
//                 </div>
//             </div>
//
//             {/*faq*/}
//             <div className="flex flex-col px-[84px] gap-[84px] border-t-[1px] border-b-[1px] border-dashed border-gray-500">
//                 <div className={'text-center flex flex-col gap-5 py-[84px] border-l-[1px] border-r-[1px] border-dashed border-gray-500'}>
//                     <p className={'ml-5 text-[20px] text-300 text-[#6C6C6C]'}>[FREQUENTLY ASKED QUESTIONS]</p>
//                     <p className={'hack pl-5 pb-5 border-t-[1px] border-b-[1px] border-dashed border-gray-500 text-[64px] font-400 text-[#7DA942]'}>aksar poochhe jane wale sawal</p>
//                     <Faqs />
//                 </div>
//             </div>
//
//             {/*footer*/}
//             <div className={'text-[18px] font-400 text-center m-5'}>
//                 hackathon@2026
//             </div>
//
//         </div>
//     );
// };
//
// export default Hackathon;


import React from 'react';
import Navbar from "@/components/Navbar";
import Image from "next/image";
import hackathon_bg from '../public/assets/hackathon-bg.png';
import hackathon_abt from '../public/assets/hackathon-abt.png';
import HackTime from "@/components/HackTime";
import Faqs from "@/components/Faqs";

const Hackathon = () => {
    return (
        <div className="w-full overflow-x-hidden">

            {/* HERO SECTION */}
            <div className="relative w-full min-h-screen">

                <Image
                    src={hackathon_bg}
                    alt="hackathon background"
                    fill
                    priority
                    className="object-cover -z-10"
                />

                <div className="relative z-10 text-white">
                    <Navbar />

                    <div className="flex flex-col items-center justify-center text-center mt-40 sm:mt-32 md:mt-28 space-y-6 px-4">

                        <p className="hack text-[64px] sm:text-[80px] md:text-[100px] lg:text-[128px] font-400 leading-none">
                            CONVERGE
                        </p>

                        <div className="space-y-2 text-[14px] sm:text-[16px] font-300">
                            <div>Aeronautical Auditorium</div>

                            <div className="flex flex-col sm:flex-row gap-1 sm:gap-3 items-center">
                                <div>7th February 2024</div> <p className={'rotate-90 md:rotate-180'}>|</p>
                                <div>12:00pm - 2:00pm</div>
                            </div>
                        </div>

                        <button className="px-[20px] py-[10px] border-white border-[2px] rounded-md text-[14px] sm:text-[16px] font-300">
                            Register Now
                        </button>
                    </div>
                </div>
            </div>

            {/* ABOUT CONVERGE */}
            <div className="grid grid-cols-1 lg:grid-cols-2 px-5 sm:px-10 lg:px-[84px] gap-0 lg:gap-[84px] border-t border-b border-dashed border-gray-500">

                <div className="flex flex-col gap-5 py-14 lg:py-[84px] lg:border-l lg:border-r border-dashed border-gray-500">
                    <p className="ml-5 text-[16px] sm:text-[20px] text-[#6C6C6C]">[ABOUT CONVERGE]</p>

                    <p className="hack pl-5 pb-5 border-t border-b border-dashed border-gray-500 text-[36px] sm:text-[48px] lg:text-[64px] font-400 text-[#FF4600]">
                        kya hai converge?
                    </p>

                    <p className="text-[16px] sm:text-[20px] pl-5 pr-5">
                        {`{ Confused about hackathons, cohorts, and meetups? Converge cracks the code! Converge demystifies hackathons, cohorts, and meetups, empowering you to navigate the thrilling world of tech & marketing events. Expert talks, interactive challenges, and epic connections. Soch kya rahe ho? Register karo ! 😉. }`}
                    </p>
                </div>

                <div className="px-0 lg:px-[84px] pb-10 lg:py-[84px] lg:border-r border-dashed border-gray-500 flex justify-center">
                    <Image
                        src={hackathon_abt}
                        alt="hackathon about"
                        className="w-full max-w-[464px] h-auto"
                    />
                </div>
            </div>

            {/* EVENT OUTLINE */}
            <div className="flex flex-col px-5 sm:px-10 lg:px-[84px] gap-0 lg:gap-[84px] border-t border-b border-dashed border-gray-500">
                <div className="text-center flex flex-col gap-5 py-14 lg:py-[84px] lg:border-l lg:border-r border-dashed border-gray-500">

                    <p className="ml-5 text-[16px] sm:text-[20px] text-[#6C6C6C]">[EVENT OUTLINE]</p>

                    <p className="hack pl-5 pb-5 border-t border-b border-dashed border-gray-500 text-[36px] sm:text-[48px] lg:text-[64px] font-400 text-[#3080ED]">
                        event ki rooprekha
                    </p>

                    <HackTime />
                </div>
            </div>

            {/* FAQ */}
            <div className="flex flex-col px-5 sm:px-10 lg:px-[84px] gap-0 lg:gap-[84px] border-t border-b border-dashed border-gray-500">
                <div className="text-center flex flex-col gap-5 py-14 lg:py-[84px] lg:border-l lg:border-r border-dashed border-gray-500">

                    <p className="ml-5 text-[16px] sm:text-[20px] text-[#6C6C6C]">[FREQUENTLY ASKED QUESTIONS]</p>

                    <p className="hack pl-5 pb-5 border-t border-b border-dashed border-gray-500 text-[36px] sm:text-[48px] lg:text-[64px] font-400 text-[#7DA942]">
                        aksar poochhe jane wale sawal
                    </p>

                    <Faqs />
                </div>
            </div>

            {/* FOOTER */}
            <div className="text-sm sm:text-base font-400 text-center m-5">
                hackathon@2026
            </div>

        </div>
    );
};

export default Hackathon;