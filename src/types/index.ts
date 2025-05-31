//  what an Author looks like.
export interface Author {
  key: string;  
  name: string; 
}

// what a Book looks like in application.

export interface Book {
  id: string;                
  title: string;             
  authors: Author[];         
  published_year?: number;   
  description?: string;     
}
