import React from "react";
import "./Table.scss";
import { RoleUser } from "../../userRole";
import { slice } from "lodash";

// const users = [
//   { username: "Izabela", password: "iza123" },
//   { username: "Karol", password: "karol123" },
//   { username: "Luca", password: "luca123" },
//   { username: "Cherry", password: "cheryy123" },
//   { username: "Hemant", password: "hemant123" },
// ];

function Table() {
  return (
    <div className="table-container">
      <h6>"Use this username and password for testing"</h6>
      <table className="my-table">
        <thead>
          <tr>
            <th>Username</th>
            <th>Password</th>
          </tr>
        </thead>
        <tbody>
          {RoleUser.users?.slice(0, 6).map((user) => (
            <tr key={user.userid}>
              <td>{user.username}</td>
              <td>{user.password}</td>
              {/* <td>{user.userid}</td>
              <td>{user.role}</td>
              <td>{user.bu}</td>
              <td>{user.region}</td>
              <td>{user.permissions.join(", ")}</td> */}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

//
export default Table;
