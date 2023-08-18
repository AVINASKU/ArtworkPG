export const projectData = {
  success: true,

  project: {
    calendar: "general",
    startDate: "2023-08-14",
    hoursPerDay: 24,
    daysPerWeek: 5,
    daysPerMonth: 20,
  },

  calendars: {
    rows: [
      {
        id: "general",
        name: "General",
        intervals: [
          {
            recurrentStartDate: "on Sat at 0:00",
            recurrentEndDate: "on Mon at 0:00",
            isWorking: false,
          },
        ],
        expanded: true,
        children: [
          {
            id: "business",
            name: "Business",
            intervals: [
              {
                recurrentStartDate: "every weekday at 12:00",
                recurrentEndDate: "every weekday at 13:00",
                isWorking: false,
              },
              {
                recurrentStartDate: "every weekday at 17:00",
                recurrentEndDate: "every weekday at 08:00",
                isWorking: false,
              },
            ],
          },
          {
            id: "night",
            name: "Night shift",
            intervals: [
              {
                recurrentStartDate: "every weekday at 6:00",
                recurrentEndDate: "every weekday at 22:00",
                isWorking: false,
              },
            ],
          },
        ],
      },
    ],
  },

  tasks: {
    rows: [
      {
        id: 1000,
        name: "Design",
        percentDone: 80,
        startDate: "2023-08-11",
        expanded: true,
        state: "In-Progress",
        children: [
          {
            id: "DDI_Task-1440",
            name: "Define Design Intent",
            startDate: "2023-08-14",
            duration: 5,
            state: "Complete",
            percentDone: 100,
            rollup: true,
            expanded: true,
          },
          {
            id: "UADI",
            name: "Upload Approved Design Intent",
            percentDone: 60,
            // startDate: "2023-08-18",

            // rollup: true,
            expanded: true,
            children: [
              {
                id: "UADI_Task-2728",
                name: "DI_agencyref1_Comet Professional_Category_testGantt_designCluster1_addinfo",
                percentDone: 100,
                startDate: "2023-08-16",

                // rollup: true,
                duration: 5,
                state: "Complete",
                // cost: 500,
              },
              {
                id: "UADI_Task-2729",
                name: "DI_agencyref2_Comet Professional_Category_testGantt_designCluster2_addInfo",
                percentDone: 100,
                startDate: "2023-08-21",
                // rollup: true,
                duration: 5,
                state: "Complete",
                // cost: 1000,
              },
            ],
          },
          {
            id: "DDT_Task-1289",
            name: "Define Regional Design Template",
            percentDone: 20,
            startDate: "2023-08-14",
            duration: 5,
            state: "Complete",
            expanded: true,
          },
          {
            id: "URDT",
            name: "Upload Regional Design Template",
            percentDone: 60,
            startDate: "2023-09-04",
            expanded: true,
            children: [
              {
                id: "URDT_Task-2187",
                name: "DT_defineRDTregional_Comet Professional_Baby Care Adjacencies_testGantt_defineRDTCluster_defineRDTInf.",
                percentDone: 100,
                duration: 5,
                state: "In-Progress",
                startDate: "2023-09-04",
                cost: 8000,
              },
            ],
          },
          {
            id: "ARDT",
            name: "Approve Regional Design Template",
            percentDone: 60,
            startDate: "2023-09-04",
            expanded: true,
            children: [
              {
                id: "ARDT_Task-3984",
                name: "DT_defineRDTregional_Comet Professional_Baby Care Adjacencies_testGantt_defineRDTCluster_defineRDTInf.",
                percentDone: 100,
                duration: 5,
                state: "Awaiting",
                startDate: "2023-09-04",
                cost: 8000,
              },
            ],
          },
          {
            id: "CPPFA_Task-3033",
            name: "Confirm Preliminary Print Feasibility Assessment",
            percentDone: 60,
            duration: 5,
            state: "Awaiting",
            startDate: "2023-09-04",
            expanded: true,
          },
          {
            id: "DNPF_Task-1298",
            name: "Define New Print Feasibility Scope",
            percentDone: 60,
            startDate: "2023-09-04",
            expanded: true,
          },
          {
            id: "CCD",
            name: "Confirm New Print Feasibility Scope",
            percentDone: 60,
            startDate: "2023-09-04",
            expanded: true,

            children: [
              {
                id: "CCD_Task-550",
                name: "CD_ZRP PRINTING KUNSHAN COMPANY~15220431_Silk Screen_Synthetic Materials-Oils_Comet_Baby Care Adjacencies_test azure_info",
                percentDone: 100,
                duration: 5,
                startDate: "2023-09-04",

                cost: 8000,
              },
              {
                id: "CCD_Task-551",
                name: "CD_ZHONGYONG PRODUCTS OF PAPER~15024557_Primography_Plastics-Thermoplastics-POM-Acetal_Comet_Baby Care Adjacencies_test azure_info",
                percentDone: 100,
                duration: 5,
                startDate: "2023-09-04",

                cost: 8000,
              },
            ],
          },
          {
            id: "CPT",
            name: "Confirm Print Trial",
            percentDone: 60,
            startDate: "2023-09-04",
            expanded: true,

            children: [
              {
                id: "CPT_Task-342",
                name: "CD_ZRP PRINTING KUNSHAN COMPANY~15220431_Silk Screen_Synthetic Materials-Oils_Comet_Baby Care Adjacencies_test azure_info",
                percentDone: 100,
                duration: 5,
                startDate: "2023-09-04",

                cost: 8000,
              },
            ],
          },
          {
            id: "DNIQ_Task-951",
            name: "Define Ink Qualification",
            percentDone: 60,
            startDate: "2023-09-04",
            duration: 5,
            expanded: true,
          },
          {
            id: "CNIQ",
            name: "Confirm New Ink Qualification",
            percentDone: 60,
            startDate: "2023-09-04",
            expanded: true,

            children: [
              {
                id: "CNIQ_Task-1050",
                name: "IQ_pantoneOne_ZRP PRINTING KUNSHAN COMPANY~15220431_Comet Professional_Baby Care Adjacencies_testGantt_InfoOn",
                percentDone: 100,
                duration: 5,
                startDate: "2023-09-04",

                cost: 8000,
              },
              {
                id: "CNIQ_Task-1051",
                name: "IQ_PantoneTwo_ZOBELE BULGARIA EOOD~15220718_Comet Professional_Baby Care Adjacencies_testGantt_InfoTw",
                percentDone: 100,
                duration: 5,
                startDate: "2023-09-04",

                cost: 8000,
              },
            ],
          },
        ],
      },
      {
        id: 2000,
        name: "Input",
        percentDone: 50,
        startDate: "2023-08-14",
        expanded: true,
        task: "123",
        children: [
          {
            id: "SAA_Task-2422",
            name: "Start Artwork Alignment",
            percentDone: 50,
            duration: 10,
            startDate: "2023-08-14",
            rollup: true,

            expanded: true,
          },
          {
            id: "DM_Task-2422",
            name: "Dependency Mapping",
            percentDone: 50,
            duration: 10,
            startDate: "2023-08-14",
            rollup: true,

            expanded: true,
          },
          {
            id: "UBD_Task-751",
            name: "Upload Briefing documents",
            percentDone: 50,
            duration: 10,
            startDate: "2023-08-14",
            rollup: true,

            expanded: true,
          },
          {
            id: "ACIC_Task-1119",
            name: "Approve CIC",
            percentDone: 50,
            duration: 10,
            startDate: "2023-08-14",
            rollup: true,

            expanded: true,
          },
          {
            id: "UCIC_Task-378",
            name: "Upload CIC",
            percentDone: 50,
            duration: 10,
            startDate: "2023-08-14",
            rollup: true,

            expanded: true,
          },
        ],
      },
    ],
  },

  dependencies: {
    rows: [
      {
        id: 1,
        fromTask: "DDI_Task-1440",
        toTask: "UADI_Task-2728",
        lag: 2,
      },
      {
        id: 2,
        fromTask: "DDI_Task-1440",
        toTask: "UADI_Task-2729",
      },
      {
        id: 3,
        fromTask: "UADI_Task-2728",
        toTask: "DDT_Task-1289",
      },
      {
        id: 4,
        fromTask: "UADI_Task-2729",
        toTask: "DDT_Task-1289",
      },
      {
        id: 5,
        fromTask: "DDT_Task-1289",
        toTask: "URDT_Task-2187",
      },
      {
        id: 7,
        fromTask: "URDT_Task-2187",
        toTask: "ARDT_Task-3984",
      },
      {
        id: 8,
        fromTask: "ARDT_Task-3984",
        toTask: "DNPF_Task-1298",
      },
      {
        id: 9,
        fromTask: "CPPFA_Task-3033",
        toTask: "DNPF_Task-1298",
      },
      {
        id: 10,
        fromTask: "DNPF_Task-1298",
        toTask: "CCD_Task-550",
      },
      {
        id: 11,
        fromTask: "DNPF_Task-1298",
        toTask: "CCD_Task-551",
      },
      {
        id: 12,
        fromTask: "CCD_Task-550",
        toTask: "CPT_Task-342",
      },
      {
        id: 13,
        fromTask: "CPPFA_Task-3033",
        toTask: "DNIQ_Task-951",
      },
      {
        id: 15,
        fromTask: "DNIQ_Task-951",
        toTask: "CNIQ_Task-1050",
      },
      {
        id: 16,
        fromTask: "DNIQ_Task-951",
        toTask: "CNIQ_Task-1051",
      },
    ],
  },

  resources: {
    rows: [
      {
        id: 1,
        name: "Izabela",
        city: "New York",
        calendar: null,
        image: "iza.jpg",
      },
      {
        id: 2,
        name: "Karol",
        city: "London",
        calendar: null,
        image: "karol.jpg",
      },
      {
        id: 3,
        name: "Luca",
        city: "New York",
        calendar: null,
        image: "luca.jpg",
      },
      {
        id: 4,
        name: "Cherry",
        city: "Barcelona",
        calendar: null,
        image: "cherry.jpg",
      },
      {
        id: 5,
        name: "Nora",
        city: "Rome",
        calendar: "business",
        image: "nora.jpg",
      },
      {
        id: 6,
        name: "Gabriel",
        city: "Barcelona",
        calendar: "night",
        image: "gabriel.jpg",
      },
    ],
  },

  assignments: {
    rows: [
      { id: 1, event: "DDI_Task-1440", resource: 1 },
      { id: 2, event: "UADI_Task-2728", resource: 2 },
      { id: 3, event: "UADI_Task-2729", resource: 2 },
      { id: 4, event: "DDT_Task-1289", resource: 3 },
      { id: 5, event: "URDT_Task-2187", resource: 4 },
      { id: 6, event: "ARDT_Task-3984", resource: 5 },
      { id: 7, event: "DNPF_Task-1298", resource: 6 },
      { id: 8, event: "CPPFA_Task-3033", resource: 1 },
      { id: 9, event: "CCD_Task-550", resource: 2 },
      { id: 10, event: "CCD_Task-551", resource: 2 },
      { id: 11, event: "CPT_Task-342", resource: 2 },
      { id: 12, event: "CNIQ_Task-1050", resource: 3 },
      { id: 13, event: "DNIQ_Task-951", resource: 3 },
      { id: 14, event: "CNIQ_Task-1051", resource: 3 },
    ],
  },

  timeRanges: {
    rows: [
      {
        id: 1,
        name: "Important date",
        startDate: "2023-08-30",
        duration: 0,
        durationUnit: "d",
        cls: "b-fa b-fa-diamond",
      },
    ],
  },
};
