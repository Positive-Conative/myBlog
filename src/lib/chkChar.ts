function chkChar(recvData: object | string) {
    if(typeof recvData === 'object') {
        const bodyArr: Array<any> = Object.values(recvData);

        for(const val of bodyArr) {
            if (chkSpecialChar(val) === false) {
                return false;
            }
        }
        return true;

    } else if(typeof recvData === 'string') {
       return chkSpecialChar(recvData);
    }
}

function chkSpecialChar(str: string) {
    if (str === undefined || str === '') {
        return false;
    }
    // 특수문자 Check
    const reg = /[\{\}\[\]\/?.,;:|\)*~`!^\-_+<>@\#$%&\\\=\(\'\"]/gi;
    if (reg.test(str)) {  // 특수문자 있음
        return false;
        //   return str.replace(reg, "");  //특수문자 제거후 리턴
    }
    return true;
}



export default chkChar;