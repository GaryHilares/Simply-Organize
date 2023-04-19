import Link from "next/link";
import "bootstrap/dist/css/bootstrap.css";

function NavBar() {
    return (<nav className="navbar navbar-dark bg-dark text-light navbar-expand">
        <span className="navbar-brand m-3 text-light h1">SimplyOrganize</span>
        <div className="collapse navbar-collapse">
            <ul className="navbar-nav">
                <li className="nav-item"><Link href="/" className="nav-link">Tasks</Link></li>
                <li className="nav-item"><Link href="/habits" className="nav-link">Habits</Link></li>
            </ul>
        </div>
    </nav>
    );
}

export { NavBar };