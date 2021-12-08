export interface addBoardDto {
    b_writer:  string;
    b_content: string;
    b_title:   string;
    b_flag:    number;
    g_name?:   string;
}

export interface modifyBoardDto {
    b_idx:    number;
    b_writer:  string;
    b_content: string;
    b_title:   string;
    b_flag:    number;
    g_name?:   string;
}

export interface setBoardFlagDto {
    b_idx:   number;
    b_flag:  number;
}

