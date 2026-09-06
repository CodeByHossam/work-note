export function filterByQuery(items, query, fields) {
  if (!query) return items;

  const q = query.trim().toLowerCase();
  if (!q) return items;

  return items.filter((item) =>
    fields.some((field) =>
      String(item[field] ?? '').toLowerCase().includes(q),
    ),
  );
}