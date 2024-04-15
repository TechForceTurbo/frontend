import { GET_HISTORY_URL } from './constant';

async function getHistoryMessages(): Promise<any> {
  const session_id = localStorage.getItem('session_id');
  if (!session_id) {
    console.log('history component, session_id не найден');
    return;
  }

  const url = `${GET_HISTORY_URL}${session_id}`;

  try {
    const response = await fetch(url);

    if (!response.ok) {
      throw new Error('Ошибка получения истории чата');
    }

    const data = await response.json();

    return data;
  } catch (error) {
    console.error('history component, Произошла ошибка:', (error as Error).message);
    throw error;
  }
}

export async function getPreviousMessages(url: string): Promise<any> {
  try {
    const response = await fetch(url);
    if (!response.ok) {
      throw new Error('Ошибка получения истории чата');
    }
    const data = await response.json();
    return data;
  } catch (error) {
    console.error('history component, Произошла ошибка:', (error as Error).message);
    throw error;
  }
}

export default getHistoryMessages;
