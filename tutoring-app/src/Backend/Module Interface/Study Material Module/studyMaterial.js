import PDFholder from './pdfContainer'
import React, { Component } from 'react'

/**
 * Class for a single StudyMaterial document.
 * holds a: PDF,name of creator, a breif summary of the file
 * 
 */
class StudyMaterial extends Component
{
    constructor(name, creator, fileLink, summary)
    {
        super()
        this.materialName = name // name of study material
        //TODO: Create functional Lookup method to find creator name/information from creatorID
        this.creatorID = creator // ID of the public tutor that uploaded the file
        //TODO: recreate PDFholder class to hold a file rather than just the link to it
        this.material = new PDFholder(name, fileLink) // actual file 
        this.summary = summary // quick summary of the file
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
