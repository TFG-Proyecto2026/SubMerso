package com.submerso.service;

import com.submerso.dto.feed.RequestPostDTO;
import com.submerso.dto.feed.ResponsePostDTO;
import com.submerso.mapper.PostMapper;
import com.submerso.model.Post;
import com.submerso.repository.PostRepository;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;

import java.io.IOException;
import java.util.ArrayList;
import java.util.List;
import java.util.Map;
import java.util.stream.Collectors;

@Slf4j // Etiqueta de Lombok para poder escribir logs en la consola fácilmente
@Service
@RequiredArgsConstructor
public class FeedService {

    private final PostRepository postRepository;
    private final CloudinaryService cloudinaryService;
    private final PostMapper postMapper;

    public List<ResponsePostDTO> getFeed(String currentUserId) {
        List<Post> posts = postRepository.findAll();

        return posts.stream()
                .map(post -> postMapper.toResponseDTO(post, currentUserId))
                // Ordenamos para que los más recientes salgan primero (comprobamos null por si acaso)
                .sorted((p1, p2) -> {
                    Long t1 = p1.getCreatedAt() != null ? p1.getCreatedAt() : 0L;
                    Long t2 = p2.getCreatedAt() != null ? p2.getCreatedAt() : 0L;
                    return t2.compareTo(t1);
                })
                .collect(Collectors.toList());
    }

    public ResponsePostDTO createPost(RequestPostDTO requestDTO, String userId, String authorUsername) {
        String imageUrl = null;
        String imagePublicId = null;

        if (requestDTO.getImage() != null && !requestDTO.getImage().isEmpty()) {
            try {
                Map uploadResult = cloudinaryService.uploadImage(requestDTO.getImage(), "feed", authorUsername);
                imageUrl = uploadResult.get("secure_url").toString();
                imagePublicId = uploadResult.get("public_id").toString();
            } catch (IOException e) {
                log.error("Error al subir imagen a Cloudinary", e);
                throw new RuntimeException("Error de red al intentar subir la imagen");
            }
        }

        Post post = Post.builder()
                .userId(userId)
                .authorUsername(authorUsername)
                .imageUrl(imageUrl)
                .imagePublicId(imagePublicId)
                .caption(requestDTO.getCaption())
                .location(requestDTO.getLocation())
                // Si Angular no manda tags, aseguramos que se guarde una lista vacía y no un null
                .tags(requestDTO.getTags() != null ? requestDTO.getTags() : new ArrayList<>())
                .linkedDiveId(requestDTO.getLinkedDiveId())
                .build();

        Post savedPost = postRepository.save(post);

        return postMapper.toResponseDTO(savedPost, userId);
    }

    public ResponsePostDTO getPost(String postId, String currentUserId) {
        Post post = postRepository.findById(postId)
                .orElseThrow(() -> new RuntimeException("La publicación no existe"));

        return postMapper.toResponseDTO(post, currentUserId);
    }

    public void deletePost(String postId, String currentUserId) {
        Post post = postRepository.findById(postId)
                .orElseThrow(() -> new RuntimeException("La publicación no existe"));

        if (!post.getUserId().equals(currentUserId)) {
            throw new RuntimeException("¡Pillado! No puedes borrar una publicación que no es tuya.");
        }

        if (post.getImagePublicId() != null) {
            try {
                cloudinaryService.deleteImage(post.getImagePublicId());
            } catch (IOException e) {
                log.warn("Aviso: No se pudo borrar la foto de Cloudinary: {}", e.getMessage());
            }
        }

        postRepository.delete(post);
    }

    public void likePost(String postId, String userId) {
        Post post = postRepository.findById(postId)
                .orElseThrow(() -> new RuntimeException("La publicación no existe"));

        if (post.getLikedBy() == null) {
            post.setLikedBy(new ArrayList<>());
        }

        if (!post.getLikedBy().contains(userId)) {
            post.getLikedBy().add(userId);
            postRepository.save(post);
        }
    }

    public void unlikePost(String postId, String userId) {
        Post post = postRepository.findById(postId)
                .orElseThrow(() -> new RuntimeException("La publicación no existe"));

        if (post.getLikedBy() != null && post.getLikedBy().contains(userId)) {
            post.getLikedBy().remove(userId);
            postRepository.save(post);
        }
    }
}