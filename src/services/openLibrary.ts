import { Book, Author } from '../types';

export const fetchBookDetailsByOLID = async (olid: string): Promise<Book | null> => {
    try {
        const response = await fetch(`https://openlibrary.org/works/${olid}.json`);
        const data = await response.json();
        
        // Map the response data to our Book interface
        const book: Book = {
            id: data.key,
            title: data.title,
            authors: data.authors?.map((author: Author) => ({
                key: author.key,
                name: author.name
            })) || [],
            published_year: data.first_publish_year,
            description: data.description
        };
        
        return book;
    } catch (error) {
        console.error('Error fetching book details:', error);
        return null;
    }
};