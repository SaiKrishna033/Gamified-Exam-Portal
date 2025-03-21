import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { KuhuItem } from '../models/kuhu-item';
import { EncryptionService } from './encryption.service';

@Injectable({
  providedIn: 'root'
})
export class MockDataService {
  constructor(private encryptionService: EncryptionService) {
    // We'll initialize mock data lazily to avoid circular dependencies
  }

  // Lazy initialization method to be called by interceptor
  initializeMockData() {
    if (!this.isInitialized) {
      this.clearAndResetMockData();
      this.isInitialized = true;
    }
  }

  private isInitialized = false;
  
  private clearAndResetMockData(): void {
    // Clear relevant data
    localStorage.removeItem('mockQuizzes');
    localStorage.removeItem('mockPracticeSets');
    localStorage.removeItem('mockReports');
    
    // Reinitialize
    this.initMockData();
  }

  private initMockData(): void {
    // Mock User Data
    if (!localStorage.getItem('mockUsers')) {
      const users = [
        {
          id: '1',
          email: 'teacher@example.com',
          password: 'password123',
          firstName: 'John',
          lastName: 'Smith',
          userType: 'teacher'
        },
        {
          id: '2',
          email: 'student@example.com',
          password: 'password123',
          firstName: 'Jane',
          lastName: 'Doe',
          userType: 'student'
        }
      ];
      localStorage.setItem('mockUsers', JSON.stringify(users));
    }

    // Mock Quiz Data
    if (!localStorage.getItem('mockQuizzes')) {
      const quizzes = [
        this.generateQuiz('1', 'Mathematics', 'Algebra'),
        this.generateQuiz('2', 'Science', 'Physics'),
        this.generateQuiz('3', 'English', 'Grammar')
      ];
      console.log('Generated quiz PINs:', quizzes.map(q => {
        try {
          return q.data.item.pin;
        } catch (e) {
          console.log('Error accessing quiz pin:', e);
          return 'unknown';
        }
      }));
      localStorage.setItem('mockQuizzes', JSON.stringify(quizzes));
    }

    // Mock Practice Sets
    if (!localStorage.getItem('mockPracticeSets')) {
      const practiceSets = [
        this.generatePracticeSet('1', 'Mathematics', 'Algebra'),
        this.generatePracticeSet('2', 'Science', 'Physics'),
        this.generatePracticeSet('3', 'English', 'Grammar')
      ];
      console.log('Generated practice set PINs:', practiceSets.map(p => {
        try {
          // Check the structure to see where pin is located
          return p.data.pin || (p.data.item && p.data.item.pin) || 'unknown';
        } catch (e) {
          console.log('Error accessing practice set pin:', e);
          return 'unknown';
        }
      }));
      localStorage.setItem('mockPracticeSets', JSON.stringify(practiceSets));
    }
    
    // Mock Reports Data
    if (!localStorage.getItem('mockReports')) {
      const reports = [
        this.generateReport('1', '1', 'Mathematics'),
        this.generateReport('2', '2', 'Science'),
        this.generateReport('3', '3', 'English')
      ];
      localStorage.setItem('mockReports', JSON.stringify(reports));
    }
  }

  // Authentication methods
  login(email: string, password: string): any {
    const users = JSON.parse(localStorage.getItem('mockUsers') || '[]');
    const user = users.find((u: any) => u.email === email && u.password === password);
    
    if (user) {
      const userData = {
        accessToken: 'mock-access-token-' + user.id,
        refreshToken: 'mock-refresh-token-' + user.id,
        id: user.id,
        email: user.email,
        firstName: user.firstName,
        lastName: user.lastName,
        userType: user.userType
      };
      
      // Store encrypted tokens in localStorage
      localStorage.setItem('accessToken', this.encryptionService.encryptData(userData.accessToken));
      localStorage.setItem('refreshToken', this.encryptionService.encryptData(userData.refreshToken));
      localStorage.setItem('userType', this.encryptionService.encryptData(userData.userType));
      localStorage.setItem('userData', this.encryptionService.encryptData(JSON.stringify(user)));
      
      // Match the response structure expected by the component
      return {
        status: 200,
        message: 'Login successful',
        data: userData
      };
    }
    
    return { 
      status: 401,
      message: 'Invalid email or password',
      error: 'Invalid credentials' 
    };
  }

