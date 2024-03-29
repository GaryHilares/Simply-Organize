import Head from "next/head";
import { Calendar } from "../components/Calendar/Calendar";
import { NavBar } from "../components/NavBar";

export default function Home() {
    return (
        <>
            <Head>
                <title>Tasks - SimplyOrganize</title>
                <meta name="viewport" content="width=device-width, initial-scale=1" />
            </Head>
            <main>
                <NavBar />
                <Calendar />
            </main>
        </>
    );
}
