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
@Document(collection = "bookings")
public class Booking {
    
    @Id
    private String id;
    private String userId;
    private String serviceId;
    private String status;
    private LocalDateTime bookingDate;
    private LocalDateTime createdAt;
}
