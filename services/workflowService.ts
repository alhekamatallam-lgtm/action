
import { type WorkflowStep } from '../types';
import { API_URL } from '../constants';

export const fetchSteps = async (): Promise<WorkflowStep[]> => {
    const response = await fetch(API_URL);
    if (!response.ok) {
        throw new Error('Network response was not ok');
    }
    const data = await response.json();
    // Assuming the API returns an object with a 'data' property which is an array
    if (data && Array.isArray(data.data)) {
        return data.data;
    }
    throw new Error('Invalid data structure from API');
};

export const updateStep = async (stepNo: number, duration: number): Promise<void> => {
    const payload = {
        action: "update",
        sheet: "الورقة1",
        keyField: "Step No",
        keyValue: stepNo,
        data: {
            "Estimated Action Duration": duration
        }
    };

    const response = await fetch(API_URL, {
        method: 'POST',
        mode: 'no-cors', // Google Scripts often require this
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(payload),
    });

    // no-cors mode means we can't inspect the response, so we assume success if no network error is thrown.
    // This is a limitation of calling Google Apps Script web apps from a different origin.
    // In a real-world scenario, the API would be configured with proper CORS headers.
    
    // For now, we will just resolve the promise
    return Promise.resolve();
};
