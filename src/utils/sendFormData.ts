import { SEND_FORM_URL } from './constant';

export const sendFormData = async (formData: any): Promise<any> => {
  try {
    const response = await fetch(SEND_FORM_URL, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(formData),
    });

    if (!response.ok) {
      throw new Error(`Error: ${response.statusText}`);
    }

    const responseData = await response.json();
    return responseData;
  } catch (error) {
    console.error('Error sending data:', error);
    throw error;
  }
};
