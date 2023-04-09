import Button from '@/components/button';
import Heading from '@/components/heading'
import ListArticle from '@/components/list-article';
import { FirebaseHelper } from '@/lib/firebase-helpers';
import { Session } from '@/types/types'
import Head from 'next/head';
import router, { useRouter } from 'next/router';
import React, { useMemo } from 'react'
import blogs from '../blogs';

export async function getStaticProps() {
  const sessions = await FirebaseHelper.syncAllSessions();
  return {
    props: {
      sessions
    },
  };
}


type Props = {
  sessions: Session[]
}

const LiveSessions = ({sessions = []}: Props) => {
  const router = useRouter();
  const renderSessionList = useMemo(() => {
    const content = (sessions || [])
      .map((session) => {
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
    return <ListArticle content={content}  />;
  }, [sessions.length]);
  
  return (
    <>
          <Head>
          <title>Suboor | LIVE Sessions</title>
          <meta
            name="description"
            content={'LIVE coding sessions'}
          />
          <meta name="viewport" content="width=device-width, initial-scale=1" />
          <link rel="icon" href="/favicon.ico" />
        </Head>
      
    <hr />
    <Heading>{'LIVE Sessions'} </Heading>
    <hr />
    <p>Let's join the LIVE Sessions now and enhance your web development skills. <br /><br /><Button onPress={() => {
      router.push('/contact')
    }}>Join Sessions</Button></p>
    <hr />
    {renderSessionList}
    </>
  )
}

export default LiveSessions