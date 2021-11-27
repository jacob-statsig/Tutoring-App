class tutoringSesion{
    /*
     * constructor
     * date: a date object contaning the schedualed time of the tutoring sesion
     * tutor_ID: the unique integer corresponding to the user who is the tutor for this session
     * sturdent_ID: the unique integer corresponding to the user who is the student for this session
     * topic: an integer that corresponds to the area of study for this session
     * compleated: a boolean variable that is true when the session is completed
     * rating: the rating of the tutor given by the student
     */
    constructor(date, tutor_ID, student_ID, topic, compleated, rating){
        this.date = date;
        this.tutor_ID = tutor_ID;
        this.student_ID = student_ID;
        this.topic = topic;
        this.compleated = compleated;
        this.rating = rating;
    }

    //getter methods

}

export {tutoringSesion};
