import { useState } from "react";
import axios from "axios";
import { Button, Card, Label, TextInput } from "flowbite-react";
import { useNavigate, Link } from "react-router-dom";

export default function LoginPage() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleUsername = (event) => {
    setUsername(event.target.value);
  };

  const handlePassword = (event) => {
    setPassword(event.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    axios
      .post("https://api.mudoapi.site/login", {
        username: username,
        password: password,
      })
      .then((res) => {
        const token = res.data.data.token;
        localStorage.setItem("access_token", token);
        setSuccess(true);
        setError(false);

        setTimeout(() => {
          navigate("/menu");
        }, 1000);
      })
      .catch((error) => {
        console.log("err", error?.response);
        setError(error?.response.data.message);
      });
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-slate-800">
      <Card className="max-w-sm w-full mx-auto">
        <h1 className="text-3xl font-bold mx-auto">Login</h1>
        <form className="flex flex-col gap-4">
          <div>
            {success && (
              <div className="text-green-500">
                You have successfully logged in
              </div>
            )}
            {error && <div className="text-red-500">{error}</div>}
          </div>
          <div>
            <div className="mb-2 block">
              <Label htmlFor="username" value="Username" />
            </div>
            <TextInput
              id="username"
              type="text"
              onChange={handleUsername}
              required
            />
          </div>
          <div>
            <div className="mb-2 block">
              <Label htmlFor="password" value="Password" />
            </div>
            <TextInput
              id="password"
              type="password"
              onChange={handlePassword}
              required
            />
          </div>
          <Label className="flex mx-auto gap-1">
            Don&apos;t have an account?
            <Link className="text-blue-500" to="/register">
              Register
            </Link>
          </Label>
          <Button type="submit" onClick={handleSubmit}>
            Submit
          </Button>
        </form>
      </Card>
    </div>
  );
}
