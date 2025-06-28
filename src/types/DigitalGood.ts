export interface DigitalGood {
  id: string;
  title: string;
  type: string;
  price: string;
  description: string;
  image: string;
  features?: string[];
  fileUrl?: string; // URL to downloadable digital product file
}
