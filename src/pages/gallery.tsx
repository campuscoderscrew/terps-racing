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
import pro_0004 from "../public/images/gallery/car_process/pro_0004.png"
import pro_7 from "../public/images/gallery/car_process/pro_7.png"
import pro_88 from "../public/images/gallery/car_process/pro_88.png"
import pro_0183 from "../public/images/gallery/car_process/pro_0183.png"
import pro_0126 from "../public/images/gallery/car_process/pro_0126.png"
import pro_0249 from "../public/images/gallery/car_process/pro_0249.png"
import pro_0436 from "../public/images/gallery/car_process/pro_0436.png"
import pro_0538 from "../public/images/gallery/car_process/pro_0538.png"


//Highlights
import hl_9 from "../public/images/gallery/highlights/hl_9.png"
import hl_14 from "../public/images/gallery/highlights/hl_14.png"
import hl_15 from "../public/images/gallery/highlights/hl_15.png"
import hl_17 from "../public/images/gallery/highlights/hl_17.png"
import hl_139 from "../public/images/gallery/highlights/hl_139.png"
import hl_146 from "../public/images/gallery/highlights/hl_146.png"
import hl_316 from "../public/images/gallery/highlights/hl_316.png"
import hl_352 from "../public/images/gallery/highlights/hl_352.png"
import hl_1519 from "../public/images/gallery/highlights/hl_1519.png"


//Track
import track_3 from "../public/images/gallery/track/track_3.png"
import track_17 from "../public/images/gallery/track/track_17.png"
import track_0221 from "../public/images/gallery/track/track_0221.png"
import track_0244 from "../public/images/gallery/track/track_0244.png"
import track_0322 from "../public/images/gallery/track/track_0322.png"
import track_0323 from "../public/images/gallery/track/track_0323.png"
import track_0327 from "../public/images/gallery/track/track_0327.png"
import track_0330 from "../public/images/gallery/track/track_0330.png"
import track_0331 from "../public/images/gallery/track/track_0331.png"
import track_0334 from "../public/images/gallery/track/track_0334.png"
import track_0347 from "../public/images/gallery/track/track_0347.png"
import track_0355 from "../public/images/gallery/track/track_0355.png"
import track_0363 from "../public/images/gallery/track/track_0363.png"
import track_0368 from "../public/images/gallery/track/track_0368.png"
import track_0380 from "../public/images/gallery/track/track_0380.png"
import track_0382 from "../public/images/gallery/track/track_0382.png"
import track_0476 from "../public/images/gallery/track/track_0476.png"
import track_0498 from "../public/images/gallery/track/track_0498.png"
import track_0685 from "../public/images/gallery/track/track_0685.png"
import track_0725 from "../public/images/gallery/track/track_0725.png"
import track_0748 from "../public/images/gallery/track/track_0748.png"
import track_0764 from "../public/images/gallery/track/track_0764.png"
import track_0765 from "../public/images/gallery/track/track_0765.png"
import track_0780 from "../public/images/gallery/track/track_0780.png"
import track_0834 from "../public/images/gallery/track/track_0834.png"
import track_1998 from "../public/images/gallery/track/track_1998.png"
import track_2176 from "../public/images/gallery/track/track_2176.png"



//------------------------------------------------------------

const holder = ""

const GALLERY_TYPES = [
    { name: "The Team",           image: teamIcon,        area: holder,    size: "auto 170%", position: "35% 75%" },
    { name: "Highlights",         image: highlightsIcon,  area: holder,    size: "cover",    position: "center" },
    { name: "The Car + Process",  image: processIcon,     area: holder,    size: "cover",   position: "center" },
    { name: "The Track",          image: trackIcon,       area: holder,    size: "cover",   position: "center" },
]

const TEAM_GALLERY = [
    { image: team_464, col: "2 / span 10", row: 1, aspect: "15/7" },
    { image: team_391, col: "1 / span 7",  row: 2, aspect: "11/6" },
    { image: team_471, col: "9 / span 4",  row: 2, aspect: "3/2"  },
    { image: team_465, col: "1 / span 5",  row: 3, aspect: "8/5"  },
    { image: team_409, col: "7 / span 6",  row: 3, aspect: "5/3"  },
    { image: team_459, col: "1 / span 5",  row: 4, aspect: "8/5"  },
    { image: team_597, col: "7 / span 5",  row: 4, aspect: "3/2"  },
    { image: team_592, col: "1 / span 4",  row: 5, aspect: "3/2"  },
]

//Car + Process Grid
const PROCESS_GALLERY = [
    { image: pro_7,    col: "1 / span 12",  row: 1, aspect: "3/2" },
    { image: pro_0249, col: "17 / span 8",  row: 1, aspect: "8/7" },
    { image: pro_0436, col: "1 / span 5",   row: 2, aspect: "2/3" },
    { image: pro_0126, col: "6 / span 5",   row: 2, aspect: "2/3" },
    { image: pro_0004, col: "11 / span 5",  row: 2, aspect: "2/3" },
    { image: pro_0183, col: "17 / span 8",  row: 2, aspect: "7/5" },
    { image: pro_88,   col: "1 / span 9",   row: 3, aspect: "2/3" },
    { image: pro_0538, col: "17 / span 8",  row: 3, aspect: "7/5" },
]

