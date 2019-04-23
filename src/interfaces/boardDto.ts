export interface addBoardDto {
    group:     { g_name:  string };
    user:      { u_email: string };
    b_writer:  string;
    b_title:   string;
    b_content: string;
    b_flag:    number;
}

export const boardVarOpt = {
    category: {
        type:           'mapdata',
        key:            'g_name',
        min_size:       2,
        max_size:       15,
        blok_special:   true
    },
    user: {
        type:           'mapdata',
        key:            'u_email',
        min_size:       2,
        max_size:       50,
        blok_special:   true
    },
    b_writer: {
        type:           'string',
        min_size:       2,
        max_size:       30,
        blok_special:   true
    },
    b_title: {
        type:           'string',
        min_size:       2,
        max_size:       30,
        blok_special:   true
    },
    b_content: {
        type:           'string',
        min_size:       2
    },
    b_flag: {
        type:           'number',
        must_include:   [0, 1],
        blok_special:   true
    },
}