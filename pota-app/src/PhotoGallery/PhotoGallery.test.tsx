import React from "react";
import { render, screen, waitFor, fireEvent } from "@testing-library/react";
import PhotoGallery, { Props } from "./PhotoGallery";
import { fetcher } from "../utils/fetch";

jest.mock("../utils/fetch", () => ({
  fetcher: jest.fn(),
}));

describe("PhotoGallery", () => {
  const mockPhotos = [
    {
      id: 1,
      src: {
        large: "https://example.com/photo1-large.jpg",
        small: "https://example.com/photo1-small.jpg",
      },
      alt: "Photo 1",
      photographer: "Photographer 1",
      photographer_url: "https://example.com/photographer1",
    },
    {
      id: 2,
      src: {
        large: "https://example.com/photo2-large.jpg",
        small: "https://example.com/photo2-small.jpg",
      },
      alt: "Photo 2",
      photographer: "Photographer 2",
      photographer_url: "https://example.com/photographer2",
    },
  ];

  const setupMockFetcher = (data: any) => {
    (fetcher as jest.Mock).mockResolvedValue(data);
  };

  it("renders loading state initially", () => {
    render(<PhotoGallery queryParam="Atalanta" />);
    expect(screen.getByText(/loading.../i)).toBeInTheDocument();
  });

  it("fetches and displays photos correctly", async () => {
    setupMockFetcher({ photos: mockPhotos });

    render(<PhotoGallery queryParam="Atalanta" />);

    // Wait for the loading state to disappear and photos to load
    await waitFor(() => {
      expect(screen.getByAltText("Photo 1")).toBeInTheDocument();
      expect(screen.getByAltText("Photo 2")).toBeInTheDocument();
    });

    // Check thumbnails
    expect(screen.getByAltText("Photo 1")).toHaveAttribute(
      "src",
      mockPhotos[0].src.small
    );
    expect(screen.getByAltText("Photo 2")).toHaveAttribute(
      "src",
      mockPhotos[1].src.small
    );

    // Check main image
    expect(screen.getByAltText("Image Photo 1")).toHaveAttribute(
      "src",
      mockPhotos[0].src.large
    );
  });

  it("shows error message when fetching fails", async () => {
    (fetcher as jest.Mock).mockRejectedValue(new Error("Failed to fetch"));

    render(<PhotoGallery queryParam="InvalidQuery" />);

    // Wait for the error message to appear
    await waitFor(() => {
      expect(screen.getByText(/error: failed to fetch/i)).toBeInTheDocument();
    });
  });

  it("updates selected photo when a thumbnail is clicked", async () => {
    setupMockFetcher({ photos: mockPhotos });

    render(<PhotoGallery queryParam="Atalanta" />);

    // Wait for photos to load
    await waitFor(() => {
      expect(screen.getByAltText("Photo 1")).toBeInTheDocument();
    });

    // Click the second thumbnail
    const thumbnail = screen.getByAltText("Photo 2");
    fireEvent.click(thumbnail);

    // Check that the main image updates
    expect(screen.getByAltText("Image Photo 2")).toBeInTheDocument();
  });
});