//Track Grid
const TRACK_FEATURES = [
    { image: track_17,    col: "1 / span 12",  row: 1, aspect: "3/2" },
    { image: track_3,     col: "14 / span 8",  row: 1, aspect: "6/5" },
    { image: track_1998,  col: "1 / span 13",  row: 2, aspect: "3/2" },
    { image: track_2176,  col: "2 / span 11",  row: 3, aspect: "7/4" },
]

//The rest of the track pictures (repeating structure)
const TRACK_GRID = [
    track_0764, track_0834, track_0685, track_0780,
    track_0765, track_0748, track_0221, track_0725,
    track_0244, track_0327, track_0382, track_0380,
    track_0498, track_0363, track_0476, track_0347,
    track_0368, track_0330, track_0323, track_0322,
    track_0331, track_0334, track_0355,
]

//Highlight photos grid
const HIGHLIGHTS_GALLERY = [
    { image: hl_316,   col: "1 / span 24",  row: 1, aspect: "12/7" },
    { image: hl_352,   col: "1 / span 8",   row: 2, aspect: "4/3" },
    { image: hl_139,   col: "9 / span 8",   row: 2, aspect: "4/3" },
    { image: hl_15,    col: "17 / span 8",  row: 2, aspect: "4/3" },
    { image: hl_146,   col: "1 / span 7",   row: 3, aspect: "2/3" },
    { image: hl_14,    col: "9 / span 16",  row: 3, aspect: "3/2"},
    { image: hl_17,    col: "1 / span 8",   row: 4, aspect: "4/3" },
    { image: hl_1519,  col: "12 / span 11", row: 4, aspect: "11/5" },
    { image: hl_9,     col: "1 / span 6",   row: 5, aspect: "6/7" },
]


//Header
function Title() {
    return (
        <div className ="px-[clamp(20px,5vw,80px)] pt-24 pb-0">
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

//Organize Team Section
function TeamSection() {
    return (
        <div className="grid grid-cols-12 gap-2 items-start">
            {TEAM_GALLERY.map((item, i) => (
                <img
                    key={i}
                    src={item.image}
                    alt=""
                    className="w-full object-cover"
                    style={{
                        gridColumn: item.col,
                        gridRow: item.row,
                        aspectRatio: item.aspect,
                    }}
                />
            ))}
        </div>
    )
}

//Organize Car + Process Section
function ProcessSection() {
    return (
        <div
            className="grid gap-5 items-start"
            style={{ gridTemplateColumns: "repeat(24, minmax(0, 1fr))" }}
        >
            {PROCESS_GALLERY.map((item, i) => (
                <img
                    key={i}
                    src={item.image}
                    alt=""
                    className="w-full object-cover"
                    style={{
                        gridColumn: item.col,
                        gridRow: item.row,
                        aspectRatio: item.aspect,
                    }}
                />
            ))}
        </div>
    )
}

//For the track sections
function TrackSection() {
    return (
        <div>
            {/*Specific photos*/}
            <div
                className="grid gap-4 items-start"
                style={{ gridTemplateColumns: "repeat(24, minmax(0, 1fr))" }}
            >
                {TRACK_FEATURES.map((item, i) => (
                    <img
                        key={i}
                        src={item.image}
                        alt=""
                        className="w-full object-cover"
                        style={{
                            gridColumn: item.col,
                            gridRow: item.row,
                            aspectRatio: item.aspect,
                        }}
                    />
                ))}
            </div>

            {/*Grid photos*/}
            <div className="grid grid-cols-4 gap-1 mt-8">
                {TRACK_GRID.map((image, i) => (
                    <img
                        key={i}
                        src={image}
                        alt=""
                        className="w-full object-cover"
                        style={{ aspectRatio: "3/2" }}
                    />
                ))}
            </div>
        </div>
    )
}


function HighlightsSection() {
    return (
        <div
            className="grid gap-4 items-start"
            style={{ gridTemplateColumns: "repeat(24, minmax(0, 1fr))" }}
        >
            {HIGHLIGHTS_GALLERY.map((item, i) => (
                <img
                    key={i}
                    src={item.image}
                    alt=""
                    className={`w-full object-cover rounded-lg`}
                    style={{
                        gridColumn: item.col,
                        gridRow: item.row,
                        aspectRatio: item.aspect,
                    }}
                />
            ))}
        </div>
    )
}



//For the Gallery Sections
function GalleryOpt() {
    const [openGallery, setOpenGallery] = useState<string | null>(null);

    return (
        <div>
            <div className="flex flex-wrap px-[clamp(20px,5vw,80px)] pb-24 pt-10 gap-6">
            {/*Create Type Sections and Image for them*/}
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

            {/*Show Gallery Sections*/}
            {openGallery && (
                <div className = "px-[clamp(20px,5vw,80px)] pb-24 max-w-10xl mx-auto">
                    <h2 style={{
                        fontFamily: "'Barlow Condensed', sans-serif",
                        fontWeight: 600,
                        fontSize: "clamp(1.2rem, 4vw, 2rem)",
                        color: "white",
                        letterSpacing: "-0.03em",
                    }}>
                        {openGallery}
                    </h2>
                    <div className="w-full mt-4 bg-black shadow-xl p-6">
                        {openGallery === "The Team" && <TeamSection />}
                        {openGallery === "The Car + Process" && <ProcessSection />}
                        {openGallery === "The Track" && <TrackSection />}
                        {openGallery === "Highlights" && <HighlightsSection />}
                    </div>
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
