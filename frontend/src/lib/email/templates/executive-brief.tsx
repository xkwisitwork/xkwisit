export function ExecutiveBriefEmail(props: { preview?: string; body?: string }) {
  return (
    <div style={{ fontFamily: "sans-serif", padding: 24, color: "#111" }}>
      <h1 style={{ color: "#3B05C4" }}>Xkwisit</h1>
      <p>{props.body ?? props.preview ?? "Notification from Xkwisit."}</p>
    </div>
  );
}
