class publicStudent{
    /*
     * constructor
     * name: a string containing the username
     * date_joined: a date object
     * areas_needed: and array in intagers, the numbers correspond to an areafor study
     */
    constructor(name, date_joined, areas_needed){
        this.name = name;
        this.date_joined = date_joined;
        this.areas_needed = areas_needed;
    }

    //getter methods for feilds of object
    get name(){
        return this.name;
    }
    get dateJoined(){
        return this.date_joined;
    }
    get areasNeeded(){
        return this.areas_needed;
    }
}

export {publicStudent};