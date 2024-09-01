import "./globals.css";
import Header from "@/components/Header";
import BottomNav from "@/components/BottomNav";

const title = "Creative Web & Mobile Developer | Portfolio of Suboor Khan";
const description =
  "Explore the portfolio of Suboor Khan, a skilled Web & Mobile Developer with over 4 years of experience in delivering impactful web solutions. Specializing in fullstack development, I design, develop, and test web applications across various industries. Discover my projects and skills in modern web technologies.";

export const metadata = {
  title,
  description
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className="font-base bg-white">
        <Header />
        <main className="pb-20 md:pb-0">{children}</main>
        <BottomNav />
      </body>
    </html>
  );
}
