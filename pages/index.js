import "bootstrap/dist/css/bootstrap.css";
import Head from "next/head";
import { Calendar } from "../components/Calendar/Calendar";

export default function Home() {
    return (
        <>
            <Head>
                <title>Calendar - SimplyOrganize</title>
                <meta name="viewport" content="width=device-width, initial-scale=1" />
            </Head>
            <main>
                <nav className="navbar bg-dark text-light navbar-expand">
                    <a className="navbar-brand m-3 text-light h1">SimplyOrganize</a>
                </nav>
                <Calendar />
            </main>
        </>
    );
}
