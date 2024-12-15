import React, { Fragment, useEffect, useRef, useState } from "react";
import { PexelsResponse, Photo } from "./types";
import { fetcher } from "../utils/fetch";
import Styled from "./PhotoGallery.styles";
import clsx from "clsx";

const PhotoGallery = ({ queryParam = "Bergamo" }: Props) => {
  const [photos, setPhotos] = useState<Photo[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [selectedPhoto, setSelectedPhoto] = useState<Photo | null>(null);
  const thumbnailRef = useRef<HTMLDivElement>(null);

  const apiKey = process.env.REACT_APP_PEXELS_API_KEY;

  useEffect(() => {
    const fetchPhotos = async () => {
      try {
        setLoading(true); // Show loading indicator
        const data = await fetcher<PexelsResponse>(
          `https://api.pexels.com/v1/search?query=${queryParam}&per_page=15`,
          {
            headers: {
              Authorization: apiKey || "",
            },
          }
        );
        setPhotos(data.photos);
        setSelectedPhoto(data.photos[0]); // Optionally select the first photo
      } catch (err) {
        setError(err instanceof Error ? err.message : "Unknown error");
      } finally {
        setLoading(false);
      }
    };

    fetchPhotos();
  }, [queryParam, apiKey]); // Add queryParam here

  const handleScroll = (direction: "left" | "right") => {
    if (thumbnailRef.current) {
      const scrollAmount = 300;
      if (direction === "left") {
        thumbnailRef.current.scrollLeft -= scrollAmount;
      } else {
        thumbnailRef.current.scrollLeft += scrollAmount;
      }
    }
  };

  if (loading)
    return (
      <Styled.Loading>
        <p>Loading...</p>
      </Styled.Loading>
    );
  if (error) return <p>Error: {error}</p>;

  return (
    <Styled.GalleryContainer>
      <Styled.GalleryAsideWrapper>
        {photos.map((photo, index) => (
          <Styled.NavItem
            className={clsx({ "-active": selectedPhoto?.id === photo.id })}
            key={photo.id}
            onClick={() => setSelectedPhoto(photo)}
          >
            Image {index + 1}
          </Styled.NavItem>
        ))}
      </Styled.GalleryAsideWrapper>
      <Styled.GalleryMainImageWrapper>
        {selectedPhoto && (
          <>
            <Styled.MainImageTitle>{selectedPhoto?.alt}</Styled.MainImageTitle>
            <Styled.MainImage
              src={selectedPhoto?.src.large}
              alt={`Image ${selectedPhoto?.alt}`}
            />
            {selectedPhoto?.photographer && (
              <Styled.PhotoCredits>
                <small>Photo by:</small>
                {selectedPhoto.photographer_url && (
                  <a href={selectedPhoto?.photographer_url}>
                    <span>Photo by {selectedPhoto?.photographer}</span>
                  </a>
                )}

                {!selectedPhoto.photographer_url && (
                  <span>Photo by {selectedPhoto?.photographer}</span>
                )}
              </Styled.PhotoCredits>
            )}
          </>
        )}
        {!selectedPhoto && (
          <Fragment>Please Select an Image from thumbnail</Fragment>
        )}
      </Styled.GalleryMainImageWrapper>
      <Styled.ThumbnailSliderWrapper>
        <Styled.ArrowButton onClick={() => handleScroll("left")}>
          &#8592;
        </Styled.ArrowButton>
        <Styled.GalleryThumbsWrapper ref={thumbnailRef}>
          {photos.map((photo) => (
            <Styled.ThumbsItem
              key={photo.id}
              className={clsx({ "-active": selectedPhoto === photo })}
            >
              <Styled.PhotoThumbnail
                src={photo.src.small}
                alt={`Photo by ${photo.photographer}`}
                onClick={() => setSelectedPhoto(photo)}
              />
            </Styled.ThumbsItem>
          ))}
        </Styled.GalleryThumbsWrapper>
        <Styled.ArrowButton onClick={() => handleScroll("right")}>
          &#8594;
        </Styled.ArrowButton>
      </Styled.ThumbnailSliderWrapper>
    </Styled.GalleryContainer>
  );
};

export type Props = {
  queryParam?: string;
};

export default PhotoGallery;
