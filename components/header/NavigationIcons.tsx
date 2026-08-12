
import { 
  House, Search, GalleryVerticalEnd 
} from 'lucide-react';


type IconProps = {
  className?: string;
};

export function HomeIcon({ className }: IconProps) {
  return (
    <House 
      className={className}
      width={27}
      height={24}
    />
  );
}

export function SearchNavIcon({ className }: IconProps) {
  return (
    <Search
      className={className}
      width={25}
      height={25}
    />
  );
}

export function LibraryIcon({ className }: IconProps) {
  return (
    <GalleryVerticalEnd
      className={className}
      width={35}
      height={35}
    />
  );
}
