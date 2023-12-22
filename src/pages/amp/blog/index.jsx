import Head from "next/head"

export default () => {
    return <>
              <Head>
        <title>Suboor | Blogs</title>
        <meta
          name="description"
          content={blogs.map((p) => p.description).join(", ")}
        />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
    </>
}

8448559892