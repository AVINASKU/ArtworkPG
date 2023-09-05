import { rest } from "msw";
import {AllProjectsListMockData, MyProjectListMockData,DropDownValuesMockData} from "./mockData"
import { DEVURL } from "../apis/envUrl";
import _ from "lodash";

function getSSO_User() {
    return rest.get(`https://pegadev.pg.com/prweb/api/ArtworkAgilityFile/V1/GetUserDetails/:operatorId`, (req, res, ctx) => {
        return res(
            ctx.status(200),
            ctx.json({
                ArtworkAgilityPage: { AccessGroup: [{ AccessGroupNames: "AAS:ProjectManager" }], UserGroup: [{ GroupName: "BC default Iza", UserRegion: [{ Region_Name: "Europe" }], UserRole: [{ Name: "Project Manager,Design Delivery,Print Production Manager,Capacity Manager,Brand Visual Executor,User Agent" }], UserBU: [{ BU_Name: "Baby Care" }] }, { GroupName: "BCHC default Iza", UserRegion: [{ Region_Name: "Europe" }], UserRole: [{ Name: "Design Manager,Design Agency" }], UserBU: [{ BU_Name: "Baby Care" }, { BU_Name: "Home Care" }] }, { GroupName: "HC default Iza", UserRegion: [{ Region_Name: "Europe" }], UserRole: [{ Name: "Artwork Copy Expert,Global Product Stewardship,Brand,Initiative Leader,Print Quality Manager" }], UserBU: [{ BU_Name: "Baby Care" }] }] }
            })
        );
    });
}

function getAllProjectsMock(userInformation){
    return rest.get(`https://awflowsit.pg.com/optaplanner/optimize/allprojects/:bu/:region`,(req,res,ctx) =>{
        return res(
            ctx.status(200),
            ctx.json({ArtworkAgilityProjects :AllProjectsListMockData.ArtworkAgilityProjects}),
        );
        
    })
}

function getMyProjectsMock(userInformation){
    let PM = userInformation?.username;
    return rest.get(`https://awflowsit.pg.com/optaplanner/optimize/myprojects/:PM`,(req,res,ctx) =>{
        return res(
            ctx.status(200),
            ctx.json({
                ArtworkAgilityProjects : MyProjectListMockData.ArtworkAgilityProjects
            })
        );
    })
}


function getDropDownValuesMock(){
    return rest.get(`https://awflowsit.pg.com/optaplanner/optimize/fetchdropdownvalues`,(req,res,ctx) =>{
        return res(
            ctx.status(200),
            ctx.json(DropDownValuesMockData),
            ctx.delay(500)
        );
        
    })
}

export const handlers = [getSSO_User(),getAllProjectsMock(),getMyProjectsMock(),getDropDownValuesMock()];