package com.submerso.model;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

import java.time.LocalDateTime;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
@Document(collection = "dives")
public class Dive {
    
    @Id
    private String id;
    private String userId;
    private String location;
    private Integer depth;
    private Integer duration;
    private LocalDateTime diveDate;
    private LocalDateTime createdAt;
}
