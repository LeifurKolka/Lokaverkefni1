import { NavLink } from "react-router-dom";

const linkStyle = ({ isActive }) => ({
  textDecoration: "none",
  padding: "8px 12px",
  borderRadius: 8,
  color: isActive ? "#fff" : "var(--color-primary)",
  background: isActive ? "var(--color-primary)" : "transparent",
});


export default function Header() {
  return (
    <header style={{ borderBottom: "1px solid var(--color-border)", background: "#fff" }}>
      <div
        style={{
          width: "100%",
          padding: "12px 24px",
          display: "flex",
          gap: 16,
          alignItems: "center",
        }}
      >
        <div style={{ fontWeight: 800, color: "var(--color-primary)" }}>🍽️ Leifs uppskriftir</div>

        <nav style={{ display: "flex", gap: 8 }}>
          <NavLink to="/" style={linkStyle}>
            Heim
          </NavLink>
          <NavLink to="/recipes" style={linkStyle}>
            Uppskriftir
          </NavLink>
        </nav>
      </div>
    </header>
  );
}
