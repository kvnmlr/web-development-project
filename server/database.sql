CREATE TABLE student(
   studentid  SERIAL PRIMARY KEY,
   username TEXT NOT NULL
);

CREATE TABLE lecture(
   lectureid  SERIAL PRIMARY KEY,
   lecture_name TEXT NOT NULL,
   lecture_description TEXT
);

CREATE TABLE question(
   questionid  SERIAL PRIMARY KEY,
   lecture INT REFERENCES lecture (lectureid),
   author INT REFERENCES student (studentid),
   text_content TEXT NOT NULL
);

CREATE TABLE answer(
   answerid  SERIAL PRIMARY KEY,
   author INT REFERENCES student (studentid),
   answer_to INT REFERENCES question (questionid) DEFAULT NULL,
   text_content TEXT NOT NULL
);

CREATE TABLE mood_for_student_lecture(
	studentid INT REFERENCES student (studentid) NOT NULL,
	lectureid INT REFERENCES lecture (lectureid) NOT NULL,
	mood INT DEFAULT 0,
	PRIMARY KEY (studentid, lectureid)
);

CREATE TABLE vote_for_question(
   vote_for INT REFERENCES question (questionid) NOT NULL,
   voted_by INT REFERENCES student (studentid) NOT NULL,
   direction INT DEFAULT 1,
	PRIMARY KEY (vote_for, voted_by)
);

CREATE TABLE vote_for_answer(
   vote_for INT REFERENCES answer (answerid) NOT NULL,
   voted_by INT REFERENCES student (studentid) NOT NULL,
   direction INT DEFAULT 1,
	PRIMARY KEY (vote_for, voted_by)
);

INSERT INTO lecture (lecture_name, lecture_description) VALUES  
('Web Development Course', 'This course teaches the basics of web development (frontend and backend).'),
('Design and Evaluation of Ubiquitous Technology in Sports', 'In this seminar we will go beyond existing approaches and aim to design interactive sports experiences that rely on all sorts of wearable technologies such as smart watches and fitness trackers.'),
('Making Virtual and Augmented Reality great again!','In this seminar, small projects will be conducted within the field of Mixed Reality (VR/AR) applications.');