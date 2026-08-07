import "./sound.css";
import Image from "next/image";
import ImageCard from "@/public/sound/poster.png";
import start from "@/public/polygon.svg";

interface props {
  name: string;
  author: string;
  image: string;
}

export function SoundCard({ name, author, image }: props) {
  return (
    <div className="SoundCard">
      <div className="ImageContainer">
        <Image
          className="SoundCardImage"
          src={ImageCard}
          alt="Изображение музыки"
          width={180}
          height={180}
          draggable={false}
        />
        <div className="StartMusicButton">
          <Image src={start} alt="Начать воспроизведение" draggable={false} />
        </div>
      </div>

      <div className="SoundCardContent">
        <p className="SoundName">{name}</p>
        <p className="AuthorTitle">{author}</p>
      </div>
    </div>
  );
}
