import { rest } from "msw";
import {AllProjectsListMockData, MyProjectListMockData} from "./mockData"
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

function getAllProjects(userInformation){
    return rest.get(`${DEVURL}/allprojects/Baby Care/Europe`,(req,res,ctx) =>{
          const orderByData = _.orderBy(AllProjectsListMockData?.ArtworkAgilityProjects,
            ["Timestamp"],
            ["desc"]
          );
        return res(
            ctx.status(200),
            ctx.json({
                orderByData
            })
        );
    })
}

function getMyProjects(userInformation){
    let PM = userInformation?.username;
    return rest.get(`${DEVURL}/myprojects/${PM}`,(req,res,ctx) =>{
          const orderByData = _.orderBy(MyProjectListMockData?.ArtworkAgilityProjects,
            ["Timestamp"],
            ["desc"]
          );
        return res(
            ctx.status(200),
            ctx.json({
                orderByData
            })
        );
    })
}

export const handlers = [getSSO_User(),getAllProjects(),getMyProjects()];