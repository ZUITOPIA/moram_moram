package com.bojisa.moram;

import com.bojisa.moram.config.FileStorageConfig;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.boot.context.properties.EnableConfigurationProperties;

@SpringBootApplication
@EnableConfigurationProperties({FileStorageConfig.class})
public class MoramApplication {

	public static void main(String[] args) {
		SpringApplication.run(MoramApplication.class, args);
	}

}
