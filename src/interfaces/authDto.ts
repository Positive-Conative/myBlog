export interface addAuthDto {
    // id?:number;
    u_email:        string;
    u_password:     string;
    u_name:         string;
    u_nickname:     string;
    u_flag:         number;
    u_permission:   string;
}

export interface modifyAuthDto {
    // id?:number;
    u_email:    string;
    u_password: string;
    u_name:     string;
    u_nickname: string;
}

export interface setAuthFlagDto {
    u_email: string;
    u_flag:  number;
}