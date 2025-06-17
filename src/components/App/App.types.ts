export interface Image {
    id: string;
    urls: {
        small: string;
        regular: string;
        full: string;
    };
    alt_description: string;
};

export interface FetchDataResponse {    
        results: Image[];
        total_pages: number;    
}