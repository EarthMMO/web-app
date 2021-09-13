import Analytics from "analytics";
import amplitudePlugin from "@analytics/amplitude";
import Router from "next/router";

// Initialize analytics and plugins
// Documentation: https://getanalytics.io
const analytics = Analytics({
  debug: process.env.NODE_ENV !== "production",
  plugins: [
    // Instructions: https://divjoy.com/docs/amplitude
    amplitudePlugin({
      apiKey: process.env.NEXT_PUBLIC_AMPLITUDE_API_KEY,
      // See options at https://amplitude.github.io/Amplitude-JavaScript/Options/
      options: {
        trackingOptions: {
          ip_address: false,
        },
      },
    }),
  ],
});

// Track initial pageview
if (typeof window !== "undefined") {
  analytics.page();
}

// Track pageview on route change
Router.events.on("routeChangeComplete", (url) => {
  analytics.page();
});

export default analytics;
