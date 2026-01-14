import { NavLink } from "react-router-dom";

const linkStyle = ({ isActive }) => ({
  textDecoration: "none",
  padding: "8px 12px",
  borderRadius: 8,
  color: "#111",
  backgroundColor: isActive ? "#eaeaea" : "transparent",
});

export default function Header() {
  return (
    <header style={{ borderBottom: "1px solid #eee" }}>
      <div
        style={{
          maxWidth: 1000,
          margin: "0 auto",
          padding: "12px 16px",
          display: "flex",
          gap: 12,
          alignItems: "center",
        }}
      >
        <div style={{ fontWeight: 800 }}>🍲 Leifs uppskriftir</div>

        <nav style={{ display: "flex", gap: 8 }}>
          <NavLink to="/" style={linkStyle}>
            Home
          </NavLink>
          <NavLink to="/recipes" style={linkStyle}>
            Recipes
          </NavLink>
        </nav>
      </div>
    </header>
  );
}
