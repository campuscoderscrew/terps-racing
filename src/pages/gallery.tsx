//Imports
import { useState } from "react";
import NavBar from "../components/navbar";

import Header from "~/components/header";
import { header2_className, header2_style } from "~/siteInfo";
import Paragraph from "~/components/paragraph";

//Photos ---------------------------------------------------

//Gallery Icons
import teamIcon from "../public/images/gallery/gallery_icons/team_icon.png"
import highlightsIcon from "../public/images/gallery/gallery_icons/highlights.png"
import processIcon from "../public/images/gallery/gallery_icons/process.png"
import trackIcon from "../public/images/gallery/gallery_icons/track.png"


//The Team
import team_391 from "../public/images/gallery/team/team_391.png"
import team_409 from "../public/images/gallery/team/team_409.png"
import team_464 from "../public/images/gallery/team/team_464.png"
import team_465 from "../public/images/gallery/team/team_465.png"
import team_471 from "../public/images/gallery/team/team_471.png"
import team_459 from "../public/images/gallery/team/team_459.png"
import team_592 from "../public/images/gallery/team/team_592.png"
import team_597 from "../public/images/gallery/team/team_597.png"

//Car + Process



//Highlights


//Track

//------------------------------------------------------------

const holder = ""

const GALLERY_TYPES = [
    { name: "The Team",           image: teamIcon,        area: holder, size: "auto 170%", position: "35% 75%"},
    { name: "Highlights",         image: highlightsIcon,  area: holder, size: "cover", position: "center"},
    { name: "The Car + Process",  image: processIcon,     area: holder, size: "cover", position: "center"},
    { name: "The Track",          image: trackIcon,       area: holder, size: "cover", position: "center"},

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
    const [openGallery, setOpenGallery] = useState<string | null>(null);

    return (
        <div>
            <div className="flex flex-wrap p-24 pt-10 gap-6">
            
            {GALLERY_TYPES.map((type) => (
                <div key={type.name} className="w-52 h-64 shrink-0 relative bg-neutral-800 rounded-2xl shadow-xl flex items-center justify-center"
                    style = {{
                        backgroundImage: `url(${type.image})`,
                        backgroundSize: type.size,
                        backgroundPosition: type.position,
                    }}>
                    <div className="absolute inset-0 bg-black/20" />
                    
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
                    <button onClick={() => setOpenGallery(type.name)}
                        className="absolute bottom-[16.667%] rounded-2xl left-1/2 -translate-x-1/2 bg-black text-white text-[0.65rem] border border-white rounded px-2.5 py-1 whitespace-nowrap"
                        style = {{
                            fontFamily: "'Barlow Condensed', sans-serif",
                            textAlign: "center",
                        }}>
                        View Gallery
                    </button>
                </div>
            ))}
            </div>
            
            {openGallery && (
                <div className = "px-24 pb-24 max-w-4xl mx-auto">
                    <h2 style={{
                        fontFamily: "'Barlow Condensed', sans-serif",
                        fontWeight: 600,
                        fontSize: "clamp(1.2rem, 4vw, 2rem)",
                        color: "white",
                        letterSpacing: "-0.03em",
                    }}>
                        {openGallery}
                    </h2>
                    <div className="w-full max-w-4xl h-96 mx-auto mt-4 bg-neutral-800 rounded-2xl shadow-xl"/>
                </div>
            )}
        </div>
        
    )


}


function Style() {
    //CSS styling
    return( 
        <style>
            {`
            body {
                background-color: rgba(4, 3, 3, 0.99);
            }    
            `}

        </style>
        
    )
}

export default function Gallery() {
    return(
         <div className="bg-black">
            <Style />
            <NavBar />
            <Title />
            <GalleryOpt />
                
        </div>
    )
}  
