import LiveSessionPage from "@/components/LiveSessionPage";
import SeoSchema from "@/components/SeoSchema";
import { HOST } from "@/constants";
import { createMetaData } from "@/seo-utils/CommonMeta";

const url = `${HOST}/live-sessions`;
const title = "Live Sessions & Webinars | Suboor Khan";
const description =
  "Join Suboor Khan for live sessions and webinars on web and mobile development. Explore a range of topics including coding tutorials, industry trends, and interactive Q&A sessions. Stay ahead with practical insights and live discussions directly from a tech expert.";
const keywords =
  "live sessions, webinars, coding tutorials, web development webinars, mobile development live sessions, tech webinars, Suboor Khan live sessions, interactive sessions, programming tutorials, industry trends, technology webinars";

export const metadata = {
  ...createMetaData({ title, description, keywords, url }),
};

export default function LiveSessions() {
  return (
    <>
      <SeoSchema
        title={title}
        description={description}
        url={url}
        keywords={keywords}
      />
      <LiveSessionPage />
    </>
  );
}
