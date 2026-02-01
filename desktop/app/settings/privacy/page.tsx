import React from "react";
import Form from "./Form";

const page = () => {
  // 🔹 DEMO: toggle this to simulate existing PIN
  const hasPin = true; // change to false to simulate "new PIN" flow

  return <Form action={hasPin ? "change" : "new"} />;
};

export default page;
