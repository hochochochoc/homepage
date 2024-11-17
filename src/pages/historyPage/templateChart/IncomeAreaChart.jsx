import PropTypes from "prop-types";
import { useState, useEffect } from "react";
import { workoutService } from "@/services/workoutService";
import { useAuth } from "@/contexts/AuthContext";

// material-ui
import { useTheme } from "@mui/material/styles";

// third-party
import ReactApexChart from "react-apexcharts";

// chart options
const areaChartOptions = {
  chart: {
    height: 450,
    type: "area",
    toolbar: {
      show: false,
    },
  },
  dataLabels: {
    enabled: false,
  },
  stroke: {
    curve: "smooth",
    width: 2,
  },
  grid: {
    strokeDashArray: 0,
  },
  xaxis: {
    type: "numeric",
    labels: {
      formatter: function (value) {
        return new Date(value).toLocaleDateString("en-US", {
          month: "short",
          day: "numeric",
        });
      },
    },
  },
  tooltip: {
    x: {
      formatter: function (value) {
        return new Date(value).toLocaleDateString("en-US", {
          year: "numeric",
          month: "short",
          day: "numeric",
        });
      },
    },
  },
};

export default function IncomeAreaChart({ selectedExercise }) {
  const theme = useTheme();
  const { user } = useAuth();
  const [options, setOptions] = useState(areaChartOptions);
  const [series, setSeries] = useState([]);

  useEffect(() => {
    const fetchExerciseData = async () => {
      if (!user || !selectedExercise) return;
      const workouts = await workoutService.getAllWorkouts(user.uid);

      const exerciseData = workouts
        .filter((workout) => workout.exercises)
        .map((workout) => {
          const exercise = workout.exercises.find(
            (ex) => ex.name === selectedExercise,
          );
          if (exercise) {
            return {
              date: workout.timestamp,
              set1: parseInt(exercise.sets[0]?.reps) || 0,
              set2: parseInt(exercise.sets[1]?.reps) || 0,
              set3: parseInt(exercise.sets[2]?.reps) || 0,
            };
          }
          return null;
        })
        .filter(Boolean)
        .sort((a, b) => a.date - b.date);

      const maxReps = Math.max(
        ...exerciseData.map((d) => Math.max(d.set1, d.set2, d.set3)),
      );

      setSeries([
        {
          name: "Set 1",
          data: exerciseData.map((d) => ({
            x: d.date,
            y: d.set1,
          })),
        },
        {
          name: "Set 2",
          data: exerciseData.map((d) => ({
            x: d.date,
            y: d.set2,
          })),
        },
        {
          name: "Set 3",
          data: exerciseData.map((d) => ({
            x: d.date,
            y: d.set3,
          })),
        },
      ]);

      setOptions({
        ...areaChartOptions,
        yaxis: {
          min: 0,
          max: Math.ceil(maxReps / 2) * 2,
          tickAmount: Math.ceil(maxReps / 2),
        },

        colors: ["#90CAF9", theme.palette.primary.main, "#2E5984"],
      });
    };

    fetchExerciseData();
  }, [user, selectedExercise]);

  return (
    <ReactApexChart
      options={options}
      series={series}
      type="area"
      height={350}
    />
  );
}

IncomeAreaChart.propTypes = {
  selectedExercise: PropTypes.string,
};
