
export function setCookie(name: string, value: string, days: number) {
	const expires = new Date(Date.now() + days * 864e5).toUTCString(); // 864e5 = 86400000 ms (1 day)
	document.cookie = `${name}=${encodeURIComponent(value)}; expires=${expires}; path=/`;
    
}
export function getCookie(name: string): string | null {
	const match = document.cookie.match(new RegExp("(^| )" + name + "=([^;]+)"));
	return match ? decodeURIComponent(match[2]) : null;
}
