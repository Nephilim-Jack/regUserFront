const cookieName = process.env.REACT_APP_SESSION_COOKIE_NAME

export const createUserSession = (cookieData: string) => {
    document.cookie = `${cookieName}=${cookieData}`
}

export const getUserSession = () => {
    const documentCookies = document.cookie.split('; ')
    for (let cookieIndex = 0; cookieIndex < documentCookies.length; cookieIndex++) {
        const [currentCookieName, currentCookieValue] = documentCookies[cookieIndex].split('=')
        if (currentCookieName === cookieName) {
            return currentCookieValue
        }
    }
    return -1
}

export const deleteUserSession = () => {
    const currentDate = new Date()
    currentDate.setTime(currentDate.getTime() + (-1*24*60*60*1000))
    document.cookie = `${cookieName}=;expires=${currentDate}`
}