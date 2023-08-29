export function redirect(target: string) {
  const headers = new Headers();
  headers.set('location', target);

  return new Response(null, {
    status: 303,
    headers,
  });
}
