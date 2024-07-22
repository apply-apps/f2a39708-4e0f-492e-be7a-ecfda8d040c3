// Filename: index.js
// Combined code from all files

import React, { useState, useEffect } from 'react';
import { SafeAreaView, StyleSheet, Text, View, Button, Alert, ScrollView } from 'react-native';

const CELL_SIZE = 20;
const BOARD_SIZE = 400;

const generateFoodPosition = () => {
  const maxPos = BOARD_SIZE / CELL_SIZE - 1;
  const x = Math.floor(Math.random() * maxPos) * CELL_SIZE;
  const y = Math.floor(Math.random() * maxPos) * CELL_SIZE;
  return { x, y };
};

const SnakeGame = () => {
  const [snake, setSnake] = useState([{ x: 0, y: 0 }]);
  const [food, setFood] = useState(generateFoodPosition());
  const [direction, setDirection] = useState({ x: 20, y: 0 });
  const [gameOver, setGameOver] = useState(false);

  useEffect(() => {
    const interval = setInterval(moveSnake, 200);
    return () => clearInterval(interval);
  }, [snake, direction]);

  const moveSnake = () => {
    const newSnake = [...snake];
    const head = newSnake[0];
    const newHead = { x: head.x + direction.x, y: head.y + direction.y };

    // Check wall collisions
    if (newHead.x < 0 || newHead.y < 0 || newHead.x >= BOARD_SIZE || newHead.y >= BOARD_SIZE) {
      setGameOver(true);
      Alert.alert("Game Over", "You hit the wall!", [{ text: "Restart", onPress: restartGame }]);
      return;
    }

    // Check self-collision
    for (let part of snake) {
      if (part.x === newHead.x && part.y === newHead.y) {
        setGameOver(true);
        Alert.alert("Game Over", "You collided with yourself!", [{ text: "Restart", onPress: restartGame }]);
        return;
      }
    }

    newSnake.unshift(newHead);

    // Check food collision
    if (newHead.x === food.x && newHead.y === food.y) {
      setFood(generateFoodPosition());
    } else {
      newSnake.pop();
    }

    setSnake(newSnake);
  };

  const restartGame = () => {
    setSnake([{ x: 0, y: 0 }]);
    setFood(generateFoodPosition());
    setDirection({ x: 20, y: 0 });
    setGameOver(false);
  };

  const handleKeyPress = ({ nativeEvent: { key } }) => {
    switch (key) {
      case 'ArrowUp':
        setDirection({ x: 0, y: -CELL_SIZE });
        break;
      case 'ArrowDown':
        setDirection({ x: 0, y: CELL_SIZE });
        break;
      case 'ArrowLeft':
        setDirection({ x: -CELL_SIZE, y: 0 });
        break;
      case 'ArrowRight':
        setDirection({ x: CELL_SIZE, y: 0 });
        break;
      default:
        break;
    }
  };

  return (
    <ScrollView contentContainerStyle={styles.snakeGameContainer} keyboardShouldPersistTaps='handled'>
      <View style={styles.board} onKeyDown={handleKeyPress} tabIndex="0">
        {snake.map((segment, index) => (
          <View key={index} style={[styles.snake, { left: segment.x, top: segment.y }]} />
        ))}
        <View style={[styles.food, { left: food.x, top: food.y }]} />
      </View>
      {gameOver && <Button title="Restart" onPress={restartGame} />}
    </ScrollView>
  );
};

const App = () => {
  return (
    <SafeAreaView style={styles.appContainer}>
      <Text style={styles.title}>Snake Game</Text>
      <SnakeGame />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  appContainer: {
    flex: 1,
    paddingTop: 20,
    backgroundColor: '#FFFFFF',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    textAlign: 'center',
    marginVertical: 20,
  },
  snakeGameContainer: {
    alignItems: 'center',
  },
  board: {
    width: BOARD_SIZE,
    height: BOARD_SIZE,
    backgroundColor: '#000',
    position: 'relative',
  },
  snake: {
    width: CELL_SIZE,
    height: CELL_SIZE,
    backgroundColor: '#0F0',
    position: 'absolute',
  },
  food: {
    width: CELL_SIZE,
    height: CELL_SIZE,
    backgroundColor: '#F00',
    position: 'absolute',
  },
});

export default App;