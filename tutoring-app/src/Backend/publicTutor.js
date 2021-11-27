class publicTutor{
    /*
    * constructor
    * name: a string containing the username
    * date_joined: a date object
    * skillset: and array in intagers, the numbers correspond to an areafor study that the tutor is profficiant in
    * rating: a float number of the tutors average rating
    */
    constructor(name, date_joined, skillSet, rating){
        this.name = name;
        this.date_joined = date_joined;
        this.skillSet = skillSet;
        this.rating = rating;
    }

    //getter methods
    get name(){
        return this.name;
    }
    get dateJoined(){
        return this.date_joined;
    }
    get skillset(){
        return this.skillSet;
    }
    get rating(){
        return this.rating;
    }
}

export {publicTutor};