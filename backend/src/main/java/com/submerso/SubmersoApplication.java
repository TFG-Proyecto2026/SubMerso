package com.submerso;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.data.mongodb.config.EnableMongoAuditing;

@SpringBootApplication
@EnableMongoAuditing // Para generar fechas
public class SubmersoApplication {

    public static void main(String[] args) {
        SpringApplication.run(SubmersoApplication.class, args);
    }
}
