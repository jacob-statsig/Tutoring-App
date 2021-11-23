import PDFholder from './studyMaterial'
import React, { Component } from 'react'

/**
 * class that interacts with the user module class
 * holds the data for when a user looks up study material
 */
class StudyMaterialModule extends Component
{
    /**
     * Constructor creates an empty array.
     * This array will be filled at the first 'search()' call
     */
    constructor()
    {
        this.materialArray = [] // holds all the results that have been searched
        this.visibleResults = [] // holds all the results that match the filter criteria
        this.results = 0


        //Filter criteria
        // name, creator, rating, summary
        this.requredString = "" // A string must be included in either the material name, creator name, or summary
        this.minRating = 0.0 // Files shown must be above this rating
        this.maxRating = 10.0 // Files shown must be below this rating

        //sorting criteria, name, creator, date, rating
        this.sortByName = false // show data sorted by name of file
        this.sortByCreator = false // show data sorted by name of creator
        this.sortByDate = false // show data sorted by date added
        this.sortByRating = true // show data sorted by the user rating
        this.reveseList = false // reverses array of shown data to simulate showing by lowwest instead of highest
        
    }
    /**
     * Searches the server for material based on topic
     * TODO: implement search
     */
    search(TopicToBeSearched)
    {
        this.materialArray = []
        this.results = this.materialArray.length
    }
    /**
     * Sorts the visible results to the users specification, only one by-parameter can be active but the list may be revesed at any time
     * @param {boolean} byName sort by material name
     * @param {boolean} byCreator sort by creator ID
     * @param {boolean} byDate sort by date added
     * @param {boolean} byRating sort by user rating
     * @param {boolean} reverse reverse the direction of the sort
     */
    sort(byName, byCreator, byDate, byRating, reverse)
    {
        // takes the given sort criteria and starts by setting the class variable to the correct values
        // defaults to SortByName
        // ensures that no matter what is inputed, their is never more than one sort-by-feature active
        if(byName)
        {
            this.sortByName = true 
            this.sortByCreator = false 
            this.sortByDate = false 
            this.sortByRating = false 
            this.reveseList = reverse
        }
        else if(byCreator)
        {
            this.sortByName = false 
            this.sortByCreator = true 
            this.sortByDate = false 
            this.sortByRating = false 
            this.reveseList = reverse
        }
        else if (byDate)
        {
            this.sortByName = false 
            this.sortByCreator = false 
            this.sortByDate = true 
            this.sortByRating = false 
            this.reveseList = reverse
        }
        else if(byRating)
        {
            this.sortByName = false 
            this.sortByCreator = false 
            this.sortByDate = false 
            this.sortByRating = true 
            this.reveseList = reverse
        }
        else
        {
            this.sortByName = true 
            this.sortByCreator = false 
            this.sortByDate = false 
            this.sortByRating = false 
            this.reveseList = reverse
        }

        // once All propper sorting criteria is formated correctly we can sort the data in visibleResults
        // All if statements are the same with the exception of what element they compare to perform the sorting
        // if this.revese == true, then the comparison is swaped
        // compared statements are either high or low, never equal to
        if(this.sortByName)
        {
            //call a array sort method with a custom sort function
            // function compares the material name of the two elements
            this.visibleResults.sort(function(a,b){
                var nameA = a.materialName.toUpperCase(); // ignore upper and lowercase
                var nameB = b.materialName.toUpperCase(); 
                if ((nameA < nameB))
                {
                    if(this.reveseList)
                    {
                        return 1;
                    }
                    return -1;
                }
                else
                {
                    if(this.reveseList)
                    {
                        return -1;
                    }
                    return 1;
                }
            })
        }
        else if(this.sortByCreator)
        {
            //call a array sort method with a custom sort function
            // function compares the Creator ID of the two elements
            this.visibleResults.sort(function(a,b) {
                var id1 = a.creatorID
                var id2 = b.creatorID
                if (id1 < id2) 
                {
                    if(this.reveseList)
                    {
                        return 1;
                    }
                    return -1;
                }
                else
                {
                    if(this.reveseList)
                    {
                        return -1;
                    }
                    return 1;
                }
            })
        }
        else if(this.sortByDate)
        {
            //call a array sort method with a custom sort function
            // function compares the creation dates of the two elements
            this.visibleResults.sort(function(a,b) {
                var date1 = a.creationDate
                var date2 = b.creationDate
                if (date1 < date2) 
                {
                    if(this.reveseList)
                    {
                        return 1;
                    }
                    return -1;
                }
                else
                {
                    if(this.reveseList)
                    {
                        return -1;
                    }
                    return 1;
                }
            })
        }
        else if(this.sortByRating)
        {
            //call a array sort method with a custom sort function
            // function compares the ratings of the two elements
            this.visibleResults.sort(function(a,b) {
                var rating1 = a.rating
                var rating2 = b.rating
                if (rating1 < rating2) 
                {
                    if(this.reveseList)
                    {
                        return 1;
                    }
                    return -1;
                }
                else
                {
                    if(this.reveseList)
                    {
                        return -1;
                    }
                    return 1;
                }
            })
        }

    }
    /**
     * Looks through materials array and pushes items with the required fields to the visible materials array
     * @param {string} requredString 
     * @param {number} maxRating 
     * @param {number} minRating 
     */
    filter(requredString, maxRating, minRating)
    {
        this.requredString = requredString
        this.maxRating = maxRating
        this.minRating = minRating

        //ensures that min/max rating are within appropriate bounds
        if(this.maxRating <= this.minRating || this.maxRating > 10)
        {
            this.maxRating = 10
        }
        if(this.minRating >= this.maxRating || this.minRating < 0)
        {
            this.minRating = 0
        }
        //empty visibleMaterial array
        this.visibleResults = []
        //loops through each item in the material array
        for (let material in this.materialArray)
        {
            let canBeAdded = true
            if(material.rating < this.minRating)
            {
                canBeAdded = false
            }

            if(canBeAdded && material.rating > this.maxRating)
            {
                canBeAdded = false
            }
            else if(canBeAdded && (material.name.indexOf(this.requredString) > -1 || material.summary.indexOf(this.requredString) > -1))
            {
                this.visibleResults.push(material)
            }
        }
    }
    //TODO: implement studyMaterial Add function to add new material to the server
    add()
    // TODO: implement studyMaterial get funtion to return a specified material
    get()


}
export default StudyMaterialModule