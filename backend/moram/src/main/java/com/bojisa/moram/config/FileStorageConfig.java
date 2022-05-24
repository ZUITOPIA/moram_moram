package com.bojisa.moram.config;

import lombok.Getter;
import lombok.Setter;
import org.springframework.boot.context.properties.ConfigurationProperties;

@ConfigurationProperties(prefix = "file")
@Getter @Setter
public class FileStorageConfig {

    private String uploadDir;

    private String uploadPictureDir;
}
