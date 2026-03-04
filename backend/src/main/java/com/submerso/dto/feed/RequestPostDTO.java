package com.submerso.dto.feed;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.springframework.web.multipart.MultipartFile;

import java.util.List;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class RequestPostDTO {
    private MultipartFile image;
    private String caption;
    private String location;
    private List<String> tags;
    private String linkedDiveId;
}
