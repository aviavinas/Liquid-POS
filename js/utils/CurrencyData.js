// CurrencyData.js - Global currency data for the application
class CurrencyData {
    // Static list of all supported currencies
    static currencies = [
        { code: 'INR', name: 'Indian Rupee', symbol: '₹' },
        { code: 'USD', name: 'US Dollar', symbol: '$' },
        { code: 'EUR', name: 'Euro', symbol: '€' },
        { code: 'GBP', name: 'British Pound', symbol: '£' },
        { code: 'JPY', name: 'Japanese Yen', symbol: '¥' },
        { code: 'CNY', name: 'Chinese Yuan', symbol: '¥' },
        { code: 'AUD', name: 'Australian Dollar', symbol: 'A$' },
        { code: 'CAD', name: 'Canadian Dollar', symbol: 'C$' },
        { code: 'SGD', name: 'Singapore Dollar', symbol: 'S$' },
        { code: 'CHF', name: 'Swiss Franc', symbol: 'CHF' },
        { code: 'MYR', name: 'Malaysian Ringgit', symbol: 'RM' },
        { code: 'THB', name: 'Thai Baht', symbol: '฿' },
        { code: 'AED', name: 'UAE Dirham', symbol: 'د.إ' },
        { code: 'SAR', name: 'Saudi Riyal', symbol: '﷼' },
        { code: 'NZD', name: 'New Zealand Dollar', symbol: 'NZ$' },
        { code: 'HKD', name: 'Hong Kong Dollar', symbol: 'HK$' },
        { code: 'SEK', name: 'Swedish Krona', symbol: 'kr' },
        { code: 'ZAR', name: 'South African Rand', symbol: 'R' },
        { code: 'RUB', name: 'Russian Ruble', symbol: '₽' },
        { code: 'BRL', name: 'Brazilian Real', symbol: 'R$' },
        { code: 'MXN', name: 'Mexican Peso', symbol: '$' },
        { code: 'IDR', name: 'Indonesian Rupiah', symbol: 'Rp' },
        { code: 'TRY', name: 'Turkish Lira', symbol: '₺' },
        { code: 'KRW', name: 'South Korean Won', symbol: '₩' },
        { code: 'PLN', name: 'Polish Złoty', symbol: 'zł' },
        { code: 'PHP', name: 'Philippine Peso', symbol: '₱' },
        { code: 'ILS', name: 'Israeli New Shekel', symbol: '₪' },
        { code: 'EGP', name: 'Egyptian Pound', symbol: 'E£' },
        { code: 'NGN', name: 'Nigerian Naira', symbol: '₦' },
        { code: 'VND', name: 'Vietnamese Đồng', symbol: '₫' },
        { code: 'BDT', name: 'Bangladeshi Taka', symbol: '৳' },
        { code: 'PKR', name: 'Pakistani Rupee', symbol: '₨' },
        { code: 'NPR', name: 'Nepalese Rupee', symbol: 'रू' },
        { code: 'LKR', name: 'Sri Lankan Rupee', symbol: 'රු' }
    ];

    // Get currency by code
    static getCurrencyByCode(code) {
        return this.currencies.find(currency => currency.code === code) || this.currencies[0]; // Default to INR
    }

    // Format amount with currency symbol
    static formatAmount(amount, currencyCode) {
        const currency = this.getCurrencyByCode(currencyCode);

        return `${currency.symbol} ${Number(amount).toLocaleString('en', {
            minimumFractionDigits: 0,
            maximumFractionDigits: 0
        })}`;
    }
}

// Make CurrencyData available globally
window.CurrencyData = CurrencyData;