import React, { useRef, useEffect, useState } from "react";
import {
  ComposableMap,
  Geographies,
  Geography,
  Marker,
  ZoomableGroup,
} from "react-simple-maps";
import { geoMercator } from "d3-geo";

const AnimatedDot = React.memo(({ cityPositions, cityStyle, journey }) => {
  return (
    <div
      className="pointer-events-none absolute left-0 top-0 h-full w-full"
      style={{
        "--sydney-x": `${cityPositions.sydney.x}px`,
        "--sydney-y": `${cityPositions.sydney.y}px`,
        "--hcm-x": `${cityPositions.hcmcity.x}px`,
        "--hcm-y": `${cityPositions.hcmcity.y}px`,
        "--tokyo-x": `${cityPositions.tokyo.x}px`,
        "--tokyo-y": `${cityPositions.tokyo.y}px`,
      }}
    >
      <div
        className={`absolute h-1 w-1 -translate-x-1/2 -translate-y-1/2 rounded-full ${journey}`}
        style={{
          backgroundColor: "white",
          ...cityStyle,
        }}
      />
    </div>
  );
});

export default function MapPage() {
  const sydneyRef = useRef(null);
  const hcmcityRef = useRef(null);
  const tokyoRef = useRef(null);
  const [cityPositions, setCityPositions] = useState({
    sydney: { x: 0, y: 0 },
    hcmcity: { x: 0, y: 0 },
    tokyo: { x: 0, y: 0 },
  });
  const [journey, setJourney] = useState("sydney-to-hcm");

  useEffect(() => {
    if (sydneyRef.current && hcmcityRef.current && tokyoRef.current) {
      const sydneyRect = sydneyRef.current.getBoundingClientRect();
      const hcmcityRect = hcmcityRef.current.getBoundingClientRect();
      const tokyoRect = tokyoRef.current.getBoundingClientRect();

      setCityPositions({
        sydney: { x: sydneyRect.x, y: sydneyRect.y },
        hcmcity: { x: hcmcityRect.x, y: hcmcityRect.y },
        tokyo: { x: tokyoRect.x, y: tokyoRect.y },
      });
    }
  }, []);

  useEffect(() => {
    const handleAnimationEnd = () => {
      if (journey === "sydney-to-hcm") {
        setJourney("hcm-to-tokyo");
      } else if (journey === "hcm-to-tokyo") {
        setJourney("tokyo-to-sydney");
      } else {
        setJourney("sydney-to-hcm");
      }
    };

    const dot = document.querySelector(".rounded-full");
    dot?.addEventListener("animationend", handleAnimationEnd);

    return () => {
      dot?.removeEventListener("animationend", handleAnimationEnd);
    };
  }, [journey]);

  const cities = {
    hcmcity: {
      coordinates: [106.6297, 10.8231],
      name: "Ho-Chi-Minh City",
      country: "Vietnam",
    },
    sydney: {
      coordinates: [151.2099, -33.865143],
      name: "Sydney",
      country: "Australia",
    },
    tokyo: {
      coordinates: [139.65, 35.6764],
      name: "Tokyo",
      country: "Japan",
    },
  };

  const getJourneyText = () => {
    switch (journey) {
      case "sydney-to-hcm":
        return `${cities.sydney.name} (${cities.sydney.country}) - ${cities.hcmcity.name} (${cities.hcmcity.country})`;
      case "hcm-to-tokyo":
        return `${cities.hcmcity.name} (${cities.hcmcity.country}) - ${cities.tokyo.name} (${cities.tokyo.country})`;
      case "tokyo-to-sydney":
        return `${cities.tokyo.name} (${cities.tokyo.country}) - ${cities.sydney.name} (${cities.sydney.country})`;
      default:
        return "";
    }
  };

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

  const cityStyle = {
    fill: "#FFF",
    stroke: "#FFF",
    strokeWidth: 1,
    filter:
      "drop-shadow(0 0 10px rgba(255, 255, 255, 0.7)) drop-shadow(0 0 20px rgba(180, 200, 255, 0.5)) drop-shadow(0 0 30px rgba(150, 170, 255, 0.3))",
  };

  const projection = geoMercator().center([145, 10]).scale(300);

  const isLocationActive = (cityKey) => {
    if (cityKey === "sydney")
      return journey.includes("sydney") || journey.includes("australia");
    if (cityKey === "hcm")
      return journey.includes("hcm") || journey.includes("vietnam");
    if (cityKey === "tokyo")
      return journey.includes("tokyo") || journey.includes("japan");
    return false;
  };

  return (
    <div className="h-screen bg-gray-300">
      <div className="relative flex h-screen w-full flex-col items-center justify-center overflow-hidden bg-blue-950">
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
                    .map((geo) => {
                      const country = geo.properties.name;
                      const isActive =
                        (country === "Australia" &&
                          journey.includes("sydney")) ||
                        (country === "Vietnam" && journey.includes("hcm")) ||
                        (country === "Japan" && journey.includes("tokyo"));

                      return (
                        <Geography
                          key={geo.rsmKey}
                          geography={geo}
                          style={{
                            ...mapStyles,
                            default: {
                              ...mapStyles.default,
                              transition: "opacity 0.8s ease",
                              opacity: isActive ? 1 : 0.02,
                            },
                            hover: {
                              ...mapStyles.hover,
                              transition: "opacity 0.8s ease",
                              opacity: isActive ? 1 : 0,
                            },
                          }}
                        />
                      );
                    })
                }
              </Geographies>

              <Marker coordinates={cities.sydney.coordinates}>
                <circle
                  ref={sydneyRef}
                  r="2"
                  style={{
                    ...cityStyle,
                    transition: "opacity 0.8s ease",
                    opacity: isLocationActive("sydney") ? 1 : 0.02,
                  }}
                />
                <text
                  textAnchor="middle"
                  y={-10}
                  style={{
                    fill: "#FFF",
                    fontSize: "14px",
                    filter: cityStyle.filter,
                    transition: "opacity 0.8s ease",
                    opacity: isLocationActive("sydney") ? 1 : 0.02,
                  }}
                >
                  Sydney
                </text>
              </Marker>

              <Marker coordinates={cities.hcmcity.coordinates}>
                <circle
                  ref={hcmcityRef}
                  r="2"
                  style={{
                    ...cityStyle,
                    transition: "opacity 0.8s ease",
                    opacity: isLocationActive("hcm") ? 1 : 0.02,
                  }}
                />
                <text
                  textAnchor="middle"
                  y={-10}
                  style={{
                    fill: "#FFF",
                    fontSize: "14px",
                    filter: cityStyle.filter,
                    transition: "opacity 0.8s ease",
                    opacity: isLocationActive("hcm") ? 1 : 0.02,
                  }}
                >
                  Ho-Chi-Minh City
                </text>
              </Marker>

              <Marker coordinates={cities.tokyo.coordinates}>
                <circle
                  ref={tokyoRef}
                  r="2"
                  style={{
                    ...cityStyle,
                    transition: "opacity 0.8s ease",
                    opacity: isLocationActive("tokyo") ? 1 : 0,
                  }}
                />
                <text
                  textAnchor="middle"
                  y={-10}
                  style={{
                    fill: "#FFF",
                    fontSize: "14px",
                    filter: cityStyle.filter,
                    transition: "opacity 0.8s ease",
                    opacity: isLocationActive("tokyo") ? 1 : 0,
                  }}
                >
                  Tokyo
                </text>
              </Marker>
            </ZoomableGroup>
          </ComposableMap>

          <AnimatedDot
            cityPositions={cityPositions}
            cityStyle={cityStyle}
            journey={journey}
          />
        </div>
      </div>

      <div className="fixed bottom-8 left-1/2 -translate-x-1/2 text-lg text-white">
        <span>{getJourneyText()}</span>
      </div>
    </div>
  );
}
