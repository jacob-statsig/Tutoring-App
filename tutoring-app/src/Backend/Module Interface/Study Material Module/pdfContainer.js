import React, { Component } from 'react';


/**
 * holder class for the PDF
 * Contains the name of the file
 * Link to the file 
 * A small summary of the file
 * TODO: Correct format so that the download creats a JS object and is not dependant on server URL
*/
class PDFholder extends Component
{
    constructor(name, link_embed)
    {
        super();
        this.link = link_embed
        this.name = name
    }

    render()
    {
        return (
            <a href={this.link} download>{this.name}</a>
        )
    }
}

export default PDFholder