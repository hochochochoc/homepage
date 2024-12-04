import React from "react";
import {
  ComposableMap,
  Geographies,
  Geography,
  Marker,
} from "react-simple-maps";
import { SparklesCore } from "@/components/ui/sparkles";

export default function LandingPage() {
  const mapStyles = {
    default: {
      fill: "transparent",
      stroke: "#FFF",
      strokeWidth: 1,
      filter:
        "drop-shadow(0 0 10px rgba(255, 255, 255, 0.7)) drop-shadow(0 0 20px rgba(180, 200, 255, 0.5)) drop-shadow(0 0 30px rgba(150, 170, 255, 0.3))",
    },
    hover: {
      fill: "transparent",
      stroke: "#FFF",
      strokeWidth: 1.5,
    },
    pressed: {
      fill: "transparent",
      stroke: "#FFF",
      strokeWidth: 1,
    },
  };

  const buenosAiresPoint = {
    coordinates: [139.65, 35.676],
    style: {
      fill: "#FFF",
      stroke: "#FFF",
      strokeWidth: 1,
      filter:
        "drop-shadow(0 0 10px rgba(255, 255, 255, 0.7)) drop-shadow(0 0 20px rgba(180, 200, 255, 0.5)) drop-shadow(0 0 30px rgba(150, 170, 255, 0.3))",
    },
  };

  return (
    <div className="h-screen bg-black">
      <div className="relative flex h-screen w-full flex-col items-center justify-center overflow-hidden bg-black">
        <SparklesCore
          id="tsparticlesfullpage"
          background="transparent"
          minSize={0.6}
          maxSize={1.4}
          particleDensity={100}
          className="absolute inset-0 h-full w-full"
          particleColor="#FFFFFF"
        />
        <h1 className="glow-effect relative z-20 mb-8 text-center text-4xl font-bold text-white md:text-7xl lg:text-6xl">
          Welcome to Fitness Tracka
        </h1>
        <button
          onClick={() => navigate("/menu")}
          className="relative z-20 rounded-full bg-blue-950 px-8 py-3 text-lg font-medium text-white shadow-lg transition-all hover:bg-blue-200 hover:shadow-xl"
        >
          Get Started
        </button>
        <div className="mt-8 w-96">
          <ComposableMap
            projection="geoMercator"
            projectionConfig={{
              center: [138.25, 36.2],
              scale: 700,
            }}
          >
            <Geographies geography="https://cdn.jsdelivr.net/npm/world-atlas@2/countries-50m.json">
              {({ geographies }) =>
                geographies
                  .filter((geo) => geo.properties.name === "Japan")
                  .map((geo) => (
                    <Geography
                      key={geo.rsmKey}
                      geography={geo}
                      style={mapStyles}
                    />
                  ))
              }
            </Geographies>
            <Marker coordinates={buenosAiresPoint.coordinates}>
              <circle r="4" style={buenosAiresPoint.style} />
              <text
                textAnchor="middle"
                y={-10}
                style={{
                  fill: "#FFF",
                  fontSize: "10px",
                  filter: buenosAiresPoint.style.filter,
                }}
              >
                Neo Yokio
              </text>
            </Marker>
          </ComposableMap>
        </div>
      </div>
    </div>
  );
}
