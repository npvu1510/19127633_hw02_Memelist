import "./App.css";
import Button from "react-bootstrap/Button";
import React, { useState, useEffect } from "react";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

import Gallery from "./Gallery";
import { Container } from "react-bootstrap";

const getPosts = async () => {
  const response = await fetch("https://api.imgflip.com/get_memes");
  return response.json();
};

function App() {
  const client = new QueryClient();

  /*   const [memes, setMemes] = useState(); */
  const [flag, setFlag] = useState(false);

  const onClickBtn = async () => {
    if (!flag) {
      setFlag(true);
    } else {
      setFlag(false);
    }
  };

  useEffect(() => {
    onClickBtn();
  }, []);

  let button = (
    <Button
      className="btn-load-memes"
      onClick={onClickBtn}
      variant={flag ? "danger" : "success"}
    >
      {flag ? "Clear memes" : "Load memes"}
    </Button>
  );

  return (
    <div className="App">
      <QueryClientProvider client={client}>
        <Container>
          {button}
          <Gallery flag={flag}></Gallery>
        </Container>
      </QueryClientProvider>
    </div>
  );
}

export default App;
