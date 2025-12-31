// utils/analytics.js
import app from "@/lib/firebase";
import { getAnalytics, logEvent } from "firebase/analytics";

let analytics;

// Only initialize analytics in the browser
if (typeof window !== "undefined") {
  analytics = getAnalytics(app);
}

export const trackClick = (label) => {
  if (analytics) {
    logEvent(analytics, "click", { label });
  }
};

export const trackPageView = (page) => {
  if (analytics) {
    logEvent(analytics, "page_view", { page });
  }
};
