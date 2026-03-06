package com.submerso.dto.marketplace;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class BookingDTO {
    private String id;
    private String offerId;
    private String offerTitle;
    private String userId;
    private String date;
    private Integer participants;
    private Double totalPrice;
    private String status;
    private String notes;
}
