import React from 'react';
import Tabs from "./Tabs";
import { Link } from 'react-router-dom';

function AdvancedSearchResults() {

    return (
        <div className="advancedSearch_font">
            <div className="advancedSearch">
            <div className="advancedSearch_text">
            <Link to="/advancedSearch"> <h1> &larr; &nbsp; Back to Advanced Search Page </h1></Link>
            </div>
            </div>
            <div className="advancedSearch_text">

            <h1 style={{textAlign: "center"}}> Advanced Search Results</h1> </div>
            
            
            <div className="advancedSearch">
            <Tabs>
                <div label="Chart View">
                    <table>
                        <tr style={{background: "#cadfee"}}>
                            <th> NAME</th>
                            <th> state/territory</th>
                            <th> role</th>
                            <th> race/ethnicity</th>
                            <th> religion</th>
                            <th> education</th>
                            <th> political offices held</th>
                            <th> political party membership</th>
                        </tr>
                        <tr>
                            <td> test</td>
                            <td> test</td>
                            <td> test</td>
                            <td> test</td>
                            <td> test</td>
                            <td> test</td>
                            <td> test</td>
                            <td> test</td>

                        </tr>

                    </table> 
                </div>


                <div label="Map View">
                    
                </div>




            </Tabs>
            </div>
        </div>
    )






}

export default AdvancedSearchResults