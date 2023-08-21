import React from 'react'
import { TabHeaderWrapper } from '../PMPSpecificTabView/PMPSpecificTabView.styled';


function CustomHeader({ tabHeaderDetails, index, handleDelete }) {

console.log("tab header", tabHeaderDetails, index);

    return (
        <>
            <div className="custom-tab-header">
                <TabHeaderWrapper className="p-tabview-title">
                    <>
                    {index=== 0 ?
                        <span>{"Dependency Mapping"} </span> : 
                        <span>
                            { tabHeaderDetails?.description?.DSBP_PMP_PIMaterialNumber + " | " +tabHeaderDetails?.description?.DSBP_PMP_PIMaterialDescription}
                        </span>
}
                    </>

                </TabHeaderWrapper>
                {index !== 0 && (
                    <button className="close-button" onClick={() => handleDelete(index)}>
                        &#x2715;
                    </button>
                )}
            </div>
        </>
    )
}

export default CustomHeader;
