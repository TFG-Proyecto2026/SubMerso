package com.submerso.config;

import com.submerso.model.Offer;
import com.submerso.repository.OfferRepository;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.boot.CommandLineRunner;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

import java.util.List;

/**
 * Seeds demo offers on startup if the collection is empty.
 */
@Configuration
@RequiredArgsConstructor
@Slf4j
public class OfferSeeder {

    private final OfferRepository offerRepository;

    @Bean
    CommandLineRunner seedOffers() {
        return args -> {
            try {
                if (offerRepository.count() > 0) {
                    log.debug("Offers ya existen, no se hace seed.");
                    return;
                }

                List<Offer> offers = List.of(

                    Offer.builder()
                        .title("Bautismo de Buceo en Playa del Carmen")
                        .description("Tu primera inmersión guiada en el arrecife caribeño. Equipo completo incluido, instructor certificado PADI. Sin experiencia previa necesaria.")
                        .tags(List.of("bautismo", "principiante", "arrecife", "caribe"))
                        .category("Bautismo")
                        .price(65.0).currency("EUR")
                        .city("Playa del Carmen").country("México")
                        .imageUrl("imgs/Experiencia1.jpg")
                        .rating(4.9).reviewCount(214)
                        .centerName("Blue Abyss Dive Center").centerVerified(true)
                        .available(true).maxParticipants(6).durationMinutes(120)
                        .build(),

                    Offer.builder()
                        .title("Open Water PADI – Curso Completo")
                        .description("Certifícate con el curso Open Water más reconocido del mundo. 4 días de formación teórica y práctica en aguas abiertas con cenotes incluidos.")
                        .tags(List.of("open water", "certificacion", "padi", "curso"))
                        .category("Open Water")
                        .price(320.0).currency("EUR")
                        .city("Tulum").country("México")
                        .imageUrl("imgs/Experiencia5.jpg")
                        .rating(4.8).reviewCount(302)
                        .centerName("Cenote Divers Tulum").centerVerified(true)
                        .available(true).maxParticipants(4).durationMinutes(480)
                        .build(),

                    Offer.builder()
                        .title("Exploración de Naufragio – Pecio Umbria")
                        .description("Sumérgete en la historia del Umbria, uno de los naufragios más espectaculares del Mar Rojo. Requiere Advanced Open Water.")
                        .tags(List.of("naufragio", "avanzado", "historia", "mar rojo"))
                        .category("Naufragios")
                        .price(95.0).currency("EUR")
                        .city("Port Sudan").country("Sudán")
                        .imageUrl("imgs/Experiencia3.jpg")
                        .rating(4.7).reviewCount(97)
                        .centerName("Red Sea Explorers").centerVerified(true)
                        .available(true).maxParticipants(8).durationMinutes(180)
                        .build(),

                    Offer.builder()
                        .title("Inmersión Nocturna en el Mediterráneo")
                        .description("Descubre la vida marina que despierta al anochecer en las aguas cristalinas de Ibiza. Pulpos, morenas y estrellas de mar bajo la luna llena.")
                        .tags(List.of("nocturno", "mediterraneo", "vida marina", "ibiza"))
                        .category("Nocturno")
                        .price(55.0).currency("EUR")
                        .city("Ibiza").country("España")
                        .imageUrl("imgs/Experiencia6.jpg")
                        .rating(4.8).reviewCount(145)
                        .centerName("Azul Infinito").centerVerified(true)
                        .available(true).maxParticipants(6).durationMinutes(90)
                        .build(),

                    Offer.builder()
                        .title("Fotografía Submarina – Taller Intensivo")
                        .description("Aprende a capturar imágenes únicas bajo el agua con equipo fotográfico profesional. Instructor especializado en fotografía marina. Incluye CD con tus mejores fotos.")
                        .tags(List.of("fotografia", "taller", "camara", "costa brava"))
                        .category("Fotografía Submarina")
                        .price(120.0).currency("EUR")
                        .city("Llafranc").country("España")
                        .imageUrl("imgs/CostaBrava.jpg")
                        .rating(4.9).reviewCount(88)
                        .centerName("Costa Brava Divers").centerVerified(true)
                        .available(true).maxParticipants(4).durationMinutes(240)
                        .build(),

                    Offer.builder()
                        .title("Encuentro con Mantas Gigantes en Maldivas")
                        .description("Nada junto a las majestuosas mantas de arrecife en el atolón de Ari. Una experiencia irrepetible con una de las criaturas más elegantes del océano.")
                        .tags(List.of("manta", "vida marina", "maldivas", "arrecife"))
                        .category("Vida Marina")
                        .price(140.0).currency("EUR")
                        .city("Atolón Ari").country("Maldivas")
                        .imageUrl("imgs/Maldivas.png")
                        .rating(5.0).reviewCount(203)
                        .centerName("Maldives Ocean Divers").centerVerified(true)
                        .available(true).maxParticipants(6).durationMinutes(150)
                        .build(),

                    Offer.builder()
                        .title("Tiburones Toro en Bahamas – Full Day")
                        .description("Día completo buceando con tiburones toro en su hábitat natural. Briefing de seguridad exhaustivo, fotógrafo profesional incluido para inmortalizar el momento.")
                        .tags(List.of("tiburon", "bahamas", "avanzado", "pelagico"))
                        .category("Vida Marina")
                        .price(185.0).currency("EUR")
                        .city("Nassau").country("Bahamas")
                        .imageUrl("imgs/Experiencia4.jpg")
                        .rating(4.9).reviewCount(156)
                        .centerName("Bahamas Shark Dive").centerVerified(false)
                        .available(true).maxParticipants(8).durationMinutes(360)
                        .build(),

                    Offer.builder()
                        .title("Agujero Azul de Belice – Inmersión Legendaria")
                        .description("Una de las inmersiones más famosas del mundo. Desciende hasta 40m en el interior del Great Blue Hole y observa tiburones nodriza y formaciones de estalactitas prehistóricas.")
                        .tags(List.of("blue hole", "avanzado", "caribe", "belice", "profundidad"))
                        .category("Open Water")
                        .price(220.0).currency("EUR")
                        .city("Belize City").country("Belice")
                        .imageUrl("imgs/Experiencia2.jpg")
                        .rating(4.8).reviewCount(389)
                        .centerName("Blue Hole Expeditions").centerVerified(true)
                        .available(true).maxParticipants(10).durationMinutes(480)
                        .build(),

                    Offer.builder()
                        .title("Buceo en Cenotes – Tulum Misterioso")
                        .description("Sumérgete en los cenotes sagrados de los mayas. Rayos de luz, agua dulce cristalina y formaciones geológicas únicas en el mundo. Nivel Open Water recomendado.")
                        .tags(List.of("cenote", "caverna", "tulum", "mexico", "dulce"))
                        .category("Bautismo")
                        .price(78.0).currency("EUR")
                        .city("Tulum").country("México")
                        .imageUrl("imgs/Caribe.png")
                        .rating(4.8).reviewCount(312)
                        .centerName("Cenote Divers Tulum").centerVerified(true)
                        .available(true).maxParticipants(4).durationMinutes(180)
                        .build(),

                    Offer.builder()
                        .title("Volcán Submarino – Azores Discovery")
                        .description("Explora formaciones volcánicas únicas en el fondo del Atlántico norte. Una inmersión geológicamente fascinante con una biodiversidad sorprendente.")
                        .tags(List.of("volcan", "azores", "atlantico", "geologia"))
                        .category("Volcanes Submarinos")
                        .price(110.0).currency("EUR")
                        .city("Faial").country("Portugal")
                        .imageUrl("imgs/RajaAmpat.png")
                        .rating(4.6).reviewCount(64)
                        .centerName("Azores Deep Blue").centerVerified(false)
                        .available(true).maxParticipants(6).durationMinutes(200)
                        .build(),

                    Offer.builder()
                        .title("Islas Canarias – Pack 3 Inmersiones")
                        .description("Pack de tres inmersiones guiadas en los mejores puntos de buceo de Lanzarote: museo submarino, cueva del ángel y arrecife de Los Hervideros.")
                        .tags(List.of("canarias", "pack", "museo", "cueva", "lanzarote"))
                        .category("Islas")
                        .price(99.0).currency("EUR")
                        .city("Lanzarote").country("España")
                        .imageUrl("imgs/IslasCanarias.jpg")
                        .rating(4.7).reviewCount(178)
                        .centerName("Canarias Sub").centerVerified(true)
                        .available(true).maxParticipants(8).durationMinutes(300)
                        .build(),

                    Offer.builder()
                        .title("Mar Rojo – Inmersión en Dahab")
                        .description("Buceo en el famoso Blue Hole de Dahab y los jardines de coral de Eel Garden. Aguas cálidas, visibilidad excepcional y una concentración de vida marina increíble.")
                        .tags(List.of("mar rojo", "dahab", "arrecife", "coral", "egipto"))
                        .category("Vida Marina")
                        .price(48.0).currency("EUR")
                        .city("Dahab").country("Egipto")
                        .imageUrl("imgs/MarRojo.png")
                        .rating(4.7).reviewCount(198)
                        .centerName("Red Sea Explorers").centerVerified(true)
                        .available(true).maxParticipants(10).durationMinutes(120)
                        .build(),

                    Offer.builder()
                        .title("Naufragio Nocturno – Costa Brava")
                        .description("Experiencia doble: naufragio histórico + inmersión nocturna. Explora el pecio local al anochecer y descubre cómo cambia completamente el paisaje marino.")
                        .tags(List.of("naufragio", "nocturno", "costa brava", "mediterraneo"))
                        .category("Naufragios")
                        .price(75.0).currency("EUR")
                        .city("Roses").country("España")
                        .imageUrl("imgs/Baleares.png")
                        .rating(4.5).reviewCount(52)
                        .centerName("Costa Brava Divers").centerVerified(true)
                        .available(true).maxParticipants(6).durationMinutes(180)
                        .build(),

                    Offer.builder()
                        .title("Open Water + Advanced – Combo Filipinas")
                        .description("Certifícate con Open Water y Advanced en 8 días rodeado de la biodiversidad marina más rica del planeta. Tubbataha, Apo Island y Coron incluidos.")
                        .tags(List.of("open water", "advanced", "filipinas", "combo", "certificacion"))
                        .category("Open Water")
                        .price(580.0).currency("EUR")
                        .city("Coron").country("Filipinas")
                        .imageUrl("imgs/Filipinas.png")
                        .rating(4.9).reviewCount(71)
                        .centerName("Philippine Sea Divers").centerVerified(false)
                        .available(true).maxParticipants(4).durationMinutes(960)
                        .build()
                );

                offerRepository.saveAll(offers);
                log.info("Seed completado: {} ofertas insertadas.", offers.size());

            } catch (Exception e) {
                log.warn("No se pudo hacer seed de ofertas (¿MongoDB conectado?). La app arranca igual. Error: {}", e.getMessage());
            }
        };
    }
}
