package com.submerso.config;

import com.mongodb.ConnectionString;
import com.mongodb.MongoCredential;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.data.mongodb.config.EnableMongoAuditing;
import org.springframework.data.mongodb.repository.config.EnableMongoRepositories;

import java.util.regex.Matcher;
import java.util.regex.Pattern;

@Configuration
@EnableMongoAuditing
@EnableMongoRepositories(basePackages = "com.submerso.repository")
public class MongoConfig {

    /** Extrae usuario de URI tipo mongodb+srv://USER:PASSWORD@host/... */
    private static String extractUsernameFromUri(String uri) {
        Matcher m = Pattern.compile("://([^:]+):").matcher(uri);
        return m.find() ? m.group(1) : null;
    }

    /**
     * Fuerza SCRAM-SHA-256 para Atlas y corrige usuario/authSource por si el driver los interpreta mal.
     */
    @Bean
    org.springframework.boot.autoconfigure.mongo.MongoClientSettingsBuilderCustomizer scramSha256Customizer(
            @Value("${MONGO_URI}") String uri) {
        ConnectionString cs = new ConnectionString(uri);
        MongoCredential cred = cs.getCredential();
        if (cred == null) {
            return builder -> {};
        }
        String username = extractUsernameFromUri(uri);
        if (username == null) {
            username = cred.getUserName();
        }
        String authSource = "admin";
        MongoCredential sha256 = MongoCredential.createScramSha256Credential(
                authSource,
                username,
                cred.getPassword());
        return builder -> builder.credential(sha256);
    }
}
