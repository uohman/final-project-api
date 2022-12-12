import express from "express";
import cors from 'cors'
import mongoose from 'mongoose'

import questions from "./data/questions.json";

const mongoUrl = process.env.MONGO_URL || "mongodb://localhost/questions"
mongoose.connect(mongoUrl, { useNewUrlParser: true, useUnifiedTopology: true })
mongoose.Promise = Promise

// Defines the port the app will run on. Defaults to 8080, but can be overridden
// when starting the server. Example command to overwrite PORT env variable value:
// PORT=9000 npm start

const Question = mongoose.model("Question", {
  id: Number,
  clue1: String,
  clue1ImgUrl: String,
  clue2: String,
  clue2ImgUrl: String,
  clue3: String,
  clue3ImgUrl: String,
  clue4: String,
  clue4ImgUrl: String,
  clue5: String,
  clue5ImgUrl: String,
  correctAnswer: String,
  correctAnswerImgUrl: String
});
if(process.env.RESET_DB) {
  const resetDataBase = async () => {
    await Question.deleteMany();
    questions.forEach(singleQuestion => {
      const newQuestion = new Question(singleQuestion);
      newQuestion.save();
    })
  }
  resetDataBase();
}

const port = process.env.PORT || 8080;
const app = express();

// Add middlewares to enable cors and json body parsing
app.use(cors());
app.use(express.json());

// Start defining your routes here
app.get("/", (req, res) => {
  res.send({
    Welcome: 
    "This is the API for my final project: A quiz game called StreetSmart.",
    Routes: [
      { 
        "/questions": "Show all questions."
      }
    ],
  })
});

// Show all questions
app.get("/questions", async (req, res) => {
  const allQuestions = await Question.find()
  res.status(200).json({
    success: true,
    questions: allQuestions
  });
});

/* // Show answers with a specific id
app.get("/questions/answers/:id", async (req, res) => {
  try {
    const answerById = await Question.findOne({ correctAnswer: req.params.id })
    if (answerById) {
      res.status(200).json({
      success: true,
      data: answerById
    })
    } else {
      res.status(404).json({
        success: false,
        status_code: 404,
        error: `Could not find that answer`
    })
    }
  } catch (err) {
    res.status(400).json({ 
      success: false,
      status_code: 400,
      error: "Invalid id" 
    });
  }
}); */

/* // Show all correct answers
app.get("/questions/answers", async (req, res) => {
  try {
    const answers = await Question.find({ correctAnswer: "correctAnswer" });

    if (answers) {
      res.status(200).json({
      success: true,
      body: answers
    })
    } else {
      res.status(404).json({
        success: false,
        status_code: 404,
        error: `not found`
    })
    }
  } catch (err) {
    res.status(400).json({ 
      success: false,
      status_code: 400,
      error: "Invalid route" 
    })
  }
}) */

/* // Show all correct answers
app.get("/answers", async (req, res) => {
  const allAnswers = await Question.find(req.params.correctAnswer)
  res.status(200).json({
    success: true,
    body: allAnswers
  });
}); */

/* //Show question by id
app.get("questions/id/:id", async (req, res) => {
  try {
    const singleQuestion = await Question.findById(req.params.id)
    if (singleQuestion) {
      res.status(200).json({
        success: true,
        body: singleQuestion
      });
    } else {
      res.status(404).json({
        success: false,
        body: {
          message: "Could not find the question"
        }
        });
    }
  } catch(error) {
    res.status(400).json({
      success: false,
      body: {
        message: "Invalid id"
      }
      });
  }
}); */


// Start the server
app.listen(port, () => {
  console.log(`Server running on http://localhost:${port}`);
});
