import { styled } from "styled-components";

// LAYOUT
const GalleryContainer = styled.div`
  background: linear-gradient(273deg, black, #0c90ed);
  gap: 16px;
  padding: 16px;

  @media (min-width: 1024px) {
    display: grid;
    grid-template-columns: 25% auto;
    grid-template-rows: auto 140px;
    grid-template-areas:
      "sidenav mainimage"
      "sidenav thumbnails";
    max-height: calc(100% - 117px);
  }
`;
const GalleryAsideWrapper = styled.aside`
  grid-area: sidenav;
  background: #0000008a;
  gap: 8px;
  display: flex;
  flex-direction: column;
  max-height: 100%;
  overflow: auto;
  height: fit-content;
  border-radius: 8px;
  padding: 16px 8px;
  @media (max-width: 1023px) {
    display: none;
  }
`;
const GalleryMainImageWrapper = styled.div`
  grid-area: mainimage;

  display: flex;
  flex-direction: column;

  @media (min-width: 1024px) {
    background: linear-gradient(209deg, black, #0c90ed);
    align-items: center;
    justify-content: center;
    min-height: 585px;
  }
`;
const GalleryThumbsWrapper = styled.div`
  grid-area: thumbnails;
  display: flex;
  overflow-x: auto;
  scroll-behavior: smooth;
  gap: 10px;
  padding: 8px;
  width: calc(100% - 4rem);
  scrollbar-width: none;

  &::-webkit-scrollbar {
    display: none;
  }
`;

// ASIDE ITEM
const NavItem = styled.div`
  border-radius: 4px;
  padding: 8px 16px;
  width: fit-content;
  cursor: pointer;
  &:hover,
  &.-active {
    background: #f7d900;
    color: black;
  }
`;

// THUMBS
const ThumbnailSliderWrapper = styled.div`
  display: flex;
  align-items: center;
  position: relative;
  width: 100%;
`;
const ArrowButton = styled.button`
  background-color: rgba(256, 256, 256, 0.3);
  color: white;
  border: none;
  height: 80%;
  cursor: pointer;
  z-index: 2;

  &:hover {
    background-color: rgba(0, 0, 0, 0.7);
  }
`;
const ThumbsItem = styled.div`
  flex: 0 0 auto;
  cursor: pointer;

  &.-active img {
    border-color: #f7d900;
  }
`;

const PhotoThumbnail = styled.img`
  width: 100%;
  height: auto;
  border-radius: 4px;
  cursor: pointer;
  transition: transform 0.2s;
  border: 2px solid transparent;

  &:hover {
    transform: scale(1.05);
  }
`;

// MAIN IMAGE
const MainImage = styled.img`
  border-radius: 8px;
  max-height: 80%;
  max-width: 100%;
`;
const MainImageTitle = styled.h4`
  margin-top: 0;
`;

const PhotoCredits = styled.div`
  padding: 8px;
  display: flex;

  gap: 8px;
  a {
    color: #f7d900;
  }
`;

const Loading = styled.div`
  position: fixed;
  inset: 0;
  background-color: black;
`;

export default {
  GalleryAsideWrapper,
  GalleryMainImageWrapper,
  GalleryThumbsWrapper,
  PhotoCredits,
  GalleryContainer,
  ThumbnailSliderWrapper,
  ArrowButton,
  PhotoThumbnail,
  ThumbsItem,
  MainImage,
  MainImageTitle,
  NavItem,
  Loading,
};
