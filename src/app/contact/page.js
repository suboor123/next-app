import ContactPage from "@/components/ContactPage";
import SeoSchema from "@/components/SeoSchema";
import { HOST } from "@/constants";
import { createMetaData } from "@/seo-utils/CommonMeta";

const url = `${HOST}/contact`;
const title = "Get in Touch | Contact Suboor Khan";
const description =
  "Contact Suboor Khan for inquiries, collaborations, or questions about web and mobile development. Reach out via email or through the contact form for a prompt response. Let’s connect and explore opportunities together!";
const keywords =
  "contact, get in touch, Suboor Khan contact, contact form, web development inquiries, mobile development inquiries, tech collaborations, reach out, contact me, technology consultation";

export const metadata = {
  ...createMetaData({ title, description, keywords, url }),
};

export default function Contact() {
  return (
    <>
      <SeoSchema
        title={title}
        description={description}
        url={url}
        keywords={keywords}
      />
      <ContactPage />
    </>
  );
}
