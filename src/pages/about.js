import React from "react";
import PageTransition from "../../components/layouts/PageTransition";
import Header from "../../components/layouts/Header";

export default function about() {
  return (
    <PageTransition page={"Über Mich"}>
      <Header />
    </PageTransition>
  );
}
