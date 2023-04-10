import Button from "@/components/button";
import Heading from "@/components/heading";
import ListArticle from "@/components/list-article";
import { FirebaseHelper } from "@/lib/firebase-helpers";
import { Session } from "@/types/types";
import Head from "next/head";
import { useRouter } from "next/router";
import React, { useEffect, useLayoutEffect, useMemo, useState } from "react";

declare const YT: any;
var player;

export async function getStaticProps() {
  const sessions = await FirebaseHelper.syncAllSessions();
  return {
    props: {
      sessions,
    },
    revalidate: 3600,
  };
}

type Props = {
  sessions: Session[];
};

const LiveSessions = ({ sessions = [] }: Props) => {
  const router = useRouter();
  const [isFrameVisible, setIsFrameVisible] = useState(true);
  const [isVideoPlaying, setIsVideoPlaying] = useState(false);

  const renderSessionList = useMemo(() => {
    const content = (sessions || []).map((session) => {
      return {
        id: session.id!,
        heading: session.name,
        createdAt: session.createdAt,
        tags: session.tags.map((p: any) => p.name),
        views: session.views,
        content: session.description,
        imageUrl: session.imageUrl,
      };
    });
    return (
      <ListArticle
        content={content}
        handleArticleClick={() => {
          router.push("/contact");
        }}
      />
    );
  }, [sessions.length]);

  function loadIframe() {
    if (!(window as any).YT) {
      console.log("if");
      var tag = document.createElement("script");
      tag.src = "https://www.youtube.com/iframe_api";
      var firstScriptTag = document.getElementsByTagName("script")[0];
      firstScriptTag?.parentNode?.insertBefore(tag, firstScriptTag);

      (window as any).onYouTubeIframeAPIReady = function () {
        player = new YT.Player("session-iframe", {
          events: {
            onStateChange: function (event: any) {
              const playerStatus = event.data;
              if (playerStatus === 1) {
                setIsVideoPlaying(true);
              } else if(playerStatus === 2 || playerStatus === 5) {
                setIsVideoPlaying(false)
              }
            },
          },
        });
      };
    }
  }

  useEffect(() => {
    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        const intersecting = entry.isIntersecting;
        if (!intersecting) {
          setIsFrameVisible(false);
        } else {
          setIsFrameVisible(true);
        }
      });
    });

    observer.observe(document!.getElementById("observer") as any);

    loadIframe();
  }, []);

  useEffect(() => {
    if (!isFrameVisible && isVideoPlaying) {
      document?.querySelector("#sticky-video")?.classList.add("stickyVideo");
      const frame: any = document?.querySelector("#session-iframe") as any;
      frame.height = 150;
    } else {
      document?.querySelector("#sticky-video")?.classList.remove("stickyVideo");
      const frame: any = document?.querySelector("#session-iframe") as any;
      frame.height = 500;
    }
      
  }, [isFrameVisible, isVideoPlaying]);

  return (
    <>
      <Head>
        <title>Suboor | LIVE Sessions</title>
        <meta name="description" content={"LIVE coding sessions"} />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <hr />
      <Heading>{"LIVE Sessions"} </Heading>
      <hr />
      <p>
        Let's join the LIVE Sessions now and enhance your web development
        skills. <br />
        <br />
        <Button
          onPress={() => {
            router.push("/contact");
          }}
        >
          Join Sessions
        </Button>
      </p>
      <hr />
<div id="observer" style={{minHeight:'350px'}}>
<div id="sticky-video">
        <iframe
          id="session-iframe"
          src="https://www.youtube.com/embed/lXFgS8vbej4?enablejsapi=1"
          width="100%"
          height="350px"
        />
      </div>
</div>
      <hr />
      {renderSessionList}
    </>
  );
};

export default LiveSessions;
