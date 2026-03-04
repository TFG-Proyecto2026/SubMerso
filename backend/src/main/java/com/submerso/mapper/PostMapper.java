package com.submerso.mapper;

import com.submerso.dto.feed.ResponsePostDTO;
import com.submerso.model.Post;

public interface PostMapper {
    ResponsePostDTO toResponseDTO(Post post, String currentUserId);
}
