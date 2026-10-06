import { useCallback, useEffect, useState } from 'react';
import { userRequest } from './userApi';

export default function useUserCollection(path) {
    const [items, setItems] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');
    const refresh = useCallback(async () => {
        setLoading(true);
        setError('');
        try {
            const data = await userRequest(path);
            setItems(Array.isArray(data) ? data : (data?.items || data?.posts || []));
        } catch (requestError) {
            setError(requestError.message || 'Could not load this section.');
        } finally {
            setLoading(false);
        }
    }, [path]);

    useEffect(() => { refresh(); }, [refresh]);
    return { items, loading, error, refresh };
}
