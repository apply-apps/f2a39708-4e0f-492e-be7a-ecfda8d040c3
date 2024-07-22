// Filename: index.js
// Combined code from all files

import React, { useState, useEffect } from 'react';
import { SafeAreaView, StyleSheet, Text, ScrollView, Button, View, ActivityIndicator, TextInput } from 'react-native';

const WorkoutForm = () => {
    const [exercise, setExercise] = useState('');
    const [reps, setReps] = useState('');
    const [sets, setSets] = useState('');

    const handleSubmit = () => {
        console.log('New Workout:', { exercise, reps, sets });
    };

    return (
        <View style={formStyles.form}>
            <Text style={formStyles.label}>Exercise</Text>
            <TextInput
                style={formStyles.input}
                value={exercise}
                onChangeText={setExercise}
                placeholder="Enter Exercise"
            />
            <Text style={formStyles.label}>Reps</Text>
            <TextInput
                style={formStyles.input}
                value={reps}
                onChangeText={setReps}
                placeholder="Enter Reps"
            />
            <Text style={formStyles.label}>Sets</Text>
            <TextInput
                style={formStyles.input}
                value={sets}
                onChangeText={setSets}
                placeholder="Enter Sets"
            />
            <Button title="Add Workout" onPress={handleSubmit} />
        </View>
    );
};

const WorkoutHistory = () => {
    const [loading, setLoading] = useState(true);
    const [workouts, setWorkouts] = useState([]);

    useEffect(() => {
        setTimeout(() => {
            setLoading(false);
            setWorkouts([
                { id: 1, exercise: 'Push-up', reps: 15, sets: 3 },
                { id: 2, exercise: 'Squat', reps: 20, sets: 4 },
                { id: 3, exercise: 'Burpee', reps: 10, sets: 2 },
            ]);
        }, 2000);
    }, []);

    if (loading) {
        return <ActivityIndicator size="large" color="#0000ff" />;
    }

    return (
        <View style={historyStyles.historyContainer}>
            <Text style={historyStyles.historyTitle}>Workout History</Text>
            {workouts.map(workout => (
                <View key={workout.id} style={historyStyles.workout}>
                    <Text style={historyStyles.exercise}>{workout.exercise}</Text>
                    <Text>Reps: {workout.reps}</Text>
                    <Text>Sets: {workout.sets}</Text>
                </View>
            ))}
        </View>
    );
};

const App = () => {
    return (
        <SafeAreaView style={appStyles.container}>
            <ScrollView contentContainerStyle={appStyles.scrollView}>
                <Text style={appStyles.title}>Workout Tracker</Text>
                <WorkoutForm />
                <WorkoutHistory />
            </ScrollView>
        </SafeAreaView>
    );
};

const appStyles = StyleSheet.create({
    container: {
        flex: 1,
        marginTop: 20,
        paddingHorizontal: 20,
        backgroundColor: '#FFFFFF',
    },
    scrollView: {
        paddingBottom: 20,
        alignItems: 'center',
    },
    title: {
        fontSize: 24,
        fontWeight: 'bold',
        marginBottom: 20,
    },
});

const formStyles = StyleSheet.create({
    form: {
        backgroundColor: '#FFFFFF',
        padding: 20,
        borderRadius: 10,
        marginBottom: 20,
        width: '100%',
    },
    label: {
        fontSize: 16,
        fontWeight: 'bold',
        marginBottom: 5,
    },
    input: {
        padding: 10,
        borderRadius: 5,
        borderWidth: 1,
        borderColor: '#CCCCCC',
        marginBottom: 10,
        width: '100%',
    },
});

const historyStyles = StyleSheet.create({
    historyContainer: {
        backgroundColor: '#FFFFFF',
        padding: 20,
        borderRadius: 10,
        width: '100%',
    },
    historyTitle: {
        fontSize: 20,
        fontWeight: 'bold',
        marginBottom: 10,
    },
    workout: {
        marginBottom: 10,
    },
    exercise: {
        fontSize: 18,
        fontWeight: 'bold',
    },
});

export default App;