"use client";

import Link from "next/link";

export default function Footer() {
  return (
    <footer className="bg-dark text-white py-12">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row justify-between items-center gap-6">
          <div className="flex gap-6 text-lg">
            <Link
              href="https://instagram.com"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-primary transition-colors"
            >
              Instagram
            </Link>
            <span className="text-gray-500">|</span>
            <Link
              href="https://facebook.com"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-primary transition-colors"
            >
              Facebook
            </Link>
            <span className="text-gray-500">|</span>
            <Link
              href="https://tiktok.com"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-primary transition-colors"
            >
              TikTok
            </Link>
          </div>

          <div className="text-center md:text-right">
            <a
              href="mailto:hello@improperbrewery.com"
              className="text-primary hover:underline"
            >
              hello@improperbrewery.com
            </a>
          </div>
        </div>

        <div className="mt-8 pt-8 border-t border-gray-700 text-center text-sm text-gray-400">
          <p className="mb-2">
            Improper Brewery – Coming 2026 to the right side of the line.
          </p>
          <p>
            No solicitors, HOAs, or Proper residents who can&apos;t take a joke.
          </p>
        </div>
      </div>
    </footer>
  );
}

