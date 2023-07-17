import React, { useState, useEffect, useRef } from "react";
import { Form, Row, Col, Button } from "react-bootstrap";
import { MultiSelect } from "primereact/multiselect";
import { Calendar } from "primereact/calendar";
import { Controller, useForm } from "react-hook-form";
import { classNames } from "primereact/utils";
import { useLocation, useNavigate } from "react-router-dom";
import { createNewProject, editProject } from "../../../apis/projectSetupApi";
import { selectedProject } from "../../../store/actions/ProjectSetupActions";
import { updateProjectPlanAction } from "../../../store/actions/ProjectPlanActions";
import { getDropDownValues } from "../../../store/actions/dropDownValuesAction";
import { Loading } from "../../../utils";
import moment from "moment-timezone";
import { Toast } from "primereact/toast";
import "./index.scss";
import {
  designScope,
  scaleList,
  ProductionStrategy,
  Tier,
  PMValues,
} from "../../../categories";
import { RoleUser } from "../../../userRole";
import { useDispatch, useSelector } from "react-redux";
import { getMyProject } from "../../../store/actions/ProjectActions";
import { isArray } from "lodash";

const defaultCheckedItems = {
  DI: false,
  DT: false,
  PRA: false,
  PF: false,
  IQ: false,
  CICs: false,
};

const defaultTextBoxEnabled = {
  DI: false,
  DT: false,
  PF: false,
  PRA: false,
  IQ: false,
  CICs: false,
};

