import { Outlet } from "react-router-dom";
import Header from "./Header";
import Footer from "./Footer";


export default function Layout() {
    return (
        <div style={{ minHeight: "100vh", display: "flex", flexDirection: "column" }}>
            <Header />
            <main style={{ flex: 1, maxWidth: 1000, margin: "0 auto", padding: "16px" }}>
                <Outlet />
            </main>
            <Footer />
        </div>
    );
}