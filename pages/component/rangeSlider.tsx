import React from "react";

type RangeSliderProps = {
    max: string;
    min: string;
    step: string;
    text: string;
};

const RangeSlider = ({ max, min, step, text }: RangeSliderProps) => {
    return (
        <>
            <label className="px-4">{text}</label>
            <div className="w-full my-auto px-4 pb-6 flex gap-2 items-center">
                {min}
                <input type="range" max={max} min={min} step={step} className="w-full" />
                {max}
                <input
                    type="number"
                    className="w-20 outline-none bg-white border border-gray-800 p-1"
                />
            </div>
        </>
    );
};

export default RangeSlider;
