package com.submerso.service;

import com.submerso.dto.feed.PostDTO;
import org.springframework.stereotype.Service;

import java.util.Collections;
import java.util.List;

@Service
public class FeedService {
    
    public List<PostDTO> getFeed(String userId) {
        return Collections.emptyList();
    }
    
    public PostDTO createPost(PostDTO postDTO) {
        return null;
    }
    
    public PostDTO getPost(String postId) {
        return null;
    }
    
    public void deletePost(String postId) {
    }
    
    public void likePost(String postId, String userId) {
    }
    
    public void unlikePost(String postId, String userId) {
    }
}
