import React, { useRef, useEffect, useState, useMemo } from "react";
import {
  ComposableMap,
  Geographies,
  Geography,
  Marker,
  ZoomableGroup,
} from "react-simple-maps";
import { geoMercator } from "d3-geo";

const AnimatedDot = React.memo(
  ({ cityPositions, cityStyle, onProgressChange }) => {
    const [progress, setProgress] = useState(0);

    useEffect(() => {
      const interval = setInterval(() => {
        const now = performance.now();
        const animationDuration = 6000; // Match the CSS animation duration
        const currentProgress = (now % animationDuration) / animationDuration;

        setProgress(currentProgress); // Update progress between 0 and 1
        onProgressChange(currentProgress);
      }, 100); // Update frequently for smooth fading

      return () => clearInterval(interval);
    }, [onProgressChange]);

    const containerStyle = {
      "--sydney-x": `${cityPositions.sydney.x}px`,
      "--sydney-y": `${cityPositions.sydney.y}px`,
      "--hcm-x": `${cityPositions.hcmcity.x}px`,
      "--hcm-y": `${cityPositions.hcmcity.y}px`,
      "--tokyo-x": `${cityPositions.manila.x}px`,
      "--tokyo-y": `${cityPositions.manila.y}px`,
    };

    return (
      <div
        className="pointer-events-none absolute left-0 top-0 h-full w-full"
        style={containerStyle}
      >
        <div
          className="animate-travel absolute h-1 w-1 -translate-x-1/2 -translate-y-1/2 rounded-full"
          style={{
            backgroundColor: "white",
            ...cityStyle,
          }}
        />
      </div>
    );
  },
);

export default function MapPage() {
  const sydneyRef = useRef(null);
  const hcmcityRef = useRef(null);
  const manilaRef = useRef(null);
  const [cityPositions, setCityPositions] = useState({
    sydney: { x: 0, y: 0 },
    hcmcity: { x: 0, y: 0 },
    manila: { x: 0, y: 0 },
  });

  useEffect(() => {
    if (sydneyRef.current && hcmcityRef.current && manilaRef.current) {
      const sydneyRect = sydneyRef.current.getBoundingClientRect();
      const hcmcityRect = hcmcityRef.current.getBoundingClientRect();
      const manilaRect = manilaRef.current.getBoundingClientRect();

      setCityPositions({
        sydney: { x: sydneyRect.x, y: sydneyRect.y },
        hcmcity: { x: hcmcityRect.x, y: hcmcityRect.y },
        manila: { x: manilaRect.x, y: manilaRect.y },
      });
    }
  }, []);

  const mapStyles = {
    default: {
      fill: "transparent",
      stroke: "#FFF",
      strokeWidth: 1,
      filter:
        "drop-shadow(0 0 10px rgba(255, 255, 255, 0.7)) drop-shadow(0 0 20px rgba(180, 200, 255, 0.5)) drop-shadow(0 0 30px rgba(150, 170, 255, 0.3))",
      outline: "none",
    },
    hover: {
      fill: "transparent",
      stroke: "#FFF",
      strokeWidth: 1,
      filter:
        "drop-shadow(0 0 10px rgba(255, 255, 255, 0.7)) drop-shadow(0 0 20px rgba(180, 200, 255, 0.5)) drop-shadow(0 0 30px rgba(150, 170, 255, 0.3))",
      outline: "none",
    },
    pressed: {
      fill: "transparent",
      stroke: "#FFF",
      strokeWidth: 1,
      outline: "none",
    },
  };

  const cities = {
    hcmcity: {
      coordinates: [106.6297, 10.8231],
      name: "Ho-Chi-Minh City",
    },
    sydney: {
      coordinates: [151.2099, -33.865143],
      name: "Sydney",
    },
    manila: {
      coordinates: [139.65, 35.6764],
      name: "Tokyo",
    },
  };

  const cityStyle = {
    fill: "#FFF",
    stroke: "#FFF",
    strokeWidth: 1,
    filter:
      "drop-shadow(0 0 10px rgba(255, 255, 255, 0.7)) drop-shadow(0 0 20px rgba(180, 200, 255, 0.5)) drop-shadow(0 0 30px rgba(150, 170, 255, 0.3))",
  };

  const projection = geoMercator().center([145, 10]).scale(300);

  return (
    <div className="h-screen bg-black">
      <div className="relative flex h-screen w-full flex-col items-center justify-center overflow-hidden bg-black">
        <div className="mt-8 w-[800px]">
          <ComposableMap projection={projection}>
            <ZoomableGroup>
              <Geographies geography="https://cdn.jsdelivr.net/npm/world-atlas@2/countries-50m.json">
                {({ geographies }) =>
                  geographies
                    .filter(
                      (geo) =>
                        geo.properties.name === "Vietnam" ||
                        geo.properties.name === "Australia" ||
                        geo.properties.name === "Japan",
                    )
                    .map((geo) => (
                      <Geography
                        key={geo.rsmKey}
                        geography={geo}
                        style={mapStyles}
                      />
                    ))
                }
              </Geographies>

              <Marker coordinates={cities.sydney.coordinates}>
                <circle ref={sydneyRef} r="2" style={cityStyle} />
                <text
                  textAnchor="middle"
                  y={-10}
                  style={{
                    fill: "#FFF",
                    fontSize: "14px",
                    filter: cityStyle.filter,
                  }}
                >
                  Sydney
                </text>
              </Marker>

              <Marker coordinates={cities.hcmcity.coordinates}>
                <circle ref={hcmcityRef} r="2" style={cityStyle} />
                <text
                  textAnchor="middle"
                  y={-10}
                  style={{
                    fill: "#FFF",
                    fontSize: "14px",
                    filter: cityStyle.filter,
                  }}
                >
                  Ho-Chi-Minh City
                </text>
              </Marker>

              <Marker coordinates={cities.manila.coordinates}>
                <circle ref={manilaRef} r="2" style={cityStyle} />
                <text
                  textAnchor="middle"
                  y={-10}
                  style={{
                    fill: "#FFF",
                    fontSize: "14px",
                    filter: cityStyle.filter,
                  }}
                >
                  Tokyo
                </text>
              </Marker>
            </ZoomableGroup>
          </ComposableMap>

          <AnimatedDot cityPositions={cityPositions} cityStyle={cityStyle} />
        </div>
      </div>
    </div>
  );
}
