import { LibraryPreview } from "@/widgets/library-preview";

export const metadata = {
  title: "Моя библиотека | MusicShare",
};

export default function LibraryPage() {
  return <LibraryPreview title="Моя библиотека" limit={100} />;
}
