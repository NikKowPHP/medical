interface SaferSolutionsSvgProps {
  className: string;
}

export default function SaferSolutionsSvg({
  className,
}: SaferSolutionsSvgProps) {
  return (
    <div className="flex items-center justify-center">
      <svg
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 256 256"
        focusable="false"
        color="var(--token-f8a13159-30de-4787-9663-bcd286f368d1, rgb(248, 241, 231))"
        style={{
          userSelect: "none",
          display: "inline-block",
          fill: "var(--token-f8a13159-30de-4787-9663-bcd286f368d1, rgb(248, 241, 231))",
          color:
            "var(--token-f8a13159-30de-4787-9663-bcd286f368d1, rgb(248, 241, 231))",
          flexShrink: "0",
        }}
        className={className}
      >
        <g color="var(--token-f8a13159-30de-4787-9663-bcd286f368d1, rgb(248, 241, 231))">
          <path d="M134.08,154.79a8,8,0,0,0-12.15,0l-48,56A8,8,0,0,0,80,224h96a8,8,0,0,0,6.07-13.21ZM97.39,208,128,172.29,158.61,208ZM232,64V176a24,24,0,0,1-24,24h-8a8,8,0,0,1,0-16h8a8,8,0,0,0,8-8V64a8,8,0,0,0-8-8H48a8,8,0,0,0-8,8V176a8,8,0,0,0,8,8h8a8,8,0,0,1,0,16H48a24,24,0,0,1-24-24V64A24,24,0,0,1,48,40H208A24,24,0,0,1,232,64Z" />
        </g>
      </svg>
    </div>
  );
}
