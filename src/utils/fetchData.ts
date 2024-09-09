export const fetchData=async (path: string)=> {
  const response = await fetch(`/Assets/${path}`); // ваш API endpoint
  return await response.json();
}