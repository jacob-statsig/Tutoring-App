import './ServerInterface'

class ServerAccess
{
    /**
     * Reads the contents of the StudyMaterial server file
     * @returns the contents of the StudyMaterial file in array form
     */
    RequestStudyMaterialData()
    {
        let studyMaterialArray = []
        let rawData = ServerInterface.readServerFile('StudyMaterials.txt')
        console.log(rawData)
        

        return studyMaterialArray
    }
    AddStudyMaterialData()
    {

    }
}