  register(userData: any): any {
    // Check if email already exists
    const users = JSON.parse(localStorage.getItem('mockUsers') || '[]');
    const existingUser = users.find((u: any) => u.email === userData.email);
    
    if (existingUser) {
      return {
        status: 400,
        message: 'Email already in use',
        error: 'User with this email already exists'
      };
    }
    
    // Create new user
    const newId = users.length > 0 ? String(parseInt(users[users.length - 1].id) + 1) : '1';
    
    const newUser = {
      id: newId,
      email: userData.email,
      password: userData.password,
      firstName: userData.firstName,
      lastName: userData.lastName,
      userType: userData.userType || 'student'
    };
    
    users.push(newUser);
    localStorage.setItem('mockUsers', JSON.stringify(users));
    
    return {
      status: 200,
      message: 'Registration successful',
      data: { userId: newId }
    };
  }

  getUserDetails(): any {
    const userDataEncrypted = localStorage.getItem('userData');
    if (!userDataEncrypted) {
      return { 
        status: 401,
        message: 'User not authenticated',
        error: 'Authentication required' 
      };
    }
    
    const userData = JSON.parse(this.encryptionService.decryptData(userDataEncrypted));
    return {
      status: 200,
      message: 'User details retrieved successfully',
      data: {
        id: userData.id,
        email: userData.email,
        firstName: userData.firstName,
        lastName: userData.lastName,
        userType: userData.userType
      }
    };
  }

  // Quiz methods
  validatePincode(pin: string): any {
    const quizzes = JSON.parse(localStorage.getItem('mockQuizzes') || '[]');
    const practiceSets = JSON.parse(localStorage.getItem('mockPracticeSets') || '[]');
    
    console.log('Validating PIN:', pin);
    console.log('Available quiz PINs:', quizzes.map((q: any) => q.data.item.pin));
    console.log('Available practice PINs:', practiceSets.map((p: any) => p.data.pin));
    
    // Hardcoded pins for testing
    const validPins = ['123456', '234567', '345678', '654321', '765432', '876543'];
    
    if (validPins.includes(pin)) {
      console.log('PIN is in hardcoded valid list!');
      return {
        status: 200,
        message: 'PIN validated successfully',
        data: true
      };
    }
    
    // Check if pin exists in quizzes or practice sets
    const quiz = quizzes.find((q: any) => q.data.item.pin === parseInt(pin));
    const practice = practiceSets.find((p: any) => p.data.pin === parseInt(pin));
    
    console.log('Found quiz?', !!quiz);
    console.log('Found practice?', !!practice);
    
    if (quiz || practice) {
      // Looking at the component, it expects data to be just a boolean value
      console.log('PIN is valid!');
      return {
        status: 200,
        message: 'PIN validated successfully',
        data: true
      };
    }
    
    console.log('PIN is invalid!');
    return { 
      status: 404,
      message: 'Invalid PIN',
      error: 'PIN not found',
      data: false
    };
  }

  getQuizByPin(pin: string): any {
    const quizzes = JSON.parse(localStorage.getItem('mockQuizzes') || '[]');
    const quiz = quizzes.find((q: any) => q.data.item.pin === parseInt(pin));
    
    if (quiz) {
      return {
        status: 200,
        message: 'Quiz retrieved successfully',
        data: quiz
      };
    }
    
    return { 
      status: 404,
      message: 'Quiz not found',
      error: 'Invalid quiz PIN' 
    };
  }

  getPracticeSetByPin(pin: string): any {
    const practiceSets = JSON.parse(localStorage.getItem('mockPracticeSets') || '[]');
    
    console.log('Looking for PIN:', pin);
    
    // Try to be flexible about where the pin might be located
    const practiceSet = practiceSets.find((p: any) => {
      const pinValue = parseInt(pin);
      // Check different potential locations for the pin
      return (p.data && p.data.pin === pinValue) || 
             (p.data && p.data.item && p.data.item.pin === pinValue);
    });
    
    if (practiceSet) {
      console.log('Found practice set:', practiceSet);
      return {
        status: 200,
        message: 'Practice set retrieved successfully',
        data: practiceSet.data || practiceSet // Return data object, regardless of structure
      };
    }
    
    return { 
      status: 404,
      message: 'Practice set not found',
      error: 'Invalid practice set PIN' 
    };
  }

