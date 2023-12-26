import {
  Container,
  Group,
  Text,
  Title,
  Button,
  useMantineTheme,
  Stack,
  Divider,
  Select,
  UnstyledButton,
  CopyButton,
  Alert,
  Notification,
  Affix,
  Transition,
  Popover,
} from "@mantine/core";
import { useMediaQuery, useToggle } from "@mantine/hooks";
import Link from "next/link";
import React, { useContext, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faLinkedin, faSquareGithub } from "@fortawesome/free-brands-svg-icons";
import { faClipboard, faLanguage } from "@fortawesome/free-solid-svg-icons";
import { useRouter } from "next/router";
import { useLanguageContext, useSetLanguageContext } from "@/pages/_app";
import Image from "next/image";

export default function Header() {
  const theme = useMantineTheme();
  const [isMenuOpened, toggleMenu] = useToggle([false, true]);
  const lgScreen = useMediaQuery("(min-width: 800px)");

  const language = useLanguageContext();
  const links = [
    { name: "Start", english: "Home", href: "/" },
    { name: "Arbeit", english: "Work", href: "/work" },
    { name: "Über Mich", english: "About", href: "/about" },
    { name: "Kontakt", english: "Contact", href: "/contact" },
  ];

  return (
    <div style={{ width: "100vw", position: "absolute", zIndex: 100 }}>
      <Container size={"xl"} mt={80}>
        <Group justify={"space-between"}>
          <Group gap={"lg"}>
            <motion.div whileTap={{ scale: 0.95 }}>
              <Title
                size={theme.other.logo.fontsize_lg}
                fw={900}
                lts={-1.92}
                styles={() => ({
                  root: {
                    transition: "color .2s ease-in-out",
                    color: isMenuOpened ? "white" : "black",
                  },
                })}
              >
                <Link href={"/"}>
                  <motion.div
                    style={{ display: "flex" }}
                    variants={{
                      animate: { translateY: [0, 0, 0, 4, 0] },
                    }}
                    whileHover="animate"
                  >
                    dominik
                    <motion.div
                      variants={{
                        animate: {
                          translateY: [0, -6, 0, 0, 0],
                        },
                      }}
                    >
                      <Text span inherit c={"white"}>
                        .
                      </Text>
                    </motion.div>
                  </motion.div>
                </Link>
              </Title>
            </motion.div>
            <Group>
              <AnimatePresence>
                {isMenuOpened || !lgScreen || (
                  <>
                    <motion.div
                      initial={{
                        y: 16,
                        opacity: 0,
                      }}
                      animate={{
                        y: 0,
                        opacity: 1,
                      }}
                      exit={{
                        y: 16,
                        opacity: 0,
                        transition: { delay: 0.2 },
                      }}
                      whileTap={{ scale: 0.95 }}
                    >
                      <Text size="md">
                        <Link href="/work">
                          {language == "de"
                            ? links[1]["name"]
                            : links[1]["english"]}
                        </Link>
                      </Text>
                    </motion.div>
                    <motion.div
                      initial={{
                        y: 16,
                        opacity: 0,
                      }}
                      animate={{
                        y: 0,
                        opacity: 1,
                        transition: { delay: 0.1 },
                      }}
                      exit={{
                        y: 16,
                        opacity: 0,
                        transition: { delay: 0.1 },
                      }}
                      whileTap={{ scale: 0.95 }}
                    >
                      <Text size="md">
                        <Link href="/about">
                          {language == "de"
                            ? links[2]["name"]
                            : links[2]["english"]}
                        </Link>
                      </Text>
                    </motion.div>
                    <motion.div
                      initial={{
                        y: 16,
                        opacity: 0,
                      }}
                      animate={{
                        y: 0,
                        opacity: 1,
                        transition: { delay: 0.2 },
                      }}
                      exit={{
                        y: 16,
                        opacity: 0,
                      }}
                      whileTap={{ scale: 0.95 }}
                    >
                      <Text size="md">
                        <Link href="/contact">
                          {language == "de"
                            ? links[3]["name"]
                            : links[3]["english"]}
                        </Link>
                      </Text>
                    </motion.div>
                  </>
                )}
              </AnimatePresence>
            </Group>
          </Group>

          <motion.div whileTap={{ scale: 0.95 }}>
            <UnstyledButton onClick={() => toggleMenu()}>
              <Text
                styles={() => ({
                  root: {
                    transition: "color .2s ease-in-out",
                    color: isMenuOpened ? "white" : "black",
                    display: "flex",
                    alignItems: "center",
                    gap: theme.spacing.sm,
                  },
                })}
              >
                {language == "de" ? "menü" : "menu"}
                <svg
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <motion.line
                    animate={{
                      y1: isMenuOpened ? 6 : 8.75,
                      y2: isMenuOpened ? 18 : 8.75,
                      x1: isMenuOpened ? 6 : 0,
                      x2: isMenuOpened ? 18 : 24,
                      stroke: isMenuOpened ? "white" : "black",
                    }}
                    y1={8.75}
                    y2={8.75}
                    x1={0}
                    x2={24}
                    stroke="black"
                    strokeWidth="2.5"
                  />
                  <motion.line
                    animate={{
                      y1: isMenuOpened ? 18 : 15.75,
                      y2: isMenuOpened ? 6 : 15.75,
                      x1: isMenuOpened ? 6 : 0,
                      x2: isMenuOpened ? 18 : 18,
                      stroke: isMenuOpened ? "white" : "black",
                    }}
                    y1={15.75}
                    y2={15.75}
                    x1={0}
                    x2={18}
                    stroke="black"
                    strokeWidth="2.5"
                  />
                </svg>
              </Text>
            </UnstyledButton>
          </motion.div>
        </Group>
      </Container>
      <AnimatePresence>
        {isMenuOpened && <Menu links={links} language={language} />}
      </AnimatePresence>
    </div>
  );
}

