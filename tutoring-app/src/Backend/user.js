
import { tutoringSesion } from "./tutoringSession";

class user{
    constructor(name, Account_number, last_login, previous_tutors, schedualed_tutors,
        date_joined, skill_set, biography){
        this.name = name;
        this.Account_number = Account_number;
        this.last_login = last_login;
        this.previous_tutors = previous_tutors;
        this.schedualed_tutors = schedualed_tutors;
        this.date_joined = date_joined;
        this.skill_set = skill_set;
        this.biography = biography;
        this.rating = this.calculateRating();
    }
    
    //TODO 
    editProfile(){

    }

    calculateRating(){
        //variable declaration
        returnValue = 0
        numberOfSessionAsTutor = 0;

        //loop through previous tutoring sesions and add up the ratings
        for(session in this.previous_tutors){
            //only add the rating to the average if this user was the tutor
            if(session.tutor_ID == this.Account_number && session.compleated == true){
                returnValue += session.rating;
                numberOfSessionAsTutor += 1;
            }
        }

        //calculate the average rating
        returnValue = returnValue / numberOfSessionAsTutor;

        return returnValue;
    }

    //getter methods
}

export {user};