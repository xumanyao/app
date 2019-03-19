export function redirectToPath({type,avator}) {
    let url = '';
    url = type === 'boss'?'/boss':'genius';
    if (!avator){
        url += '/info'
    }
    return url;
}