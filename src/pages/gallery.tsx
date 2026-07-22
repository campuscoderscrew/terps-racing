import NavBar from "../components/navbar"

import Header from "~/components/header";
import { header2_className, header2_style } from "~/siteInfo";
import Paragraph from "~/components/paragraph";

const holder = ""

const GALLERY_TYPES = [
    { name: "The Team",           image: holder,   area: holder},
    { name: "Highlights",         image: holder,   area: holder},
    { name: "The Car + Process",  image: holder,   area: holder},
    { name: "The Track",          image: holder,   area: holder},

]



//Header
function Title() {
    return (
        <div className ="px-24 pt-24 pb-0">
            <h2 style = {{
                fontFamily: "'Barlow Condensed', sans-serif",
                fontWeight: 550,
                fontSize: "clamp(0.9rem, 4vw, 1.4rem)",
                color: "white",
                letterSpacing: "-0.03em",
            }}>GALLERY</h2>
        </div>
    )
}

//For the Gallery Sections
function GalleryOpt() {
    return (
        <div className="flex flex-wrap p-24 pt-10 gap-6">
            
            {GALLERY_TYPES.map((type) => (
                <div key={type.name} className="w-44 h-56 shrink-0 bg-neutral-800 rounded-2xl shadow-xl flex items-center justify-center">
                    <span style = {{
                        fontFamily: "'Barlow Condensed', sans-serif",
                        fontWeight: 800,
                        fontSize: "clamp(0.9rem, 4vw, 1.4rem)",
                        color: "white",
                        textAlign: "center",
                        letterSpacing: "-0.02em",
                    }}> 
                        {type.name}
                    </span>
                </div>
            ))}
        </div>
        
    )


}


function Style() {
    //CSS styling
    return(
        <>
        
        <style>
            {`
            body {
                background-color: rgba(4, 3, 3, 0.99);
            }    
            `}

        </style>
        </>
    )
}

export default function Gallery() {
    return(
        <>
            <div className="bg-black">
                <Style />
                <NavBar />
                <Title />
                <GalleryOpt />
                
            </div>
        </>





    )
}  
