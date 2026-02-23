package com.submerso.model;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.ArrayList;
import java.util.List;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class Profile {
    
    private String bio;
    private String avatar;
    private String location;
    
    @Builder.Default
    private List<String> certifications = new ArrayList<>();
    
    @Builder.Default
    private Integer totalDives = 0;
    
    @Builder.Default
    private List<String> badges = new ArrayList<>();
    
    private String website;
    private String phoneNumber;
}
