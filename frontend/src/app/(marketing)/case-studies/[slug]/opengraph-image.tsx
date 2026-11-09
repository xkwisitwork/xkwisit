import { ImageResponse } from "next/og";

export const runtime = "edge";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default function Image() {
  return new ImageResponse(
    <div
      style={{
        width: "100%",
        height: "100%",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        background: "#3B05C4",
        color: "white",
        fontSize: 64,
        fontWeight: 700,
      }}
    >
      Xkwisit Case Study
    </div>,
    { ...size },
  );
}
