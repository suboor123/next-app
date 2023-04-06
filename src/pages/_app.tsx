import Navbar from "@/components/navbar";
import MobileNavbar from "@/components/navbar/mobile-navbar";
import "@/styles/globals.css";
import type { AppProps } from "next/app";

export default function App({ Component, pageProps }: AppProps) {
  return (
    <div id="main-content">
      <MobileNavbar />
      <div className="hide-menu" />
      <div className="container">
        <div className="row">
          <Navbar />
          <div className="col-md-9 col-md-offset-3">
            <div className="posts">
              <Component {...pageProps} />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
