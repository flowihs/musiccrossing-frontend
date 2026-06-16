import {MyLibraryCard} from "@/components/library/MyLibraryCard";
import "./library.css";

interface props {
    title: string;
}

export function MyLibrary({ title }: props) {
    return (
        <div className="MyLibrary">
            <p className="MyLibraryTitle">{ title }</p>
            <div className="MyLibraryContainer">
                <MyLibraryCard title={"Sport music"} href={"sport"} />
                <MyLibraryCard title={"My Music"} href={"sport"} />
                <MyLibraryCard title={"Sport music"} href={"sport"} />
                <MyLibraryCard title={"My Music"} href={"sport"} />
            </div>
        </div>
    )
}