import React, { useRef, useEffect, useState } from 'react';
import Globe from 'react-globe.gl';

const INDIAN_CITIES = [
  { name: 'Mumbai', lat: 19.0760, lng: 72.8777 },
  { name: 'Delhi', lat: 28.6139, lng: 77.2090 },
  { name: 'Bengaluru', lat: 12.9716, lng: 77.5946 },
  { name: 'Chennai', lat: 13.0827, lng: 80.2707 },
  { name: 'Kolkata', lat: 22.5726, lng: 88.3639 },
  { name: 'Hyderabad', lat: 17.3850, lng: 78.4867 },
  { name: 'Ahmedabad', lat: 23.0225, lng: 72.5714 },
  { name: 'Pune', lat: 18.5204, lng: 73.8567 },
  { name: 'Surat', lat: 21.1702, lng: 72.8311 },
  { name: 'Jaipur', lat: 26.9124, lng: 75.7873 },
];

const getAQIColor = (aqi) => {
  if (aqi <= 50) return '#00e676'; // Good - Green
  if (aqi <= 100) return '#ffeb3b'; // Moderate - Yellow
  if (aqi <= 150) return '#ff9800'; // Unhealthy for Sensitive Groups - Orange
  if (aqi <= 200) return '#f44336'; // Unhealthy - Red
  if (aqi <= 300) return '#9c27b0'; // Very Unhealthy - Purple
  return '#880e4f'; // Hazardous - Maroon
};

const GlobeComponent = () => {
  const globeRef = useRef();
  const [dimensions, setDimensions] = useState({ width: 0, height: 100 });
  const [aqiData, setAqiData] = useState([]);
  const containerRef = useRef();

  // Handle responsiveness
  useEffect(() => {
    const updateDimensions = () => {
      if (containerRef.current) {
        setDimensions({
          width: containerRef.current.offsetWidth,
          height: containerRef.current.offsetHeight
        });
      }
    };

    updateDimensions();
    const resizeObserver = new ResizeObserver(updateDimensions);
    if (containerRef.current) resizeObserver.observe(containerRef.current);
    
    return () => resizeObserver.disconnect();
  }, []);

  // Fetch AQI Data from WAQI (using demo token)
  useEffect(() => {
    const fetchAQI = async () => {
      try {
        const results = await Promise.all(INDIAN_CITIES.map(async (city) => {
          const res = await fetch(`https://api.waqi.info/feed/geo:${city.lat};${city.lng}/?token=demo`);
          const data = await res.json();
          if (data.status === 'ok') {
            return {
              ...city,
              aqi: data.data.aqi,
              color: getAQIColor(data.data.aqi)
            };
          }
          return null;
        }));
        setAqiData(results.filter(d => d !== null));
      } catch (error) {
        console.error('Error fetching AQI:', error);
      }
    };

    fetchAQI();
    const interval = setInterval(fetchAQI, 600000); // Update every 10 mins
    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    if (globeRef.current) {
      globeRef.current.controls().autoRotate = true;
      globeRef.current.controls().autoRotateSpeed = 0.5;
      globeRef.current.pointOfView({ lat: 20, lng: 77, altitude: 2.2 });
    }
  }, []);

  return (
    <div ref={containerRef} style={{ width: '100%', height: '100%', position: 'relative', overflow: 'hidden', background: '#000' }}>
      <Globe
        ref={globeRef}
        width={dimensions.width}
        height={dimensions.height}
        backgroundColor="rgba(0,0,0,0)"
        globeImageUrl="//unpkg.com/three-globe/example/img/earth-blue-marble.jpg"
        bumpImageUrl="//unpkg.com/three-globe/example/img/earth-topology.png"
        backgroundImageUrl=""
        showGraticules={false}
        showAtmosphere={true}
        atmosphereColor="#0066ff"
        atmosphereDaylightAlpha={0.4}
        
        // Data points (AQI) - Only dots, no text as requested
        pointsData={aqiData}
        pointLat={d => d.lat}
        pointLng={d => d.lng}
        pointColor={d => d.color}
        pointRadius={0.7}
        pointAltitude={0.02}
        pointsMerge={true}
        pointLabel={d => `${d.name}: AQI ${d.aqi}`} // Show on hover only
      />
      
      {/* Absolute overlay for "Real-time" indicator */}
      <div style={{
        position: 'absolute',
        top: '20px',
        left: '20px',
        display: 'flex',
        alignItems: 'center',
        gap: '10px',
        background: 'rgba(5, 5, 5, 0.8)',
        padding: '10px 16px',
        borderRadius: '50px',
        backdropFilter: 'blur(10px)',
        border: '1px solid rgba(255, 255, 255, 0.1)',
        pointerEvents: 'none',
        zIndex: 10
      }}>
        <div style={{ width: '10px', height: '10px', borderRadius: '50%', background: '#ff4d4d', position: 'relative' }}>
            <div style={{ 
                position: 'absolute',
                inset: -4,
                borderRadius: '50%',
                background: '#ff4d4d',
                opacity: 0.4,
                animation: 'ping 2s cubic-bezier(0, 0, 0.2, 1) infinite'
            }} />
        </div>
        <span className="small-caps" style={{ fontSize: '0.75rem', color: '#fff', fontWeight: 600, letterSpacing: '0.1em' }}>LIVE AQI DATA (INDIA)</span>
      </div>
      
      <style>
        {`
          @keyframes ping {
            75%, 100% { transform: scale(3); opacity: 0; }
          }
        `}
      </style>
    </div>
  );
};

export default GlobeComponent;