  updatePracticeSetMetadata(id: string, data: any): any {
    const practiceSets = JSON.parse(localStorage.getItem('mockPracticeSets') || '[]');
    const index = practiceSets.findIndex((p: any) => p.data._id === id);
    
    console.log('Updating practice set with ID:', id);
    console.log('Available practice set IDs:', practiceSets.map((p: any) => p.data._id));
    
    if (index !== -1) {
      // Increment number of views
      if (!data.number_of_views) {
        practiceSets[index].data.number_of_views = (practiceSets[index].data.number_of_views || 0) + 1;
      }
      
      practiceSets[index].data = { ...practiceSets[index].data, ...data };
      localStorage.setItem('mockPracticeSets', JSON.stringify(practiceSets));
      
      return { 
        status: 200,
        message: 'Practice set updated successfully',
        success: true 
      };
    }
    
    return { 
      status: 404,
      message: 'Practice set not found',
      error: 'Invalid practice set ID' 
    };
  }
  
  // Report methods
  getReports(): any {
    const reports = JSON.parse(localStorage.getItem('mockReports') || '[]');
    return {
      status: 200,
      message: 'Reports retrieved successfully',
      data: reports
    };
  }
  
  getReportById(id: string): any {
    const reports = JSON.parse(localStorage.getItem('mockReports') || '[]');
    const report = reports.find((r: any) => r.id === id);
    
    if (report) {
      return {
        status: 200,
        message: 'Report retrieved successfully',
        data: report
      };
    }
    
    return { 
      status: 404,
      message: 'Report not found',
      error: 'Invalid report ID' 
    };
  }
  
  saveReport(reportData: any): any {
    const reports = JSON.parse(localStorage.getItem('mockReports') || '[]');
    const newId = reports.length > 0 ? String(parseInt(reports[reports.length - 1].id) + 1) : '1';
    
    const newReport = {
      id: newId,
      ...reportData,
      timestamp: new Date().toISOString()
    };
    
    reports.push(newReport);
    localStorage.setItem('mockReports', JSON.stringify(reports));
    
    return { 
      status: 200,
      message: 'Report saved successfully',
      data: { reportId: newId }
    };
  }
  
  private generateReport(id: string, quizId: string, subject: string): any {
    // Get the quiz to reference its questions
    const quizzes = JSON.parse(localStorage.getItem('mockQuizzes') || '[]');
    const quiz = quizzes.find((q: any) => q.data.item._id === quizId);
    
    if (!quiz) {
      return null;
    }
    
    const totalQuestions = quiz.data.item.questions.length;
    const correctAnswers = Math.floor(Math.random() * (totalQuestions + 1)); // Random number between 0 and totalQuestions
    
    const questionResults = quiz.data.item.questions.map((q: any, index: number) => {
      // Randomize whether the answer was correct (but ensure we have exactly correctAnswers correct)
      const isCorrect = index < correctAnswers;
      const chosenOption = isCorrect 
        ? q.answers.findIndex((a: any) => a.isCorrect) + 1
        : Math.floor(Math.random() * 4) + 1;
      
      return {
        question_number: index + 1,
        question: q.question,
        isChosen: true,
        isCorrect: isCorrect,
        chosenOption: chosenOption,
        isTimeElapsed: false,
        responseTimeInSeconds: Math.floor(Math.random() * 30) + 10, // Random time between 10-40 seconds
        remainingTimeInSeconds: 0,
        option1_state: chosenOption === 1 ? (isCorrect ? 'correct' : 'wrong') : 'normal',
        option2_state: chosenOption === 2 ? (isCorrect ? 'correct' : 'wrong') : 'normal',
        option3_state: chosenOption === 3 ? (isCorrect ? 'correct' : 'wrong') : 'normal',
        option4_state: chosenOption === 4 ? (isCorrect ? 'correct' : 'wrong') : 'normal'
      };
    });
    
    return {
      id: id,
      quizId: quizId,
      userId: '2', // Default to student user
      timestamp: new Date().toISOString(),
      subject: subject,
      totalQuestions: totalQuestions,
      correctAnswers: correctAnswers,
      incorrectAnswers: totalQuestions - correctAnswers,
      score: Math.floor((correctAnswers / totalQuestions) * 100),
      totalTimeSpent: questionResults.reduce((sum: number, q: any) => sum + q.responseTimeInSeconds, 0),
      averageTimePerQuestion: Math.floor(questionResults.reduce((sum: number, q: any) => sum + q.responseTimeInSeconds, 0) / totalQuestions),
      questionResults: questionResults
    };
  }

