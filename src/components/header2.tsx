import { header2_className, header2_style } from "~/siteInfo";

interface Header2{
    id?: string, 
    text:string
}

export default function Header2(props: Header2){
    return(
        <>
            <h2
                id={props.id}
                className={header2_className}
                style={header2_style}
              >
                {props.text}
              </h2>
        </>
    )
}