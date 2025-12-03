import { Book } from "../types";

export const fetchBookDetailsByOLID = async (olid: string): Promise<Book | null> => {
  try {
      const cleanOlid = olid.trim();

      // format check
      if (!isValidOLID(cleanOlid)) {
          console.error('invalid OLID format');
          return null;
      }

      const apiKey = `OLID:${cleanOlid}`;
      const url = `https://openlibrary.org/api/books?bibkeys=${apiKey}&format=json&jscmd=data`;

      const response = await fetch(url);
      if (!response.ok) {
          console.error('API error:', response.status);
          return null;
      }

      const data = await response.json();
      const bookData = data[apiKey];
      if (!bookData) {
          console.log('NO BOOK FOUND:', cleanOlid);
          return null;
      }

      return {
          id: cleanOlid,
          title: bookData.title || 'Unknown Title',
          authors: bookData.authors?.map((author: any) => ({
              key: author.url?.split('/').pop() || 'unknown',
              name: author.name || 'Unknown Author'
          })) || [],
          published_year: extractYear(bookData.publish_date),
          description: bookData.excerpts?.[0]?.text || bookData.description?.value || '',
          cover_url: bookData.cover?.medium || ''
      };

  } catch (error) {
      console.error('failed to fetch book:', error);
      return null;
  }
};

// is ID valid?
function isValidOLID(olid: string): boolean {
  return olid.startsWith('OL') && olid.endsWith('M');
}

// if its possible to extract a year from the string, it does it
function extractYear(dateString?: string): number | undefined {
  if (!dateString) return undefined;
  const match = dateString.match(/\d{4}/);
  return match ? parseInt(match[0]) : undefined;
}