import axios from "axios";

const API_KEY = "AIzaSyDCYasArcOwcALFhIj2szug5aD2PgUQu1E";

interface AuthenticateRequest {
  email: string;
  password: string;
  returnSecureToken: boolean;
}

interface AuthenticateResponse {
  idToken: string;
  email: string;
  refreshToken: string;
  expiresIn: string;
  localId: string;
  registered?: boolean;
}

async function authenticate(
  mode: string,
  email: string,
  password: string
): Promise<AuthenticateResponse> {
  const url = `https://identitytoolkit.googleapis.com/v1/accounts:${mode}?key=${API_KEY}`;

  const requestData: AuthenticateRequest = {
    email: email,
    password: password,
    returnSecureToken: true,
  };

  const response = await axios.post<AuthenticateResponse>(url, requestData);

  console.log(response.data);
  return response.data;
}

export async function login(email: string, password: string) {
  await authenticate("signInWithPassword", email, password);
}
