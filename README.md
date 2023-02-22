#ur json server should be like that ==>>

{
  "students": [
    {
      "name": "mando1",
      "email": "mando1@m.com",
      "password": "123",
      "subjects": [
        {
          "subjectName": "english",
          "degree": 1,
          "subjectId": 2
        },
        {
          "subjectName": "math",
          "degree": 1,
          "subjectId": 1
        }
      ],
      "id": 1
    },
    {
      "name": "mando2",
      "email": "mando2@m.com",
      "password": "0000",
      "id": 2
    },
    {
      "name": "mando3",
      "email": "mando3@m.com",
      "password": "000",
      "id": 3
    },
    {
      "name": "mando4",
      "email": "mando4@m.com",
      "password": "0000",
      "id": 4
    }
  ],
  "doctor": [
    {
      "name": "admin",
      "email": "admin@admin.com",
      "password": "0000",
      "id": 1
    }
  ],
  "subjects": [
    {
      "subjectName": "math",
      "questions": [
        {
          "question": "2+2",
          "answer1": "4",
          "answer2": "5",
          "answer3": "6",
          "answer4": "10",
          "correctAnswer": "4"
        },
        {
          "question": "2*2",
          "answer1": "1",
          "answer2": "2",
          "answer3": "3",
          "answer4": "4",
          "correctAnswer": "4"
        }
      ],
      "id": 1
    },
    {
      "subjectName": "english",
      "questions": [
        {
          "question": "i can ...",
          "answer1": "play",
          "answer2": "playing",
          "answer3": "to play",
          "answer4": "palyed",
          "correctAnswer": "play"
        }
      ],
      "id": 2
    }
  ],
  "login": [
    {
      "email": "admin@admin.com",
      "password": "0000",
      "role": "doctor",
      "name": "admin",
      "userId": 1,
      "id": 1
    }
  ]
}