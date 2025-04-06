const paymentOptions = document.querySelectorAll('.payment-option');
let selectedMethod = '';

paymentOptions.forEach(option => {
    option.addEventListener('click', function() {
        paymentOptions.forEach(opt => opt.classList.remove('active'));
        this.classList.add('active');
        selectedMethod = this.dataset.method;

        if (selectedMethod === 'card') {
            document.getElementById('card-details').classList.remove('hidden');
            document.getElementById('qr-code-section').classList.add('hidden');
        } else {
            document.getElementById('card-details').classList.add('hidden');
            document.getElementById('qr-code-section').classList.remove('hidden');
            document.getElementById('qr-method').textContent = selectedMethod.toUpperCase();
            
            // Owner's QR Codes
            const qrCodes = {
                paytm: 'payment.jpg', // Path to local Paytm QR code image
                gpay: 'gpay.jpg'     // Path to local GPay QR code image
            };

            document.getElementById('qr-code').src = qrCodes[selectedMethod];
        }
    });
});

const paymentForm = document.getElementById('payment-form');
paymentForm.addEventListener('submit', function(event) {
    event.preventDefault();
    const spinner = document.getElementById('spinner');
    spinner.classList.remove('hidden');

    // Simulate payment processing
    setTimeout(() => {
        spinner.classList.add('hidden');
        alert('Payment processed successfully!');
    }, 2000);
});

document.getElementById('copy-payment-link').addEventListener('click', function(event) {
    event.preventDefault();
    navigator.clipboard.writeText(document.getElementById('qr-code').src);
    alert('Payment link copied to clipboard!');
});
