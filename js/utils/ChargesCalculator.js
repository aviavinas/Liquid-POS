/**
 * ChargesCalculator - A utility for calculating charges consistently across the application
 * 
 * This utility provides methods to calculate charges, discounts, and final amounts
 * for orders based on the subtotal, charges array, and discount amount.
 */
export class ChargesCalculator {
    /**
     * Calculate charges, applying them to subtotal after discount
     * @param {number} subtotal - The order subtotal before charges
     * @param {Array} charges - Array of charge objects with name, value, type
     * @param {number} discount - Discount amount to apply before calculating charges
     * @returns {Object} Object containing calculatedCharges array and finalAmount
     */
    calculateCharges(subtotal, charges, discount = 0) {
        return ChargesCalculator.calculateCharges(subtotal, charges, discount);
    }

    /**
     * Static version of calculateCharges
     * @param {number} subtotal - The order subtotal before charges
     * @param {Array} charges - Array of charge objects with name, value, type
     * @param {number} discount - Discount amount to apply before calculating charges
     * @returns {Object} Object containing calculatedCharges array and finalAmount
     */
    static calculateCharges(subtotal, charges, discount = 0) {
        // Ensure subtotal and discount are numbers
        subtotal = parseFloat(subtotal) || 0;
        discount = parseFloat(discount) || 0;

        // Ensure charges is an array
        charges = Array.isArray(charges) ? charges : [];

        // Debug logging
        console.log("ChargesCalculator: Starting calculation with:", {
            subtotal,
            discount,
            charges: charges.map(c => ({
                name: c.name,
                value: c.value,
                type: c.type,
                inclusive: c.inclusive
            }))
        });

        // Apply discount to subtotal (ensure subtotal doesn't go negative)
        const subtotalAfterDiscount = Math.max(0, subtotal - discount);

        const calculatedCharges = [];
        let finalAmount = subtotalAfterDiscount;

        // Calculate each charge
        charges.forEach(charge => {
            if (!charge || !charge.name) return; // Skip invalid charges

            // Default values
            let displayName = charge.name || 'Charge';
            let chargeAmount = 0;

            // Calculate charge amount based on type
            if (charge.type === 'percentage' || (charge.value && charge.value.toString().includes('%'))) {
                // Handle percentage-based charges
                let percentage = 0;

                if (charge.type === 'percentage') {
                    percentage = parseFloat(charge.value) || 0;
                } else {
                    const value = charge.value.toString().replace('%', '').trim();
                    percentage = parseFloat(value) || 0;
                }

                // Calculate charge amount based on inclusivity
                if (charge.inclusive) {
                    // For inclusive charges, the formula is: 
                    // chargeAmount = subtotal * (percentage / (100 + percentage))
                    // This extracts the tax amount that's already included in the price
                    chargeAmount = (subtotalAfterDiscount * percentage) / (100 + percentage);
                    console.log(`ChargesCalculator: Inclusive ${charge.name} (${percentage}%): ${chargeAmount.toFixed(2)} (extracted from subtotal)`);
                    // For inclusive charges, we don't add to the final amount as it's already included
                } else {
                    // For exclusive charges, simply calculate the percentage of the subtotal
                    chargeAmount = (subtotalAfterDiscount * percentage) / 100;
                    console.log(`ChargesCalculator: Exclusive ${charge.name} (${percentage}%): ${chargeAmount.toFixed(2)} (added to final amount)`);
                    finalAmount += chargeAmount;
                }

                // Add percentage to display name if not already included
                if (!displayName.toLowerCase().includes('%')) {
                    displayName = `${displayName} (${percentage}%)`;
                }
            } else {
                // Handle fixed charges
                chargeAmount = parseFloat(charge.value) || 0;

                // Add fixed charge to final amount if not inclusive
                if (!charge.inclusive) {
                    finalAmount += chargeAmount;
                    console.log(`ChargesCalculator: Fixed charge ${charge.name}: ${chargeAmount.toFixed(2)} (added to final amount)`);
                } else {
                    console.log(`ChargesCalculator: Fixed charge ${charge.name}: ${chargeAmount.toFixed(2)} (included in subtotal)`);
                }
            }

            // Only add charge to the calculated charges if amount is not zero
            if (chargeAmount !== 0) {
                calculatedCharges.push({
                    id: charge.id,
                    name: charge.name,
                    displayName,
                    calculatedAmount: chargeAmount,
                    isInclusive: !!charge.inclusive,
                    bulkTaxHashtag: charge.bulkTaxHashtag || null
                });
            }
        });

        console.log("ChargesCalculator: Final calculation result:", {
            originalSubtotal: subtotal,
            discount,
            subtotalAfterDiscount,
            calculatedCharges: calculatedCharges.map(c => ({
                name: c.displayName,
                amount: c.calculatedAmount,
                isInclusive: c.isInclusive
            })),
            finalAmount
        });

        return {
            calculatedCharges,
            finalAmount
        };
    }

    /**
     * Format a number as currency
     * @param {number} amount - Amount to format
     * @param {number} decimals - Number of decimal places
     * @returns {string} Formatted amount
     */
    static formatAmount(amount, decimals = 2) {
        return amount.toFixed(decimals);
    }

    /**
     * Instance method for formatAmount
     */
    formatAmount(amount, decimals = 2) {
        return ChargesCalculator.formatAmount(amount, decimals);
    }
}
