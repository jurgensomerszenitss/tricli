// utils/copyToClipboard.ts
export async function copyToClipboard(text: string | undefined | null): Promise<void> {
    if (text) {
        if (navigator.clipboard) {
            try {
                await navigator.clipboard.writeText(text);
                console.log('Copied to clipboard!');
            } catch (err) {
                console.error('Failed to copy: ', err);
            }
        }
    }
    //   else {
    //     // Fallback for older browsers
    //     const tempInput = document.createElement('input');
    //     tempInput.value = text;
    //     document.body.appendChild(tempInput);
    //     tempInput.select();
    //     document.execCommand('copy');
    //     document.body.removeChild(tempInput);
    //     console.log('Copied to clipboard (fallback)!');
    //   }
}