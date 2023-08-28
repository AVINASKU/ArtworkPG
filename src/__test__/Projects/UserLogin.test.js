import React from "react";
import { MemoryRouter,useNavigate} from "react-router-dom";
import { updateUser } from "../../apis/userApi";
import "./index.scss";
import UserLogin from "../../components/UserLogin"
import { fireEvent, render, screen, act, waitFor } from "@testing-library/react";
import { store } from "../../store/store"
import { Provider } from "react-redux"
import { userUpdateAction } from "../../store/actions/userActions";

jest.mock("react-router-dom", () => ({
    ...jest.requireActual("react-router-dom"),
    useNavigate: () => jest.fn(),
}))

// jest.mock("../../apis/userApi", () => ({
//     updateUser: () => jest.fn()
// }))

describe("UserLogin Component", () => {
    it("Renders the login form", async () => {
        render(<Provider store={store}><MemoryRouter initialEntries={["/login"]}>
            <UserLogin />
        </MemoryRouter>
        </Provider>);
        screen.debug();


        //assert control on page
        expect(screen.getByRole('heading')).toHaveTextContent('Welcome!');
        expect(screen.getByRole("button")).toBeInTheDocument();
        expect(screen.getByRole("textbox", { name: /username/i })).toBeInTheDocument();
        expect(screen.getByLabelText(/password/i)).toBeInTheDocument();


    });

    it("handles invalid login", async () => {
        render(<Provider store={store}>
            <MemoryRouter initialEntries={["/login"]}>
                <UserLogin />
            </MemoryRouter>
        </Provider>);

        fireEvent.click(screen.getByRole("button", { name: /login/i }));

        await act(async () => {

            // Mock the updateUser function behavior
            //updateUser.mockResolvedValue(true); // Adjust this as needed
            const infoUpdated = await updateUser("","");
            const userInformation ={}
            await store.dispatch(userUpdateAction(userInformation));
            console.log(infoUpdated);
        });
        await waitFor(() => {
            expect(screen.queryByText(/CREDENTIALS INVALID!/i)).toBeInTheDocument();
        })
    });

    it("handles login successfully", async () => {
        render(<Provider store={store}>
            <MemoryRouter initialEntries={["/login"]}>
                <UserLogin />
            </MemoryRouter>
        </Provider>);

        expect(screen.getByRole("heading")).toHaveTextContent("Welcome!");
        expect(screen.getByRole("textbox", { name: /username/i })).toBeInTheDocument();
        expect(screen.getByLabelText(/password/i)).toBeInTheDocument();
        expect(screen.getByRole("button", { name: /login/i })).toBeInTheDocument();

        //mock value
        const username = "Izabela";
        const password = "iza123";

        fireEvent.change(screen.getByLabelText(/username/i), { target: { value: username } })
        fireEvent.change(screen.getByLabelText(/username/i), { target: { value: password } })
        fireEvent.click(screen.getByRole("button", { name: /login/i }));

        await act(async () => {
            const infoUpdated = await updateUser(username, password);
            console.log(infoUpdated);
        });

        await waitFor(() => {
            //expect(updateUser).toHaveBeenCalledWith(username,password);
            expect(screen.queryByText(/CREDENTIALS INVALID!/i)).not.toBeInTheDocument();
        })
        //navigate("/roles");

    });

})