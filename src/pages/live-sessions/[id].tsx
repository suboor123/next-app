import Detail from "@/components/detail";
import { FirebaseHelper } from "@/lib/firebase-helpers";
import { Session } from "@/types/types";
import Head from "next/head";
import React from "react";

type Props = {
  session: Session;
  related: Session[];
};

const SessionsDetails = (props: Props) => {
  const { session, related = [] } = props;
  return (
    <>
      <Head>
        <title>{session.name}</title>
        <meta name="description" content={session.description} />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
        <script
          async
          src="https://cdn.rawgit.com/google/code-prettify/master/loader/run_prettify.js"
        ></script>
      </Head>

      <Detail
        content={{
          heading: session.name,
          imageUrl: session.imageUrl,
          views: session.views,
          postContent: session.description,
          createdAt: session.createdAt,
          tags: session.tags.map((t: any) => t.name),
          description: session.description,
        }}
        relatedPost={related.map((session) => {
          return {
            heading: session.name,
            imageUrl: session.imageUrl,
            views: session.views,
            postContent: session.description,
            createdAt: session.createdAt,
            tags: session.tags.map((t: any) => t.name),
            description: session.description,
          };
        })}
      />
    </>
  );
};

export default SessionsDetails;

export async function getStaticProps(context: any) {
  const { params } = context;
  const sessionId = params.id;
  const sessions = await FirebaseHelper.syncAllSessions();
  let indexOfSelectedSession: number;
  const session = sessions.find((s, idx) => {
    if (s.id === sessionId) {
      indexOfSelectedSession = idx;
      return s;
    }
  });
  return {
    props: {
      session,
      related: sessions
        .slice(indexOfSelectedSession! + 1, sessions.length - 1)
        .slice(0, 3),
    },
  };
}

export async function getStaticPaths() {
  const sessions = await FirebaseHelper.syncAllSessions();
  return {
    paths: sessions.map((s) => {
      return {
        params: {
          id: s.id!,
        },
      };
    }),
    fallback: false,
  };
}
