interface LogoProps {
  width?: number;
  height?: number;
  strokeWidth?: number;
}

export default function Logo({
  width = 256,
  height = 160,
  strokeWidth = 15,
}: LogoProps) {
  return (
    <svg
      width={width}
      height={height}
      viewBox="0 0 256 155"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M3.99998 9.77087C51.2721 62.1901 55.8841 92.1675 3.99997 146.874"
        stroke="currentColor"
        strokeWidth={strokeWidth / 2}
        strokeLinecap="round"
      />
      <path
        d="M165.879 93.3186C158.481 111.171 159.552 125.096 173.377 145.804"
        stroke="currentColor"
        strokeWidth={strokeWidth}
        strokeLinecap="round"
      />
      <path
        d="M35.9702 9.77087C79.9578 62.9802 83.3535 92.9725 35.9702 146.874"
        stroke="currentColor"
        strokeWidth={strokeWidth}
        strokeLinecap="round"
      />
      <path
        d="M181.48 40.9453C192.762 67.5142 202.401 116.527 192.762 146.874"
        stroke="currentColor"
        strokeWidth={strokeWidth}
        strokeLinecap="round"
      />
      <path
        d="M231.137 57.578C225.781 69.3603 217.397 76.8953 199.188 88.6776"
        stroke="currentColor"
        strokeWidth={strokeWidth}
        strokeLinecap="round"
      />
      <path
        d="M198.117 91.9078C207.757 110.117 231.322 139.037 248.459 146.535"
        stroke="currentColor"
        strokeWidth={strokeWidth}
        strokeLinecap="round"
      />
      <path
        d="M37.0412 9.41474C112.02 0.845684 115.487 32.9338 68.1038 59.0425"
        stroke="currentColor"
        strokeWidth={strokeWidth}
        strokeLinecap="round"
      />
      <path
        d="M71.3171 66.5405C91.6682 62.3321 132.371 105.101 93.8109 146.874"
        stroke="currentColor"
        strokeWidth={strokeWidth}
        strokeLinecap="round"
      />
      <path
        d="M157.41 99.3891C119.92 96.1758 115.636 165.084 160.623 136.164"
        stroke="currentColor"
        strokeWidth={strokeWidth}
        strokeLinecap="round"
      />
    </svg>
  );
}
