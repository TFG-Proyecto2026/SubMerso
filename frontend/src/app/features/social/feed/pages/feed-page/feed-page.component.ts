import { Component, inject, OnInit, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CreatePostComponent } from '../../create-post/create-post.component';
import { FeedService } from '../../../../../core/services/feed.service';
import { Post } from '../../../../../core/models/feed.model';

@Component({
    selector: 'app-feed-page',
    standalone: true,
    imports: [CommonModule, CreatePostComponent],
    templateUrl: './feed-page.component.html'
})
export class FeedPageComponent implements OnInit {
    private feedService = inject(FeedService);

    posts = signal<Post[]>([]);
    isLoading = signal<boolean>(true);

    ngOnInit() {
        this.loadFeed();
    }

    loadFeed() {
        this.feedService.getFeed().subscribe({
            next: (response) => {
                this.posts.set(response.data);
                this.isLoading.set(false);
            },
            error: (err) => {
                console.error('Error cargando el feed', err);
                this.isLoading.set(false);
            }
        });
    }

    onPostCreated(newPost: Post) {
        // Actualizamos la Signal metiendo el nuevo post al principio del array (arriba del todo)
        this.posts.update(currentPosts => [newPost, ...currentPosts]);
    }
}
