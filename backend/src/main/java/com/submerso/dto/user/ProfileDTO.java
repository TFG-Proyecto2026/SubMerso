package com.submerso.dto.user;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.List;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class ProfileDTO {
    
    private String bio;
    private String avatar;
    private String location;
    private List<String> certifications;
    private Integer totalDives;
    private List<String> badges;
    private String website;
    private String phoneNumber;
}
