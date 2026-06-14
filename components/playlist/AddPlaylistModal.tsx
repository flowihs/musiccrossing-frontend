"use client"

import "./playlist.css";
import {usePlaylistStore} from "@/store/playlistStore";
import {useModalStore} from "@/store/modalStore";

interface inputsDataInterface {
    title: string;
    placeholder: string;
    type: string;
}

export function AddPlaylistModal() {
    const { createPlaylist } = usePlaylistStore();
    const isOpen: boolean = useModalStore((state) => state.isAddPlaylistModalOpen);
    const closeAddPlaylistModal: () => void = useModalStore((state) => state.closeAddPlaylistModal);

    const inputsData: inputsDataInterface[] = [
        {
            title: "Name",
            placeholder: "Введите текст...",
            type: "text"
        }
    ];

    const handleSubmit = async (event: React.FormEvent<HTMLFormElement>): Promise<void> => {
        event.preventDefault();

        const formData = new FormData(event.currentTarget);
        const name = formData.get("Name") as string;

        if (name) {
            try {
                await createPlaylist(name);
                closeAddPlaylistModal();
            } catch (error) {
                console.error(error);
            }
        }
    }

    if (isOpen) {
        return (
            <form onSubmit={handleSubmit} className="addPlaylistModal">
                <div className="addPlaylistModalHeader">
                    <p className="addPlaylistModalHeaderTitle">Создать плейлист</p>
                </div>
                <div className="addPlaylistModalMain">
                    <div className="addPlaylistModalMainInputsContainer">
                        {
                            inputsData.map((item, index) => {
                                return (
                                    <div
                                        key={index}
                                        className="addPlaylistModalMainInput"
                                    >
                                        <p>{item.title}</p>
                                        <input
                                            key={item.title}
                                            name={item.title}
                                            type={item.type}
                                            placeholder={item.placeholder}
                                        ></input>
                                    </div>
                                )
                            })
                        }

                    </div>
                </div>

                <div className="addPlaylistModalFooter">
                    <button
                        type="submit"
                        className="addPlaylistModalFooterButton"
                    >
                        Создать
                    </button>
                </div>
            </form>
        )
    }
}
