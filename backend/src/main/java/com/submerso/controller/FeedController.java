package com.submerso.controller;

import com.submerso.dto.common.ApiResponse;
import com.submerso.dto.feed.PostDTO;
import com.submerso.service.FeedService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/feed")
@RequiredArgsConstructor
public class FeedController {
    
    private final FeedService feedService;
    
    @GetMapping
    public ResponseEntity<ApiResponse<List<PostDTO>>> getFeed() {
        return ResponseEntity.ok(ApiResponse.success(feedService.getFeed(null)));
    }
    
    @PostMapping
    public ResponseEntity<ApiResponse<PostDTO>> createPost(@RequestBody PostDTO postDTO) {
        return ResponseEntity.ok(ApiResponse.success(feedService.createPost(postDTO)));
    }
    
    @GetMapping("/{postId}")
    public ResponseEntity<ApiResponse<PostDTO>> getPost(@PathVariable String postId) {
        return ResponseEntity.ok(ApiResponse.success(feedService.getPost(postId)));
    }
    
    @DeleteMapping("/{postId}")
    public ResponseEntity<ApiResponse<Void>> deletePost(@PathVariable String postId) {
        feedService.deletePost(postId);
        return ResponseEntity.ok(ApiResponse.success(null));
    }
    
    @PostMapping("/{postId}/like")
    public ResponseEntity<ApiResponse<Void>> likePost(@PathVariable String postId) {
        feedService.likePost(postId, null);
        return ResponseEntity.ok(ApiResponse.success(null));
    }
    
    @DeleteMapping("/{postId}/like")
    public ResponseEntity<ApiResponse<Void>> unlikePost(@PathVariable String postId) {
        feedService.unlikePost(postId, null);
        return ResponseEntity.ok(ApiResponse.success(null));
    }
}
