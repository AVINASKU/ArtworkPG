import axios from "axios";
// import App from "../App";
// import { userUpdateAction } from "../store/actions/user";

export default class Api {
  constructor() {
    this.axiosInstace = axios.create();
  }
  async init({ headers = {} } = {}) {
    //interceptors request
    this.axiosInstace.interceptors.request.use(async (config) => {
      if (Object.keys(headers).length) {
        config.headers[headers.key] =
          headers.key === "If-Match" ? `"${headers.value}"` : headers.value;
      }
      return config;
    });

    //interceptors response
    this.axiosInstace.interceptors.response.use(
      (config) => {
        //validate response
        return config;
      },
      (error) => {
        //error;
      }
    );
    return this.axiosInstace;
  }

  //   async generateToken() {
  //     const { user } = App.getStoreState();
  //     await this.getSSO();
  //     await this.getToken();
  //     this.getUserProfile()
  //   }

  //   async getSSO() {
  //     const { user } = App.getStoreState();
  //     if (user?.userInformation?.sso) {
  //       return user;
  //     } else {
  //       const { data: ssoRes } = await axios
  //         .get
  //         //any url to get sso
  //         ();
  //       App.dispatchToStore(userUpdateAction(ssoRes));
  //       return ssoRes;
  //     }
  //   }

  //   async getUserProfile() {
  //     const { token, user } = App.getStoreState();
  //     const form = new FormData();
  //     form.append('sso', user.userInformation.sso);
  //     form.append('first_name', user.userInformation.first_name);
  //     form.append('last_name', user.userInformation.last_name);
  //     form.append('role', user.userInformation.role);
  //     form.append('region', user.userInformation.region);

  //     let config = {
  //       url: `url to fetch profile details`,
  //       method: 'POST',
  //       data: form,
  //       headers: {
  //         Authorization: `Bearer ${token}`,
  //       },
  //     }

  //     const ins = await this.init();
  //     const { data: userProfileInfo } = await ins(config)
  //     App.dispatchToStore(userProfileAction(userProfileInfo));
  //     return userProfileInfo;
  //   }
}
