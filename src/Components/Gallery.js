import "./Gallery.css";

import { Container } from "react-bootstrap";
import Modal from "react-bootstrap/Modal";

import React, { useState, useEffect } from "react";
import { useQuery } from "@tanstack/react-query";
import Axios from "axios";

const Gallery = (props) => {
  const [show, setShow] = useState(false);

  const { data, isLoading, isFetching, isError } = useQuery(
    ["fetch-memes"],
    () => {
      return Axios.get("https://api.imgflip.com/get_memes").then((res) => {
        return res.data.data.memes;
      });
    }
  );

  if (isError) {
    return (
      <Container className="gallery">
        <h3 className="notification notification-failed">Load failed</h3>
      </Container>
    );
  }
  if (isLoading || isFetching) {
    return (
      <Container className="gallery">
        <Modal
          show="true"
          onHide={() => setShow(false)}
          size="lg"
          aria-labelledby="contained-modal-title-vcenter"
          centered
        >
          <Modal.Body>
            <Container>
              <h3 className="notification notification-loading">Loading...</h3>
            </Container>
          </Modal.Body>
        </Modal>
      </Container>
    );
  }

  if (!props.flag) {
    return <Container className="gallery"></Container>;
  } else {
    return (
      <Container className="gallery">
        {data.map((meme, key) => {
          return <img src={meme.url} alt="" key={key} />;
        })}
      </Container>
    );
  }
};

export default Gallery;
