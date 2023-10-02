USE hms;

CREATE TABLE user(
	uId	INT NOT NULL UNIQUE AUTO_INCREMENT,
	uName	varchar(255) NOT NULL,
	uEmail	varchar(255) NOT NULL,
    uType   varchar(255) NOT NULL, -- only accept "admin" or "employee"
	uPassword	varchar(255) NOT NULL,
  PRIMARY KEY (uId)
);

CREATE TABLE doctor(
    doctorId INT NOT NULL UNIQUE AUTO_INCREMENT,
    speciality VARCHAR(255) NOT NULL,
    feePerHour INT NOT NULL,
    yearOfExperience INT NOT NULL,
    PRIMARY KEY (uId),
    FOREIGN KEY (doctorId) REFERENCES user(uId)
);

CREATE TABLE appointment(
	apntId INT NOT NULL AUTO_INCREMENT, -- appointment ID
    patientName VARCHAR(100) NOT NULL, -- patient name
    patientDOB DATE NOT NULL, -- patient date of birth
    patientProb VARCHAR(255), -- patient problem
	doctorId INT NOT NULL, -- doctor ID
    startTime TIMESTAMP NOT NULL, -- starting timestamp - I will pass javascript datetime and it will convert it to Mysql timestamp automatically before inserting
    endTime TIMESTAMP NOT NULL, --ending timestamp  - I will pass javascript datetime and it will convert it to Mysql timestamp automatically before inserting
    CHECK (current_timestamp() < startTime AND current_timestamp() < endTime),
    PRIMARY KEY (apntId),
    FOREIGN KEY (doctorId) REFERENCES doctor(doctorId)
);