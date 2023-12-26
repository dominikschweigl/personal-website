import "@/styles/globals.css";
import "@mantine/core/styles.css";

import { createTheme, MantineProvider } from "@mantine/core";
import { createContext, useContext, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { useRouter } from "next/router";

const theme = createTheme({
  colors: {
    black: ["#000000"],
  },
  primaryColor: "black",
  fontFamily: "satoshi",
  fontSizes: {
    xs: "13px",
    sm: "16px",
    md: "18px",
    lg: "20px",
    xl: "24px",
  },
  spacing: {
    xs: 24,
    sm: "24px",
    md: "32px",
    lg: "52px",
    xl: 72,
  },
  components: {
    Container: {
      defaultProps: {
        sizes: {
          xs: 540,
          sm: 720,
          md: 960,
          lg: 1140,
          xl: 1536,
        },
      },
    },
  },
  other: {
    logo: {
      fontsize_lg: "32px",
      fontsize_sm: "16px",
    },
    header_font_size: "88px",
  },
});
const LanguageContext = createContext();
const SetLanguageContext = createContext();

export default function App({ Component, pageProps }) {
  const [language, setLanguage] = useState("de");
  const pageKey = useRouter().asPath;

  return (
    <MantineProvider theme={theme}>
      <LanguageContext.Provider value={language}>
        <SetLanguageContext.Provider value={setLanguage}>
          <AnimatePresence mode="wait" initial={"false"}>
            <Component key={pageKey} {...pageProps} />
          </AnimatePresence>
        </SetLanguageContext.Provider>
      </LanguageContext.Provider>
    </MantineProvider>
  );
}

export function useLanguageContext() {
  return useContext(LanguageContext);
}

export function useSetLanguageContext() {
  return useContext(SetLanguageContext);
}
