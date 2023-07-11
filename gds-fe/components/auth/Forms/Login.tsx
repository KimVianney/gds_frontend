import {
  Box,
  Checkbox,
  Flex,
  Grid,
  Image,
  Text,
  useBoolean,
} from "@chakra-ui/react";
import axios from "axios";
import md5 from "crypto-js/md5";
import { ChangeEvent, useEffect, useReducer } from "react";
import { FaUserCircle } from "react-icons/fa";
import { MdEmail, MdLock } from "react-icons/md";
import { backendURL } from "../../../config/fe";
import { HttpError } from "../../../error";
import { RegisterResponse } from "../../../pages/api/register";
import { SignInResponse } from "../../../pages/api/sign-in";
import { UseAddPopup } from "../../../state/application/hooks";
import { UseLogin } from "../../../state/auth/hooks";
import { UseAddSession } from "../../../state/session/hooks";
import { UseAddUser } from "../../../state/user/hooks";
import { PopupType } from "../../../types/PopUp";
import CustomButton from "../../CustomButton";
import CustomLink from "../../Text/Link";
import CustomInput from "./CustomInput";
import { useRouter } from "next/router";
interface State {
  email: string;
  password: string;
  name: string;
  isValidEmail: boolean;
  isValidPassword: boolean;
  isValidFullName: boolean;
  error: string;
}
type Value = Partial<State>;
type Key = keyof State;

export const gravatar = (email: string) =>
  `https://www.gravatar.com/avatar/${md5(email).toString()}.jpg`;

