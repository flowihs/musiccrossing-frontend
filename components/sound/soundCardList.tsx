import "./sound.css";
import {SoundCard} from "@/components/sound/soundCard";

interface props {
    title: string;
}

export function SoundCardList({title}: props) {
    const musics = [
        {
            name: "stringf",
            author: "stringfdsfdsfds",
            image: "string"
        },
        {
            name: "stringf",
            author: "stringfdsfdsfds",
            image: "string"
        },
        {
            name: "stringf",
            author: "stringfdsfdsfds",
            image: "string"
        }
    ]

    return (
        <div className="SoundCardList">
            <p className="SoundCardListTitle">{title}</p>

            <div className="SoundCardListContainer">
                {
                    musics.map((sound) => (
                        <SoundCard
                            key={sound.name}
                            name={sound.name}
                            author={sound.author}
                            image={sound.image}
                        />
                    ))
                }
            </div>

        </div>
    )
}