function Menu({ links, language }) {
  const setLanguage = useSetLanguageContext();
  const router = useRouter();

  const linkVariants = {
    initial: {
      scale: 1,
      translateX: 0,
      fontWeight: 400,
      transition: {
        duration: 0.2,
      },
    },
    hover: {
      scale: 1.1,
      translateX: "5%",
      fontWeight: 500,
      transition: { duration: 0.2 },
    },
  };

  const xlScreen = useMediaQuery("(min-width: 1280px)");

  const arrowVariants = {
    initial: {
      opacity: 0,
      translateX: 10,
      scale: 0.95,
      transition: { duration: 0.2 },
    },
    hover: {
      opacity: 1,
      translateX: 0,
      scale: 1,
      transition: { duration: 0.2 },
    },
  };

  const dotVariants = {
    initial: {},
    hover: {
      width: 20,
    },
  };

  return (
    <motion.div
      initial={{
        x: "100vw",
        paddingLeft: 240,
        borderRadius: "15% 0% 0% 15% / 100% 0% 0% 100%",
        transition: { duration: xlScreen ? 0.5 : 0.3 },
      }}
      animate={{
        x: "0vw",
        paddingLeft: 0,
        borderRadius: "0% 0% 0% 0% / 100% 0% 0% 100%",
        transition: { duration: xlScreen ? 0.5 : 0.3 },
      }}
      exit={{
        x: "100vw",
        paddingLeft: 240,
        borderRadius: "15% 0% 0% 15% / 100% 0% 0% 100%",
        transition: { duration: xlScreen ? 0.5 : 0.3 },
      }}
      style={{
        position: "absolute",
        zIndex: -1,
        height: "100vh",
        width: "100vw",
        backgroundColor: "#1c1d20",
        top: 0,
      }}
    >
      <Container size={"xl"} h={"100vh"} pt={160} pb={80}>
        <Stack justify="space-between" h={"100%"}>
          <Stack gap={"md"}>
            <Divider opacity={0.1} mb={40} />
            {links.map((link) => (
              <Link href={link.href} key={link.name}>
                <motion.div animate="initial" whileHover={"hover"}>
                  <Text
                    c={"white"}
                    size="xl"
                    styles={{
                      root: {
                        display: "flex",
                        justifyContent: "space-between",
                        alignItems: "center",
                      },
                    }}
                  >
                    <motion.div variants={linkVariants}>
                      {language == "de" ? link.name : link.english}
                    </motion.div>
                    {link.href === router.pathname ? (
                      <motion.div
                        variants={dotVariants}
                        style={{
                          backgroundColor: "white",
                          height: 10,
                          width: 10,
                          borderRadius: 5,
                          marginRight: 6,
                        }}
                      ></motion.div>
                    ) : (
                      <svg
                        width="48"
                        height="14"
                        viewBox="0 0 24 12"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <motion.path
                          variants={arrowVariants}
                          d="M0 6H22.5M22.5 6L17 1M22.5 6L17 11"
                          stroke="white"
                          strokeWidth="2"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        />
                      </svg>
                    )}
                  </Text>
                </motion.div>
              </Link>
            ))}
          </Stack>
          <Stack>
            <Divider opacity={0.1} />
            <Group justify="space-between">
              <Group>
                <motion.div whileTap={{ scale: 0.95 }}>
                  <Link
                    href={"https://at.linkedin.com/"}
                    rel="noopener noreferrer"
                    target="_blank"
                  >
                    <Group gap={8}>
                      <FontAwesomeIcon
                        icon={faLinkedin}
                        color="white"
                        style={{ width: 16 }}
                      />
                      <Text c={"white"}>LinkedIn</Text>
                    </Group>
                  </Link>
                </motion.div>
                <motion.div whileTap={{ scale: 0.95 }}>
                  <Link
                    href={"https://github.com/devdomnk"}
                    rel="noopener noreferrer"
                    target="_blank"
                  >
                    <Group gap={8}>
                      <FontAwesomeIcon
                        icon={faSquareGithub}
                        color="white"
                        style={{ width: 16 }}
                      />
                      <Text c={"white"}>GitHub</Text>
                    </Group>
                  </Link>
                </motion.div>
              </Group>
              <Group>
                <motion.div whileTap={{ scale: 0.95 }}>
                  <CopyButton value="schweigl.ds@gmail.com">
                    {({ copied, copy }) => (
                      <Popover
                        opened={copied}
                        position="top"
                        offset={12}
                        styles={{
                          dropdown: {
                            display: "flex",
                            alignItems: "center",
                            backgroundColor: "#242529",
                            borderColor: "#ffffff10",
                            color: "white",
                            gap: 12,
                            padding: "8px 16px",
                          },
                        }}
                      >
                        <Popover.Target>
                          <Text
                            c="white"
                            onClick={copy}
                            styles={{ root: { cursor: "pointer" } }}
                          >
                            schweigl.ds@gmail.com
                          </Text>
                        </Popover.Target>
                        <Popover.Dropdown>
                          <FontAwesomeIcon icon={faClipboard} />
                          <Text styles={{ root: { fontSize: 16 } }}>
                            {language == "de"
                              ? "Kopiert!"
                              : "copied to clipboard!"}
                          </Text>
                        </Popover.Dropdown>
                      </Popover>
                    )}
                  </CopyButton>
                </motion.div>
                <motion.div whileTap={{ scale: 0.95 }}>
                  <Select
                    data={[
                      {
                        value: "de",
                        label: "Deutsch",
                        src: "AT.svg",
                      },
                      {
                        value: "en",
                        label: "English",
                        src: "GB-UKM.svg",
                      },
                    ]}
                    value={language}
                    onChange={setLanguage}
                    allowDeselect={false}
                    leftSection={
                      language === "de" ? (
                        <Image src={"AT.svg"} width={20} height={15} />
                      ) : (
                        <Image src={"GB-UKM.svg"} width={20} height={15} />
                      )
                    }
                    pointer
                    styles={() => ({
                      input: {
                        backgroundColor: "transparent",
                        border: "none",
                        borderBottom: "1px solid #ffffff10",
                        borderRadius: 0,
                        color: "white",
                        paddingLeft: 40,
                        width: 200,
                        transition: "all .2s ease-in-out",
                        "&:hover": {
                          borderBottom: "1px solid #ffffff80",
                        },
                      },
                      dropdown: {
                        backgroundColor: "#242529",
                        borderColor: "#ffffff10",
                        color: "white",
                      },
                      option: {
                        backgroundColor: "transparent",
                        "&[data-combobox-selected]": {
                          backgroundColor: "#ffffff10",
                        },
                      },
                    })}
                    comboboxProps={{
                      transitionProps: { transition: "pop", duration: 200 },
                    }}
                  />
                </motion.div>
              </Group>
            </Group>
          </Stack>
        </Stack>
      </Container>
    </motion.div>
  );
}
