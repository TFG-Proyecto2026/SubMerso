package com.submerso.dto.user;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDateTime;
import java.util.Set;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class UserDTO {
    
    private String id;
    private String email;
    private String username;
    private String firstName;
    private String lastName;
    private ProfileDTO profile;
    private Integer followersCount;
    private Integer followingCount;
    private Set<String> roles;
    private LocalDateTime createdAt;
}
