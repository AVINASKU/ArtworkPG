import React, { useState, useEffect, useRef } from "react";
import { Form, Row, Col, Button } from "react-bootstrap";
import { MultiSelect } from "primereact/multiselect";
import { Calendar } from "primereact/calendar";
import { Controller, useForm } from "react-hook-form";
import { classNames } from "primereact/utils";
import { useNavigate } from "react-router-dom";
import { createNewProject, editProject } from "../../../apis/projectSetupApi";
import { selectedProject } from "../../../store/actions/ProjectSetupActions";
import { updateProjectPlanAction } from "../../../store/actions/ProjectPlanActions";
import moment from "moment-timezone";
import { Toast } from "primereact/toast";
import "./index.scss";
import {
  businessUnits,
  regionList,
  designScope,
  scaleList,
  projectTypeList,
  brandList,
  ProductionStrategy,
  Tier,
  PMValues,
} from "../../../categories";
import { useDispatch, useSelector } from "react-redux";

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
  const User = useSelector((state) => state.UserReducer);
  const userInformation = User.userInformation;
  const projectSetup = useSelector((state) => state.ProjectSetupReducer);
  const selectedProjectDetails = projectSetup.selectedProject;
  const mode = projectSetup.mode;
  const id = `PG-AAS-WORK ${selectedProjectDetails.Project_ID}`;
  const prePopuSmo = [];
  selectedProjectDetails?.Artwork_SMO?.forEach((obj) => {
    prePopuSmo.push(obj.code);
  });

  const [projectName, setProjectName] = useState("");
  const [projectDesc, setProjectDesc] = useState("");
  const [groupName, setGroupName] = useState("");
  const [cluster, setCluster] = useState("");
  const [scale, setScale] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
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
  const [smo, setSmo] = useState(null);
  const [bu, setBu] = useState("");
  const [subCategories, setSubCategories] = useState([]);
  const [brand, setBrand] = useState([]);
  const [tier, setTier] = useState("");
  const [ps, setPs] = useState("");
  const [pm, setPm] = useState(userInformation.username);
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
  const [designScopeList, setDesignScopeList] = useState({
    DI: "",
    DT: "",
    PRA: "",
    PF: "",
    IQ: "",
    CICs: "",
  });

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
    return new Date(
      moment(date, "YYYYMMDD[T]HHmmss.SSS [GMT]")
        .tz(Intl.DateTimeFormat().resolvedOptions().timeZone)
        .format("ddd MMM DD YYYY HH:mm:ss [GMT]ZZ (z)")
    );
  };

  useEffect(() => {
    if (mode === "edit" || mode === "design") {
      setProjectName(selectedProjectDetails?.Project_Name || "");
      setGroupName(selectedProjectDetails?.Initiative_Group_Name || "");
      setProjectDesc(selectedProjectDetails?.Project_Description || "");
      setBu(selectedProjectDetails?.BU || "");
      setSubCategories(selectedProjectDetails?.Artwork_Category || []);
      setBrand(selectedProjectDetails?.Artwork_Brand || []);
      setRegion(
        (selectedProjectDetails &&
          regionList.find(
            (r) => r.name === selectedProjectDetails.Project_region
          )) ||
          {}
      );
      setSmo(prePopuSmo || null);
      setCluster(selectedProjectDetails?.cluster || "");
      setScale(
        (selectedProjectDetails &&
          scaleList.find(
            (r) => r.code === selectedProjectDetails.Project_Scale
          ) &&
          scaleList.find((r) => r.code === selectedProjectDetails.Project_Scale)
            .code) ||
          []
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
      setProjectType(selectedProjectDetails?.Project_Type || []);

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
        PRA: parseInt(selectedProjectDetails?.Estimated_No_Of_PRA),
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
      setPs(selectedProjectDetails?.Production_Strategy);
      setTier(selectedProjectDetails?.Tier);
    } else {
      setProjectName("");
      setGroupName("");
      setProjectDesc("");
      setBu("");
      setSubCategories([]);
      setBrand([]);
      setRegion({});
      setSmo(null);
      setCluster("");
      setScale([]);
      setSOSDate("");
      setSOPDate("");
      setPrinterDate("");
      setReadinessDate("");
      setIl("");
      setPm(userInformation.username);
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
  }, [mode]);

  const getSmoOptions = () => {
    if (!region?.countries) return [];

    return region.countries.map((country) => ({
      label: country.name,
      value: country.code,
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
      if (pt.name === projName) {
        projCode = pt.code;
      }
    });
    return projCode || "";
  };

  const handleRegionChange = (e) => {
    e.target.value.length === 0 ? setRegionAlert(true) : setRegionAlert(false);
    const selectedRegion = regionList.find((r) => r.name === e.target.value);
    setRegion(selectedRegion);
    setSmo(null);
  };
  const handleScaleChange = (e) => {
    const selectedScale = scaleList.find((r) => r.code === e.target.value);
    setRegion(selectedScale);
    setSmo(null);
  };

  const smoOptions = getSmoOptions();

  const handleBuChange = (e) => {
    e.target.value.length === 0
      ? setBusinessUnitAlert(true)
      : setBusinessUnitAlert(false);
    setBu(e.target.value);
    setSubCategories([]);
  };

  // const bUs = Object.keys(categories).map((bu) => ({ code: bu, name: bu }));
  const bUs = businessUnits.map((bu) => {
    return {
      name: bu.name,
      code: bu.code,
    };
  });
  const handleSubCategoryChange = (e) => {
    setSubCategories(e.value);
  };

  // const subCategoriesOptions = useMemo(() => {
  //   if (bu && categories[bu]) {
  //     return categories[bu].map((subCat) => ({ label: subCat, value: subCat }));
  //   }
  //   return [];
  // }, [bu, categories]);

  useEffect(() => {
    bu &&
      businessUnits.forEach((obj) => {
        if (obj.code === bu) {
          setSubCategoriesOptions(obj.categories);
        }
      });
  }, [bu]);

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
      [name]: isChecked ? value : false,
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
        setDesignScopeList((prevDesignScopeList) => ({
          ...prevDesignScopeList,
          PRA: "", // or DT: null
        }));
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
        setDesignScopeList((prevDesignScopeList) => ({
          ...prevDesignScopeList,
          DT: "", // or DT: null
        }));
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
        DesignIntent: (designScopeList.DI !== "").toString(),
        EstimatedNoOfDI: designScopeList.DI.toString(),
        DesignTemplate: (designScopeList.DT !== "").toString(),
        EstimatedNoOfDT: designScopeList.DT.toString(),
        InkQualification: (designScopeList.IQ !== "").toString(),
        EstimatedNoOfIQ: designScopeList.IQ.toString(),
        NewPrintFeasibility: (designScopeList.PF !== "").toString(),
        EstimatedNoOfNPF: designScopeList.PF.toString(),
        ProductionReadyArt: (designScopeList.PRA !== "").toString(),
        EstimatedNoOfPRA: designScopeList.PRA.toString(),
        Estimated_ofCICs: designScopeList.CICs.toString(),
        CICs: (designScopeList.CICs !== "").toString(),
        POAs: "true",
        Estimated_ofPOAs: POA,
        Estimated_SOP: sopDate,
        Estimated_SOS: sosDate,
        Estimated_AW_Printer: printerDate,
        Estimated_AW_Readiness: readinessDate,
        IL: iL,
        tier: tier,
        InitiativeGroupName: groupName,
        PM: pm,
        ProductionStrategy: ps,
        // Project_Brands: "V14", //
        // Project_Categories: "AIR", //
        Project_Scale: scale,
        Cluster: cluster,
        ProjectDescription: projectDesc,
        ProjectName: projectName,
        Project_region: region.name,
        Project_Code: ProjectCode,
        ProjectType: projectType,
        Project_State: "",
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

  const onSubmit = async () => {
    const formData = collectFormData("Active", mode);
    setFormData(formData);
    if (mode === "create") {
      await createNewProject(formData);
      // if (response?.data?.ID) {
      //   showStatus("success", "Success", "Submit Successful", "navigate");
      //   // alert("Submit Successful");
      // } else {
      //   showStatus("error", "Error", "Submit Failed");
      //   // alert("Submit failed");
      // }
    } else if (mode === "edit" || mode === "design") {
      const method = "PATCH";
      const headers = { key: "If-Match", value: selectedProjectDetails?.Etag };
      await editProject(formData, id, method, headers);
      // if (response?.data?.ID) {
      //   showStatus("success", "Success", "Submit Successful", "navigate");
      //   // alert("Submit Successful");
      // } else {
      //   showStatus("error", "Error", "Submit Failed");
      //   // alert("Submit failed");
      // }
    }
    navigate("/myProjects");
  };
  const onSaveAsDraft = async () => {
    const draftFormData = collectFormData("Draft", mode);
    localStorage.setItem("formDraft", JSON.stringify(draftFormData));
    setIsLoading(true);
    if (mode === "create") {
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
      const method = "PUT";
      const headers = { key: "If-Match", value: selectedProjectDetails?.Etag };
      await editProject(draftFormData, id, method, headers);
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
    setIsLoading(false);
    navigate("/myProjects");
  };

  // this function is to change the date format maybe we will change when pega integration is done.
  const changeDateFormat = (value) => {
    const options = { timeZone: "Asia/Kolkata", hour12: false };
    const outputDateString = value?.toLocaleString("en-US", options);
    const outputDate = new Date(outputDateString);
    return outputDate;
  };

  // useEffect(() => {
  //   //get api call
  //   const formDraft = JSON.parse(localStorage?.getItem("formDraft"));
  //   if (formDraft) {
  //     Object.entries(formDraft).forEach(([name, value]) => {
  //       //
  //       if (name === "sopDate") {
  //         let outputDate = changeDateFormat(value);
  //         setSOPDate(outputDate);
  //       }
  //       if (name === "sosDate") {
  //         let outputDate = changeDateFormat(value);
  //         setSOSDate(outputDate);
  //       }
  //       if (name === "readinessDate") {
  //         let outputDate = changeDateFormat(value);
  //         setReadinessDate(outputDate);
  //       }
  //       if (name === "printerDate") {
  //         let outputDate = changeDateFormat(value);
  //         setPrinterDate(outputDate);
  //       }
  //       if (name === "bu") {
  //         setBu(value);
  //       }
  //       if (name === "region") {
  //         setRegion(value);
  //       }
  //       if (name === "smo") {
  //         setSmo(value);
  //       }
  //       if (name === "category") {
  //         setSubCategories(value);
  //       }
  //       setValue(name, value);
  //     });
  //   }
  // }, [setValue]);
  const handleTierChange = (e) => {
    setTier(e.target.value);
  };
  const handlePsChange = (e) => {
    setPs(e.target.value);
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
    <div className="tabular-add-project">
      <Toast ref={toast} />
      <Form onSubmit={handleSubmit(onSubmit)}>
        <Row>
          <Col>
            <Row>
              <Form.Group
                className={`mb-3 ${projectNameAlert ? "error-text" : ""}`}
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
                className={`mb-4`}
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
                className="mb-4"
                controlId="projectDescription.ControlInput1"
              >
                <Form.Label>Project Description</Form.Label>
                <textarea
                  type="text"
                  style={{ height: "105px" }}
                  className="form-control"
                  placeholder="Enter Project Description"
                  onChange={(e) => setProjectDesc(e.target.value)}
                  value={projectDesc}
                />
              </Form.Group>
            </Row>
            <Row>
              <Form.Group
                // className={`mb-3 ${bu === "" && "error-valid"}`}
                className={`mb-3 ${businessUnitAlert ? "error-text" : ""}`}
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
                      <option key={bu.code} value={bu.code}>
                        {bu.name}
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
                className="mb-4"
                // className={`mb-3 ${
                //   selectedCities && !selectedCities.length && "error-valid"
                // }`}
              >
                <Form.Label>Category</Form.Label>
                <MultiSelect
                  value={subCategories}
                  onChange={handleSubCategoryChange}
                  options={subCategoriesOptions}
                  optionLabel="Category_Name"
                  filter
                  placeholder="Select Categories"
                  className="w-full md:w-20rem"
                />
              </Form.Group>
            </Row>
            <Row>
              <Form.Group
                // className={`mb-3 ${brand?.length < 1 && "error-valid"}`}
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
                    options={brandList}
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
                // className={`mb-3 ${
                //   (!region || Object.keys(region).length < 1) && "error-valid"
                // }`}
                className={`mb-3 ${regionAlert ? "error-text" : ""}`}
                controlId="smo.SelectMultiple"
              >
                <Form.Label>
                  Region <sup>*</sup>
                </Form.Label>
                <div>
                  <Form.Select
                    value={region?.name || ""}
                    onChange={handleRegionChange}
                    placeholder="Select Region"
                    // className="form-control"
                    // style={{ color: "pink" }}
                  >
                    <option value="">Select Region</option>
                    {regionList.map((r) => (
                      <option key={r.code} value={r.name}>
                        {r.name}
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
                // className={`mb-3 ${(!smo || smo?.length < 1) && "error-valid"}`}
                className={`mb-3 ${SMOAlert ? "error-text" : ""}`}
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
                    required={!!region}
                    disabled={!region}
                  />
                </div>
                {/* {(!smo || smo?.length < 1) && (
                  <span className="error-text">Field Remaining</span>
                )} */}
              </Form.Group>
            </Row>
            <Row>
              <Form.Group className="mb-4" controlId="cluster.SelectMultiple">
                <Form.Label>Cluster</Form.Label>
                <div>
                  <Form.Select
                    value={cluster}
                    onChange={(e) => setCluster(e.target.value)}
                    placeholder="Select Cluster"
                  >
                    <option value="" style={{ maxWidth: "208px" }}>
                      Select Cluster
                    </option>
                    <option value="cluster1">Cluster1</option>
                  </Form.Select>
                </div>
              </Form.Group>
            </Row>
            <Row>
              <Form.Group className="mb-4" controlId="bve.SelectMultiple">
                <Form.Label>Scale </Form.Label>
                <div>
                  <Form.Select
                    value={scale}
                    onChange={(e) => setScale(e.target.value)}
                    placeholder="Select Scale"
                  >
                    <option value="">Select Scale</option>
                    {scaleList.map((bu) => (
                      <option key={bu.code} value={bu.code}>
                        {bu.name}
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
                      />
                      {option.value !== "PF" && (
                        <Form.Control
                          type="number"
                          value={designScopeList[option.value]}
                          onChange={(e) => {
                            const inputValue = parseInt(e.target.value, 10);
                            if (inputValue >= 1) {
                              setDesignScopeList((prevDesignScopeList) => ({
                                ...prevDesignScopeList,
                                [option.value]: parseInt(e.target.value),
                              }));
                            }
                          }}
                          disabled={!textBoxEnabled[option.value]}
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
                    />
                    <Form.Control
                      type="number"
                      value={POA}
                      required
                      onChange={(e) => {
                        const inputValue = parseInt(e.target.value, 10);
                        if (inputValue >= 1) {
                          setPOA(inputValue);
                        }
                      }}
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
              <Form.Group className="mb-4" controlId="sop.readiness">
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
                        minDate={sosDate !== "" ? sosDate : minDate}
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
              <Form.Group className={`mb-4`} controlId="sop.readiness">
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
                        minDate={minDate}
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
              <Form.Group
                className={`mb-3 ${!printerDate && "error-valid"}`}
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
                        // placeholder="Select Estimated AW@Printer"
                        inputId={field.name}
                        value={printerDate}
                        onChange={(e) => setPrinterDate(e.target.value)}
                        dateFormat="d-M-y"
                        showIcon={true}
                        minDate={minDate}
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
              <Form.Group
                className={`mb-3 ${!readinessDate && "error-valid"}`}
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
                        // placeholder="Select Estimated AW Readiness"
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
              <Form.Group className="mb-4" controlId="il.SelectMultiple">
                <Form.Label>IL</Form.Label>
                <div>
                  <Form.Control value={iL} onChange={handleIL}></Form.Control>
                </div>
              </Form.Group>
            </Row>
            <Row>
              <Form.Group className={PMAlert ? "error-text" : ""}>
                <Form.Label className={PMAlert ? "error-text" : ""}>
                  PM <sup>*</sup>
                </Form.Label>
                <div>
                  <Form.Select
                    value={pm}
                    onChange={handlePM}
                    disabled={mode === "create" && true}
                  >
                    <option value="">Select PM</option>
                    {PMValues.map((r) => (
                      <option key={r.label} value={r.value}>
                        {r.value}
                      </option>
                    ))}
                  </Form.Select>
                </div>
              </Form.Group>
            </Row>
          </Col>
          <Col>
            <Row>
              <Form.Group className="mb-4" controlId="comments.ControlInput1">
                <Form.Label>Comments</Form.Label>
                <textarea
                  type="text"
                  style={{ height: "108px" }}
                  className="form-control"
                  placeholder="Add Comments"
                  onChange={(e) => setComments(e.target.value)}
                  value={comments}
                />
              </Form.Group>
            </Row>
            <Row>
              <Form.Group
                className="mb-4"
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
                        {pt.name}
                      </option>
                    ))}
                  </Form.Select>
                </div>
              </Form.Group>
            </Row>
            <Row>
              <Form.Group className="mb-3" controlId="bve.SelectMultiple">
                <Form.Label>
                  {(region?.code === "EUF" || region?.code === "EUE") &&
                    bu === "BBY" &&
                    "Tier"}
                  {(region?.code === "EUF" || region?.code === "EUE") &&
                    bu === "HC" &&
                    "Production Strategy"}
                </Form.Label>
                <div>
                  {(region?.code === "EUF" || region?.code === "EUE") &&
                    bu === "BBY" && (
                      <Form.Select
                        {...register("Teir", { required: false })}
                        placeholder="Select Teir"
                        onChange={handleTierChange}
                      >
                        <option value="">Select Tier</option>
                        {Tier.map((tier) => (
                          <option key={tier.code} value={tier.code}>
                            {tier.name}
                          </option>
                        ))}
                      </Form.Select>
                    )}
                  {(region?.code === "EUF" || region?.code === "EUE") &&
                    bu === "HC" && (
                      <Form.Select
                        {...register("Production Strtegy", { required: false })}
                        placeholder="Select PS"
                        onChange={handlePsChange}
                      >
                        <option value="">Select Production Strategy</option>
                        {ProductionStrategy.map((ps) => (
                          <option key={ps.code} value={ps.code}>
                            {ps.name}
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
            className="button-layout"
            variant="secondary"
            onClick={onSaveAsDraft}
          >
            Save as draft
          </Button>
          <Button
            className="button-layout draft-button"
            disabled={!formValid}
            type="submit"
          >
            Submit
          </Button>
        </div>
      </Form>
    </div>
  );
}
export default AddProject;