function AddProject(props) {
  const toast = useRef(null);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation();
  const locationPath = location?.pathname;
  const url = locationPath?.split("/");
  const User = useSelector((state) => state.UserReducer);
  const userInformation = User.userInformation;
  const projectSetup = useSelector((state) => state.ProjectSetupReducer);
  const selectedProjectDetails = projectSetup.selectedProject;
  const { myProject } = useSelector((state) => state.myProject);
  const mode = projectSetup.mode;
  // const id = `PG-AAS-WORK ${selectedProjectDetails.Project_ID}`;
  let awmProjectId = selectedProjectDetails.Project_ID;
  const prePopuSmo = [];
  selectedProjectDetails?.Artwork_SMO?.forEach((obj) => {
    if (obj.code !== "") {
      prePopuSmo.push(obj.code);
    }
  });
  const [loader, setLoader] = useState(false);
  const [spinnerText, setSpinnerText] = useState(false);
  const [submitButtonState, setSubmitButtonState] = useState(false);
  const [projectName, setProjectName] = useState("");
  const [projectDesc, setProjectDesc] = useState("");
  const [groupName, setGroupName] = useState("");
  const [cluster, setCluster] = useState("");
  const [scale, setScale] = useState("");
  const [selectedCities, setSelectedCities] = useState([]);
  const [formValid, setFormValid] = useState(false);
  const [formData, setFormData] = useState(null);
  const [subCategoriesOptions, setSubCategoriesOptions] = useState([]);
  const [formattedDate, setFormattedDate] = useState("");
  const [readinessDate, setReadinessDate] = useState("");
  const [sopDate, setSOPDate] = useState("");
  const [printerDate, setPrinterDate] = useState("");
  const [sosDate, setSOSDate] = useState("");
  const [region, setRegion] = useState({});
  const [smo, setSmo] = useState([]);
  const [bu, setBu] = useState("");
  const [subCategories, setSubCategories] = useState([]);
  const [categoriesAlert, setCategoriesAlert] = useState(false);
  const [brand, setBrand] = useState([]);
  const [tierList, setTierList] = useState([]);
  const [productionStrategyList, setProductionStrategyList] = useState([]);
  const [Tier, setTier] = useState("");
  const [ps, setPs] = useState("");
  const [pm, setPm] = useState("");
  const [iL, setIl] = useState("");
  const [comments, setComments] = useState("");
  const [projectType, setProjectType] = useState("");
  const [checkedItems, setCheckedItems] = useState(defaultCheckedItems);
  const [textBoxEnabled, setTextBoxEnabled] = useState(defaultTextBoxEnabled);
  const [POA, setPOA] = useState("1");
  const [projectNameAlert, setProjectNameAlert] = useState(false);
  const [businessUnitAlert, setBusinessUnitAlert] = useState(false);
  const [regionAlert, setRegionAlert] = useState(false);
  const [PMAlert, setPMAlert] = useState(false);
  const [SMOAlert, setSMOAlert] = useState(false);
  const [brandAlert, setBrandAlert] = useState(false);
  const [projectSetupPageDropDownValues, setProjectSetupPageDropDownValues] =
    useState([]);
  const [bUs, setbUs] = useState([]);
  const [brands, setBrands] = useState([]);
  const [regions, setRegions] = useState([]);
  const [smos, setSmos] = useState([]);
  const [scales, setScales] = useState([]);
  const [projectTypeList, setProjectTypeList] = useState([]);
  const [designScopeList, setDesignScopeList] = useState({
    DI: "",
    DT: "",
    PRA: "",
    PF: "",
    IQ: "",
    CICs: "",
  });

  const { DropDownValuesData, loading } = useSelector(
    (state) => state.DropDownValuesReducer
  );

  let projectData = isArray(myProject) && myProject.find(
    (project) => project.Project_ID === selectedProjectDetails.Project_ID
  );

  useEffect(() => {
    RoleUser.users.map((role) => {
      if (role.username === userInformation.username) {
        setPm(role.username);
      }
    });
  });
  // useEffect(() => {
  //   if (
  //     projectName &&
  //     bu &&
  //     brand?.length &&
  //     region &&
  //     smo?.length &&
  //     printerDate &&
  //     readinessDate
  //   ) {
  //     setSubmitButtonState(true);
  //   } else {
  //     setSubmitButtonState(false);
  //   }
  // }, [mode, projectName, bu, brand, region, smo, printerDate, readinessDate]);
  const showStatus = (severity, summary, detail, redirect) => {
    toast.current.show({
      severity: severity,
      summary: summary,
      detail: detail,
      life: 3000,
    });
    if (redirect === "navigate") {
      setTimeout(() => {
        navigate("/myProjects");
      }, 1000);
    }
  };

  const formatDate = (date) => {
    const formattedDate = new Date(
      moment(date, "YYYYMMDD[T]HHmmss.SSS [GMT]")
        .tz(Intl.DateTimeFormat().resolvedOptions().timeZone)
        .format("ddd MMM DD YYYY HH:mm:ss [GMT]ZZ (z)")
    );
    if (formattedDate.getFullYear() > "1999") {
      return formattedDate;
    } else {
      return "";
    }
  };

  const formatPayloadDate = (date) => {
    if (date) {
      const formattedDate = moment(
        date,
        "ddd MMM DD YYYY HH:mm:ss [GMT]ZZ (z)"
      ).format("YYYY-MM-DD[T]HH:mm:ss.SSS[Z]");
      return formattedDate;
    } else {
      return date;
    }
  };

  useEffect(() => {
    //  if(DropDownValuesData === null)
    dispatch(getDropDownValues());
  }, [dispatch]);

  useEffect(() => {
    if (DropDownValuesData) {
      setProjectSetupPageDropDownValues(
        DropDownValuesData?.ArtWorkProjectSetupPage || []
      );
    }
  }, [DropDownValuesData]);

  useEffect(() => {
    if (
      projectSetupPageDropDownValues !== undefined &&
      projectSetupPageDropDownValues.length !== 0
    ) {
      setbUs(projectSetupPageDropDownValues.Artwork_BU);
      setBrands(projectSetupPageDropDownValues.Artwork_Brand);
      setRegions(projectSetupPageDropDownValues.Artwork_Region);
      setSmos(projectSetupPageDropDownValues.Artwork_SMO);
      setScales(projectSetupPageDropDownValues.Artwork_Scale);
      setProjectTypeList(projectSetupPageDropDownValues.Artwork_ProjectType);
    }
  }, [projectSetupPageDropDownValues]);

  useEffect(() => {
    bu &&
      bUs.forEach((obj) => {
        obj.Artwork_Picklist.forEach((pickList) => {
          if (bu === obj.BU_Name && pickList.Picklist_Name === "SAPCategory") {
            setSubCategoriesOptions(pickList.Labels);
          }

          if (obj.code === "BBY" && pickList.Picklist_Name === "Tier") {
            setTierList(pickList.Labels);
          }
          if (obj.code === "HOM" && pickList.Picklist_Name === "PRODSTRAT") {
            setProductionStrategyList(pickList.Labels);
          }
        });
      });
  }, [bu, bUs]);

  useEffect(() => {
    setRegion(
      (selectedProjectDetails &&
        regions.find(
          (r) => r.Region_Name === selectedProjectDetails.Project_region
        )) ||
        {}
    );
  }, [regions]);

  useEffect(() => {
    setScale(
      (selectedProjectDetails &&
        scales?.find(
          (r) => r.Scale_Name === selectedProjectDetails?.Project_Scale
        )) ||
        ""
    );
  }, [scales]);

  useEffect(() => {
    setPs(
      (selectedProjectDetails &&
        productionStrategyList.find(
          (ps) => ps.Label_Name === selectedProjectDetails?.Production_Strategy
        )) ||
        {}
    );
  }, [productionStrategyList]);

  useEffect(() => {
    setTier(
      (selectedProjectDetails &&
        tierList.find((r) => r.Label_Name === selectedProjectDetails?.Tier)) ||
        {}
    );
  }, [tierList]);

  useEffect(() => {
    if (mode === "edit" || mode === "design") {
      setProjectName(selectedProjectDetails?.Project_Name || "");
      setGroupName(selectedProjectDetails?.Initiative_Group_Name || "");
      setProjectDesc(selectedProjectDetails?.Project_Description || "");
      setBu(selectedProjectDetails?.BU || "");

      let data = [];
      if (selectedProjectDetails?.Artwork_Category?.length > 0) {
        selectedProjectDetails?.Artwork_Category?.forEach((category) => {
          let temp = {};
          if (category.code !== "") {
            temp.code = category["code"];
            temp.Label_Name = category["Category_Name"];
            data.push(temp);
            setSubCategories(data);
          } else {
            setSubCategories([]);
          }
        });
      } else {
        setSubCategories([]);
      }

      bu &&
        bUs.forEach((obj) => {
          obj.Artwork_Picklist.forEach((pickList) => {
            if (bu === obj.code && pickList.Picklist_Name === "SAPCategory") {
              setSubCategoriesOptions(pickList.Labels);
            }
          });
        });

      if (selectedProjectDetails?.Artwork_Brand?.length > 0) {
        selectedProjectDetails?.Artwork_Brand.forEach((brand) => {
          if (brand.code !== "") {
            setBrand(selectedProjectDetails?.Artwork_Brand);
          } else {
            setBrand([]);
          }
        });
      } else {
        setBrand([]);
      }
      setRegion(
        (selectedProjectDetails &&
          regions.find(
            (r) => r.Region_Name === selectedProjectDetails.Project_region
          )) ||
          {}
      );
      setSmo(prePopuSmo || []);
      setCluster(selectedProjectDetails?.Cluster || "");
      setScale(
        (selectedProjectDetails &&
          scales.find(
            (r) => r.Scale_Name === selectedProjectDetails.Project_Scale
          )) ||
          ""
      );
      setSOSDate(
        (selectedProjectDetails?.Estimated_SOS &&
          formatDate(selectedProjectDetails?.Estimated_SOS)) ||
          ""
      );
      setSOPDate(
        (selectedProjectDetails?.Estimated_SOP &&
          formatDate(selectedProjectDetails?.Estimated_SOP)) ||
          ""
      );
      setPrinterDate(
        (selectedProjectDetails?.Estimated_AW_Printer &&
          formatDate(selectedProjectDetails?.Estimated_AW_Printer)) ||
          ""
      );
      setReadinessDate(
        (selectedProjectDetails?.Estimated_AW_Readiness &&
          formatDate(selectedProjectDetails?.Estimated_AW_Readiness)) ||
          ""
      );
      setIl(selectedProjectDetails?.IL);
      setPm(selectedProjectDetails?.PM || userInformation.username);
      setComments(selectedProjectDetails?.Comments || "");
      setProjectType(selectedProjectDetails?.Project_Type || "");

      setDesignScopeList((prevDesignScopeList) => ({
        ...prevDesignScopeList,
        DI: parseInt(selectedProjectDetails?.Estimated_No_Of_DI),
      }));
      handleCheckboxChange({
        target: {
          name: "DI",
          value: "DI",
          checked: selectedProjectDetails?.Design_Intent,
        },
      });

      setDesignScopeList((prevDesignScopeList) => ({
        ...prevDesignScopeList,
        DT: parseInt(selectedProjectDetails?.Estimated_No_Of_DT),
      }));
      handleCheckboxChange({
        target: {
          name: "DT",
          value: "DT",
          checked: selectedProjectDetails?.Design_Template,
        },
      });

      setDesignScopeList((prevDesignScopeList) => ({
        ...prevDesignScopeList,
        PF: parseInt(selectedProjectDetails?.Estimated_No_Of_NPF),
      }));
      handleCheckboxChange({
        target: {
          name: "PF",
          value: "PF",
          checked: selectedProjectDetails?.New_Print_Feasibility,
        },
      });

      setDesignScopeList((prevDesignScopeList) => ({
        ...prevDesignScopeList,
        IQ: parseInt(selectedProjectDetails?.Estimated_No_Of_IQ),
      }));
      handleCheckboxChange({
        target: {
          name: "IQ",
          value: "IQ",
          checked: selectedProjectDetails?.Ink_Qualification,
        },
      });

      setDesignScopeList((prevDesignScopeList) => ({
        ...prevDesignScopeList,
        PRA:
          selectedProjectDetails?.Estimated_No_Of_PRA &&
          parseInt(selectedProjectDetails?.Estimated_No_Of_PRA),
      }));
      handleCheckboxChange({
        target: {
          name: "PRA",
          value: "PRA",
          checked: selectedProjectDetails?.Production_Ready_Art,
        },
      });

      setDesignScopeList((prevDesignScopeList) => ({
        ...prevDesignScopeList,
        CICs: parseInt(selectedProjectDetails?.Estimated_No_Of_CICs),
      }));
      handleCheckboxChange({
        target: {
          name: "CICs",
          value: "CICs",
          checked: selectedProjectDetails?.CICs,
        },
      });
      setPOA(selectedProjectDetails?.Estimated_No_Of_POAs);
    } else {
      setProjectName("");
      setGroupName("");
      setProjectDesc("");
      setBu("");
      setSubCategories([]);
      setBrand([]);
      setRegion({});
      setSmo([]);
      setCluster("");
      setScale("");
      setSOSDate("");
      setSOPDate("");
      setPrinterDate("");
      setReadinessDate("");
      setIl("");
      setPm(pm);
      setComments("");
      setProjectType("");

      setDesignScopeList((prevDesignScopeList) => ({
        ...prevDesignScopeList,
        DI: "",
      }));
      handleCheckboxChange({
        target: {
          name: "DI",
          value: "DI",
          checked: false,
        },
      });

      setDesignScopeList((prevDesignScopeList) => ({
        ...prevDesignScopeList,
        DT: "",
      }));
      handleCheckboxChange({
        target: {
          name: "DT",
          value: "DT",
          checked: false,
        },
      });

      setDesignScopeList((prevDesignScopeList) => ({
        ...prevDesignScopeList,
        PF: "",
      }));
      handleCheckboxChange({
        target: {
          name: "PF",
          value: "PF",
          checked: false,
        },
      });

      setDesignScopeList((prevDesignScopeList) => ({
        ...prevDesignScopeList,
        IQ: "",
      }));
      handleCheckboxChange({
        target: {
          name: "IQ",
          value: "IQ",
          checked: false,
        },
      });

      setDesignScopeList((prevDesignScopeList) => ({
        ...prevDesignScopeList,
        PRA: "",
      }));
      handleCheckboxChange({
        target: {
          name: "PRA",
          value: "PRA",
          checked: false,
        },
      });

      setDesignScopeList((prevDesignScopeList) => ({
        ...prevDesignScopeList,
        CICs: "",
      }));
      handleCheckboxChange({
        target: {
          name: "CICs",
          value: "CICs",
          checked: false,
        },
      });
      setPOA("1");
      setPs("");
      setTier("");
    }
  }, [mode, projectSetup?.selectedProject]);

  const getSmoOptions = () => {
    return smos.map((smo) => ({
      label: smo.SMO_Name,
      value: smo.code,
    }));
  };

  const getProjectSMO = () => {
    const selectedSmoOptions = [];

    smo?.forEach((sm) => {
      let temp = {};
      smoOptions?.forEach((option) => {
        if (option.value === sm) {
          temp.instruction = "APPEND";
          temp.target = "ProjectSMO";
          temp.content = {};
          temp.content.SMO_Name = option.label;
          temp.content.code = option.value;
        }
      });
      selectedSmoOptions.push(temp);
    });
    return selectedSmoOptions;
  };

  const getProjectBrand = () => {
    const selectedBrandOptions = [];

    brand.forEach((obj) => {
      let temp = {};
      temp.instruction = "APPEND";
      temp.target = "ProjectBrand";
      temp.content = obj;
      selectedBrandOptions.push(temp);
    });
    return selectedBrandOptions;
  };

  const getProjectCategory = () => {
    const selectedCategoriesOptions = [];
    subCategories.forEach((obj) => {
      obj.Category_Name = obj["Label_Name"];
      delete obj.Label_Name;
      let temp = {};
      temp.instruction = "APPEND";
      temp.target = "ProjectCategory";
      temp.content = obj;
      selectedCategoriesOptions.push(temp);
    });
    return selectedCategoriesOptions;
  };

  const getProjectCode = () => {
    const projName = getValues("projectType");
    let projCode;
    projectTypeList.forEach((pt) => {
      if (pt.ProjectType_Name === projName) {
        projCode = pt.code;
      }
    });
    return projCode || "";
  };

  const handleRegionChange = (e) => {
    e.target.value.length === 0 ? setRegionAlert(true) : setRegionAlert(false);
    const selectedRegion = regions.find(
      (r) => r.Region_Name === e.target.value
    );
    setRegion(selectedRegion);
  };
  const handleScaleChange = (e) => {
    const selectedScale = scales.find((r) => r.Scale_Name === e.target.value);
    setScale(selectedScale);
  };

  const smoOptions = getSmoOptions();

  const handleBuChange = (e) => {
    e.target.value.length === 0
      ? setBusinessUnitAlert(true)
      : setBusinessUnitAlert(false);
    setBu(e.target.value);
    setSubCategories([]);
    setSubCategoriesOptions([]);
  };

  // const bUs = Object.keys(categories).map((bu) => ({ code: bu, name: bu }));

  // const bUs = businessUnits.map((bu) => {
  //   return {
  //     name: bu.BU_Name,
  //     code: bu.code,
  //   };
  // });
  const handleSubCategoryChange = (e) => {
    console.log("categoriesAlert", e.value);
    e.value.length === 0 ? setCategoriesAlert(true) : setCategoriesAlert(false);
    setSubCategories(e.value);
  };

  const form = useForm({ date: null });
  let today = new Date();
  let month = today.getMonth();
  let year = today.getFullYear();
  let prevMonth = month === 0 ? 11 : month - 1;
  let prevYear = prevMonth === 11 ? year - 1 : year;
  let nextMonth = month === 11 ? 0 : month + 1;
  let nextYear = nextMonth === 0 ? year + 1 : year;

  let minDate = new Date();
  minDate.setDate(today.getDate());

  let maxDate = new Date();

  maxDate.setMonth(nextMonth);
  maxDate.setFullYear(nextYear);

  const handleCheckboxChange = (event) => {
    const { name, value } = event.target;
    const isChecked = event.target.checked;

    if (!isChecked) {
      setDesignScopeList((prevDesignScopeList) => ({
        ...prevDesignScopeList,
        [value]: "", // set input value to empty string
      }));
      setTextBoxEnabled((prevTextBoxEnabled) => ({
        ...prevTextBoxEnabled,
        [value]: false, // disable the input textbox
      }));
    }

    setCheckedItems((prevCheckedItems) => ({
      ...prevCheckedItems,
      [name]: isChecked ? true : false,
    }));

    // handle inter-dependencies
    switch (name) {
      case "DI":
        // when Design Intent is selected, user must select DT or PRA
        if (isChecked && !checkedItems.DT && !checkedItems.PRA) {
          setCheckedItems((prevCheckedItems) => ({
            ...prevCheckedItems,
            DT: true,
          }));
          setTextBoxEnabled((prevTextBoxEnabled) => ({
            ...prevTextBoxEnabled,
            DT: true,
          }));
        }
        break;
      case "DT":
        // when Design Template is selected, user cannot select PRA
        if (isChecked) {
          setDesignScopeList((prevDesignScopeList) => ({
            ...prevDesignScopeList,
            PRA: "", // or DT: null
          }));
        }
        if (isChecked && checkedItems.PRA) {
          setCheckedItems((prevCheckedItems) => ({
            ...prevCheckedItems,
            PRA: false,
          }));
          setTextBoxEnabled((prevTextBoxEnabled) => ({
            ...prevTextBoxEnabled,
            PRA: false,
          }));
        } else if (!isChecked && !checkedItems.PRA && checkedItems.DI) {
          setCheckedItems((prevCheckedItems) => ({
            ...prevCheckedItems,
            PRA: true,
          }));

          setTextBoxEnabled((prevTextBoxEnabled) => ({
            ...prevTextBoxEnabled,
            PRA: true,
          }));
        }
        break;
      case "PRA":
        // when Production Ready Art is selected, user cannot select DT
        if (isChecked) {
          setDesignScopeList((prevDesignScopeList) => ({
            ...prevDesignScopeList,
            DT: "", // or DT: null
          }));
        }
        if (isChecked && checkedItems.DT) {
          setCheckedItems((prevCheckedItems) => ({
            ...prevCheckedItems,
            DT: false,
          }));
          setTextBoxEnabled((prevTextBoxEnabled) => ({
            ...prevTextBoxEnabled,
            DT: false,
          }));
        } else if (!isChecked && !checkedItems.DT && checkedItems.DI) {
          setCheckedItems((prevCheckedItems) => ({
            ...prevCheckedItems,
            DT: true,
          }));
          setTextBoxEnabled((prevTextBoxEnabled) => ({
            ...prevTextBoxEnabled,
            DT: true,
          }));
        }
        break;
      case "PF":
        // when Design Intent is selected, user must select DT or PRA
        if (isChecked) {
          setCheckedItems((prevCheckedItems) => ({
            ...prevCheckedItems,
            PF: true,
          }));
          setTextBoxEnabled((prevTextBoxEnabled) => ({
            ...prevTextBoxEnabled,
            PF: true,
          }));
          setDesignScopeList((prevDesignScopeList) => ({
            ...prevDesignScopeList,
            PF: "1", // or DT: null
          }));
        }
        break;
      default:
        break;
    }

    // enable/disable textbox based on checkbox selection
    setTextBoxEnabled((prevTextBoxEnabled) => ({
      ...prevTextBoxEnabled,
      [name]: isChecked,
      // enable both inputs when both DI and DT are selected
      ...(name === "DI" && isChecked && checkedItems.DT
        ? { DT: true }
        : name === "DT" && isChecked && checkedItems.DI
        ? { DI: true }
        : {}),
    }));
  };

  const defaultValues = {
    groupName: "",
    customValue: "",
    kickoffDate: "",
    PM: "",
  };
  const {
    register,
    handleSubmit,
    setValue,
    getValues,
    formState: { errors, isValid },
    trigger,
  } = useForm({
    mode: "onChange",
    defaultValues:
      // JSON.parse(localStorage.getItem("formDraft")) ||
      defaultValues,
  });

  const checkFormValidity = () => {
    // check if all fields are filled
    // // const valid = selectedCities && selectedCities.length > 0 && isValid;
    // const checkedvalue = !checkedItems.CICs && !checkedItems.DI && !checkedItems.DT && !checkedItems.IQ &&!checkedItems.PF && !checkedItems.PRA;
    // const checkedValue1 = designScopeList.CICs === "" && designScopeList.DI === "" && designScopeList.DT === "" && designScopeList.IQ === "" && designScopeList.PF === "" && designScopeList.PRA === "";

    const valid =
      projectName !== "" &&
      brand?.length > 0 &&
      region &&
      Object.keys(region).length > 0 &&
      smo &&
      smo?.length > 0 &&
      bu &&
      bu.length > 0 &&
      readinessDate &&
      printerDate &&
      subCategories?.length > 0 &&
      //checkedvalue === checkedValue1 &&
      true;
    return valid;
  };

  useEffect(() => {
    const valid = checkFormValidity();

    // check if all fields are filled
    // const valid = selectedCities && selectedCities.length > 0 && isValid;
    setFormValid(valid);
  });

  useEffect(() => {
    trigger();
  }, [trigger]);

  const collectFormData = (status, mode) => {
    const ProjectSMO = getProjectSMO();
    const ProjectCategory = getProjectCategory();
    const ProjectBrand = getProjectBrand();
    const ProjectCode = getProjectCode();

    const formData = {
      content: {
        BU: bu,
        Comments: comments,
        DesignIntent: checkedItems["DI"].toString(),
        EstimatedNoOfDI:
          checkedItems["DI"] === true && designScopeList.DI !== ""
            ? designScopeList.DI.toString()
            : checkedItems["DI"] === true && designScopeList.DI === ""
            ? "1"
            : designScopeList.DI.toString(),
        DesignTemplate: checkedItems["DT"].toString(),
        EstimatedNoOfDT:
          checkedItems["DT"] === true && designScopeList.DT !== ""
            ? designScopeList.DT.toString()
            : checkedItems["DT"] === true && designScopeList.DT === ""
            ? "1"
            : designScopeList.DT.toString(),
        InkQualification: checkedItems["IQ"].toString(),
        EstimatedNoOfIQ:
          checkedItems["IQ"] === true && designScopeList.IQ !== ""
            ? designScopeList.IQ.toString()
            : checkedItems["IQ"] === true && designScopeList.IQ === ""
            ? "1"
            : designScopeList.IQ.toString(),
        NewPrintFeasibility: checkedItems["PF"].toString(),
        EstimatedNoOfNPF:
          checkedItems["PF"] === true && designScopeList.PF !== ""
            ? designScopeList.PF.toString()
            : checkedItems["PF"] === true && designScopeList.PF === ""
            ? "1"
            : designScopeList.PF.toString(),
        ProductionReadyArt: checkedItems["PRA"].toString(),
        EstimatedNoOfPRA:
          checkedItems["PRA"] === true && designScopeList.PRA !== ""
            ? designScopeList.PRA.toString()
            : checkedItems["PRA"] === true && designScopeList.PRA === ""
            ? "1"
            : designScopeList.PRA.toString(),
        CICs: checkedItems["CICs"].toString(),
        Estimated_ofCICs:
          checkedItems["CICs"] === true && designScopeList.CICs !== ""
            ? designScopeList.CICs.toString()
            : checkedItems["CICs"] === true && designScopeList.CICs === ""
            ? "1"
            : designScopeList.CICs.toString(),

        POAs: "true",
        Estimated_ofPOAs: POA !== "" ? POA.toString() : "1",
        Estimated_SOP: formatPayloadDate(sopDate),
        Estimated_SOS: formatPayloadDate(sosDate),
        Estimated_AW_Printer: formatPayloadDate(printerDate),
        Estimated_AW_Readiness: formatPayloadDate(readinessDate),
        IL: iL,
        Tier: Tier?.Label_Name,
        InitiativeGroupName: groupName,
        PM: pm,
        ProductionStrategy: ps?.Label_Name,
        // Project_Brands: "V14", //
        // Project_Categories: "AIR", //
        Project_Scale: scale?.Scale_Name,
        Cluster: cluster,
        ProjectDescription: projectDesc,
        ProjectName: projectName,
        Project_region: region?.Region_Name,
        Project_Code: ProjectCode,
        ProjectType: projectType,
        Project_State: "Draft",
        Buffer_To_Work: "",
        ProjectStatus: status,
      },
      pageInstructions: [...ProjectCategory, ...ProjectBrand, ...ProjectSMO],
    };
    if (mode === "create") {
      formData.caseTypeID = "PG-AAS-Work-ArtworkProject";
    }
    return formData;
  };

  const getArtworkSMO = () => {
    const selectedSmoOptions = [];

    smo?.forEach((sm) => {
      let temp = {};
      smoOptions?.forEach((option) => {
        if (option.value === sm) {
          temp.SMO_Name = option.label;
          temp.code = option.value;
        }
      });
      selectedSmoOptions.push(temp);
    });
    console.log("smo: ", selectedSmoOptions);
    return selectedSmoOptions;
  };

  const getArtworkBrand = () => {
    return brand;
  };

  const getArtworkCategory = () => {
    const selectedCategoriesOptions = [];
    subCategories.forEach((obj) => {
      let temp = {};
      temp.Category_Name = obj.Label_Name;
      temp.code = obj.code;
      selectedCategoriesOptions.push(temp);
    });
    console.log("Categories: ", selectedCategoriesOptions);
    return selectedCategoriesOptions;
  };
  const collectForm2Data = (action, mode) => {
    const ArtworkSMO = getArtworkSMO();
    const ArtworkCategory = getArtworkCategory();
    const ArtworkBrand = getArtworkBrand();
    const ProjectCode = getProjectCode();

    const formData = {
      AWM_Project_ID: selectedProjectDetails.Project_ID,
      // Status: status,
      Action: action,
      Region: region?.Region_Name,
      Project_Name: projectName,
      Initiative_Group_Name: groupName,
      Project_Description: projectDesc,
      BU: bu,
      Project_region: region?.Region_Name,
      Cluster: cluster,
      Project_Scale: scale?.Scale_Name,
      Tier: Tier?.Label_Name,
      Project_State: selectedProjectDetails.Project_State,
      Project_Type: projectType,
      IL: iL,
      PM: pm,
      Estimated_SOS: formatPayloadDate(sosDate),
      Estimated_SOP: formatPayloadDate(sopDate),
      Comments: comments,
      Buffer_To_Work: "",
      Project_Code: ProjectCode,
      Design_Intent: checkedItems["DI"].toString(),
      Design_Template: checkedItems["DT"].toString(),
      Ink_Qualification: checkedItems["IQ"].toString(),
      New_Print_Feasibility: checkedItems["PF"].toString(),
      Production_Ready_Art: checkedItems["PRA"].toString(),
      CICs: checkedItems["CICs"].toString(),
      POAs: "true",
      Estimated_No_Of_DI:
        checkedItems["DI"] === true && designScopeList.DI !== ""
          ? designScopeList.DI.toString()
          : checkedItems["DI"] === true && designScopeList.DI === ""
          ? "1"
          : designScopeList.DI.toString(),
      Estimated_No_Of_DT:
        checkedItems["DT"] === true && designScopeList.DT !== ""
          ? designScopeList.DT.toString()
          : checkedItems["DT"] === true && designScopeList.DT === ""
          ? "1"
          : designScopeList.DT.toString(),
      Estimated_No_Of_PRA:
        checkedItems["PRA"] === true && designScopeList.PRA !== ""
          ? designScopeList.PRA.toString()
          : checkedItems["PRA"] === true && designScopeList.PRA === ""
          ? "1"
          : designScopeList.PRA.toString(),
      Estimated_No_Of_IQ:
        checkedItems["IQ"] === true && designScopeList.IQ !== ""
          ? designScopeList.IQ.toString()
          : checkedItems["IQ"] === true && designScopeList.IQ === ""
          ? "1"
          : designScopeList.IQ.toString(),
      Estimated_No_Of_NPF:
        checkedItems["PF"] === true && designScopeList.PF !== ""
          ? designScopeList.PF.toString()
          : checkedItems["PF"] === true && designScopeList.PF === ""
          ? "1"
          : designScopeList.PF.toString(),
      Estimated_No_Of_CICs:
        checkedItems["CICs"] === true && designScopeList.CICs !== ""
          ? designScopeList.CICs.toString()
          : checkedItems["CICs"] === true && designScopeList.CICs === ""
          ? "1"
          : designScopeList.CICs.toString(),
      Estimated_No_Of_POAs: POA !== "" ? POA.toString() : "1",
      Estimated_AW_Readiness: formatPayloadDate(readinessDate),
      Estimated_AW_Printer: formatPayloadDate(printerDate),
      Artwork_Brand: ArtworkBrand,
      Artwork_Category: ArtworkCategory,
      Artwork_SMO: ArtworkSMO,
    };

    return formData;
  };

  const onSubmit = async () => {
    setSpinnerText("Submitting");
    setLoader(true);
    if (mode === "create") {
      const formData = collectFormData("Active", mode);
      console.log("formData collectFormData: ", mode, formData);
      setFormData(formData);
      const response = await createNewProject(formData);
      if (response?.data?.ID) {
        awmProjectId = response?.data?.ID.split("PG-AAS-WORK ")[1];
      }
      // if (response?.data?.ID) {
      //   showStatus("success", "Success", "Submit Successful", "navigate");
      //   // alert("Submit Successful");
      // } else {
      //   showStatus("error", "Error", "Submit Failed");
      //   // alert("Submit failed");
      // }
    } else if (
      (mode === "edit" || mode === "design") &&
      !JSON.parse(sessionStorage.getItem("ProjectSubmitted"))
    ) {
      const formData = collectFormData("Active", mode);
      console.log("formData collectFormData: ", mode, formData);
      setFormData(formData);
      let id = `PG-AAS-WORK ${awmProjectId}`;
      let method = "PATCH";
      const headers = { key: "If-Match", value: selectedProjectDetails?.Etag };
      await editProject(formData, id, method, headers);
      // if (response?.data?.ID) {
      //   showStatus("success", "Success", "Submit Successful", "navigate");
      //   // alert("Submit Successful");
      // } else {
      //   showStatus("error", "Error", "Submit Failed");
      //   // alert("Submit failed");
      // }
    } else if (
      (mode === "edit" || mode === "design") &&
      JSON.parse(sessionStorage.getItem("ProjectSubmitted"))
    ) {
      const formData = collectForm2Data("", mode);
      console.log("formData collectForm2Data: ", mode, formData);
      setFormData(formData);
      let method = "POST";
      const headers = { key: "If-Match", value: selectedProjectDetails?.Etag };
      await editProject(formData, awmProjectId, method, headers);
    }
    setSpinnerText("");

    // alert(awmProjectId);
    const projectsList = await dispatch(getMyProject(userInformation));
    const currentProject = projectsList.find(
      (project) => project.Project_ID === awmProjectId
    );
    // alert(JSON.stringify(currentProject));

    if (currentProject) {
      if (url[1] === "projectSetup" || url[1] === "myProjects") {
        await dispatch(selectedProject(currentProject, "My Projects"));
        awmProjectId = currentProject.Project_ID;
        setLoader(false);
        navigate(`/myProjects/projectPlan/${awmProjectId}`);
      } else if (url[1] === "allProjects") {
        await dispatch(selectedProject(currentProject, "All Projects"));
        awmProjectId = currentProject.Project_ID;
        setLoader(false);
        navigate(`/allProjects/projectPlan/${awmProjectId}`);
      }
    }
  };
  const onSaveAsDraft = async () => {
    setSpinnerText("Saving");
    setLoader(true);

    if (mode === "create") {
      let draftFormData = collectFormData("Draft", mode);
      console.log("draftFormData collectFormData: ", mode, draftFormData);
      localStorage.setItem("formDraft", JSON.stringify(draftFormData));
      await createNewProject(draftFormData);
      // if (response?.data?.ID) {
      //   showStatus(
      //     "success",
      //     "Success",
      //     "Save As Draft Successful",
      //     "navigate"
      //   );
      //   // alert("Save As Draft Successful");
      // } else {
      //   showStatus("error", "Error", "Save As Draft Failed");
      //   // alert("Save As Draft failed");
      // }
    } else if (mode === "edit" || mode === "design") {
      let draftFormData = collectForm2Data("saveasdraft", mode);
      console.log("draftFormData collectForm2Data: ", mode, draftFormData);
      localStorage.setItem("formDraft", JSON.stringify(draftFormData));
      const method = "POST";
      const headers = { key: "If-Match", value: selectedProjectDetails?.Etag };
      await editProject(draftFormData, awmProjectId, method, headers);
      // if (response?.data?.ID) {
      //   showStatus(
      //     "success",
      //     "Success",
      //     "Save As Draft Successful",
      //     "navigate"
      //   );
      //   // alert("Save As Draft Successful");
      // } else {
      //   showStatus("error", "Error", "Save As Draft Failed");
      //   // alert("Save As Draft failed");
      // }
    }
    setSpinnerText("");
    setLoader(false);
    navigate("/myProjects");
  };

  // this function is to change the date format maybe we will change when pega integration is done.
  const changeDateFormat = (value) => {
    const options = { timeZone: "Asia/Kolkata", hour12: false };
    const outputDateString = value?.toLocaleString("en-US", options);
    const outputDate = new Date(outputDateString);
    return outputDate;
  };
  const handleTierChange = (e) => {
    const selectedTier = tierList.find((r) => r.Label_Name === e.target.value);
    console.log("selectedTier", e.target.value);
    console.log("tierList", tierList);
    setTier(selectedTier);
  };
  const handlePsChange = (e) => {
    const selectedPs = productionStrategyList.find(
      (r) => r.Label_Name === e.target.value
    );
    console.log("selectedPs", e.target.value);
    console.log("setProductionStrategyList", setProductionStrategyList);
    setPs(selectedPs);
  };
  const handlePM = (e) => {
    e.target.value.length === 0 ? setPMAlert(true) : setPMAlert(false);
    setPm(e.target.value);
  };
  const handleIL = (e) => {
    setIl(e.target.value);
  };
  useEffect(() => {
    const selectedData = JSON.parse(localStorage.getItem("formDraft"));
    if (selectedData && selectedData.selectedCities) {
      setSelectedCities(selectedData.selectedCities);
    }
  }, []);
  const clearForm = () => {
    setSelectedCities([]);
    props.setVisible(false);
  };

  return (
    <>
      {loading || loader ? (
        <Loading />
      ) : (
        <div className="tabular-add-project">
          <Toast ref={toast} />
          <Form onSubmit={handleSubmit(onSubmit)}>
            <Row>
              <Col>
                <Row>
                  {/* <>{mode}</> */}
                  <Form.Group
                    className={`mb-2 ${projectNameAlert ? "error-text" : ""}`}
                    controlId="projectName.ControlInput1"
                  >
                    <Form.Label>
                      Project Name <sup>*</sup>
                    </Form.Label>
                    <input
                      type="text"
                      style={{ fontSize: "10px" }}
                      className="form-control"
                      placeholder="Enter Project Name"
                      onChange={(e) => {
                        const value = e.target.value;
                        setProjectName(value);
                        if (value.trim() === "") {
                          setProjectNameAlert(true);
                        } else if (value.trim() !== "") {
                          setProjectNameAlert(false);
                        }
                      }}
                      value={projectName}
                    />
                    {/* {projectName === "" && (
                  <span className="error-text">Field Remaining</span>
                )} */}
                  </Form.Group>
                </Row>
                <Row>
                  <Form.Group
                    className={`mb-2`}
                    controlId="groupName.ControlInput1"
                  >
                    <Form.Label>Initiative Group Name</Form.Label>
                    <input
                      type="text"
                      className="form-control"
                      placeholder="Enter Group Name"
                      onChange={(e) => setGroupName(e.target.value)}
                      value={groupName}
                    />
                  </Form.Group>
                </Row>
                <Row>
                  <Form.Group
                    className="mb-2"
                    controlId="projectDescription.ControlInput1"
                  >
                    <Form.Label>Project Description</Form.Label>
                    <textarea
                      type="text"
                      className="form-control"
                      placeholder="Enter Project Description"
                      onChange={(e) => setProjectDesc(e.target.value)}
                      value={projectDesc}
                    />
                  </Form.Group>
                </Row>
                <Row>
                  <Form.Group
                    // className={`mb-2 ${bu === "" && "error-valid"}`}
                    className={`mb-2 ${businessUnitAlert ? "error-text" : ""}`}
                    controlId="bu.SelectMultiple"
                  >
                    <Form.Label>
                      Business Unit<sup>*</sup>
                    </Form.Label>
                    <div>
                      <Form.Select
                        value={bu}
                        onChange={handleBuChange}
                        placeholder="Select BU"
                      >
                        <option value="">Select BU</option>
                        {bUs.map((bu) => (
                          <option key={bu.code} value={bu.BU_Name}>
                            {bu.BU_Name}
                          </option>
                        ))}
                      </Form.Select>
                    </div>
                    {/* {bu === "" && (
                  <span className="error-text">Field Remaining</span>
                )} */}
                  </Form.Group>
                </Row>
                <Row>
                  <Form.Group
                    controlId="scale.category"
                    className={`mb-2 ${categoriesAlert ? "error-text" : ""}`}
                    // className={`mb-2 ${
                    //   selectedCities && !selectedCities.length && "error-valid"
                    // }`}
                  >
                    <Form.Label>
                      Category <sup>*</sup>
                    </Form.Label>
                    <MultiSelect
                      value={subCategories}
                      onChange={handleSubCategoryChange}
                      options={subCategoriesOptions}
                      optionLabel="Label_Name"
                      filter
                      placeholder="Select Categories"
                      className="w-full md:w-20rem"
                    />
                  </Form.Group>
                </Row>
                <Row>
                  <Form.Group
                    // className={`mb-2 ${brand?.length < 1 && "error-valid"}`}
                    className={brandAlert ? "error-text" : ""}
                    controlId="brand.SelectMultiple"
                  >
                    <Form.Label>
                      Brand <sup>*</sup>
                    </Form.Label>
                    <div>
                      <MultiSelect
                        value={brand}
                        onChange={(e) => {
                          e.target.value.length === 0
                            ? setBrandAlert(true)
                            : setBrandAlert(false);
                          setBrand(e.value);
                        }}
                        options={brands}
                        optionLabel="Brand_Name"
                        filter
                        placeholder="Select Brand"
                        className="w-full md:w-20rem"
                        // style={{ marginBottom: "12px" }}
                        required
                      />
                    </div>
                    {/* {brand?.length < 1 && (
                  <span className="error-text">Field Remaining</span>
                )} */}
                  </Form.Group>
                </Row>
              </Col>
              <Col>
                <Row>
                  <Form.Group
                    // className={`mb-2 ${
                    //   (!region || Object.keys(region).length < 1) && "error-valid"
                    // }`}
                    className={`mb-2 ${regionAlert ? "error-text" : ""}`}
                    controlId="reg.SelectMultiple"
                  >
                    <Form.Label>
                      Region <sup>*</sup>
                    </Form.Label>
                    <div>
                      <Form.Select
                        value={region?.Region_Name || ""}
                        onChange={handleRegionChange}
                        placeholder="Select Region"
                        // className="form-control"
                        // style={{ color: "pink" }}
                      >
                        <option value="">Select Region</option>
                        {regions.map((r) => (
                          <option key={r.code} value={r.Region_Name}>
                            {r.Region_Name}
                          </option>
                        ))}
                      </Form.Select>
                    </div>
                    {/* {(!region || Object.keys(region).length < 1) && (
                  <span className="error-text">Field Remaining</span>
                )} */}
                  </Form.Group>
                </Row>
                <Row>
                  <Form.Group
                    // className={`mb-2 ${(!smo || smo?.length < 1) && "error-valid"}`}
                    className={`mb-2 ${SMOAlert ? "error-text" : ""}`}
                    controlId="smo.SelectMultiple"
                  >
                    <Form.Label>
                      SMO <sup>*</sup>
                    </Form.Label>
                    <div>
                      <MultiSelect
                        value={smo}
                        onChange={(e) => {
                          e.target.value.length === 0
                            ? setSMOAlert(true)
                            : setSMOAlert(false);
                          setSmo(e.value);
                        }}
                        options={smoOptions}
                        optionLabel="label"
                        filter
                        placeholder="Select SMO"
                        className="w-full md:w-20rem"
                        // required={!!region}
                        // disabled={!region}
                      />
                    </div>
                    {/* {(!smo || smo?.length < 1) && (
                  <span className="error-text">Field Remaining</span>
                )} */}
                  </Form.Group>
                </Row>
                <Row>
                  <Form.Group
                    className="mb-2"
                    controlId="cluster.SelectMultiple"
                  >
                    <Form.Label>Cluster</Form.Label>
                    <div>
                      <Form.Control
                        placeholder="Enter Cluster"
                        value={cluster}
                        onChange={(e) => setCluster(e.target.value)}
                      ></Form.Control>
                    </div>
                  </Form.Group>
                </Row>
                <Row>
                  <Form.Group className="mb-2" controlId="bve.SelectMultiple">
                    <Form.Label>Scale </Form.Label>
                    <div>
                      <Form.Select
                        value={scale.Scale_Name || ""}
                        onChange={handleScaleChange}
                        placeholder="Select Scale"
                      >
                        <option value="">Select Scale</option>
                        {scales.map((bu) => (
                          <option key={bu.code} value={bu.Scale_Name}>
                            {bu.Scale_Name}
                          </option>
                        ))}
                      </Form.Select>
                    </div>
                  </Form.Group>
                </Row>
                <Row>
                  <Form.Group controlId="il.SelectMultiple">
                    <Form.Label>Scope & Estimated #s</Form.Label>
                    <div className="design-scope">
                      {designScope.map((option, index) => (
                        <span key={index} style={{ display: "flex" }}>
                          <Form.Check
                            label={option.label}
                            name={option.value}
                            type="checkbox"
                            value={option.value}
                            onChange={handleCheckboxChange}
                            checked={checkedItems[option.value]}
                            style={{
                              width: 160,
                            }}
                            disabled={
                              mode !== "create" &&
                              projectData?.Project_State === "Active"
                            }
                          />
                          {option.value !== "PF" && (
                            <Form.Control
                              type="number"
                              value={designScopeList[option.value]}
                              onChange={(e) => {
                                const inputValue = parseInt(e.target.value, 10);
                                if (inputValue > 0) {
                                  setDesignScopeList((prevDesignScopeList) => ({
                                    ...prevDesignScopeList,
                                    [option.value]: parseInt(e.target.value),
                                  }));
                                } else {
                                  setDesignScopeList((prevDesignScopeList) => ({
                                    ...prevDesignScopeList,
                                    [option.value]: parseInt(""),
                                  }));
                                }
                              }}
                              disabled={
                                !textBoxEnabled[option.value] ||
                                (mode !== "create" &&
                                  projectData?.Project_State === "Active")
                              }
                              // style={textBoxEnabled[option.value] ? {} : { opacity: 0.5 }}
                              style={{
                                width: 40,
                                height: 27,
                                paddingLeft: "5px",
                                paddingRight: 0,
                                fontSize: "10px",
                                marginRight: "10px",
                                ...(!textBoxEnabled[option.value]
                                  ? { backgroundColor: "#e9ecef" }
                                  : {}),
                              }}
                            />
                          )}
                        </span>
                      ))}
                      <span style={{ display: "flex" }}>
                        <Form.Check
                          label="Final Art *"
                          name="POA"
                          type="checkbox"
                          value="POA"
                          onChange={handleCheckboxChange}
                          checked
                          style={{ width: 160 }}
                          disabled={
                            mode !== "create" &&
                            projectData?.Project_State === "Active"
                          }
                        />
                        <Form.Control
                          type="number"
                          value={POA}
                          required
                          onChange={(e) => {
                            const inputValue = parseInt(e.target.value, 10);
                            if (inputValue > 0) {
                              setPOA(inputValue);
                            } else {
                              setPOA("");
                            }
                          }}
                          disabled={
                            mode !== "create" &&
                            projectData?.Project_State === "Active"
                          }
                          style={{
                            width: 40,
                            height: 27,
                            paddingLeft: "5px",
                            paddingRight: 0,
                            fontSize: "10px",
                            marginRight: "10px",
                          }}
                        />
                      </span>
                    </div>
                  </Form.Group>
                </Row>
              </Col>
              <Col>
                <Row>
                  <Form.Group
                    className={`mb-2 ${!readinessDate && "error-valid"}`}
                    controlId="sop.readiness"
                  >
                    <Form.Label>
                      Estimated AW Readiness <sup>*</sup>
                    </Form.Label>
                    <Controller
                      name="date"
                      control={form.control}
                      rules={{ required: "Date is required." }}
                      render={({ field, fieldState }) => (
                        <>
                          <Calendar
                            placeholder="Select Estimated AW Readiness"
                            inputId={field.name}
                            value={readinessDate}
                            onChange={(e) => setReadinessDate(e.target.value)}
                            dateFormat="d-M-y"
                            showIcon={true}
                            minDate={minDate}
                            maxDate={printerDate}
                            className={classNames({
                              "p-invalid": fieldState.error,
                            })}
                          />
                        </>
                      )}
                    />
                    {/* {!readinessDate && (
                <span className="error-text">Field Remaining</span>
              )} */}
                  </Form.Group>
                </Row>
                <Row>
                  <Form.Group
                    className={`mb-2 ${!printerDate && "error-valid"}`}
                    controlId="sop.readiness"
                  >
                    <Form.Label>
                      Estimated AW@Printer<sup>*</sup>{" "}
                    </Form.Label>

                    <Controller
                      name="date"
                      control={form.control}
                      rules={{ required: "Date is required." }}
                      render={({ field, fieldState }) => (
                        <>
                          <Calendar
                            placeholder="Select Estimated AW@Printer"
                            inputId={field.name}
                            value={printerDate}
                            onChange={(e) => setPrinterDate(e.target.value)}
                            dateFormat="d-M-y"
                            showIcon={true}
                            minDate={
                              readinessDate !== "" ? readinessDate : minDate
                            }
                            maxDate={sopDate}
                            className={classNames({
                              "p-invalid": fieldState.error,
                            })}
                          />
                        </>
                      )}
                    />
                    {/* {!printerDate && (
                  <span className="error-text">Field Remaining</span>
                )} */}
                  </Form.Group>
                </Row>
                <Row>
                  <Form.Group className={`mb-2`} controlId="sop.readiness">
                    <Form.Label>Estimated SOP</Form.Label>
                    <Controller
                      name="date"
                      control={form.control}
                      rules={{ required: "Date is required." }}
                      render={({ field, fieldState }) => (
                        <>
                          <Calendar
                            placeholder="Select Estimated SOP"
                            inputId={field.name}
                            value={sopDate}
                            onChange={(e) => setSOPDate(e.target.value)}
                            dateFormat="d-M-y"
                            showIcon={true}
                            minDate={printerDate !== "" ? printerDate : minDate}
                            maxDate={sosDate}
                            className={classNames({
                              "p-invalid": fieldState.error,
                            })}
                            style={{
                              fontSize: "12px",
                              fontWeight: 1500,
                            }}
                          />
                        </>
                      )}
                    />
                  </Form.Group>
                </Row>
                <Row>
                  <Form.Group className="mb-2" controlId="sop.readiness">
                    <Form.Label>Estimated SOS</Form.Label>
                    {/*
              {errors.sopDate && (
                <span className="error-text">Please select a SOP Date</span>
              )} */}
                    <Controller
                      name="date"
                      control={form.control}
                      rules={{ required: "Date is required." }}
                      render={({ field, fieldState }) => (
                        <>
                          <Calendar
                            placeholder="Select Estimated SOS"
                            inputId={field.name}
                            value={sosDate}
                            onChange={(e) => setSOSDate(e.target.value)}
                            dateFormat="d-M-y"
                            showIcon={true}
                            minDate={sopDate !== "" ? sopDate : minDate}
                            style={{
                              width: 208,
                              fontSize: "12px",
                              fontWeight: 1500,
                            }}
                            className={classNames({
                              "p-invalid": fieldState.error,
                            })}
                          />
                        </>
                      )}
                    />
                  </Form.Group>
                </Row>
                <Row>
                  <Form.Group className="mb-2" controlId="il.SelectMultiple">
                    <Form.Label>Initiative Leader</Form.Label>
                    <div>
                      <Form.Control
                        placeholder="Enter IL"
                        value={iL}
                        onChange={handleIL}
                      ></Form.Control>
                    </div>
                  </Form.Group>
                </Row>
                <Row>
                  <Form.Group className={PMAlert ? "error-text" : ""}>
                    <Form.Label className={PMAlert ? "error-text" : ""}>
                      Project Manager <sup>*</sup>
                    </Form.Label>
                    <div>
                      <Form.Select
                        value={pm}
                        onChange={handlePM}
                        disabled={mode === "create" && true}
                      >
                        <option value="">Select PM</option>
                        {RoleUser.users.map((r) => (
                          <option key={r.username} value={r.username}>
                            {r.username}
                          </option>
                        ))}
                      </Form.Select>
                    </div>
                  </Form.Group>
                </Row>
              </Col>
              <Col>
                <Row>
                  <Form.Group
                    className="mb-2"
                    controlId="comments.ControlInput1"
                  >
                    <Form.Label>Comments</Form.Label>
                    <textarea
                      type="text"
                      className="form-control"
                      placeholder="Add Comments"
                      onChange={(e) => setComments(e.target.value)}
                      value={comments}
                    />
                  </Form.Group>
                </Row>
                <Row>
                  <Form.Group
                    className="mb-2"
                    controlId="projectType.SelectMultiple"
                  >
                    <Form.Label>Project Type</Form.Label>
                    <div>
                      <Form.Select
                        value={projectType}
                        onChange={(e) => setProjectType(e.target.value)}
                        placeholder="Select Project Type"
                      >
                        <option value="">Select Project Type</option>
                        {projectTypeList.map((pt) => (
                          <option key={pt.code} value={pt.code}>
                            {pt.ProjectType_Name}
                          </option>
                        ))}
                      </Form.Select>
                    </div>
                  </Form.Group>
                </Row>
                <Row>
                  <Form.Group className="mb-2" controlId="bve.SelectMultiple">
                    <Form.Label>
                      {/* new  */}
                      {(region?.Region_Name === "EUROPE" ||
                        region?.code === "EUE") &&
                        bu === "Baby Care" &&
                        "Tier"}
                      {(region?.Region_Name === "EUROPE" ||
                        region?.code === "EUE") &&
                        bu === "Home Care" &&
                        "Production Strategy"}
                    </Form.Label>
                    <div>
                      {(region?.Region_Name === "EUROPE" ||
                        region?.code === "EUE") &&
                        bu === "Baby Care" && (
                          <Form.Select
                            {...register("Teir", { required: false })}
                            value={Tier?.Label_Name || ""}
                            placeholder="Select Teir"
                            onChange={handleTierChange}
                          >
                            <option value="">Select Tier</option>
                            {tierList.map((tier) => (
                              <option key={tier.code} value={tier.Label_Name}>
                                {tier.Label_Name}
                              </option>
                            ))}
                          </Form.Select>
                        )}
                      {(region?.Region_Name === "EUROPE" ||
                        region?.code === "EUE") &&
                        bu === "Home Care" && (
                          <Form.Select
                            {...register("Production Strtegy", {
                              required: false,
                            })}
                            value={ps?.Label_Name || ""}
                            placeholder="Select PS"
                            onChange={handlePsChange}
                          >
                            <option value="">Select Production Strategy</option>
                            {productionStrategyList.map((ps) => (
                              <option key={ps.code} value={ps.Label_Name}>
                                {ps.Label_Name}
                              </option>
                            ))}
                          </Form.Select>
                        )}
                    </div>
                  </Form.Group>
                </Row>
              </Col>
            </Row>
            <div className="form-buttons">
              <Button
                className="button-layout"
                variant="secondary"
                onClick={() => {
                  navigate("/myProjects");
                }}
              >
                Cancel
              </Button>
              <Button
                className={
                  mode !== "create" &&
                  JSON.parse(sessionStorage.getItem("ProjectSubmitted"))
                    ? "button-layout btn btn-disabled"
                    : "button-layout"
                }
                variant="secondary"
                onClick={onSaveAsDraft}
                disabled={
                  mode !== "create" &&
                  JSON.parse(sessionStorage.getItem("ProjectSubmitted"))
                }
              >
                Save as draft
              </Button>
              <Button
                className={
                  !formValid
                    ? "button-layout btn btn-disabled"
                    : "button-layout"
                }
                type="submit"
                disabled={!formValid}
              >
                Next
              </Button>
            </div>
          </Form>
        </div>
      )}
    </>
  );
}
export default AddProject;
