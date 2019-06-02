export interface addBoardDto {
    group:     { g_name:  string };
    user:      { u_email: string };
    b_title:   string;
    b_content: string;
    b_flag:    number;
}

// todo: 수정이 생길때마다 이렇게 일일히 수정해야하나.. 이걸 따로 한 파일에 모을까..
// 우선 이렇게 작업하고 추후 생각해보기로..

export const boardVarOpt = {
    group: {
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
        blok_special:   true,
        type_email:     true
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