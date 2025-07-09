// Main JS App Entry Point

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

// Load CurrencyData.js if not already loaded
function loadCurrencyData() {
    if (!window.CurrencyData) {
        console.log('Loading CurrencyData...');
        const script = document.createElement('script');
        script.src = 'js/utils/CurrencyData.js';
        script.onload = () => {
            console.log('CurrencyData loaded successfully');
            // Initialize UserSession after CurrencyData is loaded
            if (window.UserSession) {
                window.UserSession.init().catch(err => console.error("Error initializing UserSession from main.js:", err));
            }
        };
        script.onerror = (err) => {
            console.error('Error loading CurrencyData:', err);
            // Initialize UserSession even if CurrencyData fails to load
            if (window.UserSession) {
                window.UserSession.init().catch(err => console.error("Error initializing UserSession from main.js:", err));
            }
        };
        document.head.appendChild(script);
    } else {
        // Initialize UserSession if CurrencyData is already loaded
        if (window.UserSession) {
            window.UserSession.init().catch(err => console.error("Error initializing UserSession from main.js:", err));
        }
    }
}

// Load CurrencyData
loadCurrencyData();

// Initialize BluetoothPrinting service if available
function initializeBluetoothPrinting(retryCount = 0) {
    console.log(`Attempting to initialize BluetoothPrinting (attempt ${retryCount + 1})`);

    if (window.BluetoothPrinting && typeof window.BluetoothPrinting.initialize === 'function') {
        try {
            window.BluetoothPrinting.initialize();
            console.log('BluetoothPrinting service initialized successfully');
            // Force a global flag that we can check
            window._bluetoothPrintingInitialized = true;
        } catch (err) {
            console.error('Error initializing BluetoothPrinting service:', err);
        }
    } else {
        console.warn('BluetoothPrinting not available yet');
        if (retryCount < 5) {
            // Retry with exponential backoff
            const delay = Math.pow(2, retryCount) * 500;
            console.log(`Will retry in ${delay}ms...`);
            setTimeout(() => initializeBluetoothPrinting(retryCount + 1), delay);
        } else {
            console.error('Failed to initialize BluetoothPrinting after multiple attempts');
        }
    }
}

// Start initialization after a short delay
setTimeout(initializeBluetoothPrinting, 1000); 