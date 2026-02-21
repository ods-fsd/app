"use client";

import React from "react";
import Hero from "@/components/Hero/Hero";
import About from "@/components/About/About";
import Popular from "@/components/Popular/Popular";
import OurTravellers from "@/components/OurTravellers/OurTravellers";
import Join from "@/components/Join/Join";

export default function HomePage() {
  return (
    <>
      <Hero />
      <About />
      <Popular />
      <OurTravellers />
      <Join />
    </>
  );
}
