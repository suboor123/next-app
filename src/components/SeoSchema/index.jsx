import { breadCrumbSchema } from "@/seo-utils/breadCrumbSchema";
import { organizationSchema } from "@/seo-utils/organizationSchema";
import { siteNavigationElement } from "@/seo-utils/siteNavigationElement";
import { webPageSchema } from "@/seo-utils/webPageSchema";
import React from "react";
import { HOST } from "@/constants";

const SeoSchema = ({ title, description, url, keywords }) => {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: webPageSchema(title, description, url),
        }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: organizationSchema() }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: siteNavigationElement() }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: breadCrumbSchema(title, HOST, url) }}
      />
    </>
  );
};

export default SeoSchema;
