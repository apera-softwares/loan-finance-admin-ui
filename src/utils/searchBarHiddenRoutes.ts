
export const searchBarHiddenRoutes = ["/","/request-withdrawal","/profile"];

export function shouldHideSearchBar(pathname: string): boolean {

    return searchBarHiddenRoutes.some((route) => pathname === route);
    
}