export const setCookie=(name,value)=>{
    const date = new Date()
    date.setTime(date.getTime() +(1*24*60*60*1000))
    let expires = "expires="+date.toUTCString()
    document.cookie = name+"="+value+";"+expires
}

export const getCookie=(cname)=>{
    let name = cname +"="
    let decodedCookie = decodeURIComponent(document.cookie)
    let ca = decodedCookie.split(';')
    for(let i = 0;i<ca.length;i++){
        let c = ca[i]
        while(c.charAt(0) == ' '){
            c = c.substring(1)
        }
        if (c.indexOf(name)==0){
            return c.substring(name.length,c.length)
        }
    }
    return ''
}

export const removeCookie=(name)=>{
    document.cookie = name+"="+";expires=sun, 18 dec 2022 00:00:00 UTC"
}