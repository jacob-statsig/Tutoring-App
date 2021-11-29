import React, { useEffect } from 'react'
import WebFont from 'webfontloader';


export default function SearchResult(props) {

    const { firstName, lastName, subjects, major, classOf } = props
    
    useEffect(() => {
        WebFont.load({
            google: {
                families: ['poppins']
            }
        });
    }, []);

     const searchResult = {
        alignItems: 'flexStart',
        display: 'flex',
        marginBottom: '8px',

      }
      
      const overlapGroup = {
        alignItems: 'flexEnd',
        backgroundColor: 'skyBlue',
        borderRadius: '26px',
        display: 'flex',
        height: '169px',
        minWidth: '1125px',
        padding: '26px 23px',
      }
      
      const ellipse = {
        alignSelf: 'center',
        height: '106px',
        marginBottom: '1.0px',
        objectFit: 'cover',
        width: '106px',
      }
      
      const flexCol = {
        alignItems: 'flexStart',
        display: 'flex',
        flexDirection: 'column',
        marginLeft: '26px',
        minHeight: '116px',
        width: '461px',
      }
      
      const offering = {
        letterSpacing: '0',
        minHeight: '47px',
        width: '461px',
        fontSize: '36px',
        fontFamily: 'poppins',
      }

      const name = offering
      
      const majorStyle = {
        letterSpacing: '0',
        marginTop: '13px',
        minHeight: '28px',
        width: '225px',
        fontSize: '18px',
        fontFamily: 'poppins',
      }
      
      const graduation = {
        letterSpacing: '0',
        minHeight: '28px',
        width: '225px',
        fontFamily: 'poppinsNormalCatskillWhite18px',
      }
      
      const flexCol1 = {
        alignItems: 'flexStart',
        display: 'flex',
        flexDirection: 'column',
        minHeight: '116px',
        width: '461px',
      }
      
      const topics = {
        letterSpacing: '0',
        paddingTop: '5px',
        PaddingBottom: '10px',
        fontSize:'18px',
        textColor: 'white',
        fontFamily: 'poppins',
      }

    return (
        <div style={searchResult}>
            <div style={overlapGroup}>
                <div style={flexCol}>
                    <h1 style={name}>
                        {firstName + " " + lastName}
                    </h1>
                    <div style={majorStyle}>
                        {major ? major : ""}
                    </div>
                    <div style={graduation}>
                        {classOf ? classOf : ""}
                    </div>
                </div>
                <div style={flexCol1}>
                    <div style={offering}>
                        Offering
                    </div>
                    <div style={topics}>
                        {subjects.map((subject) => (
                            <div>
                                {subject}
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    )
}

