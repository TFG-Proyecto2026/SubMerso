package com.submerso.model;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.springframework.data.annotation.CreatedDate;
import org.springframework.data.annotation.Id;
import org.springframework.data.annotation.LastModifiedDate;
import org.springframework.data.mongodb.core.mapping.Document;

import java.util.ArrayList;
import java.util.List;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
@Document(collection = "posts")
public class Post {

    @Id
    private String id;

    // --- Datos del Autor (Desnormalizados para mayor velocidad) ---
    private String userId;
    private String authorUsername;
    private String authorAvatar;

    // --- Contenido Multimedia (Cloudinary) ---
    private String imageUrl;
    private String imagePublicId; // Código secreto para poder borrar la foto luego

    // --- Contenido de Texto ---
    private String caption;
    private String location;

    @Builder.Default // Etiqueta no guardar nulos en la base de datos, sino listas vacías
    private List<String> tags = new ArrayList<>(); // Etiquetas para búsquedas (ej: "#buceo", "#mar")

    private String linkedDiveId; // ID del Logbook (si quiere enlazar su inmersión)

    // --- Interacciones ---
    @Builder.Default
    private List<String> likedBy = new ArrayList<>(); // IDs de usuarios que le han dado like

    // --- Metadatos de Tiempo ---
    // Datos de tipo Long para almacenar timestamps en milisegundos, más eficientes que LocalDateTime
    @CreatedDate
    private Long createdAt;

    @LastModifiedDate
    private Long updatedAt;
}
