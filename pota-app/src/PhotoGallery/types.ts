export interface Photo {
  id: number;
  src: {
    large: string;
    medium: string;
    small: string;
  };
  photographer: string;
  photographer_url: string;
  alt: string;
}

export interface PexelsResponse {
  photos: Photo[];
  total_results: number;
}
