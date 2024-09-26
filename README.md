# Math Garden Project
## Welcome to Math garden the garden that will tech you addition opertions!
## Overview
Math Garden is an interactive educational website designed to help children practice basic addition skills using handwritten digit recognition. The project leverages the MNIST dataset and machine learning techniques to create an engaging learning experience for kids aged 5-8.

## Key Features
1. **Interactive Addition Game**: Users solve simple addition problems involving numbers from 0 to 9.
2. **Handwriting Recognition**: Children can write their answers on a digital canvas, which are then recognized by the ML model.
3. **Real-time Feedback**: The system provides immediate feedback on the correctness of the handwritten answers.
4. **Adaptive Difficulty**: The game adjusts problem difficulty based on the user's performance.

## Technical Implementation
- **Frontend**: HTML5, CSS3, JavaScript
- **Backend**: Node.js with Express.js
- **Machine Learning**: TensorFlow for model training, TensorFlow.js for client-side inference
- **Dataset**: MNIST (Modified National Institute of Standards and Technology) database of handwritten digits

## Machine Learning Pipeline
1. **Data Preprocessing**: Normalize and augment MNIST dataset images.
2. **Model Architecture**: Convolutional Neural Network (CNN) designed for digit recognition.
3. **Training**: Model trained on the MNIST dataset using TensorFlow.
4. **Conversion**: Trained model converted to TensorFlow.js format for web deployment.
5. **Client-side Inference**: TensorFlow.js used to run predictions on user input in real-time.

## User Experience
1. User is presented with a simple addition problem (e.g., 3 + 4).
2. User draws the answer (7) on the digital canvas.
3. The ML model processes the handwritten input and predicts the digit.
4. The system compares the predicted digit with the correct answer.
5. Feedback is provided, and the user moves on to the next problem.

## Educational Impact
- Enhances number recognition and basic addition skills
- Improves handwriting through practice
- Builds confidence in math through an engaging, game-like experience

## Future Enhancements
- Expand to include subtraction, multiplication, and division operations
- Implement user accounts to track progress over time
- Add multiplayer mode for classroom competitions
- Develop mobile app versions for iOS and Android

This project demonstrates the practical application of machine learning in educational technology, providing a fun and interactive way for children to improve their math skills while indirectly teaching them about AI and handwriting recognition.
