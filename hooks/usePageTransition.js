// hooks/usePageTransition.js
"use client";
import { useCallback } from "react";

export default function usePageTransition() {
  const navigate = useCallback((href) => {
    if (typeof window !== "undefined" && window.triggerPageTransition) {
      window.triggerPageTransition(href);
    } else {
      window.location.href = href;
    }
  }, []);

  return navigate;
}
