import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Post, CreatePostData, ApiResponse } from '../models/feed.model';

@Injectable({
    providedIn: 'root' // Esto hace que el servicio esté disponible en toda la app
})
export class FeedService {
    private apiUrl = 'http://localhost:8085/api/feed';

    constructor(private http: HttpClient) {}

    getFeed(): Observable<ApiResponse<Post[]>> {
        return this.http.get<ApiResponse<Post[]>>(this.apiUrl);
    }

    createPost(postData: CreatePostData): Observable<ApiResponse<Post>> {
        // Creamos la "caja virtual" para mezclar texto y archivos
        const formData = new FormData();

        formData.append('image', postData.image);

        if (postData.caption) formData.append('caption', postData.caption);
        if (postData.location) formData.append('location', postData.location);
        if (postData.linkedDiveId) formData.append('linkedDiveId', postData.linkedDiveId);

        // Como es un array, hay que añadir cada etiqueta una a una
        if (postData.tags && postData.tags.length > 0) {
            postData.tags.forEach(tag => formData.append('tags', tag));
        }

        return this.http.post<ApiResponse<Post>>(this.apiUrl, formData);
    }

    likePost(postId: string): Observable<ApiResponse<void>> {
        return this.http.post<ApiResponse<void>>(`${this.apiUrl}/${postId}/like`, {});
    }

    unlikePost(postId: string): Observable<ApiResponse<void>> {
        return this.http.delete<ApiResponse<void>>(`${this.apiUrl}/${postId}/like`);
    }

    deletePost(postId: string): Observable<ApiResponse<void>> {
        return this.http.delete<ApiResponse<void>>(`${this.apiUrl}/${postId}`);
    }
}