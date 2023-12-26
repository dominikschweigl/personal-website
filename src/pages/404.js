import React from "react";
import PageTransition from "../../components/layouts/PageTransition";
import Header from "../../components/layouts/Header";

export default function Custom404() {
  return (
    <PageTransition page={"404"}>
      <Header />
    </PageTransition>
  );
}
