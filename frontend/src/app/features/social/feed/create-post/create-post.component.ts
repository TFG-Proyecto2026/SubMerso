import { Component, inject, signal, output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { FeedService } from '../../../../core/services/feed.service';
import { Post } from '../../../../core/models/feed.model';

@Component({
    selector: 'app-create-post',
    standalone: true,
    imports: [CommonModule, ReactiveFormsModule],
    templateUrl: './create-post.component.html'
})
export class CreatePostComponent {
    private fb = inject(FormBuilder);
    private feedService = inject(FeedService);

    selectedFile = signal<File | null>(null);
    imagePreview = signal<string | null>(null);
    isLoading = signal<boolean>(false);
    errorMessage = signal<string | null>(null);

    // Para avisar al componente padre (el Feed) de que hemos creado un post nuevo
    postCreated = output<Post>();

    postForm: FormGroup = this.fb.group({
        caption: ['', [Validators.required, Validators.maxLength(500)]],
        location: [''],
        tags: ['']
    });

    onFileSelected(event: any) {
        const file = event.target.files[0] as File;
        if (file) {
            // Guardamos el archivo real en la Signal para enviarlo luego al backend
            this.selectedFile.set(file);

            // Creamos una URL temporal para previsualizar la foto en el HTML
            const reader = new FileReader();
            reader.onload = () => {
                this.imagePreview.set(reader.result as string);
            };
            reader.readAsDataURL(file);
        }
    }

    removeImage() {
        this.selectedFile.set(null);
        this.imagePreview.set(null);
    }

    onSubmit() {
        if (this.postForm.invalid) {
            this.errorMessage.set('Por favor, escribe un pie de foto.');
            return;
        }
        if (!this.selectedFile()) {
            this.errorMessage.set('¡Debes seleccionar una foto para publicar!');
            return;
        }

        this.isLoading.set(true);
        this.errorMessage.set(null);

        const tagsString = this.postForm.value.tags;
        const tagsArray = tagsString
            ? tagsString.split(',').map((tag: string) => tag.trim().replace('#', ''))
            : [];

        const postData = {
            image: this.selectedFile()!,
            caption: this.postForm.value.caption,
            location: this.postForm.value.location,
            tags: tagsArray
        };

        this.feedService.createPost(postData).subscribe({
            next: (response) => {
                this.isLoading.set(false);
                this.postCreated.emit(response.data);
                this.resetForm();
            },
            error: (err) => {
                this.isLoading.set(false);
                this.errorMessage.set('Hubo un error al subir la publicación. Inténtalo de nuevo.');
                console.error('Error creando post:', err);
            }
        });
    }

    private resetForm() {
        this.postForm.reset();
        this.removeImage();
    }
}
