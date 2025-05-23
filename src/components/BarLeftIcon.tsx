interface BarLeftIconProps {
  width?: number;
  height?: number;
  strokeWidth?: number;
}

export default function BarLeftIcon({
  width = 64,
  height = 64,
  strokeWidth = 5,
}: BarLeftIconProps) {
  return (
    <svg
      width={width}
      height={height}
      viewBox="0 0 64 64"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M24.0001 53.3334V10.6667M24.0001 53.3334H44.8083C47.7894 53.3334 49.2801 53.3334 50.4198 52.7526C51.4233 52.2413 52.2414 51.4233 52.7527 50.4197C53.3334 49.28 53.3334 47.7893 53.3334 44.8082V19.1918C53.3334 16.2107 53.3334 14.7179 52.7527 13.5781C52.2414 12.5746 51.4233 11.7593 50.4198 11.248C49.2789 10.6667 47.7875 10.6667 44.8006 10.6667H24.0001M24.0001 53.3334H19.1919C16.2108 53.3334 14.718 53.3334 13.5782 52.7526C12.5747 52.2413 11.7594 51.4233 11.248 50.4197C10.6667 49.2789 10.6667 47.7875 10.6667 44.8005V19.2005C10.6667 16.2136 10.6667 14.719 11.248 13.5781C11.7594 12.5746 12.5747 11.7593 13.5782 11.248C14.7191 10.6667 16.2137 10.6667 19.2006 10.6667H24.0001"
        stroke="currentColor"
        strokeWidth={strokeWidth}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}
