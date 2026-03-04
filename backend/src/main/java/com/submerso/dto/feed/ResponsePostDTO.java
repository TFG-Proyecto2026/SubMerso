package com.submerso.dto.feed;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.List;

@Data
@Builder
@AllArgsConstructor
@NoArgsConstructor
public class ResponsePostDTO {
    private String id;
    private String authorUsername;
    private String authorAvatar;
    private String imageUrl; // Angular usará esto en el <img src="...">
    private String caption;
    private String location;
    private List<String> tags;
    private String linkedDiveId;
    private int likesCount; // Solo mandamos el número, no la lista entera de IDs
    private boolean isLikedByMe; // Para que Angular sepa si pintar el corazón rojo o vacío
    private Long createdAt;
}
