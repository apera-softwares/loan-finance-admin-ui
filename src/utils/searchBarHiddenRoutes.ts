
export const searchBarHiddenRoutes = ["/","/request-withdrawal"];

export function shouldHideSearchBar(pathname: string): boolean {

    return searchBarHiddenRoutes.some((route) => pathname === route);
    
}