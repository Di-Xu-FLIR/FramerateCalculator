import Head from "next/head";
import Image from "next/image";
import styles from "../styles/Home.module.css";

export default function Home() {
    return (
        <div className={styles.container}>
            <Head>
                <title>Frame-Rate-Calculator</title>
                <meta
                    name="Teledyne Camera frame-rate calculator"
                    content="Help customers to figure out the FPS with specific ROI"
                />
                <link rel="icon" href="/teledyne_logo.png" />
            </Head>
        </div>
    );
}
