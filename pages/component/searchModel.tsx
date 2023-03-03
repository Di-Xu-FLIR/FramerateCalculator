import { useState } from "react";
import { MdKeyboardArrowDown, MdKeyboardArrowUp, MdOutlineSearch } from "react-icons/md";

const cameras = [
    { id: 1, name: "BFS-U3-27S5C" },
    { id: 2, name: "BFS-U3-32S4C" },
    { id: 3, name: "BFS-U3-50S5C" },
    { id: 4, name: "LD-5" },
];

type Camera = { id: number; name: string };
type SearchModelProps = {
    modelList: string[];
    selectedModel: string;
    setSelectedModel: (camera: string) => void;
};
const SearchModel = ({ modelList, selectedModel, setSelectedModel }: SearchModelProps) => {
    const [isOpen, setIsOpen] = useState(false);
    const [query, setQuery] = useState("");
    // const [selectedCamera, setSelectedCamera] = useState("Select Camera");

    const filterModel = (query: string, arr: string[]) => {
        if (!query || query.length < 2) return arr;
        return arr.filter((camera) => camera.includes(query.toUpperCase()));
    };

    return (
        <div className="DropdownWithSearch w-full my-auto p-4">
            <div
                className="SelectBtn border border-black h-14 p-4 flex items-center justify-between cursor-pointer"
                onClick={() => setIsOpen(!isOpen)}
            >
                <span>{selectedModel}</span>
                {isOpen ? <MdKeyboardArrowUp /> : <MdKeyboardArrowDown />}
            </div>

            <div className={`Content mt-2 ${isOpen ? "" : "hidden"}`}>
                <div className="Search w-full relative border border-gray-500">
                    <MdOutlineSearch className="absolute text-2xl left-2 top-2" />
                    <input
                        type="text"
                        placeholder="Search"
                        className="bg-white h-10 w-full pl-10 outline-none"
                        value={query}
                        onChange={(e) => setQuery(e.target.value)}
                    />
                </div>

                <ul className="Options mt-2 overflow-y-auto max-h-40">
                    {filterModel(query, modelList).map((camera) => {
                        return (
                            <li
                                key={camera}
                                className="bg-white p-2 hover:bg-slate-200 cursor-pointer text-left font-semibold"
                                onClick={() => {
                                    setSelectedModel(camera);
                                    setIsOpen(false);
                                }}
                            >
                                {camera}
                            </li>
                        );
                    })}
                </ul>
            </div>
        </div>
    );
};

export default SearchModel;