const Login = () => {
  const router = useRouter();
  const [isRegistered, setIsRegistered] = useBoolean();
  const [agreesToTCs, setAgreesToTCs] = useBoolean();
  const [isLoading, setIsLoading] = useBoolean();

  const initialState = {
    email: "",
    password: "",
    name: "",
    isValidEmail: false,
    isValidPassword: false,
    isValidFullName: false,
    error: "",
  };
  const reducer = (state: State, value: Value) => ({ ...state, ...value });
  const [state, dispatch] = useReducer(reducer, initialState);

  const addPopup = UseAddPopup();

  const onChange = (key: Key) => (e: ChangeEvent<HTMLInputElement>) => {
    dispatch({ [key]: e.target.value });
  };

  const isValidEmail = (email: string) => {
    const re =
      /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(String(email).toLowerCase());
  };

  const isValidPassword = (password: string) => {
    const re = /^(?=.{8,}$)(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*\W).*$/;
    return re.test(String(password));
  };

  const isValidFullName = (name: string) => {
    const re = /^[a-zA-Z ]{2,30}$/;
    return re.test(String(name));
  };

  useEffect(() => {
    dispatch({ isValidEmail: !state.email || isValidEmail(state.email) });
  }, [state.email]);

  useEffect(() => {
    dispatch({
      isValidPassword: !state.password || isValidPassword(state.password),
    });
  }, [state.password]);

  useEffect(() => {
    dispatch({ isValidFullName: !state.name || isValidFullName(state.name) });
  }, [state.name]);

  const setSession = UseAddSession();
  const setUser = UseAddUser();
  const logIn = UseLogin();

  const onSubmit = async () => {
    console.log("Backend url: ", backendURL);
    setIsLoading.on();
    dispatch({ error: "" });
    const headers = {
      "Content-Type": "application/json",
    };
    try {
      if (!state.email) {
        throw new Error("Please enter an email");
      }
      if (!state.password) {
        throw new Error("Please enter a password");
      }
      if (isRegistered) {
        const body = JSON.stringify({
          email: state.email,
          password: state.password,
        });
        const response = await axios.post<SignInResponse>(
          `${backendURL}/auth/login/`,
          {
            email: state.email,
            password: state.password,
          },
          { headers }
        );

        // const response = await fetch(`${backendURL}/auth/login/`, {
        //   body,
        //   method: "POST",
        //   headers,
        // });
        const { status } = response;
        if (status === 200) {
          // const json = (await response.json()) as SignInResponse;
          const { user } = response.data;
          const res = response.data;
          console.log("res: ", res);
          setUser(user);
          setSession({
            status: "authenticated",
            data: {
              token: res.access_token,
            },
          });
          logIn();
        }
        if ([400, 500].includes(response.status)) {
          throw new HttpError(await response.statusText, response.status);
        }
        addPopup({
          content: {
            type: PopupType.success,
            title: "Successfully logged in 🚀",
            summary: "Welcome back",
          },
        });
        router.push("/manage");
      } else {
        if (!state.name) {
          throw new Error("Please enter your full name");
        }
        const body = JSON.stringify({
          email: state.email,
          password: state.password,
          first_name: state.name.split(" ")[0],
          last_name: state.name.split(" ")[1],
          avatar: gravatar(state.email),
        });
        const response = await fetch(`${backendURL}/auth/register/`, {
          body,
          method: "POST",
          headers,
        });
        if ([400, 500].includes(response.status)) {
          throw new HttpError(await response.text(), response.status);
        }
        const json = (await response.json()) as RegisterResponse;
        console.log("JSON_DATA: ", json);
        setUser(json.user);
        setSession({
          status: "authenticated",
          data: {
            token: json.access,
          },
        });
        logIn();
        addPopup({
          content: {
            type: PopupType.success,
            title: "Successfully registered 🚀",
            summary: "Your  GDS account is ready",
          },
        });
        router.push("/manage");
      }
    } catch (error) {
      let message = (error as Error).message;
      if (message.includes("lastName is a required field")) {
        message = "Please enter your last name";
      }
      if (message.includes("user with this email already exists")) {
        message = "User with this email already exists";
      }
      if (message.includes("Invalid credentials")) {
        message = "Invalid username or password";
      }
      if (message.includes("email is a required field")) {
        message = "Email address cannot be left blank";
      }
      if (message.includes("password must be at least 8 characters")) {
        message =
          "password must be at least 8 characters, containg a lowercase letter, an uppercase letter and a symbol";
      }
      if (message.includes("email must be a valid email")) {
        message = "Please enter a valid email address";
      }
      addPopup({
        content: {
          type: PopupType.error,
          title: "Validation error",
          summary: message,
        },
      });
      // dispatch({ error: message });
    } finally {
      setIsLoading.off();
    }
  };

  return (
    <Grid
      templateColumns={{ lg: "repeat(2, 1fr)" }}
      gap="0"
      bg="brand.spaceCadet"
      borderRadius={{ base: "1rem", md: "2rem", lg: "4rem" }}
    >
      <Image
        src="/20211107_170648.jpg"
        h="full"
        borderTopLeftRadius={{ base: "1rem", md: "2rem", lg: "4rem" }}
        borderBottomLeftRadius={{ lg: "4rem" }}
        borderTopRightRadius={{ base: "1rem", md: "2rem", lg: "0" }}
      />
      <Flex
        px={{ base: "1rem", md: "2rem", xl: "4rem" }}
        py={{ base: "1rem", md: "2rem", xl: "4rem" }}
        flexDir="column"
        alignItems="center"
        justifyContent="center"
        fontSize={{ xl: "1.2rem" }}
      >
        <Box minW={{ lg: "29.343rem" }}>
          <Text
            fontWeight="bold"
            fontSize={{
              base: "1.5rem",
              md: "2rem",
              xl: "3rem",
            }}
          >
            {!isRegistered ? "Get started" : "Welcome back"}
          </Text>
          <Box my={{ base: "0.5rem", xl: "1rem" }}>
            <Text display="inline" textColor="brand.coolGrey">
              {!isRegistered ? "Already" : "Don't"} have an account?{" "}
            </Text>
            <CustomLink
              label={!isRegistered ? "Log In" : "Register"}
              props={{ display: "inline" }}
              onClick={setIsRegistered[isRegistered ? "off" : "on"]}
            />
          </Box>
          {state.error && (
            <Text color="red.500" fontSize="sm" maxW="460px">
              {state.error}
            </Text>
          )}

          <Box>
            <CustomInput
              label="Email address"
              LeftIcon={MdEmail}
              onChange={onChange("email")}
              isInvalid={!state.isValidEmail}
              invalidText="Please enter a valid email address"
              type="email"
            />
            {!isRegistered && (
              <CustomInput
                label="Full name"
                LeftIcon={FaUserCircle}
                onChange={onChange("name")}
                isInvalid={!state.isValidFullName}
                invalidText="Please enter a valid full name"
                type="text"
              />
            )}
            <CustomInput
              label="Password"
              LeftIcon={MdLock}
              isPassword
              onChange={onChange("password")}
              isInvalid={!state.isValidPassword}
              invalidText="Password must be at least 8 characters long, contain at least one number, one uppercase letter and one special character"
            />

            {!isRegistered && (
              <Box>
                <Checkbox
                  mb="1.5rem"
                  isChecked={agreesToTCs}
                  onChange={() => setAgreesToTCs.toggle()}
                >
                  <Box fontSize={{ xl: "1.2rem" }}>
                    <Text display="inline" textColor="brand.coolGrey">
                      I agree to Glaucoma Detection System's
                    </Text>
                    <CustomLink
                      label=" Terms of Service"
                      props={{ display: "inline" }}
                    />
                    <Text display="inline" textColor="brand.coolGrey">
                      {" "}
                      and
                    </Text>
                    <CustomLink
                      label=" Privacy Policy"
                      props={{ display: "inline" }}
                    />
                  </Box>
                </Checkbox>
              </Box>
            )}
            <CustomButton
              onClick={onSubmit}
              isDisabled={!agreesToTCs && !isRegistered}
              label={isRegistered ? "Login" : "Register"}
              props={{ width: "100%" }}
              isLoading={isLoading}
            />
          </Box>
        </Box>
      </Flex>
    </Grid>
  );
};

export default Login;
