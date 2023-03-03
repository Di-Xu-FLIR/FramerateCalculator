import Head from "next/head";
import ThemeChanger from "./component/themeChanger";
import SearchModel from "./component/searchModel";
import PixelFormat from "./component/pixelFormat";
import RangeSlider from "./component/rangeSlider";
import ToggleButton from "./component/toggleButton";
import LineChart from "./component/chart";
import ADC from "./component/ADC";
import { getListOfAvailableModels } from "./lib/getData";

export default function Home({ data }) {
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
            <main className="flex flex-col md:flex-row gap-2 p-2 lg:gap-8 lg:p-8 ">
                <div className="md:w-3/12 w-full border min-h-full bg-[#F1F1FB] text-gray-800">
                    <SearchModel data={data} />
                    <PixelFormat />
                    <ADC />
                    <RangeSlider max="2000" min="400" step="10" text="ROI Width" />
                    <RangeSlider max="2000" min="400" step="10" text="ROI Height" />
                    <ToggleButton />
                    <p className="px-4 text-2xl">Your Max FPS:</p>
                    <div className="p-4 ">
                        <div className="w-full p-4 bg-blue-500 my-auto flex justify-center">
                            <div className="flex items-baseline">
                                <p className="text-5xl mr-4">264</p>
                                <p>FPS</p>
                            </div>
                        </div>
                    </div>
                </div>

                <div className="md:w-9/12 w-full border min-h-full">
                    <LineChart />
                </div>
            </main>
        </div>
    );
}

export async function getServerSideProps() {
    console.log("getServerSideProps called");
    const data = await getListOfAvailableModels();

    const serializedData = JSON.parse(JSON.stringify(data));
    return {
        props: {
            data: serializedData,
        },
    };
}