  // Helper methods to generate mock data
  private generateQuiz(id: string, subject: string, topic: string): KuhuItem {
    // Use explicit PINs that won't change
    let pin: number;
    if (id === '1') pin = 123456;
    else if (id === '2') pin = 234567;
    else if (id === '3') pin = 345678;
    else pin = 100000 + parseInt(id);
    
    // Ensure we have at least one question to meet the tuple requirement
    const questionsArray = this.generateQuestions(5, subject);
    const firstQuestion = questionsArray[0] || {
      question: 'Default question',
      solution_explanation: 'Default explanation',
      answers: [
        {
          choice_number: '1',
          choice: 'Option A',
          isCorrect: true
        },
        {
          choice_number: '2',
          choice: 'Option B',
          isCorrect: false
        },
        {
          choice_number: '3',
          choice: 'Option C',
          isCorrect: false
        },
        {
          choice_number: '4',
          choice: 'Option D',
          isCorrect: false
        }
      ]
    };
    
    // Create a tuple-like array with at least one element
    const questionsTuple = [firstQuestion, ...questionsArray.slice(1)] as [{
      question: string;
      solution_explanation: string;
      answers: [
        {
          choice_number: string;
          choice: string;
          isCorrect: boolean;
        }
      ];
    }];
    
    const currentDate = new Date();
    const difficultyLevel = ['Easy', 'Medium', 'Hard'][Math.floor(Math.random() * 3)];
    
    // Create the quiz item with all required fields
    const quizItem = {
      _id: id,
      code: `QUIZ-${id}`,
      mcq_template_id: `TEMPLATE-${id}`,
      pin: pin,
      pincode: pin.toString(),
      duration_in_seconds: 300,
      duration_in_seconds_per_item: 60,
      subject_id: `SUBJ-${id}`,
      subject: subject,
      subject_code: subject.substring(0, 3).toUpperCase(),
      topic_id: `TOPIC-${id}`,
      topic: topic,
      topic_name: `${subject} - ${topic}`,
      class: `Grade ${Math.floor(Math.random() * 5) + 6}`,
      total_questions: questionsArray.length,
      number_of_questions: questionsArray.length,
      number_of_views: Math.floor(Math.random() * 50) + 1,
      createdAt: currentDate.toISOString(),
      difficulty_level: difficultyLevel,
      isSelected: false,
      questions: questionsTuple
    };
    
    return {
      data: {
        item: quizItem
      }
    };
  }

  private generatePracticeSet(id: string, subject: string, topic: string): any {
    // Use explicit PINs that won't change
    let pin: number;
    if (id === '1') pin = 654321;
    else if (id === '2') pin = 765432;
    else if (id === '3') pin = 876543;
    else pin = 200000 + parseInt(id);
    
    // Ensure we have at least one question to meet the tuple requirement
    const questionsArray = this.generateQuestions(10, subject);
    const firstQuestion = questionsArray[0] || {
      question: 'Default question',
      solution_explanation: 'Default explanation',
      answers: [
        {
          choice_number: '1',
          choice: 'Option A',
          isCorrect: true
        },
        {
          choice_number: '2',
          choice: 'Option B',
          isCorrect: false
        },
        {
          choice_number: '3',
          choice: 'Option C',
          isCorrect: false
        },
        {
          choice_number: '4',
          choice: 'Option D',
          isCorrect: false
        }
      ]
    };
    
    // Create a tuple-like array with at least one element
    const questionsTuple = [firstQuestion, ...questionsArray.slice(1)] as [{
      question: string;
      solution_explanation: string;
      answers: [
        {
          choice_number: string;
          choice: string;
          isCorrect: boolean;
        }
      ];
    }];
    
    const currentDate = new Date();
    const difficultyLevel = ['Easy', 'Medium', 'Hard'][Math.floor(Math.random() * 3)];
    
    // Create both the item structure and the flattened structure
    const practiceSetItem = {
      _id: id,
      code: `PRACTICE-${id}`,
      mcq_template_id: `TEMPLATE-${id}`,
      pin: pin,
      pincode: pin.toString(),
      duration_in_seconds: 600,
      duration_in_seconds_per_item: 120,
      subject_id: `SUBJ-${id}`,
      subject: subject,
      subject_code: subject.substring(0, 3).toUpperCase(),
      topic_id: `TOPIC-${id}`,
      topic: topic,
      topic_name: `${subject} - ${topic}`,
      class: `Grade ${Math.floor(Math.random() * 5) + 6}`,
      total_questions: questionsArray.length,
      number_of_questions: questionsArray.length,
      number_of_views: Math.floor(Math.random() * 50) + 1,
      createdAt: currentDate.toISOString(),
      difficulty_level: difficultyLevel,
      isSelected: false,
      questions: questionsTuple
    };
    
    return {
      data: practiceSetItem
    };
  }

