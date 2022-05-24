package com.bojisa.moram.service;

import com.bojisa.moram.config.FileStorageConfig;
import com.bojisa.moram.entity.board.Image;
import com.bojisa.moram.entity.board.requestResponseDto.ImageRequestDto;
import com.bojisa.moram.exception.FileUploadException;
import com.bojisa.moram.repository.board.ImageRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.core.io.UrlResource;
import org.springframework.stereotype.Service;

import java.io.File;
import java.io.FileOutputStream;
import java.io.IOException;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.util.Base64;

@Service
@RequiredArgsConstructor
public class ImageService {

    private final ImageRepository imageRepository;


    public void storeImage(ImageRequestDto imageRequestDto) {
        String imageName = imageRequestDto.getFileName();
        String imageBase64 = imageRequestDto.getUri();
        String userDirectory = new File("").getAbsolutePath();

        try {
            File file = new File(userDirectory + "/src/main/resources/images/" + imageName);

            Base64.Decoder decoder = Base64.getDecoder();
            byte[] decodedBytes = decoder.decode(imageBase64.getBytes());
            FileOutputStream fileOutputStream = new FileOutputStream(file);
            fileOutputStream.write(decodedBytes);
            fileOutputStream.close();

        } catch (IOException e) {
            System.out.println(e);
        }

    }

}
