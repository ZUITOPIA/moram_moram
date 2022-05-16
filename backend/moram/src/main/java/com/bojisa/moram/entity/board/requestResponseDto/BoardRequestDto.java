package com.bojisa.moram.entity.board.requestResponseDto;

import com.bojisa.moram.entity.board.Board;
import lombok.Getter;
import lombok.NoArgsConstructor;

@Getter
@NoArgsConstructor
public class BoardRequestDto {

    private String date;

    private String contents;

    public Board toEntity() {
        return Board.builder()
                .date(date)
                .contents(contents)
                .build();
    }

}
