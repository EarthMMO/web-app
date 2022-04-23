import "styles/custom.css";
import "styles/global.css";
import "utils/analytics.js";
import React from "react";
import { AuthProvider } from "utils/auth.js";
import { QueryClientProvider } from "utils/db.js";

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
