import { p_className, p_style } from "~/siteInfo"

export default function Paragraph({text}: {text:string}) {
    return(
        <>
        <p
            className={p_className}
            style   ={p_style}
        >
            {text}
        </p>
        </>
    )
}