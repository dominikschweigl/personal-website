import React from "react";
import { circInOut, motion } from "framer-motion";
import { v4 as uuid } from "uuid";
import { useRouter } from "next/router";
import { Group, Text, Title } from "@mantine/core";
import { useLanguageContext } from "@/pages/_app";

export default function PageTransition({ children, page, others }) {
  const language = useLanguageContext();
  const EnglishMap = new Map([
    ["Startseite", "Home"],
    ["Arbeit", "Work"],
    ["Über Mich", "About"],
    ["Kontakt", "Contact"],
    ["404", "404"],
  ]);

  return (
    <>
      <motion.div
        initial={{
          y: "-10vh",
          borderRadius: "0%",
        }}
        animate={{
          y: "-120vh",
          borderRadius: "50%",
          transition: {
            duration: 0.4,
            delay: 0.7,
            ease: [0.57, 0.02, 0.52, 1],
          },
        }}
        exit={{
          y: ["120vh", "-10vh"],
          borderRadius: ["50%", "35%"],
          transition: { duration: 0.4, ease: [0.18, 0.83, 0.75, 1] },
        }}
        style={{
          width: "300vw",
          height: "120vh",
          top: "0vw",
          left: "-100vw",
          position: "absolute",
          backgroundColor: "#1c1d20",
          zIndex: 10000,
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          boxShadow: "--mantine-shadow-xl",
        }}
        key={uuid()}
      >
        <motion.div
          initial={{ opacity: 0, y: 10, transition: { ease: "easeOut" } }}
          animate={{ opacity: 1, y: 0, transition: { ease: "easeOut" } }}
          exit={{ opacity: [0, 0] }}
        >
          <Group gap={24}>
            <div
              style={{
                marginTop: 6,
                width: 10,
                height: 10,
                borderRadius: "50%",
                backgroundColor: "white",
              }}
            ></div>
            <Text c={"white"} fw={400} fz={56}>
              {language == "de" ? page : EnglishMap.get(page)}
            </Text>
          </Group>
        </motion.div>
      </motion.div>
      {children}
    </>
  );
}
