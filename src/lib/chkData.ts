
/**
 * body data 데이터 확인 
 * @param bodyData 서버에서 받은 Body data 
 * @param checkOptions Body data의 키를 사용, 값으로는 옵션 값을 넣음.
 * @returns True - 통과 / FALSE - 에러
 */

function chkData(bodyData: any, checkOptions: any) {
    const chkArr: Array<string> = Object.keys(checkOptions);

    for(const key of chkArr) {
        const selected = checkOptions[key];

        // Type check ==> Type 있으면 
        if(selected.hasOwnProperty('type') === true) {

            // Min size check
            if(selected.hasOwnProperty('min_size') === true) {
                const options = {
                    type:       selected.type, 
                    min_size:   selected.min_size,
                    data:       bodyData[key],
                };

                if(minCheck(options) === false) {
                    return false;
                }
            }
        }
    }

    return true;
}

/**
 * Min 값 체크
 * @param options type, min_size, data 
 * @returns True/False
 */
function minCheck(options: any) {
    const {
        type,       // String, Number 등
        min_size,   // 최솟값 -> String: 문자열크기, Number: 숫자값 기준
    } = options;

    // 현재 값
    let { data } = options;
    
    let min = 0;
    console.log(type)
    switch(type) {
        case 'string':
            data = data.toString().length;
            break;

        case 'number':
            data = parseInt(data, 10);
            break;

        default:
            return false;
    }

    if(min_size > data) {
        return false
    }
    
    return true;
}

// function chkSpecialChar(str: string) {
//     if (str === undefined || str === '') {
//         return false;
//     }
//     // 특수문자 Check
//     const reg = /[\{\}\[\]\/?.,;:|\)*~`!^\-_+<>@\#$%&\\\=\(\'\"]/gi;
//     if (reg.test(str)) {  // 특수문자 있음
//         return false;
//         //   return str.replace(reg, "");  //특수문자 제거후 리턴
//     }
//     return true;
// }



export default chkData;