package com.bojisa.moram.entity.board.requestResponseDto;

import com.bojisa.moram.entity.board.Board;
import com.bojisa.moram.entity.board.Image;
import lombok.Getter;
import lombok.NoArgsConstructor;

@Getter
@NoArgsConstructor
public class ImageRequestDto {

    private String uri;

    private Board board;

    public Image toEntity() {
        return Image.builder()
                .uri(uri)
                .board(board)
                .build();
    }

}
