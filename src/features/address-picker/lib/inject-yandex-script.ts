// eslint-disable-next-line @typescript-eslint/no-explicit-any
type Ymaps3Global = any;

declare global {
  interface Window {
    ymaps3?: Ymaps3Global;
  }
}

export function injectYandexScript(apiKey: string): Promise<void> {
  if (document.querySelector('[data-ymaps3]')) {
    return new Promise((resolve) => {
      const id = setInterval(() => {
        if (window.ymaps3) {
          clearInterval(id);
          resolve();
        }
      }, 50);
    });
  }

  return new Promise((resolve, reject) => {
    const script = document.createElement('script');
    script.src = `https://api-maps.yandex.ru/v3/?apikey=${apiKey}&lang=ru_RU`;
    script.setAttribute('data-ymaps3', '1');
    script.onload = () => resolve();
    script.onerror = (err) => {
      document.querySelector('[data-ymaps3]')?.remove();
      reject(err);
    };
    document.head.appendChild(script);
  });
}
