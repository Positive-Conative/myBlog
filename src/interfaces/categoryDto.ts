export interface addCategoryDto {
    c_name:  string;
    c_memo:  string;
}

export interface modifyCategoryDto {
    c_idx :     number;
    c_newName:  string;
    c_name:     string;
    c_memo:     string;
}

// export interface categoryKeyDto {
//     c_name:  string;
//     // c_idx :  number;
// }

export interface categoryKeyDto {
    c_name?:  string;
    c_idx ?:  number;
}

export const categoryVarOpt = {
    c_idx: {
        type:           'number',
        min_size:       0,
    },
    c_name: {
        type:           'string',
        min_size:       2,
        max_size:       20,
        blok_special:   true
    },
    c_newName: {
        type:           'string',
        min_size:       2,
        max_size:       20,
        blok_special:   true
    },
    c_memo: {
        type:           'string',
        max_size:       50,
        blok_special:   true
    },
}