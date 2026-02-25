package com.submerso.config;

import com.submerso.model.Profile;
import com.submerso.model.User;
import com.submerso.repository.UserRepository;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.boot.CommandLineRunner;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.crypto.password.PasswordEncoder;

import java.util.Set;

/**
 * Crea el usuario admin por defecto al arrancar si no existe.
 * Credenciales: admin@submerso.com / Admin.1234
 */
@Configuration
@RequiredArgsConstructor
@Slf4j
public class AdminUserSeeder {

    private static final String ADMIN_EMAIL = "admin@submerso.com";
    private static final String ADMIN_USERNAME = "admin";
    private static final String ADMIN_PASSWORD = "Admin.1234";
    private static final String ADMIN_FIRST_NAME = "admin";
    private static final String ADMIN_LAST_NAME = "CSM";

    private final UserRepository userRepository;
    private final PasswordEncoder passwordEncoder;

    @Bean
    CommandLineRunner createAdminUserIfMissing() {
        return args -> {
            if (userRepository.existsByEmail(ADMIN_EMAIL)) {
                log.debug("Usuario admin ya existe, no se crea.");
                return;
            }
            User admin = User.builder()
                    .email(ADMIN_EMAIL)
                    .username(ADMIN_USERNAME)
                    .password(passwordEncoder.encode(ADMIN_PASSWORD))
                    .firstName(ADMIN_FIRST_NAME)
                    .lastName(ADMIN_LAST_NAME)
                    .profile(new Profile())
                    .roles(Set.of("ROLE_USER", "ROLE_ADMIN"))
                    .enabled(true)
                    .accountNonLocked(true)
                    .build();
            userRepository.save(admin);
            log.info("Usuario admin creado. Inicia sesión con: {} / {}", ADMIN_EMAIL, ADMIN_PASSWORD);
        };
    }
}
