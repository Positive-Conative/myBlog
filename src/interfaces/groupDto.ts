export interface addGroupDto {
    category:   { c_name: string };
    g_name:     string;
    g_memo?:    string;
    g_flag:     number;
}

export interface modifyGroupDto {
    category:   { c_name: string };
    g_name:     string;
    g_memo:     string;
}

export interface groupKeyDto {
    g_name:     string;
}

export const groupVarOpt = {
    category: {
        type:           'mapdata',
        key:            'c_name',
        min_size:       2,
        max_size:       15,
        blok_special:   true
    },
    g_name: {
        type:           'string',
        min_size:       2,
        max_size:       15,
        blok_special:   true
    },
    g_memo: {
        type:           'string',
        max_size:       50,
        blok_special:   true
    },
    g_flag: {
        type:           'number',
        must_include:   [0, 1],
        blok_special:   true
    },
}