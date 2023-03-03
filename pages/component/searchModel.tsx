import { useState } from "react";
import { MdKeyboardArrowDown, MdKeyboardArrowUp, MdOutlineSearch } from "react-icons/md";

const cameras = [
    { id: 1, name: "BFS-U3-27S5C" },
    { id: 2, name: "BFS-U3-32S4C" },
    { id: 3, name: "BFS-U3-50S5C" },
    { id: 4, name: "LD-5" },
];

const SearchModel = () => {
    const [isOpen, setIsOpen] = useState(false);
    const [selectedCamera, setSelectedCamera] = useState("Select Camera");

    return (
        <div className="DropdownWithSearch w-full my-auto p-4">
            <div
                className="SelectBtn border border-black h-14 p-4 flex items-center justify-between cursor-pointer"
                onClick={() => setIsOpen(!isOpen)}
            >
                <span>{selectedCamera}</span>
                {isOpen ? <MdKeyboardArrowUp /> : <MdKeyboardArrowDown />}
            </div>

            <div className={`Content mt-2 ${isOpen ? "" : "hidden"}`}>
                <div className="Search w-full relative border border-gray-500">
                    <MdOutlineSearch className="absolute text-2xl left-2 top-2" />
                    <input
                        type="text"
                        placeholder="Search"
                        className="bg-white h-10 w-full pl-10 outline-none"
                    />
                </div>

                <ul className="Options mt-2 overflow-y-auto max-h-40">
                    {cameras.map((camera) => {
                        return (
                            <li
                                className="bg-white p-2 hover:bg-slate-200 cursor-pointer text-left font-semibold"
                                onClick={() => {
                                    setSelectedCamera(camera.name);
                                    setIsOpen(false);
                                }}
                            >
                                {camera.name}
                            </li>
                        );
                    })}
                </ul>
            </div>
        </div>
    );
};

export default SearchModel;