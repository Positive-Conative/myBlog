export interface addBoardDto {
    group:     { g_idx:  number };
    user:      { u_email: string };
    b_title:   string;
    b_content: string;
    b_flag:    number;
}

export interface boardKeyDto {
    b_idx?: number;
}

export interface setBoardFlagDto {
    b_idx:  number;
    b_flag: number;
}

export interface modifyBoardDto {
    group:     { g_idx:  number };
    user:      { u_email: string };
    b_idx:     number;
    b_title:   string;
    b_content: string;
    b_flag:    number;
}

export interface newBoardDto {
    standard:   number;
    interval:   number;
}


// todo: 수정이 생길때마다 이렇게 일일히 수정해야하나.. 이걸 따로 한 파일에 모을까..
// 우선 이렇게 작업하고 추후 생각해보기로..

export const boardVarOpt = {
    group: {
        type:           'mapdata',
        mapType:        'number',
        key:            'g_idx',
        min_size:       0,
        blok_special:   true
    },
    user: {
        type:           'mapdata',
        mapType:        'string',
        key:            'u_email',
        min_size:       2,
        max_size:       50,
        blok_special:   true,
        type_email:     true
    },
    b_idx: {
        type:           'number',
        min_size:       0,
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
    standard: {
        type:           'number',
        min_size:       -1,
        blok_special:   true
    },
    interval: {
        type:           'number',
        must_include:   [3, 5, 10],
        blok_special:   true
    },
}