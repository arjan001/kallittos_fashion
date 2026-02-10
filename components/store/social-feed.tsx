"use client"

import { useEffect, useRef } from "react"
import Image from "next/image"
import { ExternalLink } from "lucide-react"

const instagramPosts = [
  {
    id: "ig-1",
    image: "https://images.unsplash.com/photo-1541099649105-f69ad21f3246?w=400&h=400&fit=crop",
    caption: "New drop: Classic Black Skinny Jeans",
    likes: 234,
    url: "https://www.instagram.com/kallittofashions/",
  },
  {
    id: "ig-2",
    image: "https://images.unsplash.com/photo-1582418702059-97ebafb35d09?w=400&h=400&fit=crop",
    caption: "Thrift finds that look brand new",
    likes: 187,
    url: "https://www.instagram.com/kallittofashions/",
  },
  {
    id: "ig-3",
    image: "https://images.unsplash.com/photo-1542272604-787c3835535d?w=400&h=400&fit=crop",
    caption: "Denim season is here",
    likes: 312,
    url: "https://www.instagram.com/kallittofashions/",
  },
]

// TikTok video IDs from @kallittos account
const tiktokVideos = [
  {
    id: "7461643744227393798",
    url: "https://www.tiktok.com/@kallittos/video/7461643744227393798",
  },
  {
    id: "7459629757042420998",
    url: "https://www.tiktok.com/@kallittos/video/7459629757042420998",
  },
  {
    id: "7458357073960582406",
    url: "https://www.tiktok.com/@kallittos/video/7458357073960582406",
  },
]

function TikTokEmbed({ videoUrl, videoId }: { videoUrl: string; videoId: string }) {
  const containerRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    // Load TikTok embed script
    if (typeof window !== "undefined") {
      const existing = document.getElementById("tiktok-embed-script")
      if (!existing) {
        const script = document.createElement("script")
        script.id = "tiktok-embed-script"
        script.src = "https://www.tiktok.com/embed.js"
        script.async = true
        document.body.appendChild(script)
      } else {
        // Re-trigger TikTok embed processing
        if ((window as unknown as Record<string, unknown>).tiktokEmbed) {
          ;(window as unknown as Record<string, { lib: { render: (el: Element[]) => void } }>).tiktokEmbed.lib.render(
            containerRef.current ? [containerRef.current] : []
          )
        }
      }
    }
  }, [videoId])

  return (
    <div ref={containerRef} className="tiktok-embed-wrapper">
      <blockquote
        className="tiktok-embed"
        cite={videoUrl}
        data-video-id={videoId}
        style={{ maxWidth: "100%", minWidth: "280px" }}
      >
        <section>
          <a target="_blank" href={videoUrl} rel="noopener noreferrer">Loading TikTok...</a>
        </section>
      </blockquote>
    </div>
  )
}

export function SocialFeed() {
  return (
    <section className="py-16 lg:py-20 bg-muted/30">
      <div className="mx-auto max-w-7xl px-4">
        <div className="text-center mb-12">
          <p className="text-xs font-semibold uppercase tracking-widest text-muted-foreground mb-2">
            Follow Our Socials
          </p>
          <h2 className="font-serif text-3xl lg:text-4xl font-bold text-foreground text-balance">
            See What We Are Posting
          </h2>
          <p className="text-muted-foreground text-sm mt-3 max-w-lg mx-auto">
            Follow us on Instagram and TikTok for the latest drops, styling tips, and exclusive thrift finds.
          </p>
        </div>

        {/* Instagram Section */}
        <div className="mb-12">
          <div className="flex items-center justify-between mb-6">
            <div className="flex items-center gap-3">
              <div className="w-9 h-9 flex items-center justify-center bg-gradient-to-br from-[#f09433] via-[#e6683c] to-[#dc2743] rounded-lg">
                <svg className="h-5 w-5 text-white" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z" />
                </svg>
              </div>
              <div>
                <p className="text-sm font-semibold text-foreground">@kallittofashions</p>
                <p className="text-xs text-muted-foreground">Instagram</p>
              </div>
            </div>
            <a
              href="https://www.instagram.com/kallittofashions/"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-1.5 text-xs font-medium text-foreground hover:underline underline-offset-2"
            >
              Follow
              <ExternalLink className="h-3 w-3" />
            </a>
          </div>
          <div className="grid grid-cols-3 gap-3 lg:gap-4">
            {instagramPosts.map((post) => (
              <a
                key={post.id}
                href={post.url}
                target="_blank"
                rel="noopener noreferrer"
                className="group relative aspect-square rounded-xl overflow-hidden bg-muted"
              >
                <Image
                  src={post.image || "/placeholder.svg"}
                  alt={post.caption}
                  fill
                  className="object-cover group-hover:scale-105 transition-transform duration-500"
                  sizes="(max-width: 768px) 33vw, 300px"
                />
                <div className="absolute inset-0 bg-foreground/0 group-hover:bg-foreground/40 transition-colors duration-300 flex items-end">
                  <div className="p-3 lg:p-4 translate-y-full group-hover:translate-y-0 transition-transform duration-300">
                    <p className="text-white text-xs lg:text-sm font-medium line-clamp-2">{post.caption}</p>
                    <p className="text-white/70 text-[10px] lg:text-xs mt-1">{post.likes} likes</p>
                  </div>
                </div>
              </a>
            ))}
          </div>
        </div>

        {/* TikTok Section - Real Embeds */}
        <div>
          <div className="flex items-center justify-between mb-6">
            <div className="flex items-center gap-3">
              <div className="w-9 h-9 flex items-center justify-center bg-foreground rounded-lg">
                <svg className="h-5 w-5 text-background" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M19.59 6.69a4.83 4.83 0 01-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 01-2.88 2.5 2.89 2.89 0 01-2.89-2.89 2.89 2.89 0 012.89-2.89c.28 0 .54.04.79.1v-3.5a6.37 6.37 0 00-.79-.05A6.34 6.34 0 003.15 15.2a6.34 6.34 0 006.34 6.34 6.34 6.34 0 006.34-6.34V8.87a8.16 8.16 0 004.77 1.52V6.94a4.85 4.85 0 01-1.01-.25z" />
                </svg>
              </div>
              <div>
                <p className="text-sm font-semibold text-foreground">@kallittos</p>
                <p className="text-xs text-muted-foreground">TikTok</p>
              </div>
            </div>
            <a
              href="https://www.tiktok.com/@kallittos"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-1.5 text-xs font-medium text-foreground hover:underline underline-offset-2"
            >
              Follow
              <ExternalLink className="h-3 w-3" />
            </a>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 lg:gap-6">
            {tiktokVideos.map((video) => (
              <div key={video.id} className="flex justify-center">
                <TikTokEmbed videoUrl={video.url} videoId={video.id} />
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
