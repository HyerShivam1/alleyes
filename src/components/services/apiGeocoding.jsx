export async function getAddress(latitude, longitude) {
  try {
        const apiKey = import.meta.env.VITE_GEOLOCATION_API_KEY;


    if (!apiKey) {
      throw new Error("API key is missing. Check your .env file.");
    }

    const res = await fetch(
      `https://api.geoapify.com/v1/geocode/reverse?lat=${latitude}&lon=${longitude}&apiKey=${apiKey}`
    );

    if (!res.ok) {
      throw new Error("Failed to fetch address");
    }
    const data = await res.json();
    return data; 
  } catch (error) {
    console.error("Error fetching address:", error);
    throw error;
  }
}
export default async function GetLocation() {
  if (!navigator.geolocation) {
    alert("Geolocation is not supported by your browser");
    return;
  }
  try {
    const position = await new Promise((resolve, reject) => {
      navigator.geolocation.getCurrentPosition(resolve, reject);
    });

    const { latitude, longitude } = position.coords;
    const address = await getAddress(latitude, longitude);
    return { latitude, longitude, address };
  } catch (error) {
    console.error("Error fetching geolocation:", error);
    alert("Unable to fetch location. Please enable location services.");
  }
}

