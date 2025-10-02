import React, { useState } from 'react';

function UserPreferences({ onGetRecommendations, isLoading }) {
  const [preferences, setPreferences] = useState('');

  const handleSubmit = (e) => {
    // Page ko reload hone se rokein
    e.preventDefault();
    // Agar textarea khali nahi hai to hi function call karein
    if (preferences.trim()) {
      onGetRecommendations(preferences);
    }
  };

  return (
    <div className="preferences-container">
      <h2>Your Preferences</h2>
      <p>Aapko kya chahiye, yahan likhein (jaise, "mujhe running ke liye comfortable shoes chahiye" ya "casual wear ke liye ek stylish jacket").</p>
      <form onSubmit={handleSubmit}>
        <textarea
          value={preferences}
          onChange={(e) => setPreferences(e.target.value)}
          placeholder="Apni pasand yahan likhein..."
          rows="4"
          className="preferences-textarea"
        />
        <button type="submit" className="submit-btn" disabled={isLoading}>
          {isLoading ? 'Recommendations La Raha Hu...' : 'Get AI Recommendations'}
        </button>
      </form>
    </div>
  );
}

export default UserPreferences;
