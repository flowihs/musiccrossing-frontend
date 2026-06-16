import {SoundCardList} from "@/components/sound/soundCardList";
import {MyLibrary} from "@/components/library/MyLibrary";

export default function Home() {
    return (
        <div className="MainPageContent">
            <MyLibrary title="Мои библиотеки"/>

            <SoundCardList
                title={"Title"}
            />

            <SoundCardList
                title={"Title"}
            />

            <SoundCardList
                title={"Title"}
            />

        </div>
    )
}
