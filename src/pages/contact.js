import React from "react";
import { motion } from "framer-motion";
import PageTransition from "../../components/layouts/PageTransition";
import Header from "../../components/layouts/Header";

export default function contact() {
  return (
    <PageTransition page={"Kontakt"}>
      <Header />
    </PageTransition>
  );
}
