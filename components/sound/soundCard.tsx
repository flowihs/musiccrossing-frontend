import "./sound.css";
import Image from "next/image";
import ImageCard from "@/public/sound/poster.png"

interface props {
    name: string;
    author: string;
    image: string;
}

export function SoundCard({ name, author, image}: props) {
    return (
        <div className="SoundCard">
            <Image
                className="SoundCardImage"
                src={ImageCard}
                alt="Изображение музыки"
                width={180}
                height={180}
            />

            <div className="SoundCardContent">
                <p className="SoundName">{ name }</p>
                <p className="AuthorTitle">{ author }</p>
            </div>
        </div>
    )
}