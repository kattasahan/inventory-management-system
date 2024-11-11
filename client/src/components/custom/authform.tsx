import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { ChangeEvent, useState } from "react";
import { Link } from "react-router-dom";
import { Eye, EyeClosed } from "lucide-react";

export default function Authform({
  type,
  role,
}: {
  role?: "user" | "admin";
  type: "login" | "register";
}) {
  const formInitState = { email: "", password: "", secret: "" };
  const [form, setForm] = useState(formInitState);
  const [show, setShow] = useState({ showPassword: false, showSecret: false });

  const handleInput = (e: ChangeEvent<HTMLInputElement>) => {
    setForm((prev) => ({ ...prev, [e.target.id]: e.target.value }));
  };

  const submitForm = () => {};

  const clearForm = () => {
    setForm(formInitState);
  };
  return (
    <>
      <div className="w-full">
        <Label htmlFor="email">Email</Label>
        <Input
          id="email"
          value={form.email}
          type="email"
          placeholder="john@gmail.com"
          onChange={handleInput}
        />
      </div>
      <div className="w-full">
        <Label htmlFor="password">Password</Label>
        <div className="flex w-full gap-1">
          <Input
            id="password"
            value={form.password}
            type={show.showPassword ? "text" : "password"}
            placeholder="zFgr&5sL"
            className="grow"
            onChange={handleInput}
          />
          <Button
            id="showPassword"
            variant="outline"
            size="icon"
            onClick={() =>
              setShow((prev) => ({ ...prev, showPassword: !prev.showPassword }))
            }
          >
            {show.showPassword ? <Eye /> : <EyeClosed />}
          </Button>
        </div>
      </div>
      {type === "register" && role === "admin" && (
        <div className="w-full">
          <Label htmlFor="secret">Secret</Label>
          <div className="flex w-full gap-1">
            <Input
              id="secret"
              value={form.secret}
              type={show.showSecret ? "text" : "password"}
              placeholder="********"
              className="w-full"
              onChange={handleInput}
            />
            <Button
              id="showSecret"
              variant="outline"
              size="icon"
              onClick={() =>
                setShow((prev) => ({ ...prev, showSecret: !prev.showSecret }))
              }
            >
              {show.showSecret ? <Eye /> : <EyeClosed />}
            </Button>
          </div>
        </div>
      )}
      <div className="w-full flex justify-end gap-2 mt-2">
        <Button variant="secondary" className="w-[50%]" onClick={clearForm}>
          Clear
        </Button>
        <Button variant="default" className="w-[50%]" onClick={submitForm}>
          {type === "register" ? "Register" : "Login"}
        </Button>
      </div>
    </>
  );
}

export function ToggleForm({ type }: { type: "login" | "register" }) {
  return (
    <div className="flex justify-end w-full">
      {/* {type === "login" ? (
        <div>
          don't have an account?{" "}
          <Link className="underline" to="/register">
            Register
          </Link>
        </div>
      ) : (
        <div>
          already have an account?{" "}
          <Link className="underline" to="/login">
            Login
          </Link>
        </div>
      )} */}
      <div>
        {type === "login"
          ? "don't have an account? "
          : "already have an account? "}
        <Link
          className="underline"
          to={type === "login" ? "/register" : "/login"}
        >
          {type === "login" ? "Register" : "Login"}
        </Link>
      </div>
    </div>
  );
}
