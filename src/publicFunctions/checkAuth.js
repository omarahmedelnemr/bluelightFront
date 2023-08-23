
function checkAutherization(){


    const img_dir = localStorage.getItem('img_dir')
    const name = localStorage.getItem('name')
    const classroom = localStorage.getItem('classroom')
    const roleLocal = localStorage.getItem('role')

    if((classroom === null && roleLocal ==='student') || name === null || img_dir ===null){
        return "notAuth"
    }else{
        return "Auth"
    }
        

}


export default checkAutherization