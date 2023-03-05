import Head from "next/head";
import ThemeChanger from "../component/themeChanger";
import SearchModel from "../component/searchModel";
import PixelFormat from "../component/pixelFormat";
import RangeSlider from "../component/rangeSlider";
import ToggleButton from "../component/toggleButton";
import LineChart from "../component/chart";
import ADC from "../component/ADC";
import { useEffect, useState } from "react";

export default function Home() {
    //Data For Front end Display
    const [modelList, setModelList] = useState(["BFS-U3-32S4C", "BFS-U3-31S4C", "BFS-U3-27S5C"]);
    const [modelInfo, setModelInfo] = useState(null);
    const [pixelFormat, setPixelFormat] = useState([""] || null);
    const [ROI, setROI] = useState({ max: 1000, min: 6, step: 2, maxWidth: 1000 });
    const [adc, setAdc] = useState(["8 Bit", "10 Bit", "12 Bit"]);

    //data for backend query
    const [isISPOn, setIsISPOn] = useState(false);
    const [selectedADC, setSelectedADC] = useState("");
    const [selectedHeight, setSelectedHeight] = useState<number>(120);
    const [selectedModel, setSelectedModel] = useState("Select Camera");
    const [selectedPixelFormat, setSelectedPixelFormat] = useState("Select Pixel Format");

    const [fps, setFps] = useState("");
    const [error, setError] = useState("");
    const [loading, setLoading] = useState(false);

    //data needed for calculation which is the
    // model, pixelFormat, ISP, ROI Height, ADC

    useEffect(() => {
        const fetchModelList = async () => {
            const resp = await fetch("/api/getModelList");
            const json = await resp.json();
            setModelList(json);
        };
        fetchModelList();
    }, []);

    useEffect(() => {
        setLoading(true);

        const requestOptions = {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ cameraName: selectedModel }),
        };

        const fetchModel = async () => {
            const resp = await fetch("/api/cameraData", requestOptions);
            const cameraInfo = await resp.json();
            setModelInfo(cameraInfo);

            setPixelFormat(cameraInfo.listOfPixelFormat);
            setROI({
                min: cameraInfo.listOfHeight[0],
                max: cameraInfo.listOfHeight[cameraInfo.listOfHeight.length - 1],
                step: cameraInfo.listOfHeight[1] - cameraInfo.listOfHeight[0],
                maxWidth: Number(cameraInfo.maxWidth),
            });
            setAdc(cameraInfo.listOfAdc);
        };

        setLoading(false);
        // };
        fetchModel();
    }, [selectedModel]);

    useEffect(() => {
        setFps("");
        setError("");
    }, [selectedModel, isISPOn, selectedADC, selectedPixelFormat, selectedHeight]);

    const handleClick = async () => {
        const data = {
            cameraName: selectedModel,
            ISP: `${isISPOn ? "ON" : "OFF"}`,
            ADC: selectedADC,
            pixelFormat: selectedPixelFormat,
            Height: selectedHeight.toString(),
        };
        const requestOptions = {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(data),
        };
        try {
            const resp = await fetch("/api/getFPS", requestOptions);
            const fpsResp = await resp.json();
            setFps(fpsResp);
        } catch (err) {
            setError("Can not find matching result, please try again");
        }
    };

    return (
        <div className="flex flex-col bg-gray-100 dark:bg-[#04041B] min-h-screen  ">
            {/* Tab */}
            <Head>
                <title>Frame-Rate-Calculator</title>
                <meta
                    name="Teledyne Camera frame-rate calculator"
                    content="Help customers to figure out the FPS with specific ROI"
                />
                <link rel="icon" href="/teledyne_logo.png" />
            </Head>

            {/* Main Page Layout */}
            {/* Header */}
            <ThemeChanger />

            {/* Main */}
            <main className="flex flex-col md:flex-row gap-2 p-2 lg:gap-8 lg:p-4 ">
                <div className="md:w-3/12 w-full border min-h-full bg-[#F1F1FB] text-gray-800">
                    <SearchModel
                        modelList={modelList}
                        selectedModel={selectedModel}
                        setSelectedModel={setSelectedModel}
                    />
                    <PixelFormat
                        pixelFormat={pixelFormat}
                        selectedPixelFormat={selectedPixelFormat}
                        setSelectedPixelFormat={setSelectedPixelFormat}
                        isLoading={loading}
                    />
                    <ToggleButton isISPOn={isISPOn} setIsISPOn={setIsISPOn} />
                    <RangeSlider max={ROI.maxWidth.toString()} min="6" step="2" text="ROI Width" />
                    <RangeSlider
                        max={ROI.max?.toString()}
                        min={ROI.min?.toString()}
                        step={ROI.step?.toString()}
                        text="ROI Height"
                        selectedHeight={selectedHeight}
                        setSelectedHeight={setSelectedHeight}
                    />
                    <ADC adc={adc} selectedADC={selectedADC} setSelectedADC={setSelectedADC} />
                    <p className="px-4 text-2xl">Your Max FPS:</p>
                    {/* Button */}
                    <div
                        className={`p-4 ${
                            selectedADC && selectedHeight && selectedModel && selectedPixelFormat
                                ? "cursor-pointer"
                                : "pointer-events-none"
                        }`}
                        onClick={handleClick}
                    >
                        <div
                            className={`w-full p-4 ${
                                selectedADC &&
                                selectedHeight &&
                                selectedModel &&
                                selectedPixelFormat
                                    ? "bg-blue-500 hover:bg-blue-600"
                                    : "bg-gray-700"
                            }  my-auto flex justify-center `}
                        >
                            <div className="flex items-baseline">
                                <div className="text-5xl mr-4">
                                    {fps ? (
                                        <p>
                                            {fps} <span className="text-2xl">FPS</span>
                                        </p>
                                    ) : (
                                        "Calculate"
                                    )}{" "}
                                </div>
                            </div>
                        </div>
                    </div>
                    {error && (
                        <p className="w-full text-center my-2 text-red-500 font-semibold animate-pulse">
                            {error}
                        </p>
                    )}
                </div>

                <div className="md:w-9/12 w-full border min-h-full">
                    <LineChart
                        selectedModel={selectedModel}
                        isISPOn={isISPOn}
                        selectedADC={selectedADC}
                        selectedPixelFormat={selectedPixelFormat}
                    />
                </div>
            </main>
        </div>
    );
}
