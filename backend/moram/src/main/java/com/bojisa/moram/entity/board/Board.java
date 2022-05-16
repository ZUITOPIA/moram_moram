package com.bojisa.moram.entity.board;

import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

import javax.persistence.*;
import java.time.LocalDateTime;

@Getter
@NoArgsConstructor
@Entity
public class Board {

    @Id
    @Column(name = "board_id")
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String date;

    private String contents;

    private final LocalDateTime insertTime = LocalDateTime.now();

    @Builder
    public Board(String date, String contents) {
        this.date = date;
        this.contents = contents;
    }
}
