"use client";
import usePageTransition from "@/hooks/usePageTransition";
import { trackClick } from "@/utils/analytics";
import Link from "next/link";
import { forwardRef } from "react";

const PageLink = forwardRef(
  ({ href = "", children, className = "", delay = 300, ...props }, ref) => {
    const navigate = usePageTransition();

    const handleClick = (e) => {
      // Allow normal browser behavior for modifier keys / middle-click
      if (e.metaKey || e.ctrlKey || e.shiftKey || e.altKey || e.button !== 0)
        return;

      e.preventDefault();
      setTimeout(() => {
        navigate(href);
      }, delay);
    };

    return (
      <Link
        href={href}
        onClick={(e) => {
          handleClick(e);
          trackClick("page_link_click");
        }}
        className={`block cursor-pointer ${className}`}
        {...props}
      >
        <div ref={ref} className="contents">
          {children}
        </div>
      </Link>
    );
  }
);

PageLink.displayName = "PageLink";
export default PageLink;
