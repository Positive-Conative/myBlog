
/**
 * body data 데이터 확인 
 * @param bodyData 서버에서 받은 Body data 
 * @param checkOptions Body data의 키를 사용, 값으로는 옵션 값을 넣음.
 * @returns True - 통과 / FALSE - 에러
 */

function checkData(bodyData: any, checkOptions: any) {
    const chkArr: Array<string> = Object.keys(checkOptions);

    for(const checkItem of chkArr) {
        // bodyData[key] --> 비교 당할 데이터
        let target = bodyData[checkItem];
        if(target === undefined) continue;    // 없는거니까 그냥 넘김

        let selectedOption = checkOptions[checkItem]; 
        // Type check ==> Type 존재?
        if(selectedOption.hasOwnProperty('type') === true) {
            let type = selectedOption.type;

            // mapdata 형식
            if(type === 'mapdata') {
                target = target[checkOptions[checkItem].key];
                type = selectedOption.mapType;
            }

            // Min size check
            if(selectedOption.hasOwnProperty('min_size') === true) {
                const options = {
                    type:       type, 
                    size:       selectedOption.min_size,
                    data:       target,
                    separator:  'min',
                };

                if(intervalCheck(options) === false) {
                    console.log("최솟값 err", target);
                    return false;
                }
            }

            // Max size check
            if(selectedOption.hasOwnProperty('max_size') === true) {
                const options = {
                    type:       type, 
                    size:       selectedOption.max_size,
                    data:       target,
                    separator:  'max',
                };

                if(intervalCheck(options) === false) {
                    console.log("최댓값 err", target);
                    return false;
                }
            }

            // 특수문자 허용 여부 체크
            if(selectedOption.hasOwnProperty('blok_special') === true) {
                if(specialCharCheck(target) === false) {
                    console.log("특수문자 err", target);
                    return false;
                }
            }

            // 꼭 포함해야 하는 것이 있나?
            if(selectedOption.hasOwnProperty('must_include') === true) {
                if(selectedOption.must_include.indexOf(target) === -1) {
                    console.log("포함 값 err", target);
                    return false;
                } 
            }

            // 이메일 형식?
            if(selectedOption.hasOwnProperty('type_email') === true) {
                if(target.indexOf('@') === -1) {
                    console.log("이메일 err", target);
                    return false;
                }
            }
        }
    }

    return true;
}

/**
 * Min 값 체크
 * @param options type, min_size, data, separator
 * @returns True/False
 */
function intervalCheck(options: any) {
    const {
        type,       // String, Number 등
        size,       // 최솟값 -> String: 문자열크기, Number: 숫자값 기준
        separator,  // 최소? 최대?
    } = options;

    // 현재 값
    let { data } = options;
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

    // 삼항연산자 너무 김
    if(separator === 'min' && size > data) {
        return false;
    } else if(separator === 'max' && size < data) {
        return false;
    }
    
    return true;
}

// 특수문자 체크
function specialCharCheck(str: string) {
    if (str === undefined || str === '') {
        return false;
    }
    // 특수문자 Check
    const reg = /[\{\}\[\]\/?,;:|\)*~`!^\-_+<>\#$%&\\\=\(\'\"]/gi; // .(반점), @(골뱅) 제거
    // const reg = /[\{\}\[\]\/?.,;:|\)*~`!^\-_+<>@\#$%&\\\=\(\'\"]/gi;

    if (reg.test(str)) {  // 특수문자 있음
        return false;
        //   return str.replace(reg, "");  //특수문자 제거후 리턴
    }
    return true;
}

export default checkData;