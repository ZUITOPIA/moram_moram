package com.bojisa.moram.controller.board;

import com.bojisa.moram.entity.board.Board;
import com.bojisa.moram.entity.board.requestResponseDto.BoardResponseDto;
import com.bojisa.moram.entity.board.requestResponseDto.DiaryRequestDto;
import com.bojisa.moram.entity.board.requestResponseDto.DiaryResponseDto;
import com.bojisa.moram.entity.board.requestResponseDto.ImageRequestDto;
import com.bojisa.moram.service.BoardService;
import com.bojisa.moram.service.ImageService;
import lombok.RequiredArgsConstructor;
import org.springframework.core.io.UrlResource;
import org.springframework.web.bind.annotation.*;

import java.io.File;
import java.net.MalformedURLException;
import java.net.URI;
import java.util.*;

@RestController
@RequestMapping("/board")
@RequiredArgsConstructor
public class BoardController {

    private final BoardService boardService;
    private final ImageService imageService;

    @PostMapping("/makeBoard")
    public void makeBoard(@RequestBody DiaryRequestDto diaryRequestDto) {
        boardService.saveDiary(diaryRequestDto);

    }

    @PostMapping("/uploadDiary")
    public void uploadDiary(@RequestBody DiaryRequestDto diaryRequestDto) {
        boardService.saveDiary(diaryRequestDto);
        System.out.println(diaryRequestDto.getContents());
        System.out.println(diaryRequestDto.getDate());
        List<String> fileNames = diaryRequestDto.getFileNames();
        for (String name : fileNames) {
            System.out.println(name);
        }
    }

    //    @PostMapping("/uploadImage")
//    public void uploadImage(@RequestBody ImageRequestDto imageRequestDto) {
//
//        imageService.storeImage(imageRequestDto);
//
//    }
    @PostMapping("/uploadImage")
    public List<URI> uploadImage(@RequestBody List<ImageRequestDto> images) {
        List<URI> files = new ArrayList<>();
        for (ImageRequestDto image : images) {
            imageService.storeImage(image);
            File file = new File("src/main/resources/images/" + image.getFileName());
            files.add(file.toURI());
//            System.out.println(image.getUri());
//            System.out.println(image.getFileName());
        }
        return files;
    }

    @GetMapping("/getAllDiaries")
    public List<DiaryResponseDto> getAllDiaries() {
        return boardService.getAllDiaries();
    }

    @GetMapping("/getContents")
    public List<BoardResponseDto> getContents() {
        return boardService.getContents();
    }

    @GetMapping("/getImage")
    public void loadImage() {

        try {
            File file = new File("src/main/resources/images/주희1.png");
            UrlResource urlResource = new UrlResource(file.toURI());
            System.out.println(urlResource);
        } catch (MalformedURLException e) {

        }


//        try {
//            String uri = "http://192.168.0.12:8080/";
//            UrlResource urlResource = new UrlResource();
//            System.out.println(urlResource);
//        } catch (MalformedURLException e) {
//            throw new MalformedURLException("image not founr", e);
//        }
    }

}
