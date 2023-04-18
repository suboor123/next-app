import { SessionResources } from "@/types/types";
import React, { useState } from "react";
import { BsFillFileEarmarkCodeFill, BsXCircle } from "react-icons/bs";
import Heading from "../heading";
import styles from "./ListArticle.module.css";

const AttachedFiles = ({ attachedFiles = [] }: any) => {
  console.log(attachedFiles);
  const [showModal, setShowModal] = useState(false);
  const openModal = (e: any) => {
    e.stopPropagation();
    setShowModal(true);
  };
  const closeModal = () => setShowModal(false);

  return (
    <>
      <span onClick={openModal} style={{cursor: 'pointer'}}>
        <BsFillFileEarmarkCodeFill /> Attached Files
      </span>

      {showModal && (
        <div
          className={styles.modal}
          onClick={(e: any) => {
            e.stopPropagation();
          }}
        >
          <div className={styles.modalContent}>
            <h2>Attached files</h2>
            <div className={styles.clsBtn} onClick={closeModal}>
              <BsXCircle />
            </div>
            <div className={styles.atchedFiles}>
              {attachedFiles.map((a: SessionResources, idx: any) => (
                <a
                  href={a.url}
                  download
                  target={"_blank"}
                  className={styles.files}
                >
                  <BsFillFileEarmarkCodeFill style={{ fontSize: "50px" }} />
                  <a>{a.name}</a>
                  <button className="btn btn-warning btn-xs">Download</button>
                </a>
              ))}
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default AttachedFiles;
