/**
 * Formatting utilities for currency and amounts
 */

/**
 * Formats a number value as currency
 * @param {number|string} value - The value to format
 * @returns {string} Formatted currency string
 */
export const formatMoney = (value) => {
    const numValue = parseInt(value) || 0;
    return '$' + numValue.toLocaleString('en-US');
};

/**
 * Formats input amount string by removing non-digits and adding thousands separators
 * @param {string} value - The input value to format
 * @returns {string} Formatted amount string
 */
export const formatAmount = (value) => {
    if (!value || typeof value !== 'string') return '';
    const cleanValue = value.replace(/\D/g, '');
    if (cleanValue === '') return '';
    return parseInt(cleanValue).toLocaleString('en-US');
};

/**
 * Parses a formatted amount string to number
 * @param {string} formattedValue - The formatted value string
 * @returns {number} Parsed number value
 */
export const parseAmount = (formattedValue) => {
    if (!formattedValue) return 0;
    const cleanValue = formattedValue.toString().replace(/\D/g, '');
    return parseInt(cleanValue) || 0;
};