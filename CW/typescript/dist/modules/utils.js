// Centralized error handler
export function handleError(section, error) {
    if (error instanceof Error) {
        console.error(`❌ [${section}] Error: ${error.message}`);
    }
    else {
        console.error(`❌ [${section}] Unknown Error:`, error);
    }
}
