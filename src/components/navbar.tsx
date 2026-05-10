import { Link } from "react-router-dom"
import logo from "../public/TR_logo.png"

export default function NavBar(){
    return(
        <nav className="absolute bg-black text-white pl-0 pr-6 py-4 z-10 top-0 left-0 w-full font-mono p-0">
            <div className="flex items-center justify-between">
                <div className="text-xl font-bold">
                    <img src={logo} alt="Terps Racing Logo" className="h-14 w-auto object-contain"/>
                </div>

                <div className="flex space-x-6 items-center">
                    <Link to="/about">Home</Link>
                    <Link to="/committees">Formula</Link>
                    <Link to="/committees">IC</Link>
                    <Link to="/committees">EV</Link>
                    <Link to="/committees">Baja</Link>

                    <div className="flex space-x-2 pl-12">
                        <Link to="/your-page">
                            <button className="rounded-xl px-2 py-3 bg-yellow-300 text-black hover:bg-yellow-200 transition-colors duration-200 w-36">
                                New Members
                            </button>
                        </Link>

                        <Link to="/your-page">
                            <button className="rounded-xl px-2 py-3 bg-red-600 text-white hover:bg-red-500 transition-colors duration-200 w-36">
                                Sponsors
                            </button>
                        </Link>
                    </div>
                </div>

            </div>
            </nav>

    )
}