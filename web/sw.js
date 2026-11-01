// Stará adresa: tento service worker vymaže starú appku z pamäte a pošle používateľa na novú adresu.
self.addEventListener('install', () => self.skipWaiting());
self.addEventListener('activate', (e) => {
  e.waitUntil((async () => {
    for (const k of await caches.keys()) await caches.delete(k);
    await self.registration.unregister();
    const list = await self.clients.matchAll({ type: 'window' });
    for (const c of list) { try { await c.navigate(c.url); } catch (x) { /* ok */ } }
  })());
});
