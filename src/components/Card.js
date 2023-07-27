import React, { useEffect, useState, useCallback } from "react";
import { PhotoProvider, PhotoView } from "react-photo-view";
import "react-photo-view/dist/react-photo-view.css";
import "./Card.css";
import axios from "axios";

function Card() {
  const [characters, setCharacters] = useState([]);
  const [selectedCharacter, setSelectedCharacter] = useState(null);
  const [currentImage, setCurrentImage] = useState(0);
  const [isLoading, setIsLoading] = useState(false);
  const [selectedButtonIndex, setSelectedButtonIndex] = useState(-1);

  useEffect(() => {
    axios
      .get("https://encly-api-production.up.railway.app/api/profile/857067560")
      .then((response) => {
        setCharacters(response.data.charactersPreview);
      })
      .catch((error) => {
        console.error(error);
      });
  }, []);

  const handleCharacterChange = (charaNumber, index) => {
    setIsLoading(true);
    setSelectedButtonIndex(index);
    axios
      .get(
        "https://encly-api-production.up.railway.app/api/card/857067560/" +
          charaNumber
      )
      .then((response) => {
        setSelectedCharacter(response.data);
      })
      .catch((error) => {
        console.error(error);
      })
      .finally(() => {
        setIsLoading(false);
      });
  };

  const openImageViewer = useCallback((img) => {
    setCurrentImage(img);
  }, []);

  useEffect(() => {
    if (!isLoading && selectedCharacter) {
      openImageViewer(selectedCharacter.url);
    }
  }, [isLoading, selectedCharacter, openImageViewer]);

  return (
    <div className="container">
      <div className="button-list">
        {characters.map((character, index) => (
          <button
          key={character.id}
          onClick={() => handleCharacterChange(index + 1, index)}
          className="character-button"
          style={{
            backgroundColor: selectedButtonIndex === index ? "#e6a90c" : "rgba(19, 19, 19, 0.25)",
          }}
        >
            <img
              src={character.icon}
              alt={character.name}
              className="character-icon"
            />
          </button>
        ))}
      </div>

      {isLoading && <div className="loading">Loading...</div>}

      {selectedCharacter && !isLoading && (
        <div style={{ marginTop: "5px", marginBottom: "5px" }}>
          <PhotoProvider>
            <PhotoView src={currentImage}>
              <img
                src={selectedCharacter.url}
                alt={selectedCharacter}
                className="card-image"
                onClick={() => openImageViewer(selectedCharacter.url)}
              />
            </PhotoView>
          </PhotoProvider>
        </div>
      )}
    </div>
  );
}

export default Card;
