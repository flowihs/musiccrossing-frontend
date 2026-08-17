"use client";

import { useEffect, useRef } from "react";

import styles from "./create-playlist-modal.module.css";
import { useCreatePlaylistDialogStore } from "../model/create-playlist-dialog.store";
import { useCreatePlaylist } from "../model/useCreatePlaylist";

export function CreatePlaylistModal() {
  const isOpen = useCreatePlaylistDialogStore((state) => state.isOpen);
  const closeDialog = useCreatePlaylistDialogStore((state) => state.close);
  const { createPlaylist, isLoading, error, clearError } =
    useCreatePlaylist();
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (!isOpen) {
      return;
    }

    inputRef.current?.focus();

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        closeDialog();
      }
    };

    document.addEventListener("keydown", handleKeyDown);
    return () => document.removeEventListener("keydown", handleKeyDown);
  }, [closeDialog, isOpen]);

  const handleClose = () => {
    clearError();
    closeDialog();
  };

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const form = event.currentTarget;
    const formData = new FormData(form);
    const name = String(formData.get("name") ?? "").trim();

    if (!name) {
      return;
    }

    try {
      await createPlaylist(name);
      form.reset();
      closeDialog();
    } catch {
      // useCreatePlaylist exposes the normalized request error below.
    }
  };

  if (!isOpen) {
    return null;
  }

  return (
    <div className={styles.modalOverlay} onMouseDown={handleClose}>
      <form
        className={styles.addPlaylistModal}
        aria-labelledby="create-playlist-title"
        aria-modal="true"
        role="dialog"
        onMouseDown={(event) => event.stopPropagation()}
        onSubmit={handleSubmit}
      >
        <div className={styles.addPlaylistModalHeader}>
          <h2
            id="create-playlist-title"
            className={styles.addPlaylistModalHeaderTitle}
          >
            Создать плейлист
          </h2>
          <button
            type="button"
            className={styles.addPlaylistModalCloseButton}
            aria-label="Закрыть"
            onClick={handleClose}
          >
            ✕
          </button>
        </div>

        <div className={styles.addPlaylistModalMain}>
          <label className={styles.addPlaylistModalMainInput}>
            <span>Название</span>
            <input
              ref={inputRef}
              name="name"
              type="text"
              placeholder="Введите название..."
              autoComplete="off"
              maxLength={100}
              required
            />
          </label>
        </div>

        {error && <p className={styles.errorMessage}>{error}</p>}

        <div className={styles.addPlaylistModalFooter}>
          <button
            type="submit"
            className={styles.addPlaylistModalFooterButton}
            disabled={isLoading}
          >
            {isLoading ? "Создание..." : "Создать"}
          </button>
        </div>
      </form>
    </div>
  );
}
