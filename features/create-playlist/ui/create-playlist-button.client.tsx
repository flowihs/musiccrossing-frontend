"use client";

import { Plus } from "lucide-react";

import { useCreatePlaylistDialogStore } from "../model/create-playlist-dialog.store";

interface CreatePlaylistButtonProps {
  className?: string;
  iconClassName?: string;
}

export function CreatePlaylistButton({
  className,
  iconClassName,
}: CreatePlaylistButtonProps) {
  const openDialog = useCreatePlaylistDialogStore((state) => state.open);

  return (
    <button
      type="button"
      className={className}
      aria-label="Создать плейлист"
      onClick={openDialog}
    >
      <Plus
        className={iconClassName}
        aria-hidden="true"
        size={18}
        strokeWidth={2.5}
      />
    </button>
  );
}
