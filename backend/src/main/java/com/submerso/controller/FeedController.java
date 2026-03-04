package com.submerso.controller;

import com.submerso.dto.common.ApiResponse;
import com.submerso.dto.feed.RequestPostDTO;
import com.submerso.dto.feed.ResponsePostDTO;
import com.submerso.security.UserPrincipal;
import com.submerso.service.FeedService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/feed")
@RequiredArgsConstructor
public class FeedController {

    private final FeedService feedService;

    @GetMapping
    public ResponseEntity<ApiResponse<List<ResponsePostDTO>>> getFeed(Authentication authentication) {
        // Obtenemos quién pide ver el feed para saber si pinto los corazones de like en rojo o no
        UserPrincipal user = (UserPrincipal) authentication.getPrincipal();
        return ResponseEntity.ok(ApiResponse.success(feedService.getFeed(user.getId())));
    }

    // consumes = MULTIPART_FORM_DATA_VALUE es vital para recibir archivos
    // @ModelAttribute recoge el formulario y lo mete en tu RequestPostDTO
    @PostMapping(consumes = MediaType.MULTIPART_FORM_DATA_VALUE)
    public ResponseEntity<ApiResponse<ResponsePostDTO>> createPost(
            @ModelAttribute RequestPostDTO requestPostDTO,
            Authentication authentication) {

        UserPrincipal user = (UserPrincipal) authentication.getPrincipal();

        // El servicio recibe el DTO con la foto y los textos, más el ID y nombre del autor
        ResponsePostDTO createdPost = feedService.createPost(requestPostDTO, user.getId(), user.getUsername());

        return ResponseEntity.ok(ApiResponse.success(createdPost));
    }

    @GetMapping("/{postId}")
    public ResponseEntity<ApiResponse<ResponsePostDTO>> getPost(@PathVariable String postId, Authentication authentication) {
        UserPrincipal user = (UserPrincipal) authentication.getPrincipal();
        // Pasamos el ID del usuario también aquí para saber si él le ha dado like a este post concreto
        return ResponseEntity.ok(ApiResponse.success(feedService.getPost(postId, user.getId())));
    }

    @DeleteMapping("/{postId}")
    public ResponseEntity<ApiResponse<Void>> deletePost(@PathVariable String postId, Authentication authentication) {
        UserPrincipal user = (UserPrincipal) authentication.getPrincipal();
        feedService.deletePost(postId, user.getId()); // Pasamos el userId por seguridad (solo borras lo tuyo)
        return ResponseEntity.ok(ApiResponse.success(null));
    }

    @PostMapping("/{postId}/like")
    public ResponseEntity<ApiResponse<Void>> likePost(@PathVariable String postId, Authentication authentication) {
        UserPrincipal user = (UserPrincipal) authentication.getPrincipal();
        feedService.likePost(postId, user.getId());
        return ResponseEntity.ok(ApiResponse.success(null));
    }

    @DeleteMapping("/{postId}/like")
    public ResponseEntity<ApiResponse<Void>> unlikePost(@PathVariable String postId, Authentication authentication) {
        UserPrincipal user = (UserPrincipal) authentication.getPrincipal();
        feedService.unlikePost(postId, user.getId());
        return ResponseEntity.ok(ApiResponse.success(null));
    }
}