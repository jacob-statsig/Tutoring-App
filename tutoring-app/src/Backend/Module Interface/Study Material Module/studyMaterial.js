import PDFholder from './pdfContainer'
import React, { Component } from 'react'

/**
 * Class for a single StudyMaterial document.
 * holds a: PDF,name of creator, a breif summary of the file
 * 
 */
class StudyMaterial extends Component
{
    constructor(name, creator, subjectTopic, rating, dateAdded, fileLink, summary)
    {
        super()
        this.materialName = name // name of study material
        //TODO: Create functional Lookup method to find creator name/information from creatorID
        this.creatorID = creator // ID of the public tutor that uploaded the file
        this.topic = subjectTopic  // string topic of the material to help with sorting
        this.rating = rating // float holding the user rating of the material
        this.creationDate = dateAdded // date that the file was uploaded to the site
        //TODO: recreate PDFholder class to hold a file rather than just the link to it
        this.material = new PDFholder(name, fileLink) // actual file 
        this.summary = summary // quick summary of the file
    }
    get name()
    {
        return this.materialName
    }
    get creator()
    {
        return this.creatorID
    }
    get subject()
    {
        return this.topic
    }
    get rating()
    {
        return this.rating
    }
    get date()
    {
        return this.creationDate
    }
    get file()
    {
        return this.material
    }
    get summary()
    {
        return this.summary
    }


    render()
    {
        return (
            <div>
                <p>{this.materialName}</p>
                <p>Created by: {this.creatorID}</p>
                {this.material.render()}
                <p>{this.summary}</p>
            </div>
        )
    }
}

export default StudyMaterial
