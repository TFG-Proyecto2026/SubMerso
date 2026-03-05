// Equivale a tu ResponsePostDTO de Java
export interface Post {
    id: string;
    authorUsername: string;
    authorAvatar: string;
    imageUrl: string;
    caption: string;
    location: string;
    tags: string[];
    linkedDiveId: string;
    likesCount: number;
    isLikedByMe: boolean;
    createdAt: number;
}

// Equivale a tu RequestPostDTO de Java
export interface CreatePostData {
    image: File; // File es un tipo nativo de JavaScript para archivos
    caption: string;
    location: string;
    tags: string[];
    linkedDiveId?: string;
}

// Equivale a tu ApiResponse<T> de Java
export interface ApiResponse<T> {
    success: boolean;
    message: string;
    data: T;
}