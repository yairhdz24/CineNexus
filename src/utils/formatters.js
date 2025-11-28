export const formatRating = (rating) => {
    return rating ? `${rating}/10` : 'N/A';
};

export const formatYear = (year) => {
    return year ? year.replace('–', '') : 'Unknown';
};

export const formatCurrency = (amount) => {
    if (!amount || amount === 'N/A') return 'N/A';
    return new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD' }).format(amount.replace(/[^0-9.-]+/g, ""));
};
