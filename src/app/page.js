import SeoSchema from "@/components/SeoSchema";
import HomePage from "@/components/Home";
import { HOST } from "@/constants";
import { createMetaData } from "@/seo-utils/CommonMeta";

const url = `${HOST}`;
const title = "Creative Web & Mobile Developer | Portfolio of Suboor Khan";
const description =
  "Explore the portfolio of Suboor Khan, a skilled Web & Mobile Developer with over 4 years of experience in delivering impactful web solutions. Specializing in fullstack development, I design, develop, and test web applications across various industries. Discover my projects and skills in modern web technologies.";
const keywords =
  "web developer, mobile developer, fullstack developer, web development portfolio, mobile app development, web solutions, fullstack web engineer, software development, front-end developer, back-end developer, technology expert, software engineer, web application design, coding professional, Suboor Khan";

export const metadata = {
  ...createMetaData({ title, description, keywords, url }),
};

export default function Home() {
  return (
    <>
      <SeoSchema
        title={title}
        description={description}
        url={url}
        keywords={keywords}
      />
      <HomePage />
    </>
  );
}
