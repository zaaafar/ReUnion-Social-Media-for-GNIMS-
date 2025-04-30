import { useState, useEffect } from 'react';
 
export function useGetUserProfile(userId) {
  const [profile, setProfile] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null); // Added error state

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        // Fetch profile with credentials for authentication
        const response = await fetch(
          `http://localhost:8000/api/v1/user/${userId}/profile`, // Corrected endpoint
          {
            method: 'GET',
            credentials: 'include', // Allows cookies and sessions
            headers: {
              'Content-Type': 'application/json', // Ensure JSON content type
            },
          }
        );

        // Handle non-200 HTTP responses
        if (!response.ok) {
          throw new Error(`Error ${response.status}: ${response.statusText}`);
        }

        // Parse JSON response
        const data = await response.json();

        // Set profile data
        setProfile(data);
      } catch (error) {
        console.error('Failed to fetch user profile:', error);
        setError(error.message); // Update error state
      } finally {
        setLoading(false); // Stop loading
      }
    };

    fetchProfile();
  }, [userId]); // Refetch when userId changes

  return { profile, loading, error }; // Return error state as well
}

export default useGetUserProfile;
