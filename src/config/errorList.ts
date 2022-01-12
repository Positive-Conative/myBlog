module.exports = {    
    "readme": {
        "사용자 오류": "1XX",
        "서버 오류": "2XX",
        "제작 시..": {
            1: "일관성을 없애기 위해 제작 순서대로 함"
        }
    },
    "default": {
        "code": "001",
        "httpStatus": "404",
        "clientMsg": "알 수 없는 오류가 발생하였습니다."
    },

    // Client's ERR
    "API001": {
        "code": "001",
        "httpStatus": "400",
        "clientMsg": "빈 데이터가 입력되었습니다."
    },
    "API002": {
        "code": "002",
        "httpStatus": "400",
        "clientMsg": "형식에 맞지 않는 데이터가 입력되었습니다."
    },
    "API003": {
        "code": "003",
        "httpStatus": "400",
        "clientMsg": "사용할 수 없는 특수 문자가 입력되었습니다."
    },

    // Already exists
    "API100": {
        "code": "100",
        "httpStatus": "403",
        "clientMsg": "해당 사용자가 이미 존재합니다."
    },
    "API101": {
        "code": "101",
        "httpStatus": "403",
        "clientMsg": "해당 그룹이 이미 존재합니다."
    },
    "API102": {
        "code": "102",
        "httpStatus": "403",
        "clientMsg": "해당 카테고리가 이미 존재합니다."
    },

    // Data does not exist
    "API200": {
        "code": "200",
        "httpStatus": "404",
        "clientMsg": "해당 사용자가 존재하지 않습니다."
    },
    "API201": {
        "code": "201",
        "httpStatus": "404",
        "clientMsg": "해당 그룹이 존재하지 않습니다."
    },
    "API202": {
        "code": "202",
        "httpStatus": "404",
        "clientMsg": "해당 게시글이 존재하지 않습니다."
    },
    "API203": {
        "code": "203",
        "httpStatus": "404",
        "clientMsg": "해당 카테고리가 존재하지 않습니다."
    },

    // Hide data
    "API300": {
        "code": "300",
        "httpStatus": "404",
        "clientMsg": "비공개 처리된 유저입니다."
    },
    "API301": {
        "code": "301",
        "httpStatus": "404",
        "clientMsg": "비공개 처리된 그룹입니다."
    },
    "API302": {
        "code": "302",
        "httpStatus": "404",
        "clientMsg": "비공개 처리된 게시물입니다."
    },

    // User 관련 error
    "API400": {
        "code": "400",
        "httpStatus": "404",
        "clientMsg": "이메일 인증이 되지 않은 유저입니다."
    },
    "API401": {
        "code": "401",
        "httpStatus": "404",
        "clientMsg": "휴면 계정입니다."
    },
    "API402": {
        "code": "402",
        "httpStatus": "404",
        "clientMsg": "탈퇴 예정 계정입니다."
    },
    "API403": {
        "code": "403",
        "httpStatus": "404",
        "clientMsg": "본인이 작성한 글만 삭제할 수 있습니다."
    },

    // Server's ERR
    "API990": {
        "code": "990",
        "httpStatus": "500",
        "clientMsg": "서버 측 데이터베이스에 오류가 발생했습니다."
    },
    "API999": {
        "code": "999",
        "httpStatus": "500",
        "clientMsg": "알 수 없는 오류가 발생했습니다."
    }
}