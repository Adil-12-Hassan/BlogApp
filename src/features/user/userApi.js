import API_BASE_URL from '../../lib/api';

export const USER_TOKEN_KEY = 'cwh_user_token';

export async function userRequest(path, options = {}) {
    const token = localStorage.getItem(USER_TOKEN_KEY);
    const response = await fetch(`${API_BASE_URL}${path}`, {
        ...options,
        headers: {
            ...(options.body ? { 'Content-Type': 'application/json' } : {}),
            ...(token ? { Authorization: `Bearer ${token}` } : {}),
            ...options.headers,
        },
    });
    const data = await response.json().catch(() => ({}));
    if (!response.ok) throw new Error(data.message || 'The request could not be completed.');
    return data;
}
