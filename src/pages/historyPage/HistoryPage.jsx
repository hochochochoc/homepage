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
  const [exerciseData, setExerciseData] = useState([]);
  const [availableExercises, setAvailableExercises] = useState([]);
  const [selectedExercise, setSelectedExercise] = useState("");

  // Fetch the data
  useEffect(() => {
    const fetchExerciseHistory = async () => {
      if (!user) return;
      const workouts = await workoutService.getAllWorkouts(user.uid);

      // Get unique exercise names
      const exerciseNames = new Set();
      workouts.forEach((workout) => {
        if (workout.exercises) {
          workout.exercises.forEach((exercise) => {
            exerciseNames.add(exercise.name);
          });
        }
      });
      const sortedExercises = Array.from(exerciseNames).sort();
      setAvailableExercises(sortedExercises);

      // Set default selected exercise if none is selected
      if (!selectedExercise && sortedExercises.length > 0) {
        setSelectedExercise(sortedExercises[0]);
      }

      if (selectedExercise) {
        const exerciseHistory = workouts
          .filter((workout) => workout.exercises)
          .map((workout) => {
            const exercise = workout.exercises.find(
              (ex) => ex.name === selectedExercise,
            );

            if (exercise) {
              return {
                date: new Date(workout.timestamp),
                set1: parseInt(exercise.sets[0]?.reps) || 0,
                set2: parseInt(exercise.sets[1]?.reps) || 0,
                set3: parseInt(exercise.sets[2]?.reps) || 0,
              };
            }
            return null;
          })
          .filter(Boolean)
          .sort((a, b) => a.date - b.date);

        setExerciseData(exerciseHistory);
      }
    };

    fetchExerciseHistory();
  }, [user, selectedExercise]);

  // Draw the chart
  useEffect(() => {
    if (!exerciseData.length) return;

    d3.select(svgRef.current).selectAll("*").remove();

    const container = d3.select(svgRef.current.parentElement);
    const containerWidth = container.node().getBoundingClientRect().width;
    const margin = { top: 20, right: 30, bottom: 40, left: 30 };
    const width = containerWidth * 0.9 - margin.left - margin.right;
    const height = 200 - margin.top - margin.bottom;

    const svg = d3
      .select(svgRef.current)
      .attr("width", width + margin.left + margin.right)
      .attr("height", height + margin.top + margin.bottom)
      .append("g")
      .attr("transform", `translate(${margin.left},${margin.top})`);

    const xScale = d3
      .scaleTime()
      .domain(d3.extent(exerciseData, (d) => d.date))
      .range([0, width]);

    const yScale = d3
      .scaleLinear()
      .domain([
        0,
        d3.max(exerciseData, (d) => Math.max(d.set1, d.set2, d.set3)),
      ])
      .range([height, 0]);

    // Create lines
    const lines = [
      { key: "set1", color: "#ff0000" },
      { key: "set2", color: "#00ff00" },
      { key: "set3", color: "#0000ff" },
    ];

    lines.forEach(({ key, color }) => {
      const line = d3
        .line()
        .x((d) => xScale(d.date))
        .y((d) => yScale(d[key]))
        .curve(d3.curveMonotoneX);

      svg
        .append("path")
        .datum(exerciseData)
        .attr("fill", "none")
        .attr("stroke", color)
        .attr("stroke-width", 2)
        .attr("d", line);

      svg
        .selectAll(`dot-${key}`)
        .data(exerciseData)
        .enter()
        .append("circle")
        .attr("cx", (d) => xScale(d.date))
        .attr("cy", (d) => yScale(d[key]))
        .attr("r", 2)
        .attr("fill", color);
    });

    // Add axes
    const xAxisDays = d3.axisBottom(xScale).tickFormat(d3.timeFormat("%d"));

    // Add the day numbers
    svg.append("g").attr("transform", `translate(0,${height})`).call(xAxisDays);

    // Group dates by month and find center point for each month
    const monthGroups = d3.group(xScale.ticks(), (d) =>
      d3.timeFormat("%B %Y")(d),
    );
    const monthCenters = Array.from(monthGroups, ([month, dates]) => ({
      month,
      center: d3.mean(dates, (d) => xScale(d)),
    }));

    // Add month labels at calculated center points
    svg
      .append("g")
      .attr("transform", `translate(0,${height + 20})`)
      .selectAll("text")
      .data(monthCenters)
      .enter()
      .append("text")
      .attr("x", (d) => d.center)
      .attr("y", 10)
      .attr("text-anchor", "middle")
      .style("font-size", "10px")
      .text((d) => d3.timeFormat("%b")(new Date(d.month)));

    const yAxis = d3.axisLeft(yScale);
    svg.append("g").call(yAxis);
  }, [exerciseData]);

  return (
    <div className="h-screen bg-white text-black">
      <div className="flex items-center justify-start bg-slate-500 p-4 text-2xl text-white">
        <ArrowLeft onClick={() => navigate("/")} />
        <h1 className="ml-20"> History </h1>
      </div>
      <div className="m-3">
        <div className="mb-4 flex justify-center">
          <select
            value={selectedExercise}
            onChange={(e) => setSelectedExercise(e.target.value)}
            className="rounded border border-gray-300 px-4 py-2 focus:border-blue-500 focus:outline-none"
          >
            {availableExercises.map((exercise) => (
              <option key={exercise} value={exercise}>
                {exercise}
              </option>
            ))}
          </select>
        </div>
        <div className="rounded-lg border border-gray-200 bg-white px-1 py-4 shadow-lg">
          <div className="mb-2 text-center text-lg font-semibold">
            {selectedExercise} Reps Over Time
          </div>
          <div className="flex justify-center">
            <svg ref={svgRef}></svg>
          </div>
          <div className="mt-4 flex justify-center space-x-6 text-sm">
            <div className="flex items-center">
              <div className="mr-2 h-3 w-3 rounded-full bg-red-500"></div>
              <span>Set 1</span>
            </div>
            <div className="flex items-center">
              <div className="mr-2 h-3 w-3 rounded-full bg-green-500"></div>
              <span>Set 2</span>
            </div>
            <div className="flex items-center">
              <div className="mr-2 h-3 w-3 rounded-full bg-blue-500"></div>
              <span>Set 3</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
