import React from "react";
import { render, waitFor } from "@testing-library/react";
import { useSelector } from "react-redux";
import MyProjects from "../../components/Projects/MyProjects/index";

// Mock the useSelector function
jest.mock("react-redux", () => ({
  useSelector: jest.fn(),
}));

// Mock your service and utils if needed
jest.mock("../../../service/PegaService", () => ({
  ProjectService: {
    getProjectData: jest.fn(),
  },
}));

// Mock the hasAllAccess utility function
jest.mock("../../../utils", () => ({
  hasAllAccess: jest.fn(),
}));

describe("MyProjects Component", () => {
  it("renders unauthorized message for users without all access", () => {

    const { getByText } = render(<MyProjects />);

    expect(getByText("You are not authorized to access this page.")).toBeInTheDocument();
  });

  it("renders project list for users with all access", async () => {
    useSelector.mockReturnValueOnce({
      UserReducer: {
        userInformation: {
          role: "admin", // Set the role here as needed
        },
      },
      accessMatrixReducer: {
        accessMatrix: {},
      },
    });

    const mockProjectData = [
      // Mock project data here
    ];

    // Mock the ProjectService.getProjectData function
    jest.spyOn(ProjectService, "getProjectData").mockResolvedValueOnce(mockProjectData);

    const { getByText } = render(<MyProjects />);

    await waitFor(() => {
      expect(getByText("My Projects")).toBeInTheDocument();
      // You can add more assertions here based on your UI
    });
  });
});
