import {Jersey_10, Plus_Jakarta_Sans} from "next/font/google";
import "./globals.css";
import nav_logo from "../public/assets/nav_logo.png";


const plusJakarta = Plus_Jakarta_Sans({
    subsets: ["latin"],
    weight: ["200", "300", "400", "500", "600", "700", "800"],
});

const jersey = Jersey_10({
    weight: "400",
    subsets: ["latin"],
    variable: "--font-jersey",
});

export const metadata = {
  title: "ACM VIT",
  description: "In Progress...",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body
          className={plusJakarta.className}
      >
        {children}
      </body>
    </html>
  );
}
