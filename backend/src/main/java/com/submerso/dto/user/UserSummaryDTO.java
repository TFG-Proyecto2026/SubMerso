package com.submerso.dto.user;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class UserSummaryDTO {
    
    private String id;
    private String username;
    private String firstName;
    private String lastName;
    private String avatar;
    private String bio;
}
