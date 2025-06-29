import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useRegisterMutation, useLoginMutation } from "@/features/api/authApi";
import { Loader2 } from "lucide-react";
import { toast, Toaster } from "sonner";
import { useNavigate } from "react-router-dom";

const Login = () => {
  const [SignUp, setSignUp] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
  });
  const [Login, setLogin] = useState({ email: "", password: "" });
  const [message, setMessage] = useState("");

  const [
    register,
    {
      data: registerData,
      error: registerError,
      isLoading: registerIsLoading,
      isSuccess: registerIsSuccess,
    },
  ] = useRegisterMutation();
  const [
    login,
    {
      data: loginData,
      error: loginError,
      isLoading: loginIsLoading,
      isSuccess: loginIsSuccess,
    },
  ] = useLoginMutation();

  const  Navigate= useNavigate();

  // handle form submission
  const changehandler = (e, type) => {
    const { name, value } = e.target;
    if (type === "SignUp") {
      setSignUp({ ...SignUp, [name]: value });
    } else {
      setLogin({ ...Login, [name]: value });
    }
  };

  const handleregister = async (e, type) => {
    e.preventDefault();
    const inputData = type === "SignUp" ? SignUp : Login;
    const action = type === "SignUp" ? register : login;
    const result = await action(inputData);
    if (result.error) {
      setMessage(result.error.data.msg);
    } else {
      setMessage(type === "SignUp" ? "User registered successfully." : "Login successful.");
    }
  };

  useEffect(() => {
    if (registerIsSuccess && registerData) {
      toast.success(registerData.msg || "User registered successfully.");
    }
   
    if (loginIsSuccess && loginData) {
      toast.success(loginData.msg || "Login successful.");
      Navigate("/");
    }
   
    if (registerError && registerError.data) {
      toast.error(registerError.data.msg || "sign up failed");
    }
   
    if (loginError && loginError.data) {
      toast.error(loginError.data.msg || "login failed");
    }
  }, [registerIsSuccess, registerError, loginIsSuccess, loginError]);

  return (
    <div className="flex justify-center items-center h-screen mt-4">
      <Tabs defaultValue="Login" className="w-[400px]">
        <TabsList className="grid w-full grid-cols-2">
          <TabsTrigger value="SignUp">SignUp</TabsTrigger>
          <TabsTrigger value="Login">Login</TabsTrigger>
        </TabsList>
        <TabsContent value="SignUp">
          <Card>
            <CardHeader>
              <CardTitle>SignUp</CardTitle>
              <CardDescription>
                Create a new account by filling in the details below.
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-2">
              <div className="space-y-1">
                <Label htmlFor="name">Name</Label>
                <Input
                  type="text"
                  name="name"
                  value={SignUp.name}
                  onChange={(e) => changehandler(e, "SignUp")}
                  required
                  placeholder="eg.kishan"
                />
              </div>
              <div className="space-y-1">
                <Label htmlFor="email">Email</Label>
                <Input
                  id="email"
                  onChange={(e) => changehandler(e, "SignUp")}
                  name="email"
                  value={SignUp.email}
                  type="email"
                />
              </div>
              <div className="space-y-1">
                <Label htmlFor="password">Password</Label>
                <Input
                  id="password"
                  onChange={(e) => changehandler(e, "SignUp")}
                  name="password"
                  value={SignUp.password}
                  type="password"
                />
              </div>
              <div className="space-y-1">
                <Label htmlFor="confirm-password">Confirm Password</Label>
                <Input
                  id="confirm-password"
                  name="confirmPassword"
                  value={SignUp.confirmPassword}
                  onChange={(e) => changehandler(e, "SignUp")}
                  type="password"
                />
              </div>
            </CardContent>
            <CardFooter>
              <Button disabled={registerIsLoading} onClick={(e) => handleregister(e, "SignUp")}>
                {registerIsLoading ? (
                  <>
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />please wait...
                  </>
                ) : (
                  "SignUp"
                )}
              </Button>
            </CardFooter>
          </Card>
        </TabsContent>
        <TabsContent value="Login">
          <Card>
            <CardHeader>
              <CardTitle>Login</CardTitle>
              <CardDescription>
                Enter your email and password to login.
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-2">
              <div className="space-y-1">
                <Label htmlFor="email">Email</Label>
                <Input
                  id="email"
                  onChange={(e) => changehandler(e, "Login")}
                  name="email"
                  value={Login.email}
                  type="email"
                />
              </div>
              <div className="space-y-1">
                <Label htmlFor="password">Password</Label>
                <Input
                  id="password"
                  name="password"
                  value={Login.password}
                  onChange={(e) => changehandler(e, "Login")}
                  type="password"
                />
              </div>
            </CardContent>
            <CardFooter>
              <Button disabled={loginIsLoading} onClick={(e) => handleregister(e, "Login")}>
                {loginIsLoading ? (
                  <>
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />please wait...
                  </>
                ) : (
                  "Login"
                )}
              </Button>
            </CardFooter>
          </Card>
        </TabsContent>
      </Tabs>
      {message && <div className="mt-4 text-center text-green-500">{message}</div>}
      <Toaster />
    </div>
  );
};

export default Login;
