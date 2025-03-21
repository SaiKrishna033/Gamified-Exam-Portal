# Mock Data Guide

This document explains how to use the mock data system for development and testing.

## Overview

The mock data system intercepts API calls and provides consistent, pre-generated data for all endpoints. This allows you to develop and test the application without a backend connection.

## How It Works

1. The `MockApiInterceptor` intercepts all HTTP requests to the API
2. The `MockDataService` provides dummy data from localStorage
3. The system is enabled through the `useMockData` flag in environment.ts

## Available Mock Data

### User Accounts

- **Teacher**: 
  - Email: teacher@example.com
  - Password: password123

- **Student**: 
  - Email: student@example.com
  - Password: password123

### Content

- **Quizzes**: 
  - Mathematics (PIN: 123456)
  - Science (PIN: 234567)
  - English (PIN: 345678)

- **Practice Sets**:
  - Mathematics (PIN: 654321)
  - Science (PIN: 765432)
  - English (PIN: 876543)

### Reports

Pre-generated reports are available for each quiz.

## Using Mock Data

1. The system is automatically enabled in the development environment
2. All API calls will be intercepted and mock data will be returned
3. Data is persisted in localStorage between sessions

### Testing Quizzes

To test a quiz or practice set:

1. Enter one of the PIN codes in the PIN entry screen
2. The system will validate the PIN and redirect you to the appropriate quiz/practice page
3. Your progress will be stored in localStorage

## Adding Custom Mock Data

You can add custom data directly to localStorage using the browser developer tools:

```javascript
// Example: Adding a custom quiz
const quizzes = JSON.parse(localStorage.getItem('mockQuizzes') || '[]');
const newQuiz = { /* your quiz data */ };
quizzes.push(newQuiz);
localStorage.setItem('mockQuizzes', JSON.stringify(quizzes));
```

## Disabling Mock Data

To use the real API instead of mock data:

1. Open `src/environments/environment.ts`
2. Set `useMockData: false`

## Notes

- All mock data is reset when the application is loaded if localStorage doesn't contain mock data
- Report data is randomly generated but consistent
- User authentication is handled entirely client-side when mocks are enabled