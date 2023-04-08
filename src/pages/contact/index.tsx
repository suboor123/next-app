import Heading from "@/components/heading";
import SocialConnect from "@/components/social-connect";
import { FirebaseHelper } from "@/lib/firebase-helpers";
import Head from "next/head";
import React, { useState } from "react";
import styles from "./Contact.module.css";

const wrap = (el: React.ReactNode) => (
  <>
    <hr />
    {el}
    <hr />
  </>
);

const Contact = () => {
  const [showErrMsg, setShowErrMsg] = useState(false);
  const [showSuccessMsg, setShowSuccessMsg] = useState(false);
  const [formVal, setFormVal] = useState({
    name: "",
    email: "",
    message: "",
  });

  const handleFormChange = (e: any) => {
    if (e.target.value) {
      setFormVal({
        ...formVal,
        [e.target.name]: e.target.value,
      });
    }
  };

  const handleSubmit = (e: any) => {
    e.preventDefault();
    let isValidated = true;
    Object.values(formVal).forEach((v) => {
      if (!v) isValidated = false;
    });

    if (!isValidated) {
      setShowErrMsg(true);
      return;
    }

    setShowErrMsg(false);
    FirebaseHelper.sendMessage(formVal);
    setFormVal({
      name: "",
      email: "",
      message: "",
    });
    setShowSuccessMsg(true);

    setTimeout(() => {
      setShowSuccessMsg(false);
    }, 5000);
  };

  return (
    <>
      <Head>
        <title>Suboor | Contact</title>
        <meta
          name="description"
          content={"Contact me if you need a website or mobile application"}
        />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      {wrap(<Heading>Get in touch!</Heading>)}
      {showErrMsg && (
        <div className={styles.err}>Please fill all the required fields.</div>
      )}
      <form
        action="#"
        method="post"
        className="contact"
        onSubmit={handleSubmit}
      >
        <div className="contact-item">
          <label>Your Name *</label>
          <input
            onChange={handleFormChange}
            value={formVal.name}
            name="name"
            type="text"
          />
        </div>
        <div className="contact-item">
          <label>Your Email *</label>
          <input
            onChange={handleFormChange}
            value={formVal.email}
            name="email"
            type="email"
          />
        </div>

        <div className="contact-item">
          <label>Message *</label>
          <textarea
            onChange={handleFormChange}
            value={formVal.message}
            name="message"
          />
        </div>
        <div className="contact-item form-submit">
          <input
            name="submit"
            type="submit"
            id="submit"
            className="submit"
            defaultValue="Submit"
          />
        </div>
      </form>
      {showSuccessMsg && (
        <div className={styles.success}>
          Your message has been sent successfully.
        </div>
      )}
    </>
  );
};

export default Contact;
