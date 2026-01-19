import { Outlet } from "react-router-dom";
import Header from "./Header";
import Footer from "./Footer";


export default function Layout() {
    return (
        <div style={{ minHeight: "100vh", display: "flex", flexDirection: "column" }}>
            <Header />
            <main style={{ flex: 1, width: "100%", padding: "16px" }}>
                <Outlet />
            </main>
            <Footer />
        </div>
    );
}