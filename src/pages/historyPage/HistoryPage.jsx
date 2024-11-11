import React, { useEffect, useRef, useState } from "react";
import { ArrowLeft } from "lucide-react";
import { useNavigate } from "react-router-dom";
import * as d3 from "d3";
import { workoutService } from "../../services/workoutService";
import { useAuth } from "../../contexts/AuthContext";

export default function HistoryPage() {
  const navigate = useNavigate();
  const svgRef = useRef();
  const { user } = useAuth();
  const [benchData, setBenchData] = useState([]);

  // Fetch the data
  useEffect(() => {
    const fetchBenchHistory = async () => {
      if (!user) return;
      const workouts = await workoutService.getAllWorkouts(user.uid);

      const benchHistory = workouts
        .filter((workout) => workout.exercises)
        .map((workout) => {
          const benchExercise = workout.exercises.find((ex) =>
            ex.name.toLowerCase().includes("bench press"),
          );

          if (benchExercise) {
            return {
              date: new Date(workout.timestamp),
              set1: parseInt(benchExercise.sets[0]?.reps) || 0,
              set2: parseInt(benchExercise.sets[1]?.reps) || 0,
              set3: parseInt(benchExercise.sets[2]?.reps) || 0,
            };
          }
          return null;
        })
        .filter(Boolean)
        .sort((a, b) => a.date - b.date);

      setBenchData(benchHistory);
    };

    fetchBenchHistory();
  }, [user]);

  // Draw the chart
  useEffect(() => {
    if (!benchData.length) return;

    d3.select(svgRef.current).selectAll("*").remove();

    const margin = { top: 20, right: 80, bottom: 30, left: 30 };
    const width = 360 - margin.left - margin.right;
    const height = 200 - margin.top - margin.bottom;

    const svg = d3
      .select(svgRef.current)
      .attr("width", width + margin.left + margin.right)
      .attr("height", height + margin.top + margin.bottom)
      .append("g")
      .attr("transform", `translate(${margin.left},${margin.top})`);

    const xScale = d3
      .scaleTime()
      .domain(d3.extent(benchData, (d) => d.date))
      .range([0, width]);

    const yScale = d3
      .scaleLinear()
      .domain([0, d3.max(benchData, (d) => Math.max(d.set1, d.set2, d.set3))])
      .range([height, 0]);

    // Create lines
    const lines = [
      { key: "set1", color: "#ff0000" },
      { key: "set2", color: "#00ff00" },
      { key: "set3", color: "#0000ff" },
    ];

    lines.forEach(({ key, color }) => {
      // Create the line generator
      const line = d3
        .line()
        .x((d) => xScale(d.date))
        .y((d) => yScale(d[key]))
        .curve(d3.curveMonotoneX);

      // Add the line path
      svg
        .append("path")
        .datum(benchData)
        .attr("fill", "none")
        .attr("stroke", color)
        .attr("stroke-width", 2)
        .attr("d", line);

      // Add dots for each data point
      svg
        .selectAll(`dot-${key}`)
        .data(benchData)
        .enter()
        .append("circle")
        .attr("cx", (d) => xScale(d.date))
        .attr("cy", (d) => yScale(d[key]))
        .attr("r", 2)
        .attr("fill", color);
    });

    // Add axes
    const xAxis = d3.axisBottom(xScale).tickFormat(d3.timeFormat("%b %d"));
    const yAxis = d3.axisLeft(yScale);

    svg.append("g").attr("transform", `translate(0,${height})`).call(xAxis);

    svg.append("g").call(yAxis);
  }, [benchData]);

  return (
    <div className="h-screen bg-white text-black">
      <div className="flex items-center justify-start bg-slate-500 p-4 text-2xl text-white">
        <ArrowLeft onClick={() => navigate("/")} />
        <h1 className="ml-4">Bench Press Progress</h1>
      </div>
      <div className="m-3">
        <div className="rounded-lg border border-gray-200 bg-white px-1 py-4 shadow-lg">
          <div className="mb-2 text-center text-lg font-semibold">
            Bench Press Reps Over Time
          </div>
          <div className="flex justify-center">
            <svg ref={svgRef}></svg>
          </div>
        </div>
      </div>
    </div>
  );
}
