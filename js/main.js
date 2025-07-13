import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App.js';
import { sdk } from './sdk.js'; // Initialize Shopto SDK
import { ProfileProvider } from './contexts/ProfileContext.js';
import { OrderProvider } from './contexts/OrderContext.js';
import { BluetoothPrinting } from './utils/BluetoothPrinting.js';

// Loading screen management
const updateLoadingProgress = (percentage) => {
    const progressBar = document.getElementById('loading-progress');
    if (progressBar) {
        progressBar.style.width = `${percentage}%`;
    }
};

const removeLoadingScreen = () => {
    const loadingScreen = document.getElementById('loading-screen');
    if (loadingScreen) {
        loadingScreen.classList.add('transition-opacity', 'duration-500', 'opacity-0');
        setTimeout(() => {
            loadingScreen.remove();
        }, 500);
    }
};

// Render the main App component
ReactDOM.createRoot(document.getElementById('root')).render(
    <ProfileProvider>
        <OrderProvider>
            <App />
        </OrderProvider>
    </ProfileProvider>
);

// Set loading to complete and remove loading screen after app is rendered
updateLoadingProgress(100);
setTimeout(removeLoadingScreen, 300);

// Initialize BluetoothPrinting service
BluetoothPrinting.initialize();

// Check if BluetoothPrinting initialized properly
document.addEventListener('DOMContentLoaded', function () {
    console.log('Checking BluetoothPrinting initialization');
    // Will be loaded below with version parameter

    // Add a convenience function for printing test
    async function printTest(orderId) {
        orderId = orderId || "testOrder123"; // Default test order ID
        console.log("Starting print test with orderId:", orderId);

        // Create a test order if needed
        if (orderId === "testOrder123") {
            const testOrder = {
                id: "testOrder123",
                billNo: "T123",
                date: new Date(),
                customer: { name: "Test Customer", phone: "1234567890" },
                items: [
                    { title: "Test Item 1", price: 100, quantity: 2 },
                    { title: "Test Item 2", price: 150, quantity: 1 }
                ],
                payMode: "CASH",
                total: 350,
                subTotal: 350,
                discount: 0
            };

            // Store test order in window for debugging
            _testOrder = testOrder;

            // Use the SDK to save the test order if possible
            try {
                if (sdk && sdk.db) {
                    await sdk.db.collection("Orders").doc("testOrder123").set(testOrder);
                    console.log("Test order saved to database");
                }
            } catch (e) {
                console.warn("Could not save test order to database:", e);
            }
        }

        try {
            if (BluetoothPrinting) {
                console.log("BluetoothPrinting found, attempting to print...");
                await BluetoothPrinting.printBill(orderId);
                console.log("Print test completed successfully!");
                return true;
            } else {
                console.error("BluetoothPrinting not available for test");
                return false;
            }
        } catch (e) {
            console.error("Print test failed:", e);
            return false;
        }
    };

    console.log("Print test function available. Run printTest() to test printing.");
});


// Initialize loading progress tracking
const loadingProgress = {
    totalScripts: 0,
    loadedScripts: 0,
    updateProgress: function () {
        const percentage = Math.min(90, Math.floor((this.loadedScripts / this.totalScripts) * 80) + 10);
        const progressBar = document.getElementById('loading-progress');
        if (progressBar) {
            progressBar.style.width = percentage + '%';
        }
    }
};

// Count total scripts
addEventListener('DOMContentLoaded', function () {
    const scripts = document.querySelectorAll('script[src]');
    loadingProgress.totalScripts = scripts.length;

    // Add load event listeners to all scripts
    scripts.forEach(script => {
        if (script.getAttribute('src')) {
            const originalSrc = script.getAttribute('src');

            // For scripts already loaded
            if (script.readyState === 'complete' || script.readyState === 'loaded') {
                loadingProgress.loadedScripts++;
                loadingProgress.updateProgress();
            }

            // For scripts still loading
            script.addEventListener('load', function () {
                loadingProgress.loadedScripts++;
                loadingProgress.updateProgress();
            });
        }
    });
});
