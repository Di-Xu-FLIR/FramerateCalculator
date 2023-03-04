import { useState } from "react";
import { MdKeyboardArrowDown, MdKeyboardArrowUp } from "react-icons/md";

const PixelFormatData = [
    "Mono8",
    "Mono16",
    "RGB8Packed",
    "BayerRG8",
    "BayerRG16",
    "Mono10Pack",
    "BayerRG10Packed",
    "Mono12Packed",
    "BayerRG12Packed",
    "YUV411Packed",
    "YUV422Packed",
    "YUV444Packed",
    "Mono10p",
    "BayerRG10p",
    "Mono12p",
    "BayerRG12p",
    "YCbCr8",
    "YCbCr422_8",
    "YCbCr411_8",
    "BGR8",
    "BGRa8",
    "LLCBayerRG8",
];

const PixelFormat = ({ pixelFormat }: { pixelFormat: string[] }) => {
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
                    {(pixelFormat.length > 0 ? pixelFormat : PixelFormatData).map(
                        (pixel: string) => {
                            return (
                                <li
                                    key={pixel}
                                    className="bg-white p-2 hover:bg-slate-200 cursor-pointer text-left font-semibold"
                                    onClick={() => {
                                        setSelectedPixelFormat(pixel);
                                        setIsOpen(false);
                                    }}
                                >
                                    {pixel}
                                </li>
                            );
                        }
                    )}
                </ul>
            </div>
        </div>
    );
};

export default PixelFormat;
