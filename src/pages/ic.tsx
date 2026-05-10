import NavBar2 from "~/components/navbar2";


import race_car_image from "../public/images/IC/ic_racecar_image.png"


function TopImage(){
    return(
        <>
            <div className="relative">
                <img src={race_car_image} alt="Cool race car" className="mt-8"/>
                <div className="absolute bottom-3 right-16 text-black" 
                style={{
                    fontFamily: "'Barlow Condensed', sans-serif",
                    fontWeight: 900,
                    fontSize: "clamp(2rem, 4vw, 4.8rem)",
                    transform: "scaleY(1.5)",
                    fontStyle: "italic",
                    letterSpacing: "-0.05em",
                }}>
                    Formula IC
                </div>
            </div>
        </>
    )
}

function WhoWeAre(){
    const whoWeAreText = "Terps Racing Formula Internal Combustion is the University of Maryland’s Formula SAE team. Since 1983, we’ve provided hands-on project-based engineering experiences for students. We are always looking to use our prior innovations and experience to further enhance our projects to continue to excel on the elite level."

    return(
        <div className="bg-black px-[80px] pt-10">
            <h2
            id="about-title"
            className="uppercase text-white mb-6 leading-[1.2] tracking-[-0.02em]"
            style={{
                fontFamily: "'Barlow Condensed', sans-serif",
                fontWeight: 700,
                fontSize: "clamp(2rem, 3.5vw, 2.8rem)",
            }}
            >
            Who We Are
            </h2>
            <p
            className="text-white leading-[1.6] mb-8"
            style={{
                fontFamily: "'Roboto Condensed', sans-serif",
                fontWeight: 100,
                fontSize: "clamp(1.5rem, 3vw, 2.3rem)",
            }}
            >{whoWeAreText}</p>
        </div>
            
    )
}

function RaceSchedule() {
  const sections = [
    {
      title: "Pre-Comp Preparation",
      caption: "Downforce-optimized body panels and front/rear wings tuned for autocross and endurance events.",
    },
    {
      title: "Suspension",
      caption: "Double wishbone setup with custom-tuned dampers for precise handling across competition surfaces.",
    },
    {
      title: "Powertrain",
      caption: "600cc inline-four engine with custom intake restrictor, delivering optimized power through a sequential gearbox.",
    },
  ];

  const headingStyle: React.CSSProperties = {
    fontFamily: "'Barlow Condensed', sans-serif",
    fontWeight: 700,
    fontStyle: "italic",
    letterSpacing: "-0.03em",
    fontSize: "clamp(1rem, 2vw, 1.2rem)",
  };

  return (
    <div className="flex w-full min-h-96 border border-gray-200 rounded-xl overflow-hidden">
      {/* Left: Image */}
      <div className="flex-1 relative">
        <img
          src="/images/racecar.jpg"
          alt="Race car"
          className="w-full h-full object-cover"
        />
      </div>

      {/* Right: Content */}
      <div className="flex-1 flex flex-col gap-4 p-10 bg-white">
        <h2 style={{ ...headingStyle, fontSize: "clamp(1.3rem, 2.5vw, 1.7rem)" }}
          className="mb-2">
          Formula SAE
        </h2>

        {sections.map((section) => (
          <div key={section.title} className="border border-gray-200 rounded-lg p-4">
            <p style={headingStyle} className="mb-1">{section.title}</p>
            <p className="text-sm text-gray-500 leading-relaxed">{section.caption}</p>
          </div>
        ))}
      </div>
    </div>
  );
}

export default function IC(){
    return(
        <>
            <NavBar2 currentPage="IC"/>
            <TopImage/>
            <WhoWeAre/>
            <RaceSchedule/>

        </>
    )
}

