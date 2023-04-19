import Head from "next/head";
import { NavBar } from "../components/NavBar";
import { HabitsMenu } from "../components/Habits/Habits";

export default function () {
    return (
        <>
            <Head>
                <title>Habits - SimplyOrganize</title>
                <meta name="viewport" content="width=device-width, initial-scale=1" />
            </Head>
            <main>
                <NavBar />
                <HabitsMenu />
            </main>
        </>
    );
}

