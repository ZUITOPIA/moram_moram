package com.bojisa.moram.controller.board;

import com.bojisa.moram.entity.board.Board;
import com.bojisa.moram.entity.board.requestResponseDto.BoardRequestDto;
import com.bojisa.moram.entity.board.requestResponseDto.BoardResponseDto;
import com.bojisa.moram.entity.board.requestResponseDto.DiaryRequestDto;
import com.bojisa.moram.entity.board.requestResponseDto.ImageRequestDto;
import com.bojisa.moram.service.BoardService;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import javax.imageio.IIOException;
import javax.swing.filechooser.FileSystemView;
import java.io.File;
import java.io.FileOutputStream;
import java.io.IOException;
import java.util.Base64;
import java.util.HashMap;
import java.util.Map;

@RestController
@RequestMapping("/board")
@RequiredArgsConstructor
public class BoardController {

    private final BoardService boardService;

    @PostMapping("/makeBoard")
    public void makeBoard(@RequestBody DiaryRequestDto diaryRequestDto) {
        boardService.makeBoard(diaryRequestDto);

    }

    @PostMapping("/uploadImage")
    public void uploadImage(@RequestBody ImageRequestDto imageRequestDto) {

        String fileBase64 = imageRequestDto.getUri();


        if(fileBase64 == null || fileBase64.equals("")) {
            System.out.println("fileIsNull");
            return;
        }
        try {
            String fileName = "sample.png";

            File file = new File(FileSystemView.getFileSystemView().getHomeDirectory()
                    + "/app/resources/" + fileName);

            Base64.Decoder decoder = Base64.getDecoder();
            byte[] decodedBytes = decoder.decode(fileBase64.getBytes());
            FileOutputStream fileOutputStream = new FileOutputStream(file);
            fileOutputStream.write(decodedBytes);
            fileOutputStream.close();
        } catch (IOException e) {
            System.err.println(e);
        }
    }

}
