import ComingSoon from "@/components/ComingSoon";
import SeoSchema from "@/components/SeoSchema";
import { HOST } from "@/constants";
import { createMetaData } from "@/seo-utils/CommonMeta";

const url = `${HOST}/about`;
const title = "About Suboor Khan | Learn More About Me";
const description =
  "Discover more about Suboor Khan, a skilled Web & Mobile Developer with over 4 years of experience. Learn about my background, expertise, and what drives my passion for technology. Explore my journey, achievements, and how I can help with your development needs.";
const keywords =
  "about, Suboor Khan, web developer, mobile developer, developer background, technology expert, web development, mobile app development, developer biography, software engineer, professional journey";

export const metadata = {
  ...createMetaData({ title, description, keywords, url }),
};

export default function About() {
  return (
    <>
      <SeoSchema
        title={title}
        description={description}
        url={url}
        keywords={keywords}
      />
      <ComingSoon />
    </>
  );
}
