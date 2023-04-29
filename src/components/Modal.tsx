import { useState } from "react";
import Button from "./button";

export const Modal = () => {
  const [show, setShow] = useState(false);
  const openModal = () => setShow(true);
  const closeModal = () => setShow(false);

  return (
    <>
      <Button type="secondary" onPress={openModal}>
        Get Updates
      </Button>

      {show && (
        <div className="tmodal" onClick={closeModal}>
          <div className="modal-content">
            <h1>Get Updates</h1>
            <form>
              <div className="form-group row">
                <label
                  htmlFor="staticEmail"
                  className="col-sm-2 col-form-label"
                >
                  Email
                </label>
                <div className="col-sm-10">
                  <input
                    type="text"
                    readOnly
                    className="form-control-plaintext"
                    id="staticEmail"
                    defaultValue="my-mail@example.com"
                  />
                </div>
              </div>
              <div className="form-group row">
                <label
                  htmlFor="inputPassword"
                  className="col-sm-2 col-form-label"
                >
                  Password
                </label>
                <div className="col-sm-10">
                  <input
                    type="password"
                    className="form-control"
                    id="inputPassword"
                    placeholder="Password"
                  />
                </div>
              </div>
            </form>
          </div>
        </div>
      )}
    </>
  );
};
