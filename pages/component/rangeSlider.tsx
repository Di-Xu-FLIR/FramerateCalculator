import React, { useRef, useState } from "react";

type RangeSliderProps = {
    max: string;
    min: string;
    step: string;
    text: string;
};

const RangeSlider = ({ max, min, step, text }: RangeSliderProps) => {
    const rangeRef = useRef(null);

    const [value, setValue] = useState(650);
    const handleChange = () => {
        setValue(rangeRef.current.value);
    };

    return (
        <>
            <label className="px-4">{text}</label>
            <div className="w-full my-auto px-4 pb-6 flex gap-2 items-center">
                {min}
                <input
                    defaultValue={value}
                    ref={rangeRef}
                    onChange={handleChange}
                    type="range"
                    max={max}
                    min={min}
                    step={step}
                    className="w-full"
                />
                {max}
                <input
                    type="number"
                    className="w-20 outline-none bg-white border border-gray-800 p-1"
                    value={value}
                />
            </div>
        </>
    );
};

export default RangeSlider;
