import React, { useState, useEffect, useMemo } from "react";
import { Form, Row, Col, Button } from "react-bootstrap";
import { MultiSelect } from "primereact/multiselect";
import { Calendar } from "primereact/calendar";
import { Controller, useForm } from "react-hook-form";
import { classNames } from "primereact/utils";
import { useNavigate } from "react-router-dom";
import {
  createProjectSaveAsDraft,
  createProjectSubmit,
} from "../../../apis/projectSetup";
// import moment from "moment";
import "./index.scss";
import {
  businessUnits,
  categories,
  regionList,
  designScope,
  scaleList,
  projectType,
  brandList,
  ProductionStrategy,
  Tier,
} from "../../../categories";
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
  PRA: false,
  PF: false,
  IQ: false,
  CICs: false,
};

function AddProject(props) {
  const navigate = useNavigate();
  const { status } = props;
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
  const [pm, setPm] = useState("Guillaume");
  const [iL, setIl] = useState("Highway");
  const [checkedItems, setCheckedItems] = useState(defaultCheckedItems);
  const [textBoxEnabled, setTextBoxEnabled] = useState(defaultTextBoxEnabled);
  const [POA, setPOA] = useState("1");
  const [designScopeList, setDesignScopeList] = useState({
    DI: "",
    DT: "",
    PRA: "",
    PF: "",
    IQ: "",
    CICs: "",
  });
  const [scale, setScale] = useState([]);
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
    // console.log("selectedSmoOptions:", selectedSmoOptions);
    return selectedSmoOptions;
  };

  const getProjectBrand = () => {
    const selectedBrandOptions = [];
    // console.log("brand:", brand);

    brand.forEach((obj) => {
      let temp = {};
      temp.instruction = "APPEND";
      temp.target = "ProjectBrand";
      temp.content = obj;
      selectedBrandOptions.push(temp);
    });
    // console.log("selectedBrandOptions:", selectedBrandOptions);
    return selectedBrandOptions;
  };

  const getProjectCategory = () => {
    const selectedCategoriesOptions = [];
    // console.log("subCategories:", subCategories);

    subCategories.forEach((obj) => {
      let temp = {};
      temp.instruction = "APPEND";
      temp.target = "ProjectCategory";
      temp.content = obj;
      selectedCategoriesOptions.push(temp);
    });
    // console.log("selectedCategoriesOptions:", selectedCategoriesOptions);
    return selectedCategoriesOptions;
  };

  const getProjectCode = () => {
    const projName = getValues("projectType");
    let projCode;
    projectType.map((pt) => {
      if (pt.name === projName) {
        projCode = pt.code;
      }
    });
    return projCode || "";
  };

  const handleRegionChange = (e) => {
    const selectedRegion = regionList.find((r) => r.code === e.target.value);
    setRegion(selectedRegion);
    setSmo(null);
  };

  const smoOptions = getSmoOptions();

  const handleBuChange = (e) => {
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
  // console.log("subCategoriesOptions: ", subCategoriesOptions);

  useEffect(() => {
    bu &&
      businessUnits.map((obj) => {
        if (obj.code === bu) {
          setSubCategoriesOptions(obj.categories);
        }
      });
  }, [bu, businessUnits]);

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
        if (isChecked && checkedItems.PRA) {
          setCheckedItems((prevCheckedItems) => ({
            ...prevCheckedItems,
            PRA: false,
          }));
          setTextBoxEnabled((prevTextBoxEnabled) => ({
            ...prevTextBoxEnabled,
            PRA: false,
          }));
        }
        break;
      case "PRA":
        // when Production Ready Art is selected, user cannot select DT
        if (isChecked && checkedItems.DT) {
          setCheckedItems((prevCheckedItems) => ({
            ...prevCheckedItems,
            DT: false,
          }));
          setTextBoxEnabled((prevTextBoxEnabled) => ({
            ...prevTextBoxEnabled,
            DT: false,
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
    PM: "Guillaume",
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
      getValues("projectName") !== "" &&
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

  const collectFormData = (status) => {
    const ProjectSMO = getProjectSMO();
    const ProjectCategory = getProjectCategory();
    const ProjectBrand = getProjectBrand();
    const ProjectCode = getProjectCode();

    const formData = {
      caseTypeID: "PG-AAS-Work-ArtworkProject",
      content: {
        BU: bu,
        Comments: getValues("comments"),
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
        POAs: "true",
        Estimated_ofCICs: designScopeList.CICs.toString(),
        CICs: (designScopeList.CICs !== "").toString(),
        Estimated_ofPOAs: POA,
        Estimated_SOP: sopDate,
        Estimated_SOS: sosDate,
        Estimated_AW_Printer: printerDate,
        Estimated_AW_Readiness: readinessDate,
        IL: iL,
        tier: tier,
        InitiativeGroupName: getValues("groupName"),
        PM: pm,
        ProductionStrategy: ps,
        // Project_Brands: "V14", //
        // Project_Categories: "AIR", //
        Project_Scale: getValues("scale"),
        ProjectDescription: getValues("projectDescription"),
        ProjectName: getValues("projectName"),
        Project_region: region.name,
        Project_Code: ProjectCode,
        ProjectType: getValues("projectType"),
        Project_State: "",
        Buffer_To_Work: "",
        ProjectStatus: status,
      },
      pageInstructions: [...ProjectCategory, ...ProjectBrand, ...ProjectSMO],
    };
    return formData;
  };

  const onSubmit = () => {
    const formData = collectFormData("Active");
    console.log("form data", formData);
    setFormData(formData);
    if (status?.status === "new") {
      createProjectSubmit(formData);
    }
    navigate("/myProjects");
  };
  const onSaveAsDraft = () => {
    const draftFormData = collectFormData("Draft");
    console.log("draft form data", draftFormData);
    localStorage.setItem("formDraft", JSON.stringify(draftFormData));
    //API call to be added
    if (status?.status === "new") {
      createProjectSaveAsDraft(draftFormData);
    }
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
      <Form onSubmit={handleSubmit(onSubmit)}>
        <Row>
          <Col>
            <Form.Group
              className={`mb-3 ${errors.projectName && "error-valid"}`}
              controlId="projectName.ControlInput1"
            >
              <Form.Label>Project Name * </Form.Label>
              <Form.Control
                type="text"
                placeholder="Enter Project Name"
                {...register("projectName", { required: true })}
                required
              />
              {errors.projectName && (
                <span className="error-text">Field Remaining</span>
              )}
            </Form.Group>
          </Col>
          <Col>
            <Form.Group
              className={`mb-3 ${bu === "" && "error-valid"}`}
              controlId="bu.SelectMultiple"
            >
              <Form.Label>Business Unit*</Form.Label>
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
              {bu === "" && <span className="error-text">Field Remaining</span>}
            </Form.Group>
          </Col>
          <Col>
            <Form.Group controlId="projectType.SelectMultiple">
              <Form.Label>PM *</Form.Label>
              <div>
                <Form.Control
                  value={pm}
                  onChange={handlePM}
                  disabled
                ></Form.Control>
              </div>
            </Form.Group>
          </Col>
          <Col>
            {" "}
            <Form.Group className={`mb-3`} controlId="sop.readiness">
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
                      minDate={sopDate !=='' ? sopDate: minDate}
                      maxDate={sosDate}
                      className={classNames({
                        "p-invalid": fieldState.error,
                      })}
                    />
                  </>
                )}
              />
            </Form.Group>
          </Col>
        </Row>
        <Row>
          <Col>
            <Form.Group className={`mb-3`} controlId="groupName.ControlInput1">
              <Form.Label>Initiative Group Name</Form.Label>
              <Form.Control
                type="text"
                placeholder=""
                {...register("groupName")}
              />
            </Form.Group>
          </Col>
          <Col>
            <Form.Group
              controlId="scale.category"
              className="mb-3"
              // className={`mb-3 ${
              //   selectedCities && !selectedCities.length && "error-valid"
              // }`}
            >
              <Form.Label>Category</Form.Label>
              <MultiSelect
                value={subCategories}
                onChange={handleSubCategoryChange}
                options={subCategoriesOptions}
                optionLabel="name"
                filter
                placeholder="Select Categories"
                className="w-full md:w-20rem"
              />
            </Form.Group>
          </Col>
          <Col>
            <Form.Group controlId="il.SelectMultiple">
              <Form.Label>Scope and Estimated Numbers</Form.Label>
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
                          setDesignScopeList((prevDesignScopeList) => ({
                            ...prevDesignScopeList,
                            [option.value]: parseInt(e.target.value),
                          }));
                        }}
                        disabled={!textBoxEnabled[option.value]}
                        style={{
                          width: 40,
                          height: 27,
                          paddingLeft: "5px",
                          paddingRight: 0,
                          fontSize: "10px",
                          marginRight: "10px",
                        }}
                      />
                    )}
                  </span>
                ))}
                <span style={{ display: "flex" }}>
                  <Form.Check
                    label="Final AW"
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
                    onChange={(e) => setPOA(e.target.value)}
                    // disabled={!textBoxEnabled[option.value]}
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
          </Col>

          <Col>
            <Form.Group className="mb-3" controlId="sop.readiness">
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
                      minDate={sosDate !==''? sosDate: minDate}
                      style={{ width: 208 }}
                      className={classNames({
                        "p-invalid": fieldState.error,
                      })}
                    />
                  </>
                )}
              />
            </Form.Group>
          </Col>
        </Row>
        <Row>
          <Col>
            <Form.Group
              className="mb-3"
              controlId="projectDescription.ControlInput1"
            >
              <Form.Label>Project Description</Form.Label>
              <Form.Control
                as="textarea"
                style={{ height: "114px", position: "absolute" }}
                // style={{ height: "5rem" }}
                placeholder="Add Project description"
                {...register("projectDescription", { required: false })}
              />
            </Form.Group>
          </Col>
          <Col>
            <Form.Group
              className={`mb-3 ${brand.length < 1 && "error-valid"}`}
              controlId="brand.SelectMultiple"
            >
              <Form.Label>Brand *</Form.Label>
              <div>
                <MultiSelect
                  value={brand}
                  onChange={(e) => setBrand(e.value)}
                  options={brandList}
                  optionLabel="Brand_Name"
                  filter
                  placeholder="Select Brand"
                  className="w-full md:w-20rem"
                  // style={{ marginBottom: "12px" }}
                  required
                />
              </div>
              {brand.length < 1 && (
                <span className="error-text">Field Remaining</span>
              )}
            </Form.Group>
          </Col>
          <Col></Col>
          <Col>
            {" "}
            <Form.Group className="mb-3" controlId="comments.ControlInput1">
              <Form.Label>Comments</Form.Label>
              <Form.Control
                as="textarea"
                style={{ height: 94, position: "absolute", width: 208 }}
                placeholder="Add Comments"
                {...register("comments", { required: false })}
              />
            </Form.Group>
          </Col>
        </Row>
        <Row>
          <Col></Col>
          <Col>
            <Form.Group className="mb-3" controlId="bve.SelectMultiple">
              <Form.Label>Scale </Form.Label>
              <div>
                <Form.Select
                  // value={scale}
                  // onChange={(e) => setScale(e.target.value)}
                  {...register("scale", { required: false })}
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
          </Col>
        </Row>
        <Row>
          <Col>
            <Form.Group controlId="clustor.SelectMultiple">
              <Form.Label>Clustor</Form.Label>
              <div>
                <Form.Select
                  // value={selectedCities}
                  // onChange={(e) => setSelectedCities(e.value)}
                  {...register("clustor", { required: false })}
                  placeholder="Select Scale"
                >
                  <option value="" style={{ maxWidth: "208px" }}>
                    Select Clustor
                  </option>

                  <option value="clustor1">Clustor1</option>
                </Form.Select>
              </div>
            </Form.Group>
          </Col>
          <Col>
            <Form.Group className="mb-3" controlId="bve.SelectMultiple">
              <Form.Label>
                {(region?.code === "EUF" || region?.code === "EUE") &&
                  bu === "BABY" &&
                  "Tier"}
                {(region?.code === "EUF" || region?.code === "EUE") &&
                  bu === "HC" &&
                  "Production Strategy"}
              </Form.Label>
              <div>
                {(region?.code === "EUF" || region?.code === "EUE") &&
                  bu === "BABY" && (
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
          </Col>
        </Row>
        <Row>
          <Col>
            <Form.Group
              className={`mb-3 ${
                (!region || Object.keys(region).length < 1) && "error-valid"
              }`}
              controlId="smo.SelectMultiple"
            >
              <Form.Label>Region *</Form.Label>
              <div>
                <Form.Select
                  value={region?.code || ""}
                  onChange={handleRegionChange}
                  placeholder="Select Region"
                >
                  <option value="">Select Region</option>
                  {regionList.map((r) => (
                    <option key={r.code} value={r.code}>
                      {r.name}
                    </option>
                  ))}
                </Form.Select>
              </div>
              {(!region || Object.keys(region).length < 1) && (
                <span className="error-text">Field Remaining</span>
              )}
            </Form.Group>
          </Col>
          <Col>
            <Form.Group controlId="projectType.SelectMultiple">
              <Form.Label>Project Type</Form.Label>
              <div>
                <Form.Select
                  // value={selectedCities}
                  // onChange={(e) => setSelectedCities(e.value)}
                  {...register("projectType", { required: false })}
                  placeholder="Select Project Type"
                >
                  <option value="">Select Project Type</option>
                  {projectType.map((pt) => (
                    <option key={pt.code} value={pt.name}>
                      {pt.name}
                    </option>
                  ))}
                </Form.Select>
              </div>
            </Form.Group>
          </Col>
          <Col>
            <Form.Group
              className={`mb-3 ${!readinessDate && "error-valid"}`}
              controlId="sop.readiness"
            >
              <Form.Label>Estimated AW Readiness *</Form.Label>
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
                      minDate={readinessDate !==''? readinessDate: minDate}
                      maxDate={printerDate}
                      className={classNames({
                        "p-invalid": fieldState.error,
                      })}
                    />
                  </>
                )}
              />
              {!readinessDate && (
                <span className="error-text">Field Remaining</span>
              )}
            </Form.Group>
          </Col>
        </Row>
        <Row>
          <Col>
            <Form.Group
              className={`mb-3 ${(!smo || smo?.length < 1) && "error-valid"}`}
              controlId="smo.SelectMultiple"
            >
              <Form.Label>SMO *</Form.Label>
              <div>
                <MultiSelect
                  value={smo}
                  onChange={(e) => setSmo(e.value)}
                  options={smoOptions}
                  optionLabel="label"
                  filter
                  placeholder="Select SMO"
                  className="w-full md:w-20rem"
                  required={!!region}
                  disabled={!region}
                />
              </div>
              {(!smo || smo?.length < 1) && (
                <span className="error-text">Field Remaining</span>
              )}
            </Form.Group>
          </Col>
          <Col>
            {" "}
            <Form.Group controlId="projectType.SelectMultiple">
              <Form.Label>IL</Form.Label>
              <div>
                <Form.Control value={iL} onChange={handleIL}></Form.Control>
              </div>
            </Form.Group>
          </Col>

          <Col>
            <Form.Group
              className={`mb-3 ${!printerDate && "error-valid"}`}
              controlId="sop.readiness"
            >
              <Form.Label>Estimated AW@Printer *</Form.Label>
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
                      minDate={printerDate !==''? printerDate: minDate}
                      maxDate={sopDate}
                      className={classNames({
                        "p-invalid": fieldState.error,
                      })}
                    />
                  </>
                )}
              />
              {!printerDate && (
                <span className="error-text">Field Remaining</span>
              )}
            </Form.Group>
          </Col>
        </Row>
        <Row>
          <Col></Col>
        </Row>
        <Row className="form-buttons">
          <Button
            className="button-layout submit-button"
            onClick={() => {
              navigate("/myProjects");
            }}
          >
            Cancel
          </Button>
          <Button
            className="button-layout submit-button"
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
        </Row>
      </Form>
    </div>
  );
}
export default AddProject;
