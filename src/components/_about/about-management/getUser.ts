export const getUser = (data: string) => {
  // Извлекаем изображение из первого <h1>
  const imageMatch = data.match(/<h1>(.*?)<\/h1>/s);
  const image = imageMatch ? imageMatch[1] : "";

  // Удаляем первый <h1>
  let html = data.replace(/<h1>.*?<\/h1>/s, "");

  // Извлекаем DETAILS и таблицы
  const detailsSectionMatch = html.match(
      /<h1>DETAILS<\/h1>(.*?)(?=<h1>|\s*$)/s
  );

  const details: { title: string; content: string }[] = [];

  if (detailsSectionMatch) {
    const detailsHtml = detailsSectionMatch[1];
    // Удаляем весь раздел DETAILS из основного HTML
    html = html.replace(detailsSectionMatch[0], "");

    // Извлекаем таблицы
    const tableRegex = /<table>(.*?)<\/table>/gs;
    let tableMatch;

    while ((tableMatch = tableRegex.exec(detailsHtml)) !== null) {
      const tableContent = tableMatch[1];
      const rows = tableContent.match(/<tr>(.*?)<\/tr>/gs);

      if (rows && rows.length >= 2) {
        // Извлекаем заголовок
        const titleMatch = rows[0].match(/<td>(.*?)<\/td>/s);
        const title = titleMatch ? titleMatch[1].replace(/<[^>]+>/g, "").trim() : "";

        // Извлекаем контент (сохраняем HTML)
        const contentMatch = rows[1].match(/<td>(.*?)<\/td>/s);
        const content = contentMatch ? contentMatch[1].trim() : "";

        if (title || content) {
          details.push({ title, content });
        }
      }
    }
  }

  details.reverse()

  return { image, html, details };
};