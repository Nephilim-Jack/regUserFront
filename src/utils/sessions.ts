const refreshCookieName = process.env.REACT_APP_REFRESH_TOKEN_COOKIE_NAME
const accessCookieName = process.env.REACT_APP_ACCESS_TOKEN_COOKIE_NAME

export const createUserSession = (cookieName: string, cookieData: string) => {
    document.cookie = `${cookieName}=${cookieData}`
}

export const getUserSession = (cookieName: string, ) => {
    const documentCookies = document.cookie.split('; ')
    for (let cookieIndex = 0; cookieIndex < documentCookies.length; cookieIndex++) {
        const [currentCookieName, currentCookieValue] = documentCookies[cookieIndex].split('=')
        if (currentCookieName === cookieName) {
            return currentCookieValue
        }
    }
    return -1
}

export const deleteUserSession = (cookieName: string, ) => {
    const currentDate = new Date()
    currentDate.setTime(currentDate.getTime() + (-1*24*60*60*1000))
    document.cookie = `${cookieName}=;expires=${currentDate}`
}

export {refreshCookieName, accessCookieName}