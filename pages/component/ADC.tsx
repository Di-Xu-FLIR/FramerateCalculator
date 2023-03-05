import { useState } from "react";
import { MdKeyboardArrowDown, MdKeyboardArrowUp } from "react-icons/md";

const ADCData = [
    { id: 1, name: "8 Bit" },
    { id: 2, name: "10 Bit" },
    { id: 3, name: "12 Bit" },
    { id: 4, name: "16 Bit" },
];

type ADCPropsType = {
    adc: string[];
    selectedADC: string;
    setSelectedADC: (item: string) => void;
};

const ADC = ({ adc, selectedADC, setSelectedADC }: ADCPropsType) => {
    const [isOpen, setIsOpen] = useState(false);
    // const [selectedADC, setSelectedADC] = useState("Select ADC");
    return (
        <div className=" w-full my-auto p-4">
            <div
                className="SelectBtn border border-black h-14 p-4 flex items-center justify-between cursor-pointer"
                onClick={() => setIsOpen(!isOpen)}
            >
                <span>{selectedADC || "Select ADC"}</span>
                {isOpen ? <MdKeyboardArrowUp /> : <MdKeyboardArrowDown />}
            </div>

            <div className={`Content mt-2 ${isOpen ? "" : "hidden"}`}>
                <ul className="Options mt-2 overflow-y-auto max-h-40">
                    {adc.map((item: string) => {
                        return (
                            <li
                                key={item}
                                className="bg-white p-2 hover:bg-slate-200 cursor-pointer text-left font-semibold"
                                onClick={() => {
                                    setSelectedADC(item), setIsOpen(false);
                                }}
                            >
                                {item}
                            </li>
                        );
                    })}
                </ul>
            </div>
        </div>
    );
};

export default ADC;
