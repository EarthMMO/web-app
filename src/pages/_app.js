import React from "react";
import Navbar from "components/Navbar";
import Footer from "components/Footer";
import "util/analytics.js";
import { AuthProvider } from "util/auth.js";
import { ThemeProvider } from "util/theme.js";
import { QueryClientProvider } from "util/db.js";
import '../styles/global.css'

function MyApp({ Component, pageProps }) {
  return (
    <QueryClientProvider>
      <ThemeProvider>
        <AuthProvider>
          <>

            <Component {...pageProps} />

          </>
        </AuthProvider>
      </ThemeProvider>
    </QueryClientProvider>
  );
}

export default MyApp;
