"use client"

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

const tiktokPosts = [
  {
    id: "tt-1",
    thumbnail: "https://images.unsplash.com/photo-1596755094514-f87e34085b2c?w=400&h=600&fit=crop",
    caption: "How to style mom jeans 3 ways",
    views: "12.4K",
    url: "https://www.tiktok.com/@kallittos",
  },
  {
    id: "tt-2",
    thumbnail: "https://images.unsplash.com/photo-1565084888279-aca607ecce0c?w=400&h=600&fit=crop",
    caption: "Thrift haul: Best denim finds",
    views: "8.7K",
    url: "https://www.tiktok.com/@kallittos",
  },
  {
    id: "tt-3",
    thumbnail: "https://images.unsplash.com/photo-1604176354204-9268737828e4?w=400&h=600&fit=crop",
    caption: "Baggy jeans outfit inspo",
    views: "15.1K",
    url: "https://www.tiktok.com/@kallittos",
  },
]

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

        {/* TikTok Section */}
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
          <div className="grid grid-cols-3 gap-3 lg:gap-4">
            {tiktokPosts.map((post) => (
              <a
                key={post.id}
                href={post.url}
                target="_blank"
                rel="noopener noreferrer"
                className="group relative aspect-[9/16] rounded-xl overflow-hidden bg-muted"
              >
                <Image
                  src={post.thumbnail || "/placeholder.svg"}
                  alt={post.caption}
                  fill
                  className="object-cover group-hover:scale-105 transition-transform duration-500"
                  sizes="(max-width: 768px) 33vw, 300px"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-foreground/70 via-transparent to-transparent flex items-end">
                  <div className="p-3 lg:p-4">
                    <p className="text-white text-xs lg:text-sm font-medium line-clamp-2">{post.caption}</p>
                    <div className="flex items-center gap-1.5 mt-1.5">
                      <svg className="h-3 w-3 text-white/70" fill="currentColor" viewBox="0 0 24 24">
                        <path d="M12 4.5C7 4.5 2.73 7.61 1 12c1.73 4.39 6 7.5 11 7.5s9.27-3.11 11-7.5c-1.73-4.39-6-7.5-11-7.5zM12 17c-2.76 0-5-2.24-5-5s2.24-5 5-5 5 2.24 5 5-2.24 5-5 5zm0-8c-1.66 0-3 1.34-3 3s1.34 3 3 3 3-1.34 3-3-1.34-3-3-3z" />
                      </svg>
                      <span className="text-white/70 text-[10px] lg:text-xs">{post.views} views</span>
                    </div>
                  </div>
                </div>
                {/* Play icon overlay */}
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-10 h-10 lg:w-12 lg:h-12 bg-foreground/40 backdrop-blur-sm rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                  <svg className="h-5 w-5 lg:h-6 lg:w-6 text-white ml-0.5" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M8 5v14l11-7z" />
                  </svg>
                </div>
              </a>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
