// Hamare Flask backend ka base URL
const API_BASE_URL = 'http://localhost:5000';

/**
 * Backend se saare products ki list fetch karta hai.
 * @returns {Promise<Array>} Products ki list ka promise.
 */
export const fetchProducts = async () => {
  try {
    const response = await fetch(`${API_BASE_URL}/api/products`);
    if (!response.ok) {
      throw new Error('Network response was not ok');
    }
    const data = await response.json();
    return data;
  } catch (error) {
    console.error('Error fetching products:', error);
    // Error ke case me ek khali array return karein taaki app crash na ho
    return [];
  }
};

/**
 * Backend ko user ka data bhejkar AI recommendations fetch karta hai.
 * @param {object} userData - User ki preferences aur history wala object.
 * @returns {Promise<Array>} AI-generated recommendations ki list ka promise.
 */
export const getAiRecommendations = async (userData) => {
  try {
    const response = await fetch(`${API_BASE_URL}/api/recommendations`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(userData),
    });
    if (!response.ok) {
      throw new Error('Network response was not ok');
    }
    const data = await response.json();
    return data;
  } catch (error) {
    console.error('Error getting AI recommendations:', error);
    return [];
  }
};
