import { useEffect, useRef } from 'react';

declare global {
  interface Window {
    ymaps: any;
  }
}

function YandexMap() {
  const mapRef = useRef<HTMLDivElement>(null)
  const mapInstance = useRef<any>(null)
  const scriptRef = useRef<HTMLScriptElement | null>(null)

  useEffect(() => {
    if (mapInstance.current) return;
    if (window.ymaps) {
      initMap();
      return;
    }

    if (!document.querySelector('script[src*="api-maps.yandex.ru"]')) {
      const script = document.createElement('script');
      script.src = `https://api-maps.yandex.ru/2.1/?apikey=ba1fe2e3-0c27-4dc2-904e-3d688007c713&lang=ru_RU`;
      script.async = true;
      script.onload = initMap;
      document.body.appendChild(script);
      scriptRef.current = script;
    }

    function initMap() {
      if (!mapRef.current || mapInstance.current) return;

      window.ymaps.ready(() => {
        mapInstance.current = new window.ymaps.Map(mapRef.current, {
          center: [57.1524, 65.5343],
          zoom: 12,
          controls: ['zoomControl', 'fullscreenControl']
        });

        const points = [
          {
            coords: [57.126476, 65.523153],
            title: "Главный офис",
            hint: "ул. Червишевский тракт 23",
            color: "red"
          },
          {
            coords: [57.135051, 65.493962],
            title: "Филиал Колумб",
            hint: "ул. Московский Тракт, 118",
            color: "blue"
          },
          {
            coords: [57.117799, 65.548340],
            title: "Филиал Кристалл",
            hint: "ул. Дмитрия Менделеева, 1Б",
            color: "green"
          },
          {
            coords: [57.127848, 65.553904],
            title: "Филиал Арсиб",
            hint: "ул. Мельникайте, 116к2",
            color: "violet"
          },
        ];

        points.forEach(point => {
          const placemark = new window.ymaps.Placemark(
            point.coords,
            {
              hintContent: point.hint,
              balloonContent: point.title
            },
            {
              preset: `islands#${point.color}Icon`
            }
          );
          
          mapInstance.current.geoObjects.add(placemark);
        });

        mapInstance.current.events.add('actionend', () => {
          console.log('Текущий центр карты:', mapInstance.current.getCenter());
        });
      });
    }

    return () => {
      if (mapInstance.current) {
        mapInstance.current.destroy();
        mapInstance.current = null;
      }
      if (scriptRef.current) {
        document.body.removeChild(scriptRef.current);
        scriptRef.current = null;
      }
    };
  }, []);

  return (
    <div 
      ref={mapRef} 
      style={{ 
        width: '50%', 
        height: '500px',
        borderRadius: '20px',
        boxShadow: '0 2px 10px rgba(0, 0, 0, 0.1)',
        margin: '20px auto', // Центрируем с помощью margin: auto
      }} 
    />
  );
}

export default YandexMap;