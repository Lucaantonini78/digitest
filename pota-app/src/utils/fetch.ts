export async function fetcher<T>(
  url: string,
  options?: RequestInit
): Promise<T> {
  const response = await fetch(url, options);

  if (!response.ok) {
    throw new Error(`Error: ${response.status}`);
  }

  const data: T = await response.json();
  return data;
}
