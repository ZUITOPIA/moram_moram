package com.bojisa.moram.entity.board.requestResponseDto;

import com.bojisa.moram.entity.board.Board;
import com.bojisa.moram.entity.board.Image;
import lombok.Getter;
import lombok.NoArgsConstructor;

@Getter
@NoArgsConstructor
public class ImageRequestDto {

    private String uri;

    private String fileName;
    private Board board;

    public Image toEntity(Board board, String fileName) {
        return Image.builder()
                .filename(fileName)
                .board(board)
                .build();
    }

}
