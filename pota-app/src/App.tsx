import React, { useState } from "react";
import Styled from "./App.styles";
import PhotoGallery from "./PhotoGallery/PhotoGallery";
import logo from "./assets/images/logo.svg";

const App: React.FC = () => {
  const [inputvalue, setInputValue] = useState<string>("Bergamo");
  const [query, setQuery] = useState<string>("Bergamo");

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInputValue(e.target.value);
  };

  const handleButtonClick = () => {
    setQuery(inputvalue);
  };

  return (
    <Styled.Wrapper>
      <Styled.Header>
        <img width="62" src={logo} alt="Pota App" />
        <Styled.Title>PotaApp</Styled.Title>
        <Styled.Input
          placeholder="Search photos..."
          value={inputvalue}
          onChange={handleInputChange}
        />
        <Styled.Button onClick={handleButtonClick}>Update</Styled.Button>
      </Styled.Header>
      <PhotoGallery queryParam={query} />
    </Styled.Wrapper>
  );
};

export default App;
