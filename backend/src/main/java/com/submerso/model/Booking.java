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
    private String offerId;
    private String offerTitle;
    private String userId;
    private String date;
    private Integer participants;
    private Double totalPrice;
    private String status;
    private String notes;
    private LocalDateTime createdAt;
}
