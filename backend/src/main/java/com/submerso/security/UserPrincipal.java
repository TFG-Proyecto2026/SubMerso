package com.submerso.security;

import com.submerso.model.User;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.userdetails.UserDetails;

import java.util.Collection;
import java.util.stream.Collectors;

@Data
@Builder
@AllArgsConstructor
public class UserPrincipal implements UserDetails {
    
    private String id;
    private String email;
    private String username;
    private String password;
    private Collection<? extends GrantedAuthority> authorities;
    private boolean enabled;
    private boolean accountNonLocked;
    
    public static UserPrincipal create(User user) {
        Collection<GrantedAuthority> authorities = user.getRoles().stream()
                .map(SimpleGrantedAuthority::new)
                .collect(Collectors.toList());
        
        return UserPrincipal.builder()
                .id(user.getId())
                .email(user.getEmail())
                .username(user.getUsername())
                .password(user.getPassword())
                .authorities(authorities)
                .enabled(user.getEnabled())
                .accountNonLocked(user.getAccountNonLocked())
                .build();
    }
    
    @Override
    public Collection<? extends GrantedAuthority> getAuthorities() {
        return authorities;
    }
    
    @Override
    public String getPassword() {
        return password;
    }
    
    @Override
    public String getUsername() {
        return username;
    }
    
    @Override
    public boolean isAccountNonExpired() {
        return true;
    }
    
    @Override
    public boolean isAccountNonLocked() {
        return accountNonLocked;
    }
    
    @Override
    public boolean isCredentialsNonExpired() {
        return true;
    }
    
    @Override
    public boolean isEnabled() {
        return enabled;
    }
}
