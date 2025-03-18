import Cookies from "../../node_modules/@types/js-cookie";


// export const removeCookie = (name : string) => {
//     document.cookie = `${name}=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;`
// }
export const removeCookie = (name : string) => {
    Cookies.remove(name)
}