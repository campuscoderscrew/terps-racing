import React from "react"

import NavBar from "~/components/navbar"
import logo from "../assets/images/TR_logo.png"
import driverPhoto from "../assets/images/home_page_driver_photo.png"


export default function Home() {
    return (
        <div className="relative">
            <div className="h-11"></div>
            <img src={driverPhoto} alt="Picture of a Terps Racing driver" className="top-50"/>
            <NavBar/>
            <img src={logo} alt="terps racing logo" className="absolute top-3/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-80 object-contain opacity-50"/>
        </div>
    )
}