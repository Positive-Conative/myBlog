export interface addAuthDto {
    // id?:number;
    u_email:        string;
    u_password:     string;
    u_name:         string;
    u_nickname:     string;
    u_flag:         number;
    u_permission:   string;
}

export interface authKeyDto {
    u_email:        string;
}

export interface setAuthFlagDto {
    u_email:        string;
    u_flag:         number;
}

export interface modifyAuthDto {
    u_email:        string;
    u_password:     string;
    u_name:         string;
    u_nickname:     string;
}

export const authVarOpt = {
    u_email: {
        type:           'string',
        min_size:       2,
        max_size:       50,
        blok_special:   true,
        type_email:     true
    },
    u_password: {
        type:           'string',
        min_size:       2,
        max_size:       20,
        blok_special:   true
    },
    u_name: {
        type:           'string',
        min_size:       2,
        max_size:       20,
        blok_special:   true
    },
    u_nickname: {
        type:           'string',
        min_size:       2,
        max_size:       30,
        blok_special:   true
    },
    u_flag: {
        type:           'number',
        must_include:   [-1, 0, 1, 2],
        blok_special:   true
    },
    u_permission: {
        type:           'string',
        min_size:       2,
        max_size:       20,
        blok_special:   true
    },
}


// export interface modifyAuthDto {
//     // id?:number;
//     u_email:    string;
//     u_password: string;
//     u_name:     string;
//     u_nickname: string;
// }

// export interface setAuthFlagDto {
//     u_email: string;
//     u_flag:  number;
// }