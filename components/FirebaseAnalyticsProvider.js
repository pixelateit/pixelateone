"use client";

import { useEffect } from "react";
import { analytics } from "@/lib/firebase";
import { logEvent } from "firebase/analytics";

/**
 * This component sets up Firebase Analytics globally.
 * It logs a "page_view" event on mount and can be extended
 * for more tracking (like button clicks, user login, etc.)
 */
export default function FirebaseAnalyticsProvider() {
  useEffect(() => {
    // if (analytics) {
    //   logEvent(analytics, "page_view");
    // }

    if (analytics) console.log("Firebase Analytics initialized");
  }, []);

  return null; // no UI
}
