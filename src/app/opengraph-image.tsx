import { ImageResponse } from "next/og";

export const alt = "Meadowlark Home Care — Quality home care in Missoula";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default function OpenGraphImage() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          background: "#0F4A5C",
          padding: 72,
          color: "#FFFFFF",
        }}
      >
        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: 16,
            fontSize: 28,
            letterSpacing: 2,
            textTransform: "uppercase",
            color: "#F4A261",
          }}
        >
          Meadowlark Home Care
        </div>
        <div style={{ display: "flex", flexDirection: "column", gap: 18 }}>
          <div
            style={{
              fontSize: 72,
              lineHeight: 1.05,
              fontWeight: 600,
              maxWidth: 900,
            }}
          >
            Quality home care in Missoula.
          </div>
          <div style={{ fontSize: 28, color: "#D7E6EA", maxWidth: 760 }}>
            Compassion and innovation for members and caregivers since 2015.
          </div>
        </div>
        <div style={{ fontSize: 22, color: "#F4A261" }}>
          800 Kensington Ave. Ste. LL3 · (406) 926-3447
        </div>
      </div>
    ),
    size
  );
}
