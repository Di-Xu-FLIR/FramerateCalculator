import { useState } from "react";
import { MdKeyboardArrowDown, MdKeyboardArrowUp } from "react-icons/md";

const PixelFormatData = [
    { id: 1, name: "Mono8" },
    { id: 2, name: "Mono16" },
    { id: 3, name: "RGB8Packed" },
    { id: 4, name: "BayerRG8" },
    { id: 5, name: "BayerRG16" },
    { id: 6, name: "Mono10Pack" },
    { id: 7, name: "BayerRG10Packed" },
    { id: 8, name: "Mono12Packed" },
    { id: 9, name: "BayerRG12Packed" },
    { id: 10, name: "YUV411Packed" },
    { id: 11, name: "YUV422Packed" },
    { id: 12, name: "YUV444Packed" },
    { id: 13, name: "Mono10p" },
    { id: 14, name: "BayerRG10p" },
    { id: 15, name: "Mono12p" },
    { id: 16, name: "BayerRG12p" },
    { id: 17, name: "YCbCr8" },
    { id: 18, name: "YCbCr422_8" },
    { id: 19, name: "YCbCr411_8" },
    { id: 20, name: "BGR8" },
    { id: 21, name: "BGRa8" },
    { id: 22, name: "LLCBayerRG8" },
];

const PixelFormat = () => {
    const [isOpen, setIsOpen] = useState(false);
    const [selectedPixelFormat, setSelectedPixelFormat] = useState("Select Pixel Format");
    return (
        <div className=" w-full my-auto p-4">
            <div
                className="SelectBtn border border-black h-14 p-4 flex items-center justify-between cursor-pointer"
                onClick={() => setIsOpen(!isOpen)}
            >
                <span>{selectedPixelFormat}</span>
                {isOpen ? <MdKeyboardArrowUp /> : <MdKeyboardArrowDown />}
            </div>

            <div className={`Content mt-2 ${isOpen ? "" : "hidden"}`}>
                <ul className="Options mt-2 overflow-y-auto max-h-40">
                    {PixelFormatData.map((pixel) => {
                        return (
                            <li
                                key={pixel.id}
                                className="bg-white p-2 hover:bg-slate-200 cursor-pointer text-left font-semibold"
                                onClick={() => {
                                    setSelectedPixelFormat(pixel.name);
                                    setIsOpen(false);
                                }}
                            >
                                {pixel.name}
                            </li>
                        );
                    })}
                </ul>
            </div>
        </div>
    );
};

export default PixelFormat;
