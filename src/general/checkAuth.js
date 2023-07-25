import Cookies from 'universal-cookie';

function checkAutherization(){


    const cookieReader = new Cookies()
    const img_dir = localStorage.getItem('img_dir')
    const name = localStorage.getItem('name')
    const classroom = localStorage.getItem('classroom')
    const roleCookie = cookieReader.get('role')
    const roleLocal = localStorage.getItem('role')
    const endpoints = window.location.pathname.split("/")
    console.log(endpoints)
    if (endpoints[1] !== roleCookie && roleCookie === roleLocal){
        window.location.href = roleLocal
        return "notAuth"
    }
    // console.log("img_dir: ",img_dir," ,name: ",name," ,classroom: ",classroom," roleCookie: ",roleCookie," ,roleLocal: ",roleLocal," ,Role Check: ",roleCookie !==roleLocal)
    if((classroom === null && roleLocal ==='student') || name === null || img_dir ===null || cookieReader.get('jwt') === undefined || roleCookie !==roleLocal || roleCookie === undefined){
        return "notAuth"
    }else{
        return "Auth"
    }
        

}


export default checkAutherization