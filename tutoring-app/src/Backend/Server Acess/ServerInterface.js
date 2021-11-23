//Utilizes Node JS to read a write files to txt files
//returns raw data must be organized by the ServerAccess Module
const fs = require('fs')


class ServerInterface
{
    static filePath = './SERVER'

    /**
     * Reads a specified file and returns the output of that file as a string
     * @param {string} filename the name of the file and its path from the /Server folder
     * @returns err if an error occured during reading otherwise returns the contents of the file
     */
    readServerFile(filename)
    {
        let output = ""
        fs.readFile(filePath + filename, (err, data) => {
            if(err)
            {
                output = err.toString()
            } 
            else
            {
                output = data.toString()
            }
            
        })
        return data
    }
    writeServerFile(filename,data)
    {
        let output = ""
        fs.writeFile(filePath + filename), data, (err) => {
            if(err)
            {
                output = err.toString()
            }
            else
            {
                output = "Success"
            }
        }
        return output
    }
}

export default ServerInterface