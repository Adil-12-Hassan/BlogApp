export function getBlogDate(date) {
    if (!date) return 'Recently published';
    const parsedDate = new Date(date);
    if (Number.isNaN(parsedDate.getTime())) return 'Recently published';
    return parsedDate.toLocaleDateString('en-US', {
        month: 'short', day: 'numeric', year: 'numeric',
    });
}

export function getReadingTime(content = '') {
    const words = String(content).trim().split(/\s+/).filter(Boolean).length;
    return Math.max(1, Math.ceil(words / 200));
}
