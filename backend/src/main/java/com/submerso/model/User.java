package com.submerso.model;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.springframework.data.annotation.CreatedDate;
import org.springframework.data.annotation.Id;
import org.springframework.data.annotation.LastModifiedDate;
import org.springframework.data.mongodb.core.index.Indexed;
import org.springframework.data.mongodb.core.mapping.Document;

import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.HashSet;
import java.util.List;
import java.util.Set;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
@Document(collection = "users")
public class User {
    
    @Id
    private String id;
    
    @Indexed(unique = true)
    private String email;
    
    @Indexed(unique = true)
    private String username;
    
    private String password;
    
    private String firstName;
    private String lastName;
    
    @Builder.Default
    private Profile profile = new Profile();
    
    @Builder.Default
    private List<String> followers = new ArrayList<>();
    
    @Builder.Default
    private List<String> following = new ArrayList<>();
    
    @Builder.Default
    private Set<String> roles = new HashSet<>();
    
    @Builder.Default
    private Boolean enabled = true;
    
    @Builder.Default
    private Boolean accountNonLocked = true;
    
    private String refreshToken;
    
    @CreatedDate
    private LocalDateTime createdAt;
    
    @LastModifiedDate
    private LocalDateTime updatedAt;
}
