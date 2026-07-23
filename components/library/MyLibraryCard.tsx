import ImageS from "@/public/rectangle.png";
import Image from "next/image";
import "./library.css";

interface props {
    title: string;
    href: string;
}

export function MyLibraryCard({ title, href }: props) {
    return (
        <a className="LibraryLink" href={href}>
            <div className="MyLibraryCard">
                <Image
                    alt={title}
                    src={ImageS}
                    className="MyLibraryCardImage"
                />
                <p className="MyLibraryCardTitle">{ title }</p>
            </div>
        </a>
    )
}