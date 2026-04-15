import React from 'react';
import PsDashboard from "@/pages/PsDashboard";

export const metadata = {
    title: "PS Dashboard — Breaking Enigma | ACM VIT Pune",
    description: "Live problem statement selection dashboard for Breaking Enigma hackathon.",
};

const Page = () => {
    return (
        <div className="w-full overflow-x-hidden">
            <PsDashboard />
        </div>
    );
};

export default Page;
