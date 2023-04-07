import Header from "@/components/header";
import Navbar from "@/components/navbar";
import MobileNavbar from "@/components/navbar/mobile-navbar";
import { FirebaseHelper } from "@/lib/firebase-helpers";
import "@/styles/globals.css";
import type { AppProps } from "next/app";
import { Inter } from "next/font/google";
const inter = Inter({ subsets: ["latin"] });

export default function App({ Component, pageProps }: AppProps) {
  return (
    <>
      <style jsx global>{`
        html {
          font-family: ${inter.style.fontFamily};
        }
        .main-menu,
        .post-author,
        .read-more a {
          font-family: ${inter.style.fontFamily};
        }
      `}</style>
      <Header />
      <div id="main-content">
        <MobileNavbar />
        <div className="hide-menu" />
        <div className="container">
          <div className="row">
            <div className="col-md-9">
              <div className="posts">
                <Component {...pageProps} />
              </div>
            </div>
            <Navbar profile={pageProps.profile} skills={pageProps.skills} />
          </div>
        </div>
      </div>
    </>
  );
}

App.getInitialProps = async () => {
  const profile = await FirebaseHelper.syncMyProfile();
  const skills = await FirebaseHelper.syncAllTags();
  let pageProps: any = {};
  pageProps["skills"] = skills;
  pageProps["profile"] = profile;

  return { pageProps };
};
