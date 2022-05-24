package com.bojisa.moram.entity.board.requestResponseDto;

import com.bojisa.moram.entity.board.Board;
import com.bojisa.moram.entity.board.Hashtag;
import lombok.Getter;
import lombok.NoArgsConstructor;

@Getter
@NoArgsConstructor
public class HashtagRequestDto {

    private String tag;

    public Hashtag toEntity(Board board, String tag) {
        return Hashtag.builder()
                .tag(tag)
                .board(board)
                .build();
    }
}
