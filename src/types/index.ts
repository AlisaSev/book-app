export interface Author {
  key: string;  // contains unique ID from OL
  name: string; 
}

export interface Book {
  id: string;                
  title: string;             
  authors: Author[];         // [] means if a book have several authours
  published_year?: number;   
  description: string;       
  cover_url?: string;        
}