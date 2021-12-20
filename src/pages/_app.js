import "../styles/global.css";
import "util/analytics.js";
import React from "react";
import { AuthProvider } from "util/auth.js";
import { QueryClientProvider } from "util/db.js";

function MyApp({ Component, pageProps }) {
  return (
    <QueryClientProvider>
      <AuthProvider>
        <Component {...pageProps} />
      </AuthProvider>
    </QueryClientProvider>
  );
}

export default MyApp;
