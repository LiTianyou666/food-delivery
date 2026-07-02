// Phone input mask: +7 (xxx) xxx-xx-xx
export function bindPhoneMask(inputDom) {
    inputDom.addEventListener('input', (e) => {
        let raw = e.target.value.replace(/\D/g, '');
        if (raw.length > 10) raw = raw.slice(0, 10);
        let maskStr = '+7 (';
        if (raw.length >= 3) {
            maskStr += raw.slice(0,3) + ') ';
        } else {
            maskStr += raw;
        }
        if (raw.length >= 6) maskStr += raw.slice(3,6) + '-';
        else if (raw.length > 3) maskStr += raw.slice(3);
        if (raw.length >= 8) maskStr += raw.slice(6,8) + '-';
        else if (raw.length > 6) maskStr += raw.slice(6);
        if (raw.length >= 10) maskStr += raw.slice(8);
        e.target.value = maskStr;
    });
}