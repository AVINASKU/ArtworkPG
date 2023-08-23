import React from 'react'
import { TabHeaderWrapper } from './PMPSpecificTabView.styled';


function CustomHeaderComponent({ tabHeaderDetails, index, handleDelete }) {

    const isPOApresernt = () => {
        console.log("tabHeaderDetails", tabHeaderDetails)
        if (typeof (tabHeaderDetails.description) === "object") {
            if (tabHeaderDetails.description.POA_POANumber != "" && tabHeaderDetails.description.RTA_POADescription != "") {
                return true
            } else {
                return false
            }
        }
    }

    return (
        <>
            <div className="custom-tab-header">
                <TabHeaderWrapper className="p-tabview-title">
                    {!isPOApresernt() ? (
                        <>
                            <span>{index === 0 ? "Artwork Alignment" : tabHeaderDetails.tabHeader} </span>
                            <span className="pmpDes">
                                {typeof (tabHeaderDetails.description) === "object" ? `| ${tabHeaderDetails.description.DSBP_PMP_PIMaterialDescription}` : ""}
                            </span>
                        </>
                    ) : <>
                        <span>{index === 0 ? "Artwork Alignment" : tabHeaderDetails.description.POA_POANumber} </span>
                        <span className="pmpDes">
                            {typeof (tabHeaderDetails.description) === "object" ? `| ${tabHeaderDetails.description.RTA_POADescription}` : ""}
                        </span>
                    </>}

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

export default CustomHeaderComponent;
