

import React, { useState } from "react";
import Card from "../Cards";
export default function Hero() {


    return (
        <div className="min-h-screen w-full bg-[#B1D6FF] flex flex-col items-center relative h-430">
            {/* Second Rectangle remains unchanged */}
            <div className="w-[90%] max-w-8xl bg-white rounded-[3.25vh] my-8 h-[80vh] px-8 py-6 flex flex-col md:flex-row items-center justify-center">

                {/* Left text */}
                <div className="flex gap-7">
                    <div className="mb-8 md:mb-0">
                        <h1 className="flex text-[38px] font-bold mb-4 w-[300] leading-tight">
                            Selectează o opțiune pentru a începe programarea.
                        </h1>
                        <p className="text-gray-600 font-medium text-lg width max-w-[250px]">
                            Ai nevoie de un medic de familie sau un specialist?
                        </p>
                    </div>

                    {/* Right cards */}
                    <Card
                        title="Programare medic de familie"
                    />
                    <Card
                        title="Programare alt medic"
                    />
                </div>
            </div>
        </div>
    )
}

