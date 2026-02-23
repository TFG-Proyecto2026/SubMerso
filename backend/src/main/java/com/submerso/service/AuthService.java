package com.submerso.service;

import com.submerso.dto.auth.AuthResponse;
import com.submerso.dto.auth.LoginRequest;
import com.submerso.dto.auth.RefreshTokenRequest;
import com.submerso.dto.auth.RegisterRequest;
import com.submerso.exception.CustomExceptions.InvalidTokenException;
import com.submerso.exception.CustomExceptions.ResourceAlreadyExistsException;
import com.submerso.exception.CustomExceptions.ResourceNotFoundException;
import com.submerso.model.Profile;
import com.submerso.model.User;
import com.submerso.repository.UserRepository;
import com.submerso.security.UserPrincipal;
import com.submerso.utils.JwtUtils;
import lombok.RequiredArgsConstructor;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.HashSet;
import java.util.Set;

@Service
@RequiredArgsConstructor
public class AuthService {
    
    private final UserRepository userRepository;
    private final PasswordEncoder passwordEncoder;
    private final JwtUtils jwtUtils;
    private final AuthenticationManager authenticationManager;
    
    @Transactional
    public AuthResponse register(RegisterRequest request) {
        if (userRepository.existsByEmail(request.getEmail())) {
            throw new ResourceAlreadyExistsException("Email already registered");
        }
        
        if (userRepository.existsByUsername(request.getUsername())) {
            throw new ResourceAlreadyExistsException("Username already taken");
        }
        
        Set<String> roles = new HashSet<>();
        roles.add("ROLE_USER");
        
        User user = User.builder()
                .email(request.getEmail())
                .username(request.getUsername())
                .password(passwordEncoder.encode(request.getPassword()))
                .firstName(request.getFirstName())
                .lastName(request.getLastName())
                .profile(new Profile())
                .roles(roles)
                .build();
        
        user = userRepository.save(user);
        
        UserPrincipal userPrincipal = UserPrincipal.create(user);
        String accessToken = jwtUtils.generateAccessToken(userPrincipal);
        String refreshToken = jwtUtils.generateRefreshToken(userPrincipal);
        
        user.setRefreshToken(refreshToken);
        userRepository.save(user);
        
        return buildAuthResponse(user, accessToken, refreshToken);
    }
    
    public AuthResponse login(LoginRequest request) {
        Authentication authentication = authenticationManager.authenticate(
                new UsernamePasswordAuthenticationToken(request.getEmail(), request.getPassword())
        );
        
        UserPrincipal userPrincipal = (UserPrincipal) authentication.getPrincipal();
        User user = userRepository.findByEmail(userPrincipal.getEmail())
                .orElseThrow(() -> new ResourceNotFoundException("User", "email", request.getEmail()));
        
        String accessToken = jwtUtils.generateAccessToken(userPrincipal);
        String refreshToken = jwtUtils.generateRefreshToken(userPrincipal);
        
        user.setRefreshToken(refreshToken);
        userRepository.save(user);
        
        return buildAuthResponse(user, accessToken, refreshToken);
    }
    
    @Transactional
    public AuthResponse refreshToken(RefreshTokenRequest request) {
        String refreshToken = request.getRefreshToken();
        
        if (!jwtUtils.validateToken(refreshToken)) {
            throw new InvalidTokenException("Invalid refresh token");
        }
        
        String email = jwtUtils.extractUsername(refreshToken);
        User user = userRepository.findByEmail(email)
                .orElseThrow(() -> new ResourceNotFoundException("User", "email", email));
        
        if (!refreshToken.equals(user.getRefreshToken())) {
            throw new InvalidTokenException("Refresh token does not match");
        }
        
        UserPrincipal userPrincipal = UserPrincipal.create(user);
        String newAccessToken = jwtUtils.generateAccessToken(userPrincipal);
        String newRefreshToken = jwtUtils.generateRefreshToken(userPrincipal);
        
        user.setRefreshToken(newRefreshToken);
        userRepository.save(user);
        
        return buildAuthResponse(user, newAccessToken, newRefreshToken);
    }
    
    @Transactional
    public void logout(String userId) {
        User user = userRepository.findById(userId)
                .orElseThrow(() -> new ResourceNotFoundException("User", "id", userId));
        user.setRefreshToken(null);
        userRepository.save(user);
    }
    
    private AuthResponse buildAuthResponse(User user, String accessToken, String refreshToken) {
        return AuthResponse.builder()
                .accessToken(accessToken)
                .refreshToken(refreshToken)
                .tokenType("Bearer")
                .expiresIn(jwtUtils.getJwtExpiration())
                .userId(user.getId())
                .email(user.getEmail())
                .username(user.getUsername())
                .roles(user.getRoles())
                .build();
    }
}
