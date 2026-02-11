import { NextResponse } from "next/server"

export const revalidate = 3600 // cache for 1 hour

interface SocialPost {
  id: string
  platform: "instagram" | "tiktok"
  thumbnailUrl: string
  caption: string
  url: string
  authorName: string
}

// Fetch latest Instagram posts via public profile page data
async function fetchInstagramPosts(): Promise<SocialPost[]> {
  try {
    // Use Instagram's oembed to get profile data for known recent post URLs
    // Since we can't list posts without a token, we fetch the profile page via a proxy
    const res = await fetch(
      "https://www.instagram.com/kallittofashions/?__a=1&__d=dis",
      {
        headers: {
          "User-Agent":
            "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36",
        },
        next: { revalidate: 3600 },
      }
    )

    if (res.ok) {
      const data = await res.json()
      const edges =
        data?.graphql?.user?.edge_owner_to_timeline_media?.edges || []
      return edges.slice(0, 2).map((edge: Record<string, Record<string, string>>) => ({
        id: `ig-${edge.node.shortcode}`,
        platform: "instagram" as const,
        thumbnailUrl: edge.node.display_url || edge.node.thumbnail_src,
        caption:
          (edge.node as Record<string, Record<string, Record<string, string>[]>>).edge_media_to_caption?.edges?.[0]?.node?.text?.slice(0, 100) || "Latest post",
        url: `https://www.instagram.com/p/${edge.node.shortcode}/`,
        authorName: "@kallittofashions",
      }))
    }
  } catch {
    // Fallback silently
  }

  // Fallback: use oembed for known post URLs
  const knownUrls = [
    "https://www.instagram.com/kallittofashions/",
    "https://www.instagram.com/kallittofashions/",
  ]

  const posts: SocialPost[] = []
  for (const url of knownUrls) {
    try {
      const oembedRes = await fetch(
        `https://api.instagram.com/oembed/?url=${encodeURIComponent(url)}&omitscript=true`,
        { next: { revalidate: 3600 } }
      )
      if (oembedRes.ok) {
        const data = await oembedRes.json()
        posts.push({
          id: `ig-oembed-${posts.length}`,
          platform: "instagram",
          thumbnailUrl: data.thumbnail_url || "",
          caption: data.title?.slice(0, 100) || "Latest from Instagram",
          url,
          authorName: data.author_name || "@kallittofashions",
        })
      }
    } catch {
      // continue
    }
  }

  return posts
}

// Fetch TikTok post metadata via oembed API
async function fetchTikTokPosts(): Promise<SocialPost[]> {
  const videoUrls = [
    "https://www.tiktok.com/@kallittos/video/7461643744227393798",
    "https://www.tiktok.com/@kallittos/video/7459629757042420998",
  ]

  const posts: SocialPost[] = []

  for (const videoUrl of videoUrls) {
    try {
      const res = await fetch(
        `https://www.tiktok.com/oembed?url=${encodeURIComponent(videoUrl)}`,
        { next: { revalidate: 3600 } }
      )
      if (res.ok) {
        const data = await res.json()
        posts.push({
          id: `tt-${data.embed_product_id || posts.length}`,
          platform: "tiktok",
          thumbnailUrl: data.thumbnail_url || "",
          caption: data.title?.slice(0, 100) || "Latest from TikTok",
          url: videoUrl,
          authorName: data.author_name || "@kallittos",
        })
      }
    } catch {
      // continue
    }
  }

  return posts
}

export async function GET() {
  const [igPosts, ttPosts] = await Promise.all([
    fetchInstagramPosts(),
    fetchTikTokPosts(),
  ])

  // Interleave: IG, TT, IG, TT
  const combined: SocialPost[] = []
  const maxLen = Math.max(igPosts.length, ttPosts.length)
  for (let i = 0; i < maxLen && combined.length < 4; i++) {
    if (igPosts[i]) combined.push(igPosts[i])
    if (ttPosts[i]) combined.push(ttPosts[i])
  }

  return NextResponse.json({ posts: combined.slice(0, 4) })
}
