import { useState, useEffect } from "react";
import { workoutService } from "@/services/workoutService";
import { useAuth } from "@/contexts/AuthContext";

// material-ui
import Grid from "@mui/material/Grid";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import Select from "@mui/material/Select";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";

// project import
import MainCard from "./MainCard";
import IncomeAreaChart from "./IncomeAreaChart";

export default function UniqueVisitorCard() {
  const [selectedExercise, setSelectedExercise] = useState("");
  const [availableExercises, setAvailableExercises] = useState([]);
  const { user } = useAuth();

  useEffect(() => {
    const fetchExercises = async () => {
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
    };

    fetchExercises();
  }, [user]);

  return (
    <>
      <Grid
        container
        alignItems="center"
        justifyContent="space-between"
        spacing={2}
      >
        <Grid item xs={12} sm={6}>
          <Typography variant="h5">Exercise Progress</Typography>
        </Grid>
        <Grid item xs={12} sm={6}>
          <FormControl fullWidth size="small">
            <Select
              value={selectedExercise}
              onChange={(e) => setSelectedExercise(e.target.value)}
              displayEmpty
              sx={{ minWidth: 120 }}
            >
              {availableExercises.map((exercise) => (
                <MenuItem key={exercise} value={exercise}>
                  {exercise}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
        </Grid>
      </Grid>
      <MainCard content={false} sx={{ mt: 1.5 }}>
        <Box sx={{ pt: 1, pr: 2 }}>
          <IncomeAreaChart selectedExercise={selectedExercise} />
        </Box>
      </MainCard>
    </>
  );
}