  private generateQuestions(count: number, subject: string): Array<{
    question: string;
    solution_explanation: string;
    answers: Array<{
      choice_number: string;
      choice: string;
      isCorrect: boolean;
    }>;
  }> {
    const mathQuestions = [
      { q: 'What is 2 + 2?', answers: [
        { choice: '3', isCorrect: false },
        { choice: '4', isCorrect: true },
        { choice: '5', isCorrect: false },
        { choice: '22', isCorrect: false }
      ]},
      { q: 'Solve for x: 3x + 5 = 14', answers: [
        { choice: '3', isCorrect: true },
        { choice: '4', isCorrect: false },
        { choice: '5', isCorrect: false },
        { choice: '6', isCorrect: false }
      ]},
      { q: 'What is the square root of 64?', answers: [
        { choice: '6', isCorrect: false },
        { choice: '8', isCorrect: true },
        { choice: '10', isCorrect: false },
        { choice: '16', isCorrect: false }
      ]}
    ];
    
    const scienceQuestions = [
      { q: 'Which of the following is not a state of matter?', answers: [
        { choice: 'Solid', isCorrect: false },
        { choice: 'Liquid', isCorrect: false },
        { choice: 'Gas', isCorrect: false },
        { choice: 'Energy', isCorrect: true }
      ]},
      { q: 'What is the chemical symbol for gold?', answers: [
        { choice: 'Go', isCorrect: false },
        { choice: 'Gd', isCorrect: false },
        { choice: 'Au', isCorrect: true },
        { choice: 'Ag', isCorrect: false }
      ]},
      { q: 'Which planet is known as the Red Planet?', answers: [
        { choice: 'Venus', isCorrect: false },
        { choice: 'Mars', isCorrect: true },
        { choice: 'Jupiter', isCorrect: false },
        { choice: 'Saturn', isCorrect: false }
      ]}
    ];
    
    const englishQuestions = [
      { q: 'Which of the following is a proper noun?', answers: [
        { choice: 'dog', isCorrect: false },
        { choice: 'city', isCorrect: false },
        { choice: 'Paris', isCorrect: true },
        { choice: 'happiness', isCorrect: false }
      ]},
      { q: 'Which sentence uses the correct form of the verb?', answers: [
        { choice: 'She have gone to school.', isCorrect: false },
        { choice: 'She has gone to school.', isCorrect: true },
        { choice: 'She having gone to school.', isCorrect: false },
        { choice: 'She be gone to school.', isCorrect: false }
      ]},
      { q: 'What is the plural form of "child"?', answers: [
        { choice: 'childs', isCorrect: false },
        { choice: 'childes', isCorrect: false },
        { choice: 'children', isCorrect: true },
        { choice: 'childrens', isCorrect: false }
      ]}
    ];
    
    let questionBank;
    
    if (subject === 'Mathematics') {
      questionBank = mathQuestions;
    } else if (subject === 'Science') {
      questionBank = scienceQuestions;
    } else {
      questionBank = englishQuestions;
    }
    
    // Create a collection of formatted questions
    const questions = [];
    for (let i = 0; i < count; i++) {
      const questionTemplate = questionBank[i % questionBank.length];
      
      // Create a proper answers array that TypeScript will accept as a tuple with at least one element
      const answersArray = questionTemplate.answers.map((a, index) => ({
        choice_number: (index + 1).toString(),
        choice: a.choice,
        isCorrect: a.isCorrect
      }));
      
      // Make sure we have at least one answer
      const firstAnswer = answersArray[0] || {
        choice_number: '1',
        choice: 'Default choice',
        isCorrect: true
      };
      
      // Create the question with a properly formed answers array
      questions.push({
        question: questionTemplate.q,
        solution_explanation: 'Detailed explanation for this question.',
        answers: [firstAnswer, ...answersArray.slice(1)]
      });
    }
    
    return questions;
  }
}