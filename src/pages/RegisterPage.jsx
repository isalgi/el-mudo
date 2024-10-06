import { useState } from "react";
import axios from "axios";
import { Button, Card, Label, TextInput, Radio } from "flowbite-react";
import { useNavigate, Link } from "react-router-dom";

export default function LoginPage() {
  const [name, setName] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [roleId, setRoleId] = useState(1); // default to 1
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleName = (event) => {
    setName(event.target.value);
  };

  const handleUsername = (event) => {
    setUsername(event.target.value);
  };

  const handlePassword = (event) => {
    setPassword(event.target.value);
  };

  const handleRoleId = (event) => {
    setRoleId(parseInt(event.target.value));
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    axios
      .post("https://api.mudoapi.site/register", {
        name: name,
        username: username,
        password: password,
        roleId: roleId,
      })
      .then((res) => {
        console.log(res);
        setSuccess(true);
        setError(false);

        setTimeout(() => {
          navigate("/login");
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
        <h1 className="text-3xl font-bold mx-auto">Register</h1>
        <form className="flex flex-col gap-4" onSubmit={handleSubmit}>
          <div>
            {success && (
              <div className="text-green-500">
                You have successfully registered.
              </div>
            )}
            {error && <div className="text-red-500">{error}</div>}
          </div>

          <div>
            <div className="mb-2 block">
              <Label htmlFor="name" value="Name" />
            </div>
            <TextInput id="name" type="text" onChange={handleName} required />
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

          <div>
            <div className="mb-2 block">
              <Label value="Role" />
            </div>
            <div className="flex gap-4">
              <Radio
                id="role1"
                name="role1"
                value="1"
                onChange={handleRoleId}
              />
              <Label htmlFor="role1">Role 1</Label>

              <Radio
                id="role2"
                name="role2"
                value="2"
                onChange={handleRoleId}
              />
              <Label htmlFor="role2">Role 2</Label>
            </div>
          </div>
          <Label className="flex mx-auto gap-1">
            Already have an account?
            <Link className="text-blue-500" to="/login">
              Login
            </Link>
          </Label>
          <Button type="submit">Submit</Button>
        </form>
      </Card>
    </div>
  );
}
