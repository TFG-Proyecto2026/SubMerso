package com.submerso.mapper;

import com.submerso.dto.feed.ResponsePostDTO;
import com.submerso.model.Post;
import org.springframework.stereotype.Component;

@Component
public class PostMapperImpl implements PostMapper {

    @Override
    public ResponsePostDTO toResponseDTO(Post post, String currentUserId) {
        if (post == null) {
            return null;
        }

        return ResponsePostDTO.builder()
                .id(post.getId())
                .authorUsername(post.getAuthorUsername())
                .authorAvatar(post.getAuthorAvatar())
                .imageUrl(post.getImageUrl())
                .caption(post.getCaption())
                .location(post.getLocation())
                .tags(post.getTags())
                .linkedDiveId(post.getLinkedDiveId())
                .likesCount(post.getLikedBy() != null ? post.getLikedBy().size() : 0)
                .isLikedByMe(currentUserId != null && post.getLikedBy() != null && post.getLikedBy().contains(currentUserId))
                .createdAt(post.getCreatedAt())
                .build();
    }
}
