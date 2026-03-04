package com.submerso.service;

import com.cloudinary.Cloudinary;
import com.cloudinary.utils.ObjectUtils;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.util.HashMap;
import java.util.Map;

@Service
@RequiredArgsConstructor
public class CloudinaryService {

    private final Cloudinary cloudinary;

    /**
     * Sube un archivo a Cloudinary y devuelve un mapa con toda la información.
     */
    public Map uploadImage(MultipartFile file, String folderName, String userName) throws IOException {
        String folderPath = "submerso/" + folderName + "/" + userName; // Organizamos las fotos en carpetas en Cloudinary
        return cloudinary.uploader().upload(file.getBytes(),
                ObjectUtils.asMap(
                        "folder", folderPath
                ));
    }

    /**
     * Borra una imagen de Cloudinary usando su public_id.
     * Vital por si un usuario borra su publicación.
     */
    public Map deleteImage(String publicId) throws IOException {
        return cloudinary.uploader().destroy(publicId, ObjectUtils.emptyMap());
    }
